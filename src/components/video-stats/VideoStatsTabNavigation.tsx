// src/components/video-stats/VideoStatsTabNavigation.tsx

interface VideoStatsTabNavigationProps {
  activeTab: 'overview' | 'earnings';
  onTabChange: (tab: 'overview' | 'earnings') => void;
}

export function VideoStatsTabNavigation({ activeTab, onTabChange }: VideoStatsTabNavigationProps) {
  return (
    <view style={{
      height: '48px',
      display: 'flex',
      background: '#111827',
      borderBottom: '1px solid #374151'
    }}>
      <OverviewTabButton
        isActive={activeTab === 'overview'}
        onPress={() => onTabChange('overview')}
      />
      <EarningsTabButton
        isActive={activeTab === 'earnings'}
        onPress={() => onTabChange('earnings')}
      />
    </view>
  );
}

// Overview Tab Button
interface TabButtonProps {
  isActive: boolean;
  onPress: () => void;
}

const OverviewTabButton = ({ isActive, onPress }: TabButtonProps) => {
  const handleTabPress = (event: any) => {
    'main thread';
    if (isActive) return;

    event.currentTarget.setStyleProperty('background-color', 'rgba(255, 255, 255, 0.05)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', 'transparent');
    }, 150);
  };

  const handlePress = () => {
    'background only';
    onPress();
  };

  return (
    <view
      style={{
        flex: '1',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent'
      }}
      main-thread:bindtap={handleTabPress}
      bindtap={handlePress}
    >
      <text style={{
        fontSize: '16px',
        fontWeight: '500',
        color: isActive ? '#ffffff' : '#9ca3af'
      }}>
        Overview
      </text>
    </view>
  );
};

// Earnings Tab Button
const EarningsTabButton = ({ isActive, onPress }: TabButtonProps) => {
  const handleTabPress = (event: any) => {
    'main thread';
    if (isActive) return;

    event.currentTarget.setStyleProperty('background-color', 'rgba(255, 255, 255, 0.05)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', 'transparent');
    }, 150);
  };

  const handlePress = () => {
    'background only';
    onPress();
  };

  return (
    <view
      style={{
        flex: '1',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent'
      }}
      main-thread:bindtap={handleTabPress}
      bindtap={handlePress}
    >
      <text style={{
        fontSize: '16px',
        fontWeight: '500',
        color: isActive ? '#ffffff' : '#9ca3af'
      }}>
        Earnings
      </text>
    </view>
  );
};