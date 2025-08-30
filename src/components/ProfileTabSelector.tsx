// src/components/ProfileTabSelector.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

type TabType = 'posts' | 'liked';

interface ProfileTabSelectorProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
  style?: object;
}

export const ProfileTabSelector: React.FC<ProfileTabSelectorProps> = ({
  selectedTab,
  onTabChange,
  style = {},
}) => {
  const [pressedTab, setPressedTab] = useState<TabType | null>(null);

  const handleTabPress = (tab: TabType) => {
    'background only';
    setPressedTab(tab);
    setTimeout(() => setPressedTab(null), 150);
    onTabChange(tab);
  };

  const handlePressStart = (tab: TabType) => {
    'main thread';
    setPressedTab(tab);
  };

  const handlePressEnd = () => {
    'main thread';
    setPressedTab(null);
  };

  const tabs = [
    { id: 'posts' as TabType, icon: '⊞', label: 'Posts' },
    { id: 'liked' as TabType, icon: '♥', label: 'Liked' },
  ];

  return (
    <view
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #f0f0f0',
        ...style,
      }}
    >
      {tabs.map((tab) => (
        <view
          key={tab.id}
          style={{
            flex: 1,
            height: '44px',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: selectedTab === tab.id ? '2px solid #000' : 'none',
            backgroundColor:
              pressedTab === tab.id ? 'rgba(0,0,0,0.05)' : 'transparent',
            transition: 'all 0.1s ease',
          }}
          bindtap={() => handleTabPress(tab.id)}
          main-thread:bindtouchstart={() => handlePressStart(tab.id)}
          main-thread:bindtouchend={handlePressEnd}
        >
          <text
            style={{
              fontSize: '18px',
              color: selectedTab === tab.id ? '#000' : '#666',
            }}
          >
            {tab.icon}
          </text>
        </view>
      ))}
    </view>
  );
};
