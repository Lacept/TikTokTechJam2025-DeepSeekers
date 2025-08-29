// src/components/StudioTabsLight.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

interface StudioTabsLightProps {
  activeTab: 'tools' | 'live';
  onTabChange: (tab: 'tools' | 'live') => void;
}

export const StudioTabsLight: React.FC<StudioTabsLightProps> = ({ activeTab, onTabChange }) => {
  const handleTabPress = (tab: 'tools' | 'live') => {
    'background only';
    onTabChange(tab);
  };

  const tabs = [
    { id: 'tools', label: 'Tools' },
    { id: 'live', label: 'LIVE' }
  ];

  return (
    <view style={{
      flexDirection: 'row',
      backgroundColor: '#000',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingBottom: '16px',
      borderBottomWidth: '1px',
      borderBottomColor: '#333'
    }}>
      {tabs.map((tab, index) => (
        <view key={tab.id} style={{ marginRight: index === 0 ? '32px' : '0px' }}>
          <view
            style={{
              paddingBottom: '8px',
              backgroundColor: 'transparent',
              borderRadius: '4px',
              paddingLeft: '4px',
              paddingRight: '4px'
            }}
            bindtap={() => handleTabPress(tab.id as 'tools' | 'live')}
          >
            <text style={{
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              color: activeTab === tab.id ? '#fff' : '#999'
            }}>
              {tab.label}
            </text>
          </view>
          
          {/* Underline for active tab */}
          {activeTab === tab.id && (
            <view style={{
              height: '2px',
              backgroundColor: '#25F4EE',
              marginTop: '4px'
            }} />
          )}
        </view>
      ))}
    </view>
  );
};