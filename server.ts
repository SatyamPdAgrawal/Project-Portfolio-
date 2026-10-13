import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { SATYAM_PORTFOLIO_SYSTEM_INSTRUCTION } from './src/server/portfolioKnowledge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security: parse JSON bodies with reasonable limit
app.use(express.json({ limit: '32kb' }));

// Serve static assets from public/ directory
const publicDir = path.resolve(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// ----------------------------------------------------
// In-memory Rate Limiters (Sliding Window per IP)
// ----------------------------------------------------
interface RateLimitRecord {
  timestamps: number[];
}

const chatRateLimitMap = new Map<string, RateLimitRecord>();
const contactRateLimitMap = new Map<string, RateLimitRecord>();

const CHAT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_CHAT_REQUESTS = 30; // 30 req/min

const CONTACT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CONTACT_REQUESTS = 6; // max 6 submissions per 10 mins

const chatRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  let record = chatRateLimitMap.get(ip);
  if (!record) {
    record = { timestamps: [] };
    chatRateLimitMap.set(ip, record);
  }
  record.timestamps = record.timestamps.filter((ts) => now - ts < CHAT_WINDOW_MS);
  if (record.timestamps.length >= MAX_CHAT_REQUESTS) {
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please wait a moment before sending another query.'
    });
    return;
  }
  record.timestamps.push(now);
  next();
};

const contactRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  let record = contactRateLimitMap.get(ip);
  if (!record) {
    record = { timestamps: [] };
    contactRateLimitMap.set(ip, record);
  }
  record.timestamps = record.timestamps.filter((ts) => now - ts < CONTACT_WINDOW_MS);
  if (record.timestamps.length >= MAX_CONTACT_REQUESTS) {
    res.status(429).json({
      success: false,
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Submission limit reached. Please wait a few minutes before submitting another message, or email Satyam directly at prasadagrawal2@gmail.com.'
    });
    return;
  }
  record.timestamps.push(now);
  next();
};

// Periodic garbage collection for rate limit maps
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of chatRateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < CHAT_WINDOW_MS);
    if (record.timestamps.length === 0) chatRateLimitMap.delete(ip);
  }
  for (const [ip, record] of contactRateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < CONTACT_WINDOW_MS);
    if (record.timestamps.length === 0) contactRateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ----------------------------------------------------
// PART A: Resume Availability & Download Routes
// ----------------------------------------------------
const RESUME_FILENAME = 'Satyam-Prasad-Agrawal-Resume.pdf';
const getResumeFilePath = () => path.resolve(__dirname, 'public', RESUME_FILENAME);

app.get('/api/resume/status', (_req: Request, res: Response) => {
  const filePath = getResumeFilePath();
  const exists = fs.existsSync(filePath);
  res.json({
    available: exists,
    filename: RESUME_FILENAME,
    downloadUrl: '/api/resume/download',
    message: exists
      ? 'Resume PDF verified and ready for download.'
      : 'Resume PDF is awaiting file placement at public/Satyam-Prasad-Agrawal-Resume.pdf.'
  });
});

app.get('/api/resume/download', (_req: Request, res: Response) => {
  const filePath = getResumeFilePath();
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${RESUME_FILENAME}"`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({
      error: 'FILE_NOT_FOUND',
      filename: RESUME_FILENAME,
      message:
        'The source resume PDF has not yet been placed in the repository. Please place your two-page PDF at public/Satyam-Prasad-Agrawal-Resume.pdf.'
    });
  }
});

// ----------------------------------------------------
// PART B: Contact Form Delivery & Status Routes
// ----------------------------------------------------
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const DESTINATION_EMAIL = process.env.CONTACT_DESTINATION_EMAIL || 'prasadagrawal2@gmail.com';

app.get('/api/contact/status', (_req: Request, res: Response) => {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.trim().length > 0);
  const hasWebhook = Boolean(process.env.CONTACT_WEBHOOK_URL && process.env.CONTACT_WEBHOOK_URL.trim().length > 0);

  const isConfigured = hasResend || hasSendGrid || hasWebhook;
  res.json({
    isConfigured,
    provider: hasResend ? 'Resend' : hasSendGrid ? 'SendGrid' : hasWebhook ? 'Webhook' : 'None',
    destinationEmail: DESTINATION_EMAIL
  });
});

