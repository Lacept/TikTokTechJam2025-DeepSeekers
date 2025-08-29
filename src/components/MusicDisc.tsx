// src/components/MusicDisc.tsx
import * as React from 'react';
import { useState, useEffect } from '@lynx-js/react';

interface MusicDiscProps {
  isPlaying?: boolean;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  style?: object;
}

export const MusicDisc: React.FC<MusicDiscProps> = ({
  isPlaying = true,
  size = 'medium',
  onPress,
  style = {},
}) => {
  const [rotation, setRotation] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: { width: '40px', height: '40px', fontSize: '14px' },
    medium: { width: '48px', height: '48px', fontSize: '16px' },
    large: { width: '56px', height: '56px', fontSize: '18px' },
  };

  const config = sizeConfig[size];

  // Simulate rotation animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 50); // 20 FPS for smooth rotation

    return () => clearInterval(interval);
  }, [isPlaying]);

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
        justifyContent: 'center',
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
          borderRadius: '24px',
          backgroundColor: isPressed ? '#444' : '#333',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `rotate(${rotation}deg) scale(${isPressed ? 0.95 : 1})`,
          transition: 'transform 0.1s ease',
          border: '2px solid rgba(255,255,255,0.3)',
          position: 'relative',
        }}
      >
        {/* Vinyl record grooves effect */}
        <view
          style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        <view
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />

        {/* Center dot */}
        <view
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            position: 'absolute',
          }}
        />

        {/* Music note */}
        <text
          style={{
            color: 'white',
            fontSize: config.fontSize,
            position: 'absolute',
            top: '6px',
            right: '6px',
          }}
        >
          ♪
        </text>
      </view>

      {/* Pulsing effect when playing */}
      {isPlaying && (
        <view
          style={{
            position: 'absolute',
            width: config.width,
            height: config.height,
            borderRadius: '24px',
            border: '2px solid rgba(255,255,255,0.3)',
            animation: 'pulse 2s infinite',
          }}
        />
      )}
    </view>
  );
};
