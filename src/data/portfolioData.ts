import {
  VerifiedProject,
  SkillGroup,
  EducationEntry,
  CertificationEntry,
  ActivityEntry,
  DsaVerifiedData,
  GithubRepoApiItem,
  SocialLinks
} from '../types/portfolio';

export const PERSONAL_PROFILE = {
  name: 'Satyam Prasad Agrawal',
  role: 'Computer Science & Technology Undergraduate',
  focus: 'Software Development & Web Development Internships',
  institution: 'SAGE University, Indore',
  period: '2025–2029',
  cgpa: '7.78 / 10',
  careerSummary:
    'Computer Science & Technology undergraduate seeking software development and web development internship opportunities. Interested in building software, solving algorithmic problems in C++ and Java, and learning industry practices.',
  internshipIntent:
    'Actively seeking software engineering & web development internship roles to contribute to production codebases, collaborate in cross-functional teams, and solve practical engineering challenges.',
  location: 'Indore, Madhya Pradesh, India',
  email: 'prasadagrawal2@gmail.com'
};

export const SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com/SatyamPdAgrawal',
  leetcode: 'https://leetcode.com/u/codebysatyam1/',
  linkedin: 'https://linkedin.com/in/satyam-prasad-agrawal-/',
  email: 'prasadagrawal2@gmail.com'
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    description: 'Foundational programming languages utilized for software development and algorithms',
    skills: ['Java', 'C++', 'JavaScript']
  },
  {
    category: 'Programming & Fundamentals',
    description: 'Algorithmic concepts, computational structures, and software principles',
    skills: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'Problem Solving']
  },
  {
    category: 'Web Development',
    description: 'Client-facing presentation, UI layout, and application architecture',
    skills: ['HTML', 'CSS', 'JavaScript', 'Full-Stack Development']
  },
  {
    category: 'Database & Systems',
    description: 'Data storage, schema design, and querying fundamentals',
    skills: ['Database Management Systems (DBMS)', 'SQL', 'Database Fundamentals']
  },
  {
    category: 'Developer Tools',
    description: 'Environment, source control, and repository workflows',
    skills: ['Git', 'GitHub', 'VS Code']
  }
];

