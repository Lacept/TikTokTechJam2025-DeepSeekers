// src/components/AnalyticsDashboard.tsx
import { useState, useCallback } from '@lynx-js/react';
import './AnalyticsDashboard.css';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'views' | 'revenue'>('views');

  const handleTabSwitch = useCallback((tab: 'views' | 'revenue') => {
    'background only';
    setActiveTab(tab);
  }, []);

  const handleBackPress = useCallback(() => {
    'background only';
    onBack();
  }, [onBack]);

  return (
    <view className="analytics-dashboard">
      {/* Header */}
      <AnalyticsHeader onBack={handleBackPress} />
      
      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />
      
      {/* Time Filter */}
      <TimeFilter />
      
      {/* Main Content */}
      <scroll-view className="main-content">
        {activeTab === 'views' ? (
          <>
            {/* Total Views Section */}
            <TotalViewsSection />
            
            {/* Chart Section */}
            <ChartSection />
            
            {/* Metrics Grid */}
            <MetricsGrid />
          </>
        ) : (
          <>
            {/* Total Revenue Section */}
            <TotalRevenueSection />
            
            {/* Revenue Chart Section */}
            <RevenueChartSection />
            
            {/* Revenue Breakdown Section */}
            <RevenueBreakdownSection />
          </>
        )}
      </scroll-view>
    </view>
  );
}

// Header Component
interface AnalyticsHeaderProps {
  onBack: () => void;
}

const AnalyticsHeader = ({ onBack }: AnalyticsHeaderProps) => {
  const handleBackPress = () => {
    'background only';
    onBack();
  };

  return (
    <view className="analytics-header">
      <view className="back-button" bindtap={handleBackPress}>
        <text className="back-icon">←</text>
      </view>
      <text className="header-title">Analytics</text>
      <view className="header-spacer" />
    </view>
  );
};

// Tab Navigation Component
interface TabNavigationProps {
  activeTab: 'views' | 'revenue';
  onTabChange: (tab: 'views' | 'revenue') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
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
};

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

// Time Filter Component
const TimeFilter = () => {
  const handleFilterPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  const handleFilterTap = () => {
    'background only';
    console.log('Time filter tapped');
  };

  return (
    <view className="time-filter">
      <view 
        className="filter-button"
        main-thread:bindtap={handleFilterPress}
        bindtap={handleFilterTap}
      >
        <text className="filter-text">7 days</text>
        <text className="filter-arrow">▼</text>
      </view>
    </view>
  );
};

// Total Views Section Component
const TotalViewsSection = () => {
  const handleSectionPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleSectionTap = () => {
    'background only';
    console.log('Total views section tapped');
  };

  return (
    <view 
      className="total-views-section"
      main-thread:bindtap={handleSectionPress}
      bindtap={handleSectionTap}
    >
      <text className="total-label">Total Views</text>
      <text className="total-value">22.3K</text>
      <view className="growth-indicator">
        <text className="growth-icon">📈</text>
        <text className="growth-text">+72.6% from last week</text>
      </view>
    </view>
  );
};

// Chart Section Component
const ChartSection = () => {
  const chartData = [
    { day: '21', views: 2400, height: '48%' },
    { day: '22', views: 2800, height: '56%' },
    { day: '23', views: 2200, height: '44%' },
    { day: '24', views: 3200, height: '64%' },
    { day: '25', views: 2900, height: '58%' },
    { day: '26', views: 5000, height: '100%' },
    { day: '27', views: 4500, height: '90%' }
  ];

  return (
    <view className="chart-section">
      <text className="chart-title">Views Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          <text className="y-axis-label">5.2K</text>
          <text className="y-axis-label">2.6K</text>
          <text className="y-axis-label">2.4K</text>
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view 
                  className="chart-bar"
                  style={{ 
                    height: item.height,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <text className="bar-label">{item.day}</text>
              </view>
            ))}
          </view>
        </view>
      </view>
      <view className="chart-legend">
        <view className="legend-item">
          <view className="legend-dot" />
          <text className="legend-text">Views</text>
        </view>
      </view>
    </view>
  );
};

// Metrics Grid Component
const MetricsGrid = () => {
  return (
    <view className="metrics-grid">
      <EngagementCard />
      <WatchTimeCard />
      <CommentsCard />
      <SharesCard />
    </view>
  );
};

