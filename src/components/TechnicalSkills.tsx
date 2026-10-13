import React from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { Code, Terminal, Globe, Database, Wrench } from 'lucide-react';

export const TechnicalSkills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      case 'Programming & Fundamentals':
        return <Terminal className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      case 'Web Development':
        return <Globe className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      case 'Database & Systems':
        return <Database className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      default:
        return <Wrench className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Technical Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Verified Resume Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Technical Skills
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Core programming languages, computational foundations, web technologies, and developer tooling.
          </p>
        </div>

        {/* Structured Grid: 5 Categories strictly based on resume facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--canvas-border)] mb-4">
                  {getCategoryIcon(group.category)}
                  <h3 className="text-base font-bold font-serif text-[var(--text-primary)]">
                    {group.category}
                  </h3>
                </div>

                <p className="text-xs text-[var(--text-muted)] mb-5">
                  {group.description}
                </p>

                {/* List of skills as clean unboxed text elements with hairlines */}
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="p-2.5 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] text-xs text-[var(--text-primary)] font-medium flex items-center justify-between"
                    >
                      <span>{skill}</span>
                      <span className="text-[10px] font-mono text-[var(--sage)]">Verified</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--canvas-border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>{group.skills.length} core items</span>
                <span className="text-[var(--cobalt)]">Resume SOT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
