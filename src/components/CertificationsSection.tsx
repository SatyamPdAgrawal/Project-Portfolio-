import React from 'react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Verified Learning Credentials</span>
            <span aria-hidden="true">·</span>
            <span>Technical Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Certifications
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Independent and cloud platform credentials demonstrating foundational competence in generative artificial intelligence and core C++ systems.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.title}
              className="p-6 sm:p-8 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className="text-[var(--cobalt)] font-semibold">{cert.issuer}</span>
                  <span className="text-[var(--sage)] font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-[var(--text-primary)] mb-3">
                  {cert.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {cert.description}
                </p>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    Key Topics Covered:
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                    {cert.topics.map((topic, i) => (
                      <React.Fragment key={topic}>
                        <span className="text-[var(--text-primary)] font-medium">{topic}</span>
                        {i < cert.topics.length - 1 && <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--canvas-border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>Issuer: {cert.issuer}</span>
                <span className="text-[var(--sage)]">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
