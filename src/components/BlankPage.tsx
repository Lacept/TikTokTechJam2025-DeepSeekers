// src/components/BlankPage.tsx
import type * as React from 'react';
import { BottomNavigation } from './BottomNavigation.js';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';

interface BlankPageProps {
  activeTab: TabType;
  title: string;
  onTabChange: (tab: TabType) => void;
}

export const BlankPage: React.FC<BlankPageProps> = ({
  activeTab,
  title,
  onTabChange,
}) => {
  return (
    <view style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      {/* Status Bar */}
      <view
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '44px',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '10px',
        }}
      >
        <text style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
          9:41
        </text>
        <view
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '4px',
          }}
        >
          <text style={{ fontSize: '14px', color: 'white' }}>📶</text>
          <text style={{ fontSize: '14px', color: 'white' }}>📶</text>
          <text style={{ fontSize: '14px', color: 'white' }}>🔋</text>
        </view>
      </view>

      {/* Content */}
      <view
        style={{
          position: 'absolute',
          top: '44px',
          bottom: '83px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <text
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'capitalize',
          }}
        >
          {title} Page
        </text>
        <text
          style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '12px',
          }}
        >
          Coming Soon
        </text>
      </view>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </view>
  );
};
