export type ProjectStatus = 'In Progress' | 'Completed' | 'Practice Archive';

export interface VerifiedProject {
  id: string;
  repoName: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  isFeatured: boolean;
  description: string;
  verifiedTechnologies: string[];
  githubUrl: string;
  liveDemoUrl?: string; // Only populated when an active, working URL is verified
  repositoryDetails: {
    primaryLanguage: string;
    lastPushed: string;
    verifiedFeatures: string[];
    ongoingOrPlannedFeatures?: string[];
    architectureNote?: string;
  };
  caseStudy?: {
    problemStatement: string;
    intendedSolution: string;
    implementationHighlights: string[];
  };
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export interface EducationEntry {
  level: string;
  fieldOrStream: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  details?: string[];
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  description: string;
  topics: string[];
}

export interface ActivityEntry {
  title: string;
  category: 'Hackathon' | 'Community & Volunteering' | 'Technical Club';
  scope: string;
  description: string;
}

export interface DsaTopicArea {
  topic: string;
  status: 'Active Learning Area';
  coreConcepts: string[];
  languageUsed: 'Java' | 'C++' | 'C++ & Java';
  sampleSolvedProblems: string[];
}

export interface DsaVerifiedData {
  languages: string[];
  leetcodeProfileUrl: string;
  repoUrl: string;
  verifiedStats: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking?: number;
    dataSource: string;
    verifiedDate: string;
  };
  learningAreas: DsaTopicArea[];
}

export interface GithubRepoApiItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  visibility: string;
  default_branch: string;
}

export interface SocialLinks {
  github: string;
  leetcode: string;
  linkedin: string;
  email: string;
}
