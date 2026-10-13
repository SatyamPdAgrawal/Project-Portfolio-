import React from 'react';
import { ACTIVITIES_DATA } from '../data/portfolioData';
import { Code, Users, Award, HeartHandshake } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hackathon':
        return <Code className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      case 'Community & Volunteering':
        return <HeartHandshake className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
      default:
        return <Users className="w-4 h-4 text-[var(--cobalt)]" aria-hidden="true" />;
    }
  };

  return (
    <section id="activities" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
            <span>Co-Curricular Engagements</span>
            <span aria-hidden="true">·</span>
            <span>Technical Leadership & Participation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
            Activities & Community
          </h2>
          <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
            Active involvement in regional hackathons, student technical communities, and peer collaboration.
          </p>
        </div>

        {/* 2-Column or 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTIVITIES_DATA.map((activity, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className="text-[var(--cobalt)] font-semibold">{activity.scope}</span>
                  <span className="text-[var(--sage)]">{activity.category}</span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-md border border-[var(--canvas-border-subtle)] bg-[var(--canvas-surface-elevated)] shrink-0 mt-0.5">
                    {getCategoryIcon(activity.category)}
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[var(--text-primary)]">
                    {activity.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activity.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--canvas-border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>Verified Activity</span>
                <span className="text-[var(--text-secondary)]">{activity.scope}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
