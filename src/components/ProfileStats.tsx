// src/components/ProfileStats.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

interface StatItemProps {
  count: number;
  label: string;
  onPress?: () => void;
}

interface ProfileStatsProps {
  following: number;
  followers: number;
  likes: number;
  onFollowingPress?: () => void;
  onFollowersPress?: () => void;
  onLikesPress?: () => void;
  style?: object;
}

const StatItem: React.FC<StatItemProps> = ({ count, label, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

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

  return (
    <view
      style={{
        alignItems: 'center',
        opacity: isPressed ? 0.7 : 1,
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.1s ease',
      }}
      bindtap={handlePress}
      main-thread:bindtouchstart={handlePressStart}
      main-thread:bindtouchend={handlePressEnd}
    >
      <text
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#000',
          marginBottom: '4px',
        }}
      >
        {count}
      </text>
      <text
        style={{
          fontSize: '14px',
          color: '#666',
        }}
      >
        {label}
      </text>
    </view>
  );
};

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  following,
  followers,
  likes,
  onFollowingPress,
  onFollowersPress,
  onLikesPress,
  style = {},
}) => {
  return (
    <view
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingLeft: '40px',
        paddingRight: '40px',
        ...style,
      }}
    >
      <StatItem
        count={following}
        label="Following"
        onPress={onFollowingPress}
      />
      <StatItem
        count={followers}
        label="Followers"
        onPress={onFollowersPress}
      />
      <StatItem count={likes} label="Likes" onPress={onLikesPress} />
    </view>
  );
};
