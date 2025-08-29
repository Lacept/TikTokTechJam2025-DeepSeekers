// src/components/MonetizationSectionLight.tsx
import * as React from 'react';

interface MonetizationProgram {
  id: string;
  title: string;
  icon: string;
  onPress?: () => void;
}

export const MonetizationSectionLight: React.FC = () => {
  const programs: MonetizationProgram[] = [
    {
      id: 'tiktok-shop',
      title: 'TikTok Shop',
      icon: '🛍️',
      onPress: () => console.log('TikTok Shop pressed')
    },
    {
      id: 'service-plus',
      title: 'Service+',
      icon: '🎧',
      onPress: () => console.log('Service+ pressed')
    },
    {
      id: 'subscription',
      title: 'Subscription',
      icon: '👥',
      onPress: () => console.log('Subscription pressed')
    },
    {
      id: 'live-incentive',
      title: 'LIVE Incentive Program',
      icon: '⚡',
      onPress: () => console.log('LIVE Incentive Program pressed')
    }
  ];

  const handleItemPress = (item: MonetizationProgram) => {
    'background only';
    item.onPress?.();
  };

  const handleViewAllPress = () => {
    'background only';
    console.log('View all monetization programs pressed');
  };

  return (
    <view style={{
      marginBottom: '32px'
    }}>
      {/* Section Header */}
      <view style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <text style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          Monetization Programs
        </text>
        
        <view
          style={{
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            borderRadius: '4px',
            backgroundColor: 'transparent'
          }}
          bindtap={handleViewAllPress}
        >
          <text style={{
            fontSize: '14px',
            color: '#999'
          }}>
            View all >
          </text>
        </view>
      </view>

      {/* Programs Grid - Flex Layout */}
      <view style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        {/* TikTok Shop */}
        <view style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <view
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              backgroundColor: '#1a1a1a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '12px'
            }}
            bindtap={() => handleItemPress(programs[0])}
          >
            <text style={{ fontSize: '24px' }}>🛍️</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            TikTok Shop
          </text>
        </view>

        {/* Service+ */}
        <view style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <view
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              backgroundColor: '#1a1a1a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '12px'
            }}
            bindtap={() => handleItemPress(programs[1])}
          >
            <text style={{ fontSize: '24px' }}>🎧</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Service+
          </text>
        </view>

        {/* Subscription */}
        <view style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <view
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              backgroundColor: '#1a1a1a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '12px'
            }}
            bindtap={() => handleItemPress(programs[2])}
          >
            <text style={{ fontSize: '24px' }}>👥</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Subscription
          </text>
        </view>

        {/* LIVE Incentive Program */}
        <view style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <view
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              backgroundColor: '#1a1a1a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '12px'
            }}
            bindtap={() => handleItemPress(programs[3])}
          >
            <text style={{ fontSize: '24px' }}>⚡</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            LIVE Incentive Program
          </text>
        </view>
      </view>
    </view>
  );
};