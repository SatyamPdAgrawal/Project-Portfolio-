import React, { useState, useEffect } from 'react';
import { FALLBACK_GITHUB_REPOS, SOCIAL_LINKS } from '../data/portfolioData';
import { GithubRepoApiItem } from '../types/portfolio';
import { Github, Star, GitFork, RefreshCw, AlertCircle, CheckCircle2, ExternalLink, Code } from 'lucide-react';

export const GithubActivitySection: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepoApiItem[]>(FALLBACK_GITHUB_REPOS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  const fetchGithubRepos = async () => {
    setIsLoading(true);
    setStatusNotice(null);
    try {
      const response = await fetch('https://api.github.com/users/SatyamPdAgrawal/repos?sort=pushed&per_page=12', {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (response.status === 403 || response.status === 429) {
        // GitHub API rate limited
        setRepos(FALLBACK_GITHUB_REPOS);
        setIsLive(false);
        setStatusNotice('GitHub API hourly rate limit reached for public IP. Loaded verified snapshot.');
        return;
      }

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
        setIsLive(true);
        setStatusNotice('Live repository data successfully retrieved from GitHub Public API.');
      } else {
        setRepos(FALLBACK_GITHUB_REPOS);
        setIsLive(false);
      }
    } catch {
      setRepos(FALLBACK_GITHUB_REPOS);
      setIsLive(false);
      setStatusNotice('Network query failed. Displaying verified local repository snapshot.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const languages = ['all', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];

  const filteredRepos = languageFilter === 'all'
    ? repos
    : repos.filter((r) => r.language === languageFilter);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <section id="github" className="py-16 md:py-24 border-b border-[var(--canvas-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--sage)] uppercase mb-3">
              <span>Public Repositories</span>
              <span aria-hidden="true">·</span>
              <span>GitHub API Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text-primary)]">
              GitHub Activity & Repositories
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)] max-w-2xl">
              Public repositories under <span className="font-mono text-[var(--text-primary)] font-semibold">@SatyamPdAgrawal</span>, showing genuine source implementations, last commit activity, and verified languages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchGithubRepos}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--cobalt)] transition-colors cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Refresh repository data from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[var(--cobalt)]' : ''}`} aria-hidden="true" />
              <span>{isLoading ? 'Fetching...' : 'Refresh API'}</span>
            </button>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-hover)] rounded-md transition-colors shadow-xs"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>View Full Profile</span>
            </a>
          </div>
        </div>

        {/* Live sync / Fallback Notice Banner */}
        {statusNotice && (
          <div className="mb-8 p-4 rounded-md border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              {isLive ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
              )}
              <span className="text-[var(--text-secondary)]">{statusNotice}</span>
            </div>
            <span className="text-[var(--text-muted)] hidden sm:inline">Read-only public API</span>
          </div>
        )}

        {/* Filter bar by Language */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto max-w-full">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] shrink-0 mr-1">
            Filter by Language:
          </span>
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguageFilter(lang)}
              className={`px-3 py-1 text-xs font-mono rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                languageFilter === lang
                  ? 'bg-[var(--cobalt)] text-white shadow-xs font-semibold'
                  : 'bg-[var(--canvas-surface)] text-[var(--text-secondary)] border border-[var(--canvas-border)] hover:text-[var(--text-primary)]'
              }`}
            >
              {lang === 'all' ? 'All Repositories' : lang}
            </button>
          ))}
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between hover:border-[var(--cobalt)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                  <span className="text-[var(--cobalt)] font-semibold">
                    {repo.language || 'Documentation'}
                  </span>
                  <span>{formatDate(repo.pushed_at)}</span>
                </div>

                <h3 className="text-base font-bold font-mono text-[var(--text-primary)] mb-2 break-all">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--cobalt)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{repo.name}</span>
                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                  </a>
                </h3>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-6">
                  {repo.description || 'Verified public software repository authored by Satyam Prasad Agrawal.'}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-[var(--canvas-border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--cobalt)] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Inspect</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
