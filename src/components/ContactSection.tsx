import React, { useState, useEffect } from 'react';
import { PERSONAL_PROFILE, SOCIAL_LINKS } from '../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Code,
  ArrowUpRight,
  FileText,
  AlertCircle,
  RefreshCw,
  Download
} from 'lucide-react';
import { ResumeDownloadModal } from './ResumeDownloadModal';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company_hp: '' // Honeypot anti-spam field
  });
  const [mountTimestamp] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [isResumeAvailable, setIsResumeAvailable] = useState(false);

  useEffect(() => {
    fetch('/api/resume/status')
      .then((res) => res.json())
      .then((data) => {
        setIsResumeAvailable(Boolean(data.available));
      })
      .catch(() => {
        setIsResumeAvailable(false);
      });
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isResumeAvailable) {
      window.location.href = '/api/resume/download';
    } else {
      setResumeModalOpen(true);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name must be 100 characters or fewer.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      errors.message = 'Inquiry message is required.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters detailing your inquiry.';
    } else if (formData.message.trim().length > 3000) {
      errors.message = 'Message must be under 3,000 characters.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmissionSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || undefined,
          message: formData.message.trim(),
          company_hp: formData.company_hp, // Honeypot
          client_timestamp: mountTimestamp
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Delivery gateway returned HTTP ${response.status}`);
      }

      // Success confirmed by delivery provider
      setSubmissionSuccess(
        data.message || 'Your inquiry has been successfully dispatched to Satyam Prasad Agrawal.'
      );
      setFormData({ name: '', email: '', subject: '', message: '', company_hp: '' });
      setValidationErrors({});
    } catch (err: any) {
      setFormError(
        err.message || 'Unable to deliver message at this time. Please email Satyam directly at prasadagrawal2@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Inquiries & Internship Opportunities</span>
            <span aria-hidden="true">·</span>
            <span>Direct Communication & Resume</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Get in Touch
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Currently seeking software development and web development internship roles. Reach out for opportunities, collaboration, or to request documentation.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries, Resume Download Card, & Verified Profiles */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Primary Direct Channel Card */}
              <div className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Primary Direct Channel
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${PERSONAL_PROFILE.email}`}
                    className="text-base sm:text-lg font-semibold font-mono text-[var(--text-primary)] hover:text-[var(--cobalt)] transition-colors break-all"
                  >
                    {PERSONAL_PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="p-2 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] hover:border-[var(--cobalt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[var(--sage)]" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-[var(--sage)] font-mono mt-2 animate-in fade-in">
                    Email address copied to clipboard!
                  </p>
                )}
              </div>

              {/* Resume Download Card (PART A) */}
              <div className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-1">
                    <span className="text-[var(--cobalt)] font-semibold">CURRICULUM VITAE</span>
                    <span>PDF Format</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[var(--text-primary)]">
                    Official Resume
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Filename: <span className="font-mono text-[var(--text-primary)]">Satyam-Prasad-Agrawal-Resume.pdf</span>
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    Comprehensive two-page academic credentials, project technical stacks, and DSA background.
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--canvas-border-subtle)] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResumeClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Download Resume (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResumeModalOpen(true)}
                    className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer"
                  >
                    Placement Guide
                  </button>
                </div>
              </div>

              {/* Verified Profiles Strip (PART C) */}
              <div className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-4 text-sm text-[var(--text-secondary)]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Location & Current Status
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    {PERSONAL_PROFILE.location}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Undergraduate at {PERSONAL_PROFILE.institution} ({PERSONAL_PROFILE.period})
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--canvas-border-subtle)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    Verified Technical Profiles
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-2.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />
                        <span>LinkedIn: satyam-prasad-agrawal-</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    </a>

                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-2.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />
                        <span>GitHub: SatyamPdAgrawal</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    </a>

                    <a
                      href={SOCIAL_LINKS.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-2.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />
                        <span>LeetCode: codebysatyam1</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-[var(--text-muted)] font-mono">
              <span>All communications strictly adhere to professional recruiter standards.</span>
            </div>
          </div>

          {/* Right Column: Functional Contact Form (PART B) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
              <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Inquiry dispatched directly to Satyam Prasad Agrawal via server integration.
              </p>

              {/* Delivery Confirmed Success State */}
              {submissionSuccess ? (
                <div className="p-6 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-center space-y-3 animate-in fade-in">
                  <div className="w-10 h-10 rounded-full bg-[var(--sage)]/10 text-[var(--sage)] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-semibold text-[var(--text-primary)] font-serif">
                    Message Confirmed & Delivered
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    {submissionSuccess} Satyam will review your communication and reply directly to your provided email address.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionSuccess(null);
                      setFormData({ name: '', email: '', subject: '', message: '', company_hp: '' });
                    }}
                    className="mt-3 inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-[var(--cobalt)] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  {/* Global Server/Delivery Error Notification */}
                  {formError && (
                    <div
                      role="alert"
                      className="p-4 rounded-md border border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-900 dark:text-amber-200 space-y-2 animate-in fade-in"
                    >
                      <div className="flex items-start gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                        <span>Delivery Service Status</span>
                      </div>
                      <p className="leading-relaxed">{formError}</p>
                      <div className="pt-2 border-t border-amber-200 dark:border-amber-900 flex items-center justify-between text-[11px] font-mono">
                        <a
                          href={`mailto:${PERSONAL_PROFILE.email}?subject=Direct%20Inquiry%20via%20Portfolio`}
                          className="text-[var(--cobalt)] font-semibold underline"
                        >
                          Send via Email App ({PERSONAL_PROFILE.email})
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormError(null)}
                          className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Honeypot Spam Field (Hidden from real users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="contact-company-hp">Company</label>
                    <input
                      id="contact-company-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company_hp}
                      onChange={(e) => setFormData({ ...formData, company_hp: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                      >
                        Your Name <span className="text-[var(--cobalt)]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.name)}
                        aria-describedby={validationErrors.name ? 'contact-name-error' : undefined}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' });
                        }}
                        placeholder="e.g. Maya Patel"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
                          validationErrors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[var(--canvas-border)] focus:border-[var(--cobalt)]'
                        } bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors disabled:opacity-50`}
                      />
                      {validationErrors.name && (
                        <p id="contact-name-error" className="mt-1 text-xs text-red-500 font-mono">
                          {validationErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                      >
                        Your Email <span className="text-[var(--cobalt)]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.email)}
                        aria-describedby={validationErrors.email ? 'contact-email-error' : undefined}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' });
                        }}
                        placeholder="e.g. maya@company.com"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
                          validationErrors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[var(--canvas-border)] focus:border-[var(--cobalt)]'
                        } bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors disabled:opacity-50`}
                      />
                      {validationErrors.email && (
                        <p id="contact-email-error" className="mt-1 text-xs text-red-500 font-mono">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                    >
                      Subject / Inquiry Type <span className="text-[var(--text-muted)] text-[10px]">(Optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Frontend Internship Opportunity / Technical Collaboration"
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--cobalt)] focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                    >
                      Message <span className="text-[var(--cobalt)]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(validationErrors.message)}
                      aria-describedby={validationErrors.message ? 'contact-message-error' : undefined}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (validationErrors.message) setValidationErrors({ ...validationErrors, message: '' });
                      }}
                      placeholder="Share details regarding your organization, internship scope, or technical questions..."
                      maxLength={3000}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-md border ${
                        validationErrors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--canvas-border)] focus:border-[var(--cobalt)]'
                      } bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-y disabled:opacity-50`}
                    />
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mt-1">
                      {validationErrors.message ? (
                        <span id="contact-message-error" className="text-red-500">
                          {validationErrors.message}
                        </span>
                      ) : (
                        <span>Minimum 10 characters</span>
                      )}
                      <span>{formData.message.length} / 3000</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wide uppercase font-mono text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <ResumeDownloadModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        isAvailable={isResumeAvailable}
      />
    </section>
  );
};
