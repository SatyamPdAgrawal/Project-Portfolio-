import React from 'react';
import { ArrowUp, Github, Linkedin, Code } from 'lucide-react';
import { PERSONAL_PROFILE, SOCIAL_LINKS } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[var(--canvas-bg)] border-t border-[var(--canvas-border)] py-12 text-xs text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--canvas-border-subtle)]">
          <div>
            <span className="font-semibold text-sm font-serif text-[var(--text-primary)] block">
              {PERSONAL_PROFILE.name}
            </span>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {PERSONAL_PROFILE.role} · {PERSONAL_PROFILE.institution} ({PERSONAL_PROFILE.period})
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 text-xs font-medium">
            <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">
              Projects
            </a>
            <a href="#dsa" className="hover:text-[var(--text-primary)] transition-colors">
              DSA Journey
            </a>
            <a href="#github" className="hover:text-[var(--text-primary)] transition-colors">
              GitHub Activity
            </a>
            <a href="#skills" className="hover:text-[var(--text-primary)] transition-colors">
              Skills
            </a>
            <a href="#education" className="hover:text-[var(--text-primary)] transition-colors">
              Education
            </a>
            <a href="#certifications" className="hover:text-[var(--text-primary)] transition-colors">
              Certifications
            </a>
            <a href="#activities" className="hover:text-[var(--text-primary)] transition-colors">
              Activities
            </a>
            <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Satyam Prasad Agrawal.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--sage)]">Grounded & Verified Portfolio</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--cobalt)] transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
