import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Code, BookOpen, ExternalLink, GraduationCap, FileText } from 'lucide-react';
import { PERSONAL_PROFILE, SOCIAL_LINKS } from '../data/portfolioData';
import { ResumeDownloadModal } from './ResumeDownloadModal';

export const Hero: React.FC = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section id="about" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Typographic Hierarchy & Internship Focus */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed text kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-4">
              <span>{PERSONAL_PROFILE.institution}</span>
              <span aria-hidden="true">·</span>
              <span>B.Tech CS&T ({PERSONAL_PROFILE.period})</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] font-serif leading-[1.08] text-balance mb-6">
              {PERSONAL_PROFILE.name}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl mb-4">
              {PERSONAL_PROFILE.careerSummary}
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
              {PERSONAL_PROFILE.internshipIntent}
            </p>

            {/* Action buttons + Social presence */}
            <div className="flex flex-wrap items-center gap-4 pt-1 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => {
                  fetch('/api/resume/status')
                    .then((r) => r.json())
                    .then((d) => {
                      if (d.available) {
                        window.location.href = '/api/resume/download';
                      } else {
                        setShowResumeModal(true);
                      }
                    })
                    .catch(() => setShowResumeModal(true));
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] bg-[var(--canvas-surface)] hover:bg-[var(--canvas-surface-elevated)] border border-[var(--canvas-border)] rounded-md transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Verified Profile Links */}
              <div className="flex items-center gap-2 sm:ml-2 border-l border-[var(--canvas-border)] pl-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                  aria-label="GitHub Profile (SatyamPdAgrawal)"
                  title="GitHub: SatyamPdAgrawal"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                  aria-label="LinkedIn Profile (Satyam Prasad Agrawal)"
                  title="LinkedIn: Satyam Prasad Agrawal"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={SOCIAL_LINKS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                  aria-label="LeetCode Profile (codebysatyam1)"
                  title="LeetCode: codebysatyam1"
                >
                  <Code className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quiet metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <span>{PERSONAL_PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--sage)]">Seeking Internship Roles</span>
            </div>
          </div>

          {/* Right Column: Academic & Technical Dossier Card */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full h-full min-h-[380px] p-6 sm:p-8 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--canvas-border)] mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />
                    <span className="text-xs font-mono font-medium tracking-tight text-[var(--text-primary)]">
                      ACADEMIC_PROFILE.txt
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--sage)] font-medium">
                    Verified Record
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                  <div className="p-3.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)]">
                    <span className="text-[var(--cobalt)] font-semibold uppercase tracking-wider text-[11px] block mb-1">
                      Degree & Institution
                    </span>
                    <p className="text-[var(--text-primary)] font-sans text-sm font-semibold">
                      B.Tech, Computer Science & Technology
                    </p>
                    <p className="text-[var(--text-secondary)] font-sans text-xs mt-0.5">
                      SAGE University, Indore ({PERSONAL_PROFILE.period})
                    </p>
                    <p className="mt-1.5 text-[var(--sage)] font-mono text-xs">
                      CGPA: {PERSONAL_PROFILE.cgpa}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)]">
                    <span className="text-[var(--text-primary)] font-semibold uppercase tracking-wider text-[11px] block mb-1">
                      Core Languages & Paradigms
                    </span>
                    <p className="text-[var(--text-primary)] font-sans text-xs">
                      Java · C++ · JavaScript
                    </p>
                    <p className="mt-1 text-[var(--text-muted)] font-mono text-[11px]">
                      Data Structures & Algorithms · Object-Oriented Programming (OOP)
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)]">
                    <span className="text-[var(--sage)] font-semibold uppercase tracking-wider text-[11px] block mb-1">
                      Web & Database Foundations
                    </span>
                    <p className="text-[var(--text-primary)] font-sans text-xs">
                      HTML · CSS · JavaScript · Full-Stack Development
                    </p>
                    <p className="mt-1 text-[var(--text-muted)] font-mono text-[11px]">
                      DBMS · SQL · Database Fundamentals · Git & GitHub
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--canvas-border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>STATUS: Active Undergraduate</span>
                <span className="text-[var(--cobalt)] font-medium">Satyam Prasad Agrawal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width strip below the split: 4 Factual Anchors */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[var(--canvas-border)] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--text-primary)] tabular-nums">
              7.78 / 10
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] mt-1">
              Current Undergraduate CGPA
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
              SAGE University, Indore
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--cobalt)] tabular-nums">
              2025–2029
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] mt-1">
              B.Tech Academic Span
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Computer Science & Technology
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
              Java · C++ · JS
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] mt-1">
              Core Programming Stack
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
              DSA, OOP & Web Systems
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--sage)]">
              Internships
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] mt-1">
              Target Opportunities
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Software & Web Development
            </span>
          </div>
        </div>
      </div>

      <ResumeDownloadModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        isAvailable={false}
      />
    </section>
  );
};