// Engagement Card Component
const EngagementCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Engagement rate tapped');
  };

  return (
    <view 
      className="metric-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="metric-icon">
        <text>❤️</text>
      </view>
      <text className="metric-label">Engagement Rate</text>
      <text className="metric-value">8.4%</text>
      <text className="metric-change positive">📈 +2.1%</text>
    </view>
  );
};

// Watch Time Card Component
const WatchTimeCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Watch time tapped');
  };

  return (
    <view 
      className="metric-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="metric-icon">
        <text>👁️</text>
      </view>
      <text className="metric-label">Avg. Watch Time</text>
      <text className="metric-value">45s</text>
      <text className="metric-change positive">📈 +12%</text>
    </view>
  );
};

// Comments Card Component
const CommentsCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Comments tapped');
  };

  return (
    <view 
      className="metric-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="metric-icon">
        <text>💬</text>
      </view>
      <text className="metric-label">Comments</text>
      <text className="metric-value">1.2K</text>
      <text className="metric-change positive">📈 +89%</text>
    </view>
  );
};

// Shares Card Component
const SharesCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Shares tapped');
  };

  return (
    <view 
      className="metric-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="metric-icon">
        <text>📤</text>
      </view>
      <text className="metric-label">Shares</text>
      <text className="metric-value">340</text>
      <text className="metric-change negative">📉 -5%</text>
    </view>
  );
};

// ===== REVENUE TAB COMPONENTS =====

// Total Revenue Section Component
const TotalRevenueSection = () => {
  const handleSectionPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleSectionTap = () => {
    'background only';
    console.log('Total revenue section tapped');
  };

  return (
    <view 
      className="total-revenue-section"
      main-thread:bindtap={handleSectionPress}
      bindtap={handleSectionTap}
    >
      <text className="revenue-label">Total Revenue</text>
      <text className="revenue-value">$142.50</text>
      <view className="revenue-growth">
        <text className="growth-icon">📈</text>
        <text className="growth-text">+34.2% from last week</text>
      </view>
    </view>
  );
};

// Revenue Chart Section Component
const RevenueChartSection = () => {
  const chartData = [
    { day: '21', revenue: 12.50, height: '44%' },
    { day: '22', revenue: 15.30, height: '54%' },
    { day: '23', revenue: 13.20, height: '46%' },
    { day: '24', revenue: 18.40, height: '65%' },
    { day: '25', revenue: 16.80, height: '59%' },
    { day: '26', revenue: 28.40, height: '100%' },
    { day: '27', revenue: 25.30, height: '89%' }
  ];

  const yAxisLabels = ['$28.40', '$14.20', '$12.50'];

  return (
    <view className="chart-section">
      <text className="chart-title">Revenue Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          {yAxisLabels.map((label, index) => (
            <text key={index} className="y-axis-label">{label}</text>
          ))}
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view 
                  className="revenue-bar"
                  style={{ 
                    height: item.height,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <text className="bar-label">{item.day}</text>
              </view>
            ))}
          </view>
        </view>
      </view>
      <view className="chart-legend">
        <view className="legend-item">
          <view className="legend-dot revenue" />
          <text className="legend-text">Revenue ($)</text>
        </view>
      </view>
    </view>
  );
};

// Revenue Breakdown Section Component
const RevenueBreakdownSection = () => {
  return (
    <view className="breakdown-section">
      <text className="breakdown-title">Revenue Breakdown</text>
      <PremiumCoinsItem />
      <StandardCoinsItem />
    </view>
  );
};

// Premium Coins Item Component
const PremiumCoinsItem = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Premium coins tapped');
  };

  return (
    <view 
      className="breakdown-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="breakdown-header">
        <view className="icon-container premium">
          <text className="breakdown-icon">👑</text>
        </view>
        <view className="breakdown-info">
          <text className="breakdown-title">Premium Coins</text>
          <text className="breakdown-amount">$95.40</text>
          <text className="breakdown-percentage">66.9% of total</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view className="progress-fill premium" />
        </view>
      </view>
    </view>
  );
};

// Standard Coins Item Component
const StandardCoinsItem = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Standard coins tapped');
  };

  return (
    <view 
      className="breakdown-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="breakdown-header">
        <view className="icon-container standard">
          <text className="breakdown-icon">🪙</text>
        </view>
        <view className="breakdown-info">
          <text className="breakdown-title">Standard Coins</text>
          <text className="breakdown-amount">$47.10</text>
          <text className="breakdown-percentage">33.1% of total</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view className="progress-fill standard" />
        </view>
      </view>
    </view>
  );
};