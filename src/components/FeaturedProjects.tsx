import React, { useState } from 'react';
import { VERIFIED_PROJECTS } from '../data/portfolioData';
import { VerifiedProject } from '../types/portfolio';
import { Github, ExternalLink, Clock, CheckCircle2, ChevronRight, X, Layers, Code2 } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<VerifiedProject | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCaseStudy) {
        setSelectedCaseStudy(null);
      }
    };
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCaseStudy]);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Verified Source Code</span>
            <span aria-hidden="true">·</span>
            <span>Software Development Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Project Showcase
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Software projects verified directly from GitHub repositories. Features are strictly documented based on implemented code, with ongoing modules clearly marked.
          </p>
        </div>

        {/* Featured Project Banner / Spotlight: BookEase (In Progress) */}
        {VERIFIED_PROJECTS.filter((p) => p.isFeatured).map((featured) => (
          <div
            key={featured.id}
            className="mb-12 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--canvas-border)] mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {/* Status Label */}
                <span className="font-semibold text-[var(--cobalt)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>STATUS: {featured.status.toUpperCase()}</span>
                </span>
                <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--sage)]">Primary Architecture</span>
                <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-muted)]">Updated {featured.repositoryDetails.lastPushed}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Inspect Code</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text-primary)] mb-2">
                  {featured.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[var(--text-secondary)] mb-4">
                  {featured.subtitle}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {featured.description}
                </p>

                {/* Verified Tech Stack */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    Verified Technologies in Repository:
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                    {featured.verifiedTechnologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="font-medium text-[var(--text-primary)]">{tech}</span>
                        {idx < featured.verifiedTechnologies.length - 1 && (
                          <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(featured)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--cobalt)] hover:underline cursor-pointer"
                >
                  <span>Read Architecture Breakdown & Verification Ledger</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Status Ledger Summary on Right */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--sage)] font-semibold block mb-1">
                    Confirmed Implementation State
                  </span>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {featured.repositoryDetails.architectureNote}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--canvas-border-subtle)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold block">
                    Verified Repository Modules:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {featured.repositoryDetails.verifiedFeatures.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--sage)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Secondary Genuine Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_PROJECTS.filter((p) => !p.isFeatured).map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 sm:p-8 hover:border-[var(--cobalt)] transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className={project.status === 'Completed' ? 'text-[var(--sage)] font-semibold' : 'text-[var(--cobalt)] font-semibold'}>
                    STATUS: {project.status.toUpperCase()}
                  </span>
                  <span>{project.repositoryDetails.lastPushed}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)] mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-4">
                  {project.subtitle}
                </p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Verified Tech Stack */}
                <div className="pt-4 border-t border-[var(--canvas-border-subtle)] mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Verified Technologies:
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                    {project.verifiedTechnologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.verifiedTechnologies.length - 1 && (
                          <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons: GitHub link always; Live Demo ONLY when genuine URL is verified */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--canvas-border-subtle)]">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Source Code</span>
                  </a>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {project.caseStudy && (
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(project)}
                    className="text-xs font-semibold text-[var(--cobalt)] hover:underline cursor-pointer"
                  >
                    Case Study
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCaseStudy(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-elevated)] text-[var(--text-primary)] shadow-xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--canvas-border)] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-1">
                  <span className="text-[var(--cobalt)] font-semibold">STATUS: {selectedCaseStudy.status.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedCaseStudy.repoName}</span>
                </div>
                <h3 id="case-study-title" className="text-2xl font-bold font-serif text-[var(--text-primary)]">
                  {selectedCaseStudy.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {selectedCaseStudy.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                aria-label="Close case study modal"
                className="p-2 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:text-[var(--text-primary)] hover:border-[var(--cobalt)] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {selectedCaseStudy.caseStudy && (
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-2">
                    01. Problem Statement
                  </h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {selectedCaseStudy.caseStudy.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-2">
                    02. Intended Architectural Solution
                  </h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {selectedCaseStudy.caseStudy.intendedSolution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-2">
                    03. Implemented & Verified Code Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedCaseStudy.repositoryDetails.verifiedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedCaseStudy.repositoryDetails.ongoingOrPlannedFeatures && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--cobalt)] font-semibold mb-2">
                      04. In-Progress & Planned Modules
                    </h4>
                    <ul className="space-y-2">
                      {selectedCaseStudy.repositoryDetails.ongoingOrPlannedFeatures.map((plan, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                          <Clock className="w-4 h-4 text-[var(--cobalt)] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{plan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-[var(--canvas-border)] flex flex-wrap items-center justify-between gap-4">
              <a
                href={selectedCaseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>Open Repository on GitHub</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