export const VERIFIED_PROJECTS: VerifiedProject[] = [
  {
    id: 'service-provider-booking-app',
    repoName: 'SERVICE-PROVIDER-BOOKING-APP',
    title: 'BookEase — Service Provider Booking Application',
    subtitle: 'Full-stack monorepo with NestJS backend, Next.js 15 frontend, and Dockerized PostgreSQL/Redis',
    status: 'In Progress',
    isFeatured: true,
    description:
      'A monorepo platform designed for service discovery, provider onboarding, and booking management. Features a decoupled NestJS API, Next.js 15 web client, and Docker Compose orchestration for local PostgreSQL & Redis databases.',
    verifiedTechnologies: [
      'TypeScript',
      'NestJS',
      'Next.js 15',
      'Prisma ORM',
      'PostgreSQL',
      'Redis',
      'Docker Compose',
      'JWT Authentication'
    ],
    githubUrl: 'https://github.com/SatyamPdAgrawal/SERVICE-PROVIDER-BOOKING-APP',
    // liveDemoUrl is omitted because this project is in active development with local execution (localhost:3000 / localhost:4000)
    repositoryDetails: {
      primaryLanguage: 'TypeScript',
      lastPushed: 'September 2026',
      verifiedFeatures: [
        'Decoupled monorepo containing api/ (NestJS + Prisma) and web/ (Next.js 15)',
        'Docker Compose setup provisioning PostgreSQL 16 and Redis containers',
        'Role-based account registration with Customer and Service Provider roles',
        'Authentication lifecycle with access JWTs, HTTP-only refresh cookies, and password reset flows',
        'User onboarding wizard with avatar presets, bio, and profile preferences',
        'Rate-limiting middleware protecting authentication endpoints'
      ],
      ongoingOrPlannedFeatures: [
        'Categorized service listing directory and keyword discovery',
        'Provider scheduling calendar and appointment slot reservation workflow',
        'Interactive booking management dashboard with live state transitions'
      ],
      architectureNote:
        'Phase 1 foundation is complete in the repository (authentication, user profile onboarding, and database schemas). Booking workflows and discovery interfaces are marked as ongoing development.'
    },
    caseStudy: {
      problemStatement:
        'Local service bookings are frequently impeded by scattered communication channels, lack of standardized provider profiles, and opaque reservation scheduling.',
      intendedSolution:
        'An end-to-end full-stack web application linking verified customers with professional service specialists through structured REST APIs, scheduled bookings, and relational records.',
      implementationHighlights: [
        'Strict type boundaries maintained across API controllers and frontend components',
        'Prisma ORM database schema managing User, Profile, and credential records',
        'Security-hardened cookie delivery preventing client-side token interception'
      ]
    }
  },
  {
    id: 'expense-track-burn-money',
    repoName: 'Expense-Track-BUrn-monEY-',
    title: 'BUrn monEY — Personal Finance & Analytics Dashboard',
    subtitle: 'Modular client-side financial intelligence dashboard with Chart.js analytics and CSV data portability',
    status: 'Completed',
    isFeatured: false,
    description:
      'A comprehensive personal finance web application that tracks income, expenditures, budgets, and savings goals. Features interactive Chart.js visualizations, rule-based financial health scoring, and RFC 4180 CSV export/import.',
    verifiedTechnologies: [
      'JavaScript (ES6 Modules)',
      'HTML5',
      'CSS3',
      'Chart.js',
      'Canvas Confetti',
      'LocalStorage',
      'CSV I/O'
    ],
    githubUrl: 'https://github.com/SatyamPdAgrawal/Expense-Track-BUrn-monEY-',
    // liveDemoUrl is omitted because no live deployment URL is published in the repository metadata
    repositoryDetails: {
      primaryLanguage: 'JavaScript',
      lastPushed: 'September 2026',
      verifiedFeatures: [
        'Real-time balance, income, expense, and savings rate calculations formatted in Indian Rupee standard (₹)',
        'Three distinct Chart.js visualizations: Income vs Expense, Category Spending, and 6-Month Trajectory',
        'Full transaction lifecycle management with multi-criteria search, category filters, and custom date range picking',
        'Category budget limits with visual 3-state progress meters (Normal <70%, Warning 70-90%, Danger >90%)',
        'Multiple savings goals with deposit allocations and celebratory confetti triggers on completion',
        'Rule-based financial health heuristic (0–100 score) evaluating spending velocity and budget adherence',
        'RFC 4180-compliant CSV export and validated client-side CSV import'
      ],
      architectureNote:
        'Engineered with pure ES6 JavaScript modules with zero build step dependencies. Decoupled modules for storage, calculations, charts, and UI state ensure low latency and complete browser-level privacy.'
    },
    caseStudy: {
      problemStatement:
        'Many personal budgeting tools transmit sensitive financial data to remote cloud servers and suffer from cluttered, ad-heavy interfaces.',
      intendedSolution:
        'A self-contained client-side dashboard with zero remote data transmission, instant LocalStorage persistence, and responsive visualizations.',
      implementationHighlights: [
        'Zero external telemetry: financial records never exit the user browser sandbox',
        'Automated Chart.js lifecycle management destroying old instances before re-render to avoid memory leaks',
        'Clean responsive layout transitioning between data tables on desktop and card views on mobile'
      ]
    }
  },
  {
    id: 'micro-project',
    repoName: 'MICRO-PROJECT',
    title: 'Responsive Web Micro-Project',
    subtitle: 'Foundational responsive web design prototype deployed on Vercel',
    status: 'Completed',
    isFeatured: false,
    description:
      'An early responsive web layout project crafted with clean semantic HTML5 and custom CSS3 stylesheets, demonstrating core responsive styling, typography hierarchy, and cloud deployment.',
    verifiedTechnologies: ['HTML5', 'CSS3', 'Responsive Design', 'Vercel'],
    githubUrl: 'https://github.com/SatyamPdAgrawal/MICRO-PROJECT',
    liveDemoUrl: 'https://micro-project-peach-seven.vercel.app', // Verified live demo URL
    repositoryDetails: {
      primaryLanguage: 'CSS / HTML',
      lastPushed: 'May 2026',
      verifiedFeatures: [
        'Semantic HTML document structure and custom responsive CSS',
        'Mobile-friendly viewport formatting and media queries',
        'Live production deployment verified on Vercel'
      ],
      architectureNote:
        'Foundational web development exercise highlighting hands-on mastery of web standards and git-to-cloud deployment workflows.'
    }
  }
];

