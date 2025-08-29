// src/components/InteractiveButton.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

interface InteractiveButtonProps {
  icon: string;
  activeIcon?: string; // Different icon for active state
  count: string | number;
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  style?: object;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  icon,
  activeIcon,
  count,
  isActive = false,
  activeColor = '#ff2d55',
  inactiveColor = 'white',
  onPress,
  size = 'medium',
  style = {}
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: { width: '40px', height: '40px', fontSize: '18px', textSize: '10px' },
    medium: { width: '48px', height: '48px', fontSize: '24px', textSize: '12px' },
    large: { width: '56px', height: '56px', fontSize: '28px', textSize: '14px' }
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

  return (
    <view style={{ alignItems: 'center', ...style }}>
      <view 
        style={{
          width: config.width,
          height: config.height,
          borderRadius: '24px',
          backgroundColor: isPressed 
            ? 'rgba(255,255,255,0.4)' 
            : 'rgba(255,255,255,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '6px',
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.1s ease'
        }}
        bindtap={handlePress}
        main-thread:bindtouchstart={handlePressStart}
        main-thread:bindtouchend={handlePressEnd}
      >
        <text style={{ 
          color: isActive ? activeColor : inactiveColor, 
          fontSize: config.fontSize,
          fontWeight: isActive ? 'bold' : 'normal'
        }}>
          {isActive && activeIcon ? activeIcon : icon}
        </text>
      </view>
      <text style={{ 
        color: 'white', 
        fontSize: config.textSize, 
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        {count}
      </text>
    </view>
  );
};