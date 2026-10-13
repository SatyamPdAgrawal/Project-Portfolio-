import React from 'react';
import { DSA_VERIFIED_DATA, SOCIAL_LINKS } from '../data/portfolioData';
import { Code2, ExternalLink, Terminal, BookOpen, CheckCircle, ArrowUpRight } from 'lucide-react';

export const DsaJourneySection: React.FC = () => {
  const dsa = DSA_VERIFIED_DATA;

  return (
    <section id="dsa" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
              <span>Problem Solving Practice</span>
              <span aria-hidden="true">·</span>
              <span>Algorithmic Foundations in C++ & Java</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
              DSA & Problem-Solving Journey
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
              I actively practise algorithmic problem-solving using C++ and Java, focusing on core computational logic, time-space complexity trade-offs, and data structure fundamentals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>LeetCode Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={dsa.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--cobalt)] rounded-md transition-colors"
            >
              <span>Java Solves Repo</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Verified Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Total Solved
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)] tabular-nums">
                {dsa.verifiedStats.totalSolved}
              </span>
              <span className="text-xs font-mono text-[var(--sage)]">
                Verified
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              LeetCode public profile
            </span>
          </div>

          <div className="p-5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Easy Solves
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-[var(--sage)] tabular-nums">
                {dsa.verifiedStats.easy}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                / {dsa.verifiedStats.totalSolved}
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Core patterns & logic drills
            </span>
          </div>

          <div className="p-5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Medium Solves
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-[var(--cobalt)] tabular-nums">
                {dsa.verifiedStats.medium}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                / {dsa.verifiedStats.totalSolved}
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Multi-pass & map techniques
            </span>
          </div>

          <div className="p-5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Hard Invariants
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)] tabular-nums">
                {dsa.verifiedStats.hard}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                solves
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Advanced array & string bounds
            </span>
          </div>
        </div>

        {/* Learning Areas Grid (Explicitly labeled as Active Learning Areas, not mastery claims) */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold font-serif text-[var(--text-primary)]">
              Topic Focus & Active Learning Areas
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Curated concepts currently being explored and implemented. Tagged as active learning areas rather than absolute mastery claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsa.learningAreas.map((area) => (
              <div
                key={area.topic}
                className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-[var(--cobalt)] font-semibold">{area.languageUsed}</span>
                    <span className="text-[var(--sage)]">{area.status}</span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-[var(--text-primary)] mb-3">
                    {area.topic}
                  </h4>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                        Core Concepts Under Study:
                      </span>
                      <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                        {area.coreConcepts.map((concept, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[var(--sage)] font-mono">▸</span>
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[var(--canvas-border-subtle)]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                        Sample Implemented Problems:
                      </span>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                        {area.sampleSolvedProblems.map((prob, pIdx) => (
                          <React.Fragment key={prob}>
                            <span>{prob}</span>
                            {pIdx < area.sampleSolvedProblems.length - 1 && (
                              <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--canvas-border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                  <span>Language: {area.languageUsed}</span>
                  <span className="text-[var(--sage)]">Active Practice</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Note Ledger */}
        <div className="mt-8 p-4 rounded-lg border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--cobalt)] font-semibold">DATA SOURCE:</span>
            <span>{dsa.verifiedStats.dataSource} ({dsa.verifiedStats.verifiedDate})</span>
          </div>

          <div className="italic">
            Zero fabricated streaks or heatmaps; statistics strictly match verified profile telemetry.
          </div>
        </div>
      </div>
    </section>
  );
};
