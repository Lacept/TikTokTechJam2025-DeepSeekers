// src/App.tsx
// src/index.tsx (VERY TOP, before other imports that might fetch)
// 1) do this BEFORE anything else that might import the API file
import { setApiBase } from "./api/profile.js";

// Foreground-safe bootstrap: set the base for both fg & bg bundles.
// Also supports ?apiHost= and localStorage('apiHost') without code changes.
(() => {
  try {
    const loc = window.location; // present in foreground
    const overrideFromQuery = new URLSearchParams(loc.search).get("apiHost");
    const overrideFromLS = window.localStorage?.getItem("apiHost");

    const host =
      (overrideFromQuery && overrideFromQuery.trim()) ||
      (overrideFromLS && overrideFromLS.trim()) ||
      loc.hostname ||
      "127.0.0.1";

    setApiBase(host, loc.protocol); // sets globalThis.__API_BASE__ too

    // Optional: Quick debug in console
    // eslint-disable-next-line no-console
    console.log("[Bootstrap] API_BASE =", (globalThis as any).__API_BASE__);
  } catch {
    // If we're somehow not in a windowed context, the lazy resolver in api/profile.ts will handle it.
  }
})();


import * as React from 'react';
import { useState } from '@lynx-js/react';
import { ForYouPage } from './components/ForYouPage.js';
import { ProfilePage } from './components/ProfilePage.js';
import { BlankPage } from './components/BlankPage.js';
import { TikTokStudioPage } from './components/TikTokStudioPage.js';
import { TikTokStudioPageNew } from './components/TikTokStudioPageNew.js';
import { AnalyticsDashboard } from './components/AnalyticsDashboard.js';
import './App.css';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';
type PageType = TabType | 'studio' | 'analytics';

// This App component is the main entry point for your application.
export function App(props: { onRender?: () => void }) {
  // The onRender prop is often used by the Lynx development environment.
  props.onRender?.();

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  };

  const handleNavigateToStudio = () => {
    setCurrentPage('studio');
  };

  const handleBackFromStudio = () => {
    setCurrentPage(activeTab);
  };

  const handleNavigateToAnalytics = () => {
    setCurrentPage('analytics');
  };

  const handleBackFromAnalytics = () => {
    setCurrentPage('studio');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <ForYouPage activeTab={activeTab} onTabChange={handleTabChange} />;
      case 'profile':
        return <ProfilePage activeTab={activeTab} onTabChange={handleTabChange} onNavigateToStudio={handleNavigateToStudio} />;
      case 'studio':
        return <TikTokStudioPageNew onBack={handleBackFromStudio} onNavigateToAnalytics={handleNavigateToAnalytics} />;
      case 'analytics':
        return <AnalyticsDashboard onBack={handleBackFromAnalytics} />;
      case 'discover':
      case 'create':
      case 'inbox':
        return <BlankPage activeTab={activeTab} title={currentPage} onTabChange={handleTabChange} />;
      default:
        return <ForYouPage activeTab={activeTab} onTabChange={handleTabChange} />;
    }
  };

  return renderCurrentPage();
}