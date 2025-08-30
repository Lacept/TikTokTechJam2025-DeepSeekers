// src/components/AnalyticsSectionLight.tsx
import type * as React from 'react';

interface AnalyticsStat {
  value: string;
  label: string;
  change: string;
  isPositive: boolean;
}

export const AnalyticsSectionLight: React.FC = () => {
  const stats: AnalyticsStat[] = [
    {
      value: '22.3K',
      label: 'Post views',
      change: '↗ 72.6% 7d',
      isPositive: true
    },
    {
      value: '-2',
      label: 'Net followers',
      change: '— 0% 7d',
      isPositive: false
    },
    {
      value: '1.9K',
      label: 'Likes',
      change: '↗ 159% 7d',
      isPositive: true
    }
  ];

  const handleViewAllPress = () => {
    'background only';
    console.log('View all analytics pressed');
  };

  return (
    <view style={{
      marginTop: '24px',
      marginBottom: '32px'
    }}>
      {/* Section Header */}
      <view style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <text style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          Analytics
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

      {/* Stats Grid - Flex Layout */}
      <view style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        {/* Post views */}
        <view style={{
          flex: 1,
          alignItems: 'flex-start'
        }}>
          <text style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '4px'
          }}>
            22.3K
          </text>
          <text style={{
            fontSize: '14px',
            color: '#999',
            marginBottom: '8px'
          }}>
            Post views
          </text>
          <text style={{
            fontSize: '12px',
            color: '#25F4EE'
          }}>
            ↗ 72.6% 7d
          </text>
        </view>

        {/* Net followers */}
        <view style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <text style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '4px'
          }}>
            -2
          </text>
          <text style={{
            fontSize: '14px',
            color: '#999',
            marginBottom: '8px'
          }}>
            Net followers
          </text>
          <text style={{
            fontSize: '12px',
            color: '#999'
          }}>
            — 0% 7d
          </text>
        </view>

        {/* Likes */}
        <view style={{
          flex: 1,
          alignItems: 'flex-end'
        }}>
          <text style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '4px'
          }}>
            1.9K
          </text>
          <text style={{
            fontSize: '14px',
            color: '#999',
            marginBottom: '8px'
          }}>
            Likes
          </text>
          <text style={{
            fontSize: '12px',
            color: '#25F4EE'
          }}>
            ↗ 159% 7d
          </text>
        </view>
      </view>
    </view>
  );
};