app.post('/api/contact', contactRateLimiter, async (req: Request, res: Response) => {
  const { name, email, subject, message, company_hp, client_timestamp } = req.body;

  // 1. Spam Protection: Honeypot trap check
  if (company_hp && typeof company_hp === 'string' && company_hp.trim().length > 0) {
    console.warn('[Contact Spam Caught] Honeypot triggered by client.');
    // Pretend success or return standard error to deter bot enumeration
    res.status(400).json({
      success: false,
      error: 'SPAM_DETECTED',
      message: 'Automated submission rejected.'
    });
    return;
  }

  // 2. Spam Protection: Time-to-submit verification (bots submit in < 1000ms)
  if (client_timestamp && typeof client_timestamp === 'number') {
    const elapsedMs = Date.now() - client_timestamp;
    if (elapsedMs < 1200) {
      console.warn(`[Contact Spam Caught] Rapid submission in ${elapsedMs}ms.`);
      res.status(400).json({
        success: false,
        error: 'RAPID_SUBMISSION',
        message: 'Submission was too fast. Please take your time and verify your details.'
      });
      return;
    }
  }

  // 3. Server-side Data Validation
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    res.status(400).json({
      success: false,
      error: 'INVALID_NAME',
      message: 'Name is required and must not exceed 100 characters.'
    });
    return;
  }

  if (typeof email !== 'string' || !email.trim() || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 100) {
    res.status(400).json({
      success: false,
      error: 'INVALID_EMAIL',
      message: 'A valid email address is required (e.g. name@company.com).'
    });
    return;
  }

  if (typeof message !== 'string' || !message.trim() || message.trim().length < 10 || message.trim().length > 3000) {
    res.status(400).json({
      success: false,
      error: 'INVALID_MESSAGE',
      message: 'Message is required and must be between 10 and 3,000 characters.'
    });
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject = typeof subject === 'string' && subject.trim() ? subject.trim().slice(0, 150) : 'General Inquiry';
  const cleanMessage = message.trim();

  // 4. Delivery Integration Check
  const resendApiKey = process.env.RESEND_API_KEY;
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  // Genuine Delivery Pathway A: Resend API
  if (resendApiKey && resendApiKey.trim().length > 0) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [DESTINATION_EMAIL],
          reply_to: cleanEmail,
          subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
          text: `Inquiry from: ${cleanName} <${cleanEmail}>\nSubject: ${cleanSubject}\nDate: ${new Date().toISOString()}\n\nMessage:\n${cleanMessage}`
        })
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error('[Resend Error]:', resendResponse.status, errorText);
        res.status(502).json({
          success: false,
          error: 'DELIVERY_GATEWAY_ERROR',
          message: 'The email delivery service encountered a temporary error. Please email Satyam directly at prasadagrawal2@gmail.com.'
        });
        return;
      }

      const resendData = await resendResponse.json();
      res.json({
        success: true,
        message: 'Your inquiry has been successfully delivered to Satyam Prasad Agrawal.',
        referenceId: resendData.id
      });
      return;
    } catch (deliveryError: any) {
      console.error('[Resend Exception]:', deliveryError?.message || deliveryError);
      res.status(502).json({
        success: false,
        error: 'DELIVERY_NETWORK_ERROR',
        message: 'Network issue contacting email delivery provider. Please reach out directly to prasadagrawal2@gmail.com.'
      });
      return;
    }
  }

  // Genuine Delivery Pathway B: SendGrid API
  if (sendgridApiKey && sendgridApiKey.trim().length > 0) {
    try {
      const fromEmail = process.env.SENDGRID_FROM_EMAIL || DESTINATION_EMAIL;
      const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridApiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: DESTINATION_EMAIL }] }],
          from: { email: fromEmail, name: 'Portfolio Contact' },
          reply_to: { email: cleanEmail, name: cleanName },
          subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
          content: [{ type: 'text/plain', value: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}` }]
        })
      });

      if (sendgridResponse.status >= 200 && sendgridResponse.status < 300) {
        res.json({
          success: true,
          message: 'Your inquiry has been successfully delivered to Satyam Prasad Agrawal.'
        });
        return;
      }

      res.status(502).json({
        success: false,
        error: 'SENDGRID_ERROR',
        message: 'SendGrid returned an error. Please contact Satyam directly at prasadagrawal2@gmail.com.'
      });
      return;
    } catch (e: any) {
      console.error('[SendGrid Exception]:', e?.message || e);
      res.status(502).json({
        success: false,
        error: 'SENDGRID_EXCEPTION',
        message: 'Unable to deliver message. Please contact prasadagrawal2@gmail.com.'
      });
      return;
    }
  }

  // Genuine Delivery Pathway C: Webhook Integration
  if (webhookUrl && webhookUrl.trim().length > 0) {
    try {
      const webhookResponse = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          timestamp: new Date().toISOString()
        })
      });

      if (webhookResponse.ok) {
        res.json({
          success: true,
          message: 'Your inquiry has been successfully recorded and dispatched to Satyam.'
        });
        return;
      }
    } catch (e: any) {
      console.error('[Webhook Delivery Exception]:', e?.message || e);
    }
  }

  // Factual, Honest Handling When Delivery Service is Unconfigured
  // As requested: Do NOT claim the form sent emails if credentials are not configured!
  res.status(503).json({
    success: false,
    error: 'DELIVERY_SERVICE_NOT_CONFIGURED',
    destinationEmail: DESTINATION_EMAIL,
    message:
      'Server-side email delivery credentials (e.g. RESEND_API_KEY or SENDGRID_API_KEY) are not yet configured on this environment. To ensure your message is received immediately, please email Satyam directly at prasadagrawal2@gmail.com or connect via LinkedIn.'
  });
});

// ----------------------------------------------------
// Assistant Status & Chat Routes
// ----------------------------------------------------
app.get(['/api/assistant/status', '/api/chat/status'], (_req: Request, res: Response) => {
  const key = process.env.GEMINI_API_KEY;
  const isConfigured = Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.trim().length > 0);
  res.json({
    status: isConfigured ? 'ready' : 'missing_key',
    model: 'gemini-3.1-flash-lite / gemini-3.8-flash',
    provider: 'Google GenAI SDK'
  });
});

app.post(['/api/assistant/chat', '/api/chat'], chatRateLimiter, async (req: Request, res: Response) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim().length === 0) {
    res.status(503).json({
      error: 'API_KEY_UNAVAILABLE',
      message: 'The Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in the Secrets panel.'
    });
    return;
  }

  const { message, history } = req.body;

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Message must be a non-empty string.'
    });
    return;
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length > 1000) {
    res.status(400).json({
      error: 'INPUT_TOO_LONG',
      message: 'Message exceeds the maximum permitted length of 1,000 characters.'
    });
    return;
  }

  const safeHistory: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];
  if (Array.isArray(history)) {
    const recent = history.slice(-6);
    for (const item of recent) {
      if (
        item &&
        (item.role === 'user' || item.role === 'model') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0
      ) {
        safeHistory.push({
          role: item.role,
          parts: [{ text: item.content.trim().slice(0, 1000) }]
        });
      }
    }
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  const contents = [
    ...safeHistory,
    {
      role: 'user' as const,
      parts: [{ text: trimmedMessage }]
    }
  ];

  const config = {
    systemInstruction: SATYAM_PORTFOLIO_SYSTEM_INSTRUCTION,
    temperature: 0.3,
    topP: 0.9
  };

  const wantsStream = req.headers.accept?.includes('text/event-stream') || req.query.stream === 'true';
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      if (wantsStream) {
        const stream = await ai.models.generateContentStream({
          model,
          contents,
          config
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders?.();

        for await (const chunk of stream) {
          const chunkText = chunk.text;
          if (chunkText) {
            res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
          }
        }

        res.write('data: [DONE]\n\n');
        res.end();
        return;
      } else {
        const response = await ai.models.generateContent({
          model,
          contents,
          config
        });

        res.json({ reply: response.text || '' });
        return;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini Assistant] Model ${model} encountered error:`, err?.status || err?.message);
      if (err?.status === 503 || err?.message?.includes('503') || err?.message?.includes('high demand')) {
        continue;
      } else {
        break;
      }
    }
  }

  console.error('[Gemini Assistant Final Failure]:', lastError?.message || lastError);

  if (res.headersSent) {
    res.write(`data: ${JSON.stringify({ error: 'Stream interrupted due to temporary server error.' })}\n\n`);
    res.end();
    return;
  }

  res.status(503).json({
    error: 'MODEL_UNAVAILABLE',
    message: 'The portfolio assistant is temporarily experiencing high demand. Please retry in a few moments.'
  });
});

// Setup Vite middleware in dev or static files in production
async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Portfolio server active at http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start portfolio server:', err);
  process.exit(1);
});
