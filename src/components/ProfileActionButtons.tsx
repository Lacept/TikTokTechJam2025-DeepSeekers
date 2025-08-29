// src/components/ProfileActionButtons.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

interface ProfileActionButtonsProps {
  onEditProfile?: () => void;
  onBookmark?: () => void;
  style?: object;
}

export const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  onEditProfile,
  onBookmark,
  style = {}
}) => {
  const [isPressed, setIsPressed] = useState<'edit' | 'bookmark' | null>(null);

  const handleEditProfile = () => {
    'background only';
    setIsPressed('edit');
    setTimeout(() => setIsPressed(null), 150);
    onEditProfile?.();
  };

  const handleBookmark = () => {
    'background only';
    setIsPressed('bookmark');
    setTimeout(() => setIsPressed(null), 150);
    onBookmark?.();
  };

  const handlePressStart = (type: 'edit' | 'bookmark') => {
    'main thread';
    setIsPressed(type);
  };

  const handlePressEnd = () => {
    'main thread';
    setIsPressed(null);
  };

  return (
    <view style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      columnGap: '12px',
      ...style
    }}>
      {/* Edit Profile Button */}
      <view 
        style={{
          flex: 1,
          height: '36px',
          backgroundColor: isPressed === 'edit' ? '#e0e0e0' : '#f1f1f1',
          borderRadius: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          transform: isPressed === 'edit' ? 'scale(0.98)' : 'scale(1)',
          transition: 'all 0.1s ease'
        }}
        bindtap={handleEditProfile}
        main-thread:bindtouchstart={() => handlePressStart('edit')}
        main-thread:bindtouchend={handlePressEnd}
      >
        <text style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#333' 
        }}>
          Edit profile
        </text>
      </view>

      {/* Bookmark Button */}
      <view 
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: isPressed === 'bookmark' ? '#e0e0e0' : '#f1f1f1',
          borderRadius: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          transform: isPressed === 'bookmark' ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.1s ease'
        }}
        bindtap={handleBookmark}
        main-thread:bindtouchstart={() => handlePressStart('bookmark')}
        main-thread:bindtouchend={handlePressEnd}
      >
        <text style={{ fontSize: '16px' }}>🔖</text>
      </view>
    </view>
  );
};