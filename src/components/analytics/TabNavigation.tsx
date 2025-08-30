// src/components/analytics/TabNavigation.tsx

interface TabNavigationProps {
  activeTab: 'views' | 'revenue';
  onTabChange: (tab: 'views' | 'revenue') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <view className="tab-navigation">
      <ViewsTab
        isActive={activeTab === 'views'}
        onPress={() => onTabChange('views')}
      />
      <RevenueTab
        isActive={activeTab === 'revenue'}
        onPress={() => onTabChange('revenue')}
      />
    </view>
  );
}

// Views Tab Component
interface ViewsTabProps {
  isActive: boolean;
  onPress: () => void;
}

const ViewsTab = ({ isActive, onPress }: ViewsTabProps) => {
  const handleTabPress = (event: any) => {
    'main thread';
    if (isActive) return;

    event.currentTarget.setStyleProperty('background-color', '#374151');
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
      className={`tab-item ${isActive ? 'active' : 'inactive'}`}
      main-thread:bindtap={handleTabPress}
      bindtap={handlePress}
    >
      <text className="tab-text">Views</text>
    </view>
  );
};

// Revenue Tab Component
interface RevenueTabProps {
  isActive: boolean;
  onPress: () => void;
}

const RevenueTab = ({ isActive, onPress }: RevenueTabProps) => {
  const handleTabPress = (event: any) => {
    'main thread';
    if (isActive) return;

    event.currentTarget.setStyleProperty('background-color', '#374151');
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
      className={`tab-item ${isActive ? 'active' : 'inactive'}`}
      main-thread:bindtap={handleTabPress}
      bindtap={handlePress}
    >
      <text className="tab-text">Revenue</text>
    </view>
  );
};