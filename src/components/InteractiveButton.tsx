// src/components/InteractiveButton.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

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
  style = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: {
      width: '40px',
      height: '40px',
      fontSize: '18px',
      textSize: '10px',
      iconSize: '20px',
    },
    medium: {
      width: '48px',
      height: '48px',
      fontSize: '24px',
      textSize: '12px',
      iconSize: '24px',
    },
    large: {
      width: '56px',
      height: '56px',
      fontSize: '28px',
      textSize: '14px',
      iconSize: '45px',
    },
  };

  const config = sizeConfig[size];

  const handlePress = () => {
    'background only';
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onPress?.();
  };

  // Check if icon is an image URL (contains .png, .jpg, .jpeg, .gif, .webp)
  const isImageIcon = (iconStr: string) => {
    return /\.(png|jpg|jpeg|gif|webp)$/i.test(iconStr);
  };

  const currentIcon = isActive && activeIcon ? activeIcon : icon;

  return (
    <view style={{ alignItems: 'center', width: config.width, ...style }}>
      <view
        style={{
          width: config.width,
          height: config.height,
          borderRadius: '24px',
          backgroundColor: isPressed ? 'rgba(255,255,255,0.1)' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '6px',
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.1s ease',
          overflow: 'hidden',
        }}
        bindtap={handlePress}
      >
        {isImageIcon(currentIcon) ? (
          <image
            src={currentIcon}
            style={{
              width: config.iconSize,
              height: config.iconSize,
              opacity: isActive ? 1 : 0.9,
            }}
          />
        ) : (
          <text
            style={{
              color: isActive ? activeColor : inactiveColor,
              fontSize: config.fontSize,
              fontWeight: isActive ? 'bold' : 'normal',
            }}
          >
            {currentIcon}
          </text>
        )}
      </view>
      <text
        style={{
          color: 'white',
          fontSize: config.textSize,
          fontWeight: 'bold',
          textAlign: 'center',
          width: config.width,
          overflow: 'hidden',
        }}
      >
        {count}
      </text>
    </view>
  );
};
