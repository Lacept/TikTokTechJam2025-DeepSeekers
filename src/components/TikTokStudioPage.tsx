// src/components/TikTokStudioPage.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';
import { AnalyticsSectionLight } from './AnalyticsSection.js';
import { BalanceSectionLight } from './BalanceSection.js';
import { MonetizationSectionLight } from './MonetizationSection.js';
import { StudioActionGridLight } from './StudioActionGrid.js';
import { StudioHeaderLight } from './StudioHeader.js';
import { StudioTabsLight } from './StudioTabs.js';

interface TikTokStudioPageProps {
  onBack: () => void;
}

export const TikTokStudioPage: React.FC<TikTokStudioPageProps> = ({
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'live'>('tools');

  const handleBackPress = () => {
    'background only';
    onBack();
  };

  // STEP 1: Testing with light mode and simple header
  return (
    <view
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      {/* STEP 2: Testing StudioHeaderLight Component Only */}
      <StudioHeaderLight onBack={onBack} />

      {/* STEP 3: Testing StudioTabsLight Component */}
      <StudioTabsLight activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <scroll-view
        style={{
          flex: 1,
          backgroundColor: '#000',
        }}
      >
        {activeTab === 'tools' && (
          <view
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            {/* Analytics Section */}
            <AnalyticsSectionLight />

            {/* Action Grid */}
            <StudioActionGridLight />

            {/* Balance Section */}
            <BalanceSectionLight />

            {/* Monetization Section */}
            <MonetizationSectionLight />
          </view>
        )}

        {activeTab === 'live' && (
          <view
            style={{
              padding: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
            }}
          >
            <text
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '10px',
              }}
            >
              LIVE Studio
            </text>
            <text
              style={{
                fontSize: '14px',
                color: '#999',
                textAlign: 'center',
              }}
            >
              Live streaming tools and analytics will appear here
            </text>
          </view>
        )}

        {/* Bottom spacing */}
        <view style={{ height: '40px' }} />
      </scroll-view>
    </view>
  );
};
