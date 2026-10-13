import React, { useEffect } from 'react';
import { X, FileText, Mail, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PERSONAL_PROFILE, SOCIAL_LINKS } from '../data/portfolioData';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAvailable: boolean;
}

export const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({
  isOpen,
  onClose,
  isAvailable
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] shadow-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--canvas-border)] pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-[var(--cobalt)]/10 text-[var(--cobalt)]">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-lg font-bold font-serif text-[var(--text-primary)]">
                Satyam Prasad Agrawal — Resume
              </h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Filename: Satyam-Prasad-Agrawal-Resume.pdf
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {isAvailable ? (
          <div className="space-y-4">
            <div className="p-4 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface)] text-xs text-[var(--text-secondary)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--sage)] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Resume Ready</span>
              </div>
              <p className="leading-relaxed">
                The original two-page resume for Satyam Prasad Agrawal is available for immediate download.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--canvas-border)]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Cancel
              </button>
              <a
                href="/api/resume/download"
                download="Satyam-Prasad-Agrawal-Resume.pdf"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs"
              >
                Download PDF
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="p-4 rounded-md border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-200 space-y-2.5">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Source PDF File Placement Required</span>
              </div>
              <p className="leading-relaxed">
                The original two-page resume PDF has not yet been placed into the repository asset folder. To prevent broken or fabricated downloads, this portfolio requires the actual file to be placed at:
              </p>
              <code className="block p-2 rounded-sm bg-amber-100 dark:bg-amber-900/50 font-mono text-[11px] text-amber-900 dark:text-amber-100 break-all select-all">
                public/Satyam-Prasad-Agrawal-Resume.pdf
              </code>
            </div>

            <div className="text-xs text-[var(--text-secondary)] space-y-2">
              <p className="font-semibold text-[var(--text-primary)]">
                How to enable instant resume downloads:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-[var(--text-muted)] leading-relaxed">
                <li>Save your exact two-page resume PDF as <span className="font-mono text-[var(--text-primary)]">Satyam-Prasad-Agrawal-Resume.pdf</span>.</li>
                <li>Place the file into the <span className="font-mono text-[var(--text-primary)]">public/</span> directory of this project.</li>
                <li>The download button will automatically serve the exact verified PDF.</li>
              </ol>
            </div>

            <div className="pt-4 border-t border-[var(--canvas-border)] flex flex-wrap items-center justify-between gap-3">
              <a
                href={`mailto:${PERSONAL_PROFILE.email}?subject=Requesting%20Resume%20for%20Satyam%20Prasad%20Agrawal`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--cobalt)] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request Resume via Email</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
