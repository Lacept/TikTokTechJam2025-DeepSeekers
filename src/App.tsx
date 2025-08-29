// src/App.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';
import { ForYouPage } from './components/ForYouPage.js';
import { ProfilePage } from './components/ProfilePage.js';
import { BlankPage } from './components/BlankPage.js';
import { TikTokStudioPage } from './components/TikTokStudioPage.js';
import './App.css';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';
type PageType = TabType | 'studio';

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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <ForYouPage onTabChange={handleTabChange} />;
      case 'profile':
        return <ProfilePage onTabChange={handleTabChange} onNavigateToStudio={handleNavigateToStudio} />;
      case 'studio':
        return <TikTokStudioPage onBack={handleBackFromStudio} />;
      case 'discover':
      case 'create':
      case 'inbox':
        return <BlankPage title={currentPage} onTabChange={handleTabChange} />;
      default:
        return <ForYouPage onTabChange={handleTabChange} />;
    }
  };

  return renderCurrentPage();
}
