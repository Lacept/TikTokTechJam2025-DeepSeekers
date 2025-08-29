// src/components/StudioActionGridLight.tsx
import * as React from 'react';

interface ActionItem {
  id: string;
  title: string;
  icon: string;
  onPress?: () => void;
}

export const StudioActionGridLight: React.FC = () => {
  const actionItems: ActionItem[] = [
    {
      id: 'account-check',
      title: 'Account check',
      icon: '✓',
      onPress: () => console.log('Account check pressed')
    },
    {
      id: 'creator-academy',
      title: 'Creator Academy',
      icon: '🎓',
      onPress: () => console.log('Creator Academy pressed')
    },
    {
      id: 'promote',
      title: 'Promote',
      icon: '📈',
      onPress: () => console.log('Promote pressed')
    },
    {
      id: 'benefits',
      title: 'Benefits',
      icon: '🎁',
      onPress: () => console.log('Benefits pressed')
    }
  ];

  const handleItemPress = (item: ActionItem) => {
    'background only';
    item.onPress?.();
  };

  return (
    <view style={{
      marginBottom: '32px'
    }}>
      <view style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        {/* Account check */}
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
            bindtap={() => handleItemPress(actionItems[0])}
          >
            <text style={{ fontSize: '24px' }}>✓</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Account check
          </text>
        </view>

        {/* Creator Academy */}
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
            bindtap={() => handleItemPress(actionItems[1])}
          >
            <text style={{ fontSize: '24px' }}>🎓</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Creator Academy
          </text>
        </view>

        {/* Promote */}
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
            bindtap={() => handleItemPress(actionItems[2])}
          >
            <text style={{ fontSize: '24px' }}>📈</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Promote
          </text>
        </view>

        {/* Benefits */}
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
            bindtap={() => handleItemPress(actionItems[3])}
          >
            <text style={{ fontSize: '24px' }}>🎁</text>
          </view>
          <text style={{
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '16px'
          }}>
            Benefits
          </text>
        </view>
      </view>
    </view>
  );
};