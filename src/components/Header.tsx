import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';
import { ResumeDownloadModal } from './ResumeDownloadModal';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [isResumeAvailable, setIsResumeAvailable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if resume file is available on server
    fetch('/api/resume/status')
      .then((res) => res.json())
      .then((data) => {
        setIsResumeAvailable(Boolean(data.available));
      })
      .catch(() => {
        setIsResumeAvailable(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isResumeAvailable) {
      window.location.href = '/api/resume/download';
    } else {
      setResumeModalOpen(true);
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'DSA Journey', href: '#dsa' },
    { label: 'GitHub Activity', href: '#github' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? 'bg-[var(--canvas-bg)]/95 backdrop-blur-md border-b border-[var(--canvas-border)] shadow-xs'
            : 'bg-[var(--canvas-bg)] border-b border-[var(--canvas-border-subtle)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 xl:gap-8 h-16">
            {/* Zone 1: Single-element Brand Wordmark */}
            <a
              href="#"
              className="text-base sm:text-lg font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--cobalt)] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
              aria-label="Satyam Prasad Agrawal Portfolio Homepage"
            >
              <span className="w-7 h-7 rounded-sm border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex items-center justify-center text-xs font-mono font-medium text-[var(--cobalt)]">
                SA
              </span>
              <span>{PERSONAL_PROFILE.name}</span>
            </a>

            {/* Zone 2: Clean single-line text navigation links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden xl:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[var(--text-secondary)]"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap shrink-0 hover:text-[var(--text-primary)] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--cobalt)] hover:after:w-full after:transition-all after:duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions + Theme Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={handleResumeClick}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors cursor-pointer"
                title="Download or inspect Satyam Prasad Agrawal's Resume"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--cobalt)]" aria-hidden="true" />
                <span>Resume (PDF)</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-secondary)]" aria-hidden="true" />
                )}
              </button>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              {/* Mobile / Tablet menu toggle button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="xl:hidden p-2 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-primary)] cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="fixed inset-0 top-16 z-50 bg-[var(--canvas-bg)] xl:hidden border-t border-[var(--canvas-border)] flex flex-col justify-between p-6 animate-in fade-in duration-150 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[var(--text-primary)] py-2 border-b border-[var(--canvas-border-subtle)] hover:text-[var(--cobalt)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 pb-4 flex flex-col gap-3 border-t border-[var(--canvas-border)]">
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleResumeClick(e);
                }}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-primary)] flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[var(--cobalt)]" />
                <span>Download Resume (PDF)</span>
              </button>

              <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] pt-2">
                <span>Theme Appearance</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)]"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_PROFILE.email}`}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[var(--cobalt)] rounded-md hover:bg-[var(--cobalt-hover)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Direct Email ({PERSONAL_PROFILE.email})
              </a>
            </div>
          </div>
        )}
      </header>

      <ResumeDownloadModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        isAvailable={isResumeAvailable}
      />
    </>
  );
};
