// src/components/UserProfile.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

interface UserProfileProps {
  username: string;
  avatarUrl?: string;
  isFollowing?: boolean;
  onFollow?: () => void;
  onProfilePress?: () => void;
  size?: 'small' | 'medium' | 'large';
  showFollowButton?: boolean;
  style?: object;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  avatarUrl,
  isFollowing = false,
  onFollow,
  onProfilePress,
  size = 'medium',
  showFollowButton = true,
  style = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: {
      width: '40px',
      height: '40px',
      fontSize: '12px',
      buttonSize: '18px',
    },
    medium: {
      width: '48px',
      height: '48px',
      fontSize: '14px',
      buttonSize: '20px',
    },
    large: {
      width: '56px',
      height: '56px',
      fontSize: '16px',
      buttonSize: '24px',
    },
  };

  const config = sizeConfig[size];

  const handleProfilePress = () => {
    'background only';
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onProfilePress?.();
  };

  const handleFollowPress = () => {
    'background only';
    onFollow?.();
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
      '#ff2d55',
      '#007AFF',
      '#34C759',
      '#FF9500',
      '#AF52DE',
      '#FF3B30',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <view style={{ alignItems: 'center', position: 'relative', ...style }}>
      {/* Avatar */}
      <view
        style={{
          width: config.width,
          height: config.height,
          borderRadius: '24px',
          border: '2px solid white',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: avatarUrl ? 'transparent' : getAvatarColor(username),
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease',
        }}
        bindtap={handleProfilePress}
        main-thread:bindtouchstart={handlePressStart}
        main-thread:bindtouchend={handlePressEnd}
      >
        {avatarUrl ? (
          <image
            src={avatarUrl}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '22px',
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

      {/* Follow Button */}
      {showFollowButton && !isFollowing && (
        <view
          style={{
            position: 'absolute',
            bottom: '-8px',
            width: config.buttonSize,
            height: config.buttonSize,
            borderRadius: '10px',
            backgroundColor: '#ff2d55',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid white',
          }}
          bindtap={handleFollowPress}
        >
          <text
            style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            +
          </text>
        </view>
      )}

      {/* Following indicator */}
      {isFollowing && (
        <view
          style={{
            position: 'absolute',
            bottom: '-8px',
            width: config.buttonSize,
            height: config.buttonSize,
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid white',
          }}
        >
          <text
            style={{
              color: '#ff2d55',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            ✓
          </text>
        </view>
      )}
    </view>
  );
};
