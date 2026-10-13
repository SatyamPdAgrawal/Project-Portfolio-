import React from 'react';
import { EDUCATION_RECORDS } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

export const EducationJourney: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Academic Qualifications</span>
            <span aria-hidden="true">·</span>
            <span>Educational Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Education
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Formal academic background in Computer Science & Technology and foundational secondary education.
          </p>
        </div>

        {/* 3-Column Grid for Education Entries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_RECORDS.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                  <span>{edu.duration}</span>
                  <span className="text-[var(--cobalt)] font-semibold">{edu.score}</span>
                </div>

                <h3 className="text-lg font-bold font-serif text-[var(--text-primary)] mb-1">
                  {edu.level}
                </h3>
                <p className="text-xs font-medium text-[var(--sage)] mb-3">
                  {edu.fieldOrStream}
                </p>

                <div className="text-xs text-[var(--text-secondary)] mb-4">
                  <span className="font-semibold text-[var(--text-primary)] block">{edu.institution}</span>
                  <span className="text-[var(--text-muted)]">{edu.location}</span>
                </div>

                {edu.details && (
                  <ul className="space-y-1.5 pt-3 border-t border-[var(--canvas-border-subtle)] text-xs text-[var(--text-secondary)]">
                    {edu.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[var(--cobalt)] font-mono text-[10px] mt-0.5">■</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--canvas-border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>Record {idx + 1} of 3</span>
                <span className="text-[var(--sage)]">Academic Merit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
