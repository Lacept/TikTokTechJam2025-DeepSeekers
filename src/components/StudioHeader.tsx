// src/components/StudioHeaderLight.tsx
import * as React from 'react';

interface StudioHeaderLightProps {
  onBack: () => void;
}

export const StudioHeaderLight: React.FC<StudioHeaderLightProps> = ({
  onBack,
}) => {
  const handleBackPress = () => {
    'background only';
    onBack();
  };

  return (
    <view
      style={{
        height: '60px',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '10px',
        borderBottomWidth: '1px',
        borderBottomColor: '#333',
      }}
    >
      {/* Back Button */}
      <view
        style={{
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          backgroundColor: 'transparent',
        }}
        bindtap={handleBackPress}
      >
        <text
          style={{
            color: '#fff',
            fontSize: '18px',
          }}
        >
          ←
        </text>
      </view>

      {/* Title */}
      <view
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <text
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          TikTok Studio
        </text>
      </view>

      {/* Right spacer to center title */}
      <view style={{ width: '40px' }} />
    </view>
  );
};
