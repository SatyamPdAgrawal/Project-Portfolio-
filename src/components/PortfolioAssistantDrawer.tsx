import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  ArrowUpRight,
  Shield,
  Trash2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  'What is Satyam\'s academic focus and undergraduate timeline?',
  'What is the current status of the Service Provider Booking application?',
  'Which programming languages and core skills are verified in Satyam\'s stack?',
  'How many algorithmic problems has Satyam solved on LeetCode?'
];

export const PortfolioAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    if (query.length > 1000) {
      setErrorMessage('Please limit your inquiry to 1,000 characters.');
      return;
    }

    setErrorMessage(null);
    setInputMessage('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setStreamingText('');

    try {
      // Build sanitized conversation history (excluding the new user turn)
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/assistant/chat?stream=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream'
        },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }

      // Handle Server-Sent Events stream
      if (response.headers.get('content-type')?.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataPayload = line.slice(6).trim();
              if (dataPayload === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataPayload);
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setStreamingText(accumulatedText);
                } else if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e: any) {
                // Ignore parse errors on partial tokens unless it's a fatal throw
                if (e.message && !e.message.includes('JSON')) {
                  throw e;
                }
              }
            }
          }
        }

        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          content: accumulatedText.trim() || 'I am ready to assist with details from Satyam\'s portfolio.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...updatedMessages, modelMessage]);
        setStreamingText('');
      } else {
        // Fallback standard JSON response
        const data = await response.json();
        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          content: data.reply || 'I am ready to assist with details from Satyam\'s portfolio.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...updatedMessages, modelMessage]);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(
        err.message || 'Unable to connect with the assistant. Please check server settings or retry.'
      );
    } finally {
      setIsLoading(false);
      setStreamingText('');
    }
  };

  const handleRetryLast = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setStreamingText('');
    setErrorMessage(null);
  };

  return (
    <>
      {/* Subtle Editorial Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] hover:bg-[var(--canvas-surface)] text-[var(--text-primary)] shadow-md hover:shadow-lg hover:border-[var(--cobalt)] transition-all duration-200 cursor-pointer"
          aria-label="Open Satyam's AI Portfolio Assistant chat drawer"
        >
          <div className="w-5 h-5 rounded-full bg-[var(--cobalt)]/10 text-[var(--cobalt)] flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[var(--cobalt)]" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold tracking-tight font-sans">
            Ask Portfolio Assistant
          </span>
          <span className="text-[10px] font-mono text-[var(--sage)] border-l border-[var(--canvas-border)] pl-2">
            Verified AI
          </span>
        </button>
      </div>

      {/* Slide-Over Drawer Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={drawerRef}
            className="w-full sm:max-w-md md:max-w-lg h-full bg-[var(--canvas-surface)] border-l border-[var(--canvas-border)] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--canvas-border)] flex items-start justify-between gap-4 bg-[var(--canvas-surface-elevated)]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--sage)] mb-1">
                  <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GROUNDED IN VERIFIED PORTFOLIO DATA</span>
                </div>
                <h3 id="assistant-drawer-title" className="text-lg font-bold font-serif text-[var(--text-primary)]">
                  Satyam's Portfolio Assistant
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Powered by Google GenAI · Strictly answers from verified facts
                </p>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Clear conversation"
                    aria-label="Clear conversation history"
                    className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--canvas-surface)] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant panel"
                  className="p-1.5 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Empty state with suggested prompts */}
              {messages.length === 0 && !streamingText && (
                <div className="py-6 space-y-6">
                  <div className="p-4 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-xs text-[var(--text-secondary)] space-y-2">
                    <p className="font-semibold text-[var(--text-primary)]">
                      Welcome! How can I help you evaluate Satyam's profile?
                    </p>
                    <p className="leading-relaxed text-[var(--text-muted)]">
                      I am configured to provide exact, unembellished answers about Satyam Prasad Agrawal's undergraduate education at SAGE University, verified GitHub repositories, programming stack, and LeetCode problem-solving activity.
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                      Suggested Inquiries:
                    </span>
                    <div className="space-y-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="w-full text-left p-3 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] hover:border-[var(--cobalt)] hover:text-[var(--cobalt)] text-xs text-[var(--text-primary)] transition-colors cursor-pointer flex items-center justify-between group"
                        >
                          <span>{q}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--cobalt)] shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Message History */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-lg text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--cobalt)] text-white font-normal'
                        : 'bg-[var(--canvas-surface-elevated)] border border-[var(--canvas-border)] text-[var(--text-primary)]'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="whitespace-pre-wrap space-y-1.5 font-sans">
                        {msg.content}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1 px-1">
                    {msg.role === 'user' ? 'You' : 'Portfolio Assistant'} · {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Streaming Real-Time Token Generation */}
              {isLoading && streamingText && (
                <div className="flex flex-col items-start">
                  <div className="max-w-[88%] p-3.5 rounded-lg text-xs sm:text-sm leading-relaxed bg-[var(--canvas-surface-elevated)] border border-[var(--canvas-border)] text-[var(--text-primary)]">
                    <div className="whitespace-pre-wrap space-y-1.5 font-sans">
                      {streamingText}
                      <span className="inline-block w-1.5 h-3.5 bg-[var(--cobalt)] animate-pulse ml-0.5 align-middle" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--cobalt)] mt-1 px-1">
                    Streaming verified answer...
                  </span>
                </div>
              )}

              {/* Loading Spinner State before first token */}
              {isLoading && !streamingText && (
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--cobalt)]" />
                  <span>Synthesizing answer from verified portfolio records...</span>
                </div>
              )}

              {/* Error State */}
              {errorMessage && (
                <div className="p-3 rounded-md border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-xs text-red-600 dark:text-red-300 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRetryLast}
                    className="font-mono underline hover:text-red-700 dark:hover:text-red-200 shrink-0 cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <div className="p-4 border-t border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    rows={2}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask about Satyam's skills, B.Tech duration, projects..."
                    maxLength={1000}
                    disabled={isLoading}
                    className="w-full pr-12 p-3 text-xs sm:text-sm rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--cobalt)] focus:outline-none transition-colors resize-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    aria-label="Send message"
                    className="absolute right-2.5 bottom-3.5 p-1.5 rounded-md bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] text-white disabled:opacity-30 disabled:hover:bg-[var(--cobalt)] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Enter to submit · Shift+Enter for newline</span>
                  <span>{inputMessage.length} / 1000</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
