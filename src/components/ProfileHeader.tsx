// src/components/ProfileHeader.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';
import menuIcon from '../assets/menu_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';

interface ProfileHeaderProps {
  displayName: string;
  onAddFriends?: () => void;
  onMenu?: () => void;
  style?: object;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  onAddFriends,
  onMenu,
  style = {}
}) => {
  const [isPressed, setIsPressed] = useState<'friends' | 'menu' | null>(null);

  const handleAddFriends = () => {
    'background only';
    setIsPressed('friends');
    setTimeout(() => setIsPressed(null), 150);
    onAddFriends?.();
  };

  const handleMenu = () => {
    'background only';
    setIsPressed('menu');
    setTimeout(() => setIsPressed(null), 150);
    onMenu?.();
  };

  const handlePressStart = (type: 'friends' | 'menu') => {
    'main thread';
    setIsPressed(type);
  };

  const handlePressEnd = () => {
    'main thread';
    setIsPressed(null);
  };

  return (
    <view style={{
      height: '60px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      ...style
    }}>
      {/* Add Friends Button */}
      <view 
        style={{
          width: '32px',
          height: '32px',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isPressed === 'friends' ? 0.6 : 1,
          transform: isPressed === 'friends' ? 'scale(0.95)' : 'scale(1)'
        }}
        bindtap={handleAddFriends}
        main-thread:bindtouchstart={() => handlePressStart('friends')}
        main-thread:bindtouchend={handlePressEnd}
      >
        <text style={{ fontSize: '20px' }}>👤</text>
      </view>

      {/* Display Name */}
      <view style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <text style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#000',
          marginRight: '4px'
        }}>
          {displayName}
        </text>
        <text style={{ 
          fontSize: '14px', 
          color: '#666'
        }}>
          ▼
        </text>
      </view>

      {/* Menu Button */}
      <view 
        style={{
          width: '32px',
          height: '32px',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isPressed === 'menu' ? 0.6 : 1,
          transform: isPressed === 'menu' ? 'scale(0.95)' : 'scale(1)'
        }}
        bindtap={handleMenu}
        main-thread:bindtouchstart={() => handlePressStart('menu')}
        main-thread:bindtouchend={handlePressEnd}
      >
        <image 
          src={menuIcon}
          style={{
            width: '24px',
            height: '24px'
          }}
        />
      </view>
    </view>
  );
};