export const DSA_VERIFIED_DATA: DsaVerifiedData = {
  languages: ['C++', 'Java'],
  leetcodeProfileUrl: 'https://leetcode.com/u/codebysatyam1/',
  repoUrl: 'https://github.com/SatyamPdAgrawal/LeetCode',
  verifiedStats: {
    totalSolved: 39,
    easy: 28,
    medium: 8,
    hard: 3,
    ranking: 3229586,
    dataSource: 'LeetCode Public Profile (codebysatyam1)',
    verifiedDate: 'October 2026'
  },
  learningAreas: [
    {
      topic: 'Arrays & Two Pointers',
      status: 'Active Learning Area',
      languageUsed: 'Java',
      coreConcepts: [
        'In-place element manipulation',
        'Prefix sums',
        'Two-pointer convergence',
        'Array rotations & duplicate suppression'
      ],
      sampleSolvedProblems: [
        'Two Sum (#1)',
        'Rotate Array (#189)',
        'Remove Duplicates (#26)',
        'Move Zeroes (#283)',
        'Contains Duplicate (#217)'
      ]
    },
    {
      topic: 'Strings & Character Analysis',
      status: 'Active Learning Area',
      languageUsed: 'Java',
      coreConcepts: [
        'Character frequency hashing',
        'Palindrome checking',
        'String traversal & substrings',
        'ASCII conversions & math'
      ],
      sampleSolvedProblems: [
        'Valid Anagram (#242)',
        'Valid Parentheses (#20)',
        'Reverse String (#344)',
        'Roman to Integer (#13)',
        'Shortest Palindrome (#214)'
      ]
    },
    {
      topic: 'Sorting & Searching Algorithms',
      status: 'Active Learning Area',
      languageUsed: 'C++ & Java',
      coreConcepts: [
        'Binary search fundamentals',
        'Sorted array intersections',
        'Linear search vs logarithmic lookup',
        'Monotonic sequence detection'
      ],
      sampleSolvedProblems: [
        'Find Missing Number (#268)',
        'Intersection of Two Arrays (#349)',
        'Third Maximum Number (#414)',
        'Monotonic Array (#932)'
      ]
    },
    {
      topic: 'Hash Tables & Set Operations',
      status: 'Active Learning Area',
      languageUsed: 'Java',
      coreConcepts: [
        'Hash table lookup invariants',
        'Duplicate identification',
        'Frequency maps for group categorization'
      ],
      sampleSolvedProblems: [
        'Group Anagrams (#49)',
        'Isomorphic Strings (#205)',
        'Majority Element (#169)',
        'First Missing Positive (#41)'
      ]
    },
    {
      topic: 'C++ Algorithmic Foundations',
      status: 'Active Learning Area',
      languageUsed: 'C++',
      coreConcepts: [
        'Core syntax & control structures',
        'Pointers and reference parameters',
        'Competitive coding template practices',
        'Standard Template Library (STL) vectors & maps'
      ],
      sampleSolvedProblems: [
        'PRACTICES_IN-_CPP Repository Day_1 & Day_2',
        'Algorithmic syntax drills'
      ]
    }
  ]
};

