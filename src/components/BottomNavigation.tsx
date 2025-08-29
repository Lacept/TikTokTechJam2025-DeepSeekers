// src/components/BottomNavigation.tsx
import * as React from 'react';
import homeIconUrl from '../assets/home-icon.png';
import discoverIconUrl from '../assets/discover-icon.png';
import addIconUrl from '../assets/add-icon.png';
import inboxIconUrl from '../assets/inbox-icon.png';
import accountIconUrl from '../assets/account-icon.png';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Icon = ({ src, style }: { src: string; style?: object }) => (
  <image src={src} style={style} />
);

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as TabType, icon: homeIconUrl, label: 'Home' },
    { id: 'discover' as TabType, icon: discoverIconUrl, label: 'Discover' },
    { id: 'create' as TabType, icon: addIconUrl, label: '' },
    { id: 'inbox' as TabType, icon: inboxIconUrl, label: 'Inbox' },
    { id: 'profile' as TabType, icon: accountIconUrl, label: 'Me' },
  ];

  return (
    <view style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '83px',
      backgroundColor: 'black',
      borderTop: '1px solid #262626',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 10
    }}>
      {tabs.map((tab) => (
        <view 
          key={tab.id}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          bindtap={() => onTabChange(tab.id)}
        >
          <Icon 
            src={tab.icon} 
            style={{ 
              width: tab.id === 'create' ? '43px' : '23px', 
              height: tab.id === 'create' ? '28px' : '21px' 
            }} 
          />
          {tab.label && (
            <text style={{ 
              color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.6)', 
              fontSize: '10px', 
              marginTop: '5px' 
            }}>
              {tab.label}
            </text>
          )}
        </view>
      ))}
    </view>
  );
};