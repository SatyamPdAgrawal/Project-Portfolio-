/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { DsaJourneySection } from './components/DsaJourneySection';
import { GithubActivitySection } from './components/GithubActivitySection';
import { TechnicalSkills } from './components/TechnicalSkills';
import { EducationJourney } from './components/EducationJourney';
import { CertificationsSection } from './components/CertificationsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PortfolioAssistantDrawer } from './components/PortfolioAssistantDrawer';

export default function App() {
  return (
    <ThemeProvider>
      {/* Skip to Main Content Link for Screen Readers and Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--cobalt)] text-white text-xs font-mono font-semibold rounded-md shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col bg-[var(--canvas-bg)] text-[var(--text-primary)] transition-colors duration-200">
        <Header />

        <main id="main-content" className="flex-1">
          <Hero />
          <FeaturedProjects />
          <DsaJourneySection />
          <GithubActivitySection />
          <TechnicalSkills />
          <EducationJourney />
          <CertificationsSection />
          <ActivitiesSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Real Gemini-Powered Portfolio Assistant */}
        <PortfolioAssistantDrawer />
      </div>
    </ThemeProvider>
  );
}
