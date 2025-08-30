// src/components/ProfileAvatar.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

interface ProfileAvatarProps {
  imageUrl?: string;
  username: string;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  style?: object;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUrl,
  username,
  size = 'large',
  onPress,
  style = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: { width: '48px', height: '48px', fontSize: '16px' },
    medium: { width: '72px', height: '72px', fontSize: '24px' },
    large: { width: '96px', height: '96px', fontSize: '32px' },
  };

  const config = sizeConfig[size];

  const handlePress = () => {
    'background only';
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onPress?.();
  };

  const handlePressStart = () => {
    'main thread';
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    'main thread';
    setIsPressed(false);
  };

  // Generate avatar color based on username
  const getAvatarColor = (name: string) => {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#96ceb4',
      '#feca57',
      '#ff9ff3',
      '#54a0ff',
      '#5f27cd',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <view
      style={{
        alignItems: 'center',
        ...style,
      }}
      bindtap={handlePress}
      main-thread:bindtouchstart={handlePressStart}
      main-thread:bindtouchend={handlePressEnd}
    >
      <view
        style={{
          width: config.width,
          height: config.height,
          borderRadius: parseInt(config.width) / 2 + 'px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: imageUrl ? 'transparent' : getAvatarColor(username),
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <image
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: parseInt(config.width) / 2 + 'px',
            }}
          />
        ) : (
          <text
            style={{
              color: 'white',
              fontSize: config.fontSize,
              fontWeight: 'bold',
            }}
          >
            {username.replace('@', '')[0].toUpperCase()}
          </text>
        )}
      </view>
    </view>
  );
};
