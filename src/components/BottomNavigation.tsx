/** @jsxImportSource @lynx-js/react */
// src/components/BottomNavigation.tsx

// (No need for: import * as React from 'react')
import homeIconUrl from '../assets/home-icon.png';
import discoverIconUrl from '../assets/shop-icon.png';
import addIconUrl from '../assets/add-icon.png';
import inboxIconUrl from '../assets/inbox-icon.png';
import accountIconUrl from '../assets/account-icon.png';

// Active state icons
import homeActiveIconUrl from '../assets/home-icon-active.png';
import discoverActiveIconUrl from '../assets/discover-icon-active.png';
import inboxActiveIconUrl from '../assets/inbox-icon-active.png';
import accountActiveIconUrl from '../assets/account-icon-active.png';

export type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';

interface Tab {
  id: TabType;
  icon: string;
  activeIcon?: string;
  label: string;
}

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  /** Fires on every tap, even if the tab is already active (useful for refresh). */
  onTabPress?: (tab: TabType) => void;
}

const Icon = ({ src, style }: { src: string; style?: Record<string, any> }) => (
  <image src={src} style={style} />
);

export function BottomNavigation({ activeTab, onTabChange, onTabPress }: BottomNavigationProps) {
  const tabs: Tab[] = [
    { id: 'home',     icon: homeIconUrl,     activeIcon: homeActiveIconUrl,       label: 'Home'    },
    { id: 'discover', icon: discoverIconUrl, activeIcon: discoverActiveIconUrl,   label: 'Shop'    },
    { id: 'create',   icon: addIconUrl,      activeIcon: addIconUrl,              label: ''        },
    { id: 'inbox',    icon: inboxIconUrl,    activeIcon: inboxActiveIconUrl,      label: 'Inbox'   },
    { id: 'profile',  icon: accountIconUrl,  activeIcon: accountActiveIconUrl,    label: 'Profile' },
  ];

  const handleTap = (tab: TabType) => {
    // Always notify the tap (even if it's already active)
    onTabPress?.(tab);
    // Also request a tab change (parent may ignore if same)
    onTabChange(tab);
  };

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
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <view
            key={tab.id}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
            bindtap={() => handleTap(tab.id)}
          >
            {/* Active indicator dot (not for create) */}
            {isActive && tab.id !== 'create' && (
              <view style={{
                position: 'absolute',
                top: '-2px',
                width: '4px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: '#FE2C55'
              }} />
            )}

            <Icon
              src={isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
              style={{
                width:  tab.id === 'create' ? '43px' : '23px',
                height: tab.id === 'create' ? '28px' : '21px',
                opacity: isActive || tab.id === 'create' ? 1 : 0.6
              }}
            />

            {!!tab.label && (
              <text style={{
                color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                fontSize: '10px',
                marginTop: '5px',
                fontWeight: isActive ? '600' : '400'
              }}>
                {tab.label}
              </text>
            )}
          </view>
        );
      })}
    </view>
  );
}
