// src/App.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';
import { ForYouPage } from './components/ForYouPage.js';
import { ProfilePage } from './components/ProfilePage.js';
import { BlankPage } from './components/BlankPage.js';
import './App.css';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';

// This App component is the main entry point for your application.
export function App(props: { onRender?: () => void }) {
  // The onRender prop is often used by the Lynx development environment.
  props.onRender?.();

  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <ForYouPage onTabChange={setActiveTab} />;
      case 'profile':
        return <ProfilePage onTabChange={setActiveTab} />;
      case 'discover':
      case 'create':
      case 'inbox':
        return <BlankPage title={activeTab} onTabChange={setActiveTab} />;
      default:
        return <ForYouPage onTabChange={setActiveTab} />;
    }
  };

  return renderCurrentPage();
}