export const FALLBACK_GITHUB_REPOS: GithubRepoApiItem[] = [
  {
    id: 1,
    name: 'SERVICE-PROVIDER-BOOKING-APP',
    full_name: 'SatyamPdAgrawal/SERVICE-PROVIDER-BOOKING-APP',
    description: 'BookEase — Monorepo for Phase 1: authentication, email verification, profile & avatar management (NestJS + Next.js 15)',
    html_url: 'https://github.com/SatyamPdAgrawal/SERVICE-PROVIDER-BOOKING-APP',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-12T14:42:05Z',
    updated_at: '2026-09-12T14:42:09Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  },
  {
    id: 2,
    name: 'Expense-Track-BUrn-monEY-',
    full_name: 'SatyamPdAgrawal/Expense-Track-BUrn-monEY-',
    description: '🫰🏻 BUrn monEY — A modern personal finance dashboard to track income, expenses, spending habits, budgets, and savings goals with interactive analytics.',
    html_url: 'https://github.com/SatyamPdAgrawal/Expense-Track-BUrn-monEY-',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-25T11:39:48Z',
    updated_at: '2026-09-25T11:39:52Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  },
  {
    id: 3,
    name: 'LeetCode',
    full_name: 'SatyamPdAgrawal/LeetCode',
    description: 'Collection of verified algorithmic solutions and data structure problem implementations in Java.',
    html_url: 'https://github.com/SatyamPdAgrawal/LeetCode',
    homepage: null,
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-08T14:51:12Z',
    updated_at: '2026-10-08T14:51:23Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  },
  {
    id: 4,
    name: 'MICRO-PROJECT',
    full_name: 'SatyamPdAgrawal/MICRO-PROJECT',
    description: 'First programming use in this project in real world — Responsive HTML/CSS layout deployed to Vercel.',
    html_url: 'https://github.com/SatyamPdAgrawal/MICRO-PROJECT',
    homepage: 'https://micro-project-peach-seven.vercel.app',
    language: 'CSS',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-05-18T09:54:13Z',
    updated_at: '2026-07-13T13:10:46Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  },
  {
    id: 5,
    name: 'PRACTICES_IN-_CPP',
    full_name: 'SatyamPdAgrawal/PRACTICES_IN-_CPP',
    description: 'Core C++ syntax drills, pointer exercises, and algorithmic programming fundamentals.',
    html_url: 'https://github.com/SatyamPdAgrawal/PRACTICES_IN-_CPP',
    homepage: null,
    language: 'C++',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-07-23T15:21:51Z',
    updated_at: '2026-07-23T15:22:40Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  },
  {
    id: 6,
    name: 'HTML',
    full_name: 'SatyamPdAgrawal/HTML',
    description: 'Foundational HTML document structures, elements, and markup drills.',
    html_url: 'https://github.com/SatyamPdAgrawal/HTML',
    homepage: null,
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-05-05T05:25:35Z',
    updated_at: '2026-05-05T05:25:38Z',
    fork: false,
    visibility: 'public',
    default_branch: 'main'
  }
];

export const EDUCATION_RECORDS: EducationEntry[] = [
  {
    level: 'Bachelor of Technology (B.Tech)',
    fieldOrStream: 'Computer Science & Technology',
    institution: 'SAGE University',
    location: 'Indore, Madhya Pradesh',
    duration: '2025–2029',
    score: 'CGPA: 7.78 / 10',
    details: [
      'Undergraduate program focused on Computer Science & Technology fundamentals',
      'Coursework including Data Structures, Algorithms, OOP, Database Systems, and Web Engineering'
    ]
  },
  {
    level: 'Higher Secondary Certificate (Class XII)',
    fieldOrStream: 'Senior Secondary Education',
    institution: 'Higher Secondary School',
    location: 'Indore, Madhya Pradesh',
    duration: 'Completed',
    score: '81.0%',
    details: [
      'Rigorous foundation in Mathematics, Science, and Analytical Studies'
    ]
  },
  {
    level: 'Secondary School Certificate (Class X)',
    fieldOrStream: 'Secondary Education',
    institution: 'Secondary School',
    location: 'Indore, Madhya Pradesh',
    duration: 'Completed',
    score: '75.6%',
    details: [
      'Foundational academic curriculum with distinction in Science and Mathematics'
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationEntry[] = [
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    description:
      'Foundational certification covering generative artificial intelligence fundamentals, large language model concepts, and Google Cloud AI principles.',
    topics: ['Generative AI Fundamentals', 'LLM Concepts', 'Responsible AI Practices']
  },
  {
    title: 'C++ Essentials',
    issuer: 'Recognized Course / Credentials',
    description:
      'Comprehensive study of core C++ syntax, memory mechanisms, control structures, object-oriented design, and standard template library usage.',
    topics: ['C++ Syntax', 'Object-Oriented Design', 'Pointers & Memory', 'Standard Template Library']
  }
];

export const ACTIVITIES_DATA: ActivityEntry[] = [
  {
    title: 'Indore-Level Hackathon Participation',
    category: 'Hackathon',
    scope: 'Indore City Level',
    description:
      'Collaborated in an intensive regional hackathon held in Indore, developing technical solutions under strict time constraints alongside peer developers.'
  },
  {
    title: 'Madhya Pradesh-Level Hackathon Participation',
    category: 'Hackathon',
    scope: 'Madhya Pradesh State Level',
    description:
      'Competed at the state level in Madhya Pradesh, demonstrating practical problem-solving, rapid prototyping, and teamwork.'
  },
  {
    title: 'Hackathon Volunteering & Participant Coordination',
    category: 'Community & Volunteering',
    scope: 'Event Operations & Support',
    description:
      'Volunteered to assist hackathon operations, facilitating participant onboarding, technical setup, and schedule coordination for competing teams.'
  },
  {
    title: 'Technical Member, SCYP Technical Club',
    category: 'Technical Club',
    scope: 'Student Technical Community',
    description:
      'Active technical contributor at SCYP Technical Club, participating in coding sessions, peer knowledge sharing, and club technical activities.'
  }
];
