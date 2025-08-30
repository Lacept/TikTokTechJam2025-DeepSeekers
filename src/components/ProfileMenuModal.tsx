// src/components/ProfileMenuModal.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';
import settingsIcon from '../assets/settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';
import studioIcon from '../assets/studio_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';
import walletIcon from '../assets/wallet_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress?: () => void;
}

interface ProfileMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigateToStudio?: () => void;
}

export const ProfileMenuModal: React.FC<ProfileMenuModalProps> = ({
  isVisible,
  onClose,
  onNavigateToStudio,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'studio',
      title: 'TikTok Studio',
      icon: studioIcon,
      onPress: () => onNavigateToStudio?.(),
    },
    {
      id: 'balance',
      title: 'Balance',
      icon: walletIcon,
      onPress: () => console.log('Balance pressed'),
    },
    {
      id: 'qr',
      title: 'Your QR code',
      icon: '', // Will use emoji
      onPress: () => console.log('QR code pressed'),
    },
    {
      id: 'settings',
      title: 'Settings and privacy',
      icon: settingsIcon,
      onPress: () => console.log('Settings pressed'),
    },
  ];

  const handleItemPress = (item: MenuItem) => {
    'background only';
    setSelectedItem(item.id);
    setTimeout(() => {
      setSelectedItem(null);
      item.onPress?.();
    }, 150);
  };

  const handleClose = () => {
    'background only';
    onClose();
  };

  const handlePressStart = (itemId: string) => {
    'main thread';
    setSelectedItem(itemId);
  };

  const handlePressEnd = () => {
    'main thread';
    setSelectedItem(null);
  };

  if (!isVisible) return null;

  return (
    <view
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
      }}
    >
      {/* Modal Background Overlay */}
      <view
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        bindtap={handleClose}
      />

      {/* Modal Content */}
      <view
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          paddingBottom: '20px',
        }}
      >
        {/* Handle bar */}
        <view
          style={{
            alignItems: 'center',
            paddingTop: '12px',
            paddingBottom: '20px',
          }}
        >
          <view
            style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#e0e0e0',
              borderRadius: '2px',
            }}
          />
        </view>

        {/* Menu Items */}
        <view
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {menuItems.map((item, index) => (
            <view
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: '18px',
                paddingBottom: '18px',
                backgroundColor:
                  selectedItem === item.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                borderRadius: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                marginBottom: index < menuItems.length - 1 ? '2px' : '0px',
                borderBottom:
                  index < menuItems.length - 1 ? '1px solid #f5f5f5' : 'none',
              }}
              bindtap={() => handleItemPress(item)}
              main-thread:bindtouchstart={() => handlePressStart(item.id)}
              main-thread:bindtouchend={handlePressEnd}
            >
              {/* Icon */}
              <view
                style={{
                  width: '28px',
                  height: '28px',
                  marginRight: '16px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.icon ? (
                  <image
                    src={item.icon}
                    style={{
                      width: '24px',
                      height: '24px',
                      opacity: 0.8,
                    }}
                  />
                ) : (
                  <text
                    style={{
                      fontSize: '22px',
                    }}
                  >
                    {item.id === 'qr' ? '📱' : ''}
                  </text>
                )}
              </view>

              {/* Title */}
              <text
                style={{
                  fontSize: '16px',
                  color: '#000',
                  fontWeight: '500',
                  flex: 1,
                }}
              >
                {item.title}
              </text>

              {/* Arrow indicator for some items */}
              {(item.id === 'studio' || item.id === 'settings') && (
                <text
                  style={{
                    fontSize: '14px',
                    color: '#999',
                    marginLeft: '8px',
                  }}
                >
                  ›
                </text>
              )}
            </view>
          ))}
        </view>

        {/* Bottom safe area */}
        <view
          style={{
            height: '20px',
          }}
        />
      </view>
    </view>
  );
};
