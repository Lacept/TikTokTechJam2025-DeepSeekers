// src/components/BalanceSectionLight.tsx
import * as React from 'react';

export const BalanceSectionLight: React.FC = () => {
  const handleBalancePress = () => {
    'background only';
    console.log('Balance pressed');
  };

  const handleRewardsPress = () => {
    'background only';
    console.log('Estimated rewards pressed');
  };

  return (
    <view style={{
      marginBottom: '32px'
    }}>
      {/* Balance Row */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '4px',
          paddingRight: '4px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          marginBottom: '8px'
        }}
        bindtap={handleBalancePress}
      >
        <text style={{
          fontSize: '18px',
          color: '#fff',
          fontWeight: '500'
        }}>
          Balance
        </text>
        
        <view style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <text style={{
            fontSize: '18px',
            color: '#fff',
            fontWeight: 'bold',
            marginRight: '8px'
          }}>
            $26.72
          </text>
          
          <text style={{
            fontSize: '16px',
            color: '#999'
          }}>
            >
          </text>
        </view>
      </view>

      {/* Estimated Rewards Row */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '4px',
          paddingRight: '4px',
          borderRadius: '8px',
          backgroundColor: 'transparent'
        }}
        bindtap={handleRewardsPress}
      >
        <text style={{
          fontSize: '18px',
          color: '#fff',
          fontWeight: '500'
        }}>
          Estimated rewards
        </text>
        
        <view style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <text style={{
            fontSize: '18px',
            color: '#fff',
            fontWeight: 'bold',
            marginRight: '8px'
          }}>
            $0.00
          </text>
          
          <text style={{
            fontSize: '16px',
            color: '#999'
          }}>
            >
          </text>
        </view>
      </view>
    </view>
  );
};