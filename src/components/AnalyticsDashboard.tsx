// src/components/AnalyticsDashboard.tsx
import { useCallback, useState } from '@lynx-js/react';
import { useAnalytics } from '../contexts/AnalyticsContext.js';
import { TIME_RANGE_OPTIONS } from '../data/analyticsService.js';
import type { AnalyticsData, TimeRange } from '../data/analyticsService.js';
import './AnalyticsDashboard.css';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'views' | 'revenue'>('views');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const { analyticsData, isLoading, refreshAnalytics } = useAnalytics();

  const handleTabSwitch = useCallback((tab: 'views' | 'revenue') => {
    'background only';
    setActiveTab(tab);
  }, []);

  const handleBackPress = useCallback(() => {
    'background only';
    onBack();
  }, [onBack]);

  const handleTimeRangeChange = useCallback(
    (newTimeRange: TimeRange) => {
      'background only';
      setTimeRange(newTimeRange);
      // Refresh data when time range changes
      refreshAnalytics(newTimeRange);
    },
    [refreshAnalytics],
  );

  return (
    <view className="analytics-dashboard">
      {/* Header */}
      <AnalyticsHeader onBack={handleBackPress} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />

      {/* Time Filter */}
      <TimeFilter
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      {/* Main Content */}
      <scroll-view className="main-content">
        {activeTab === 'views' ? (
          <>
            {/* Total Views Section */}
            <TotalViewsSection
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
              timeRange={timeRange}
            />

            {/* Chart Section */}
            <ChartSection
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
            />

            {/* Metrics Grid */}
            <MetricsGrid
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
            />
          </>
        ) : (
          <>
            {/* Total Revenue Section */}
            <TotalRevenueSection
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
              timeRange={timeRange}
            />

            {/* Revenue Chart Section */}
            <RevenueChartSection
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
            />

            {/* Revenue Breakdown Section */}
            <RevenueBreakdownSection
              data={analyticsData}
              isLoading={isLoading && !analyticsData}
            />
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
interface TimeFilterProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

const TimeFilter = ({ timeRange, onTimeRangeChange }: TimeFilterProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  const handleFilterTap = () => {
    'background only';
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: TimeRange) => {
    'background only';
    onTimeRangeChange(option);
    setIsDropdownOpen(false);
  };

  const currentLabel =
    TIME_RANGE_OPTIONS.find((opt) => opt.value === timeRange)?.label ||
    '7 days';

  return (
    <view className="time-filter">
      <view
        className="filter-button"
        main-thread:bindtap={handleFilterPress}
        bindtap={handleFilterTap}
      >
        <text className="filter-text">{currentLabel}</text>
        <text className="filter-arrow">{isDropdownOpen ? '▲' : '▼'}</text>
      </view>
      {isDropdownOpen && (
        <view className="dropdown-menu">
          {TIME_RANGE_OPTIONS.map((option) => (
            <view
              key={option.value}
              className={`dropdown-item ${timeRange === option.value ? 'selected' : ''}`}
              bindtap={() => handleOptionSelect(option.value)}
            >
              <text className="dropdown-text">{option.label}</text>
            </view>
          ))}
        </view>
      )}
    </view>
  );
};

// Total Views Section Component
interface TotalViewsSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
}

const TotalViewsSection = ({
  data,
  isLoading,
  timeRange,
}: TotalViewsSectionProps) => {
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

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getTimePeriodText = (timeRange: TimeRange) => {
    switch (timeRange) {
      case '7d':
        return 'last week';
      case '30d':
        return 'last month';
      case '90d':
        return 'last quarter';
      case '1y':
        return 'last year';
      default:
        return 'last week';
    }
  };

  if (isLoading || !data) {
    return (
      <view className="total-views-section">
        <text className="total-label">Total Views</text>
        <text className="total-value">Loading...</text>
        <view className="growth-indicator">
          <text className="growth-text">Loading data...</text>
        </view>
      </view>
    );
  }

  return (
    <view
      className="total-views-section"
      main-thread:bindtap={handleSectionPress}
      bindtap={handleSectionTap}
    >
      <text className="total-label">Total Views</text>
      <text className="total-value">{formatViews(data.totalViews)}</text>
      <view className="growth-indicator">
        <text className="growth-icon">
          {data.viewsGrowth >= 0 ? '📈' : '📉'}
        </text>
        <text className="growth-text">
          {data.viewsGrowth >= 0 ? '+' : ''}
          {data.viewsGrowth.toFixed(1)}% from {getTimePeriodText(timeRange)}
        </text>
      </view>
    </view>
  );
};

// Chart Section Component
interface ChartSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const ChartSection = ({ data, isLoading }: ChartSectionProps) => {
  if (isLoading || !data) {
    return (
      <view className="chart-section">
        <text className="chart-title">Views Over Time</text>
        <view className="chart-container">
          <text>Loading chart data...</text>
        </view>
      </view>
    );
  }

  const chartData = data.chartData;

  // Generate dynamic Y-axis labels based on actual data
  const values = chartData.map((item) => item.value);
  const maxValue = Math.max(...values);
  const midValue = maxValue / 2;
  const minValue = Math.min(...values);

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  // Calculate proper heights for bars (the service already does this, but let's ensure it's correct)
  const getBarHeight = (item: any) => {
    if (maxValue === 0) return '8%'; // Minimum height if no data

    const percentage = (item.value / maxValue) * 100;
    const minVisibleHeight = 8; // 8% minimum height for visibility
    return `${Math.max(minVisibleHeight, percentage)}%`;
  };

  return (
    <view className="chart-section">
      <text className="chart-title">Views Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          <text className="y-axis-label">{formatValue(maxValue)}</text>
          <text className="y-axis-label">{formatValue(midValue)}</text>
          <text className="y-axis-label">{formatValue(minValue)}</text>
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view
                  className="chart-bar"
                  style={{
                    height: getBarHeight(item),
                    animationDelay: `${index * 0.1}s`,
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
interface MetricsGridProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const MetricsGrid = ({ data, isLoading }: MetricsGridProps) => {
  return (
    <view className="metrics-grid">
      <EngagementCard data={data} isLoading={isLoading} />
      <WatchTimeCard data={data} isLoading={isLoading} />
      <CommentsCard data={data} isLoading={isLoading} />
      <SharesCard data={data} isLoading={isLoading} />
    </view>
  );
};

// Engagement Card Component
interface MetricCardProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const EngagementCard = ({ data, isLoading }: MetricCardProps) => {
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

  if (isLoading || !data) {
    return (
      <view className="metric-card loading">
        <view className="metric-icon">
          <text>❤️</text>
        </view>
        <text className="metric-label">Engagement Rate</text>
        <text className="metric-value">--</text>
        <text className="metric-change">Loading...</text>
      </view>
    );
  }

  const changeClass =
    data.metrics.engagementChange >= 0 ? 'positive' : 'negative';
  const changeIcon = data.metrics.engagementChange >= 0 ? '📈' : '📉';

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
      <text className="metric-value">
        {data.metrics.engagementRate.toFixed(1)}%
      </text>
      <text className={`metric-change ${changeClass}`}>
        {changeIcon} {data.metrics.engagementChange >= 0 ? '+' : ''}
        {data.metrics.engagementChange}%
      </text>
    </view>
  );
};

// Watch Time Card Component
const WatchTimeCard = ({ data, isLoading }: MetricCardProps) => {
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

  if (isLoading || !data) {
    return (
      <view className="metric-card loading">
        <view className="metric-icon">
          <text>👁️</text>
        </view>
        <text className="metric-label">Avg. Watch Time</text>
        <text className="metric-value">--</text>
        <text className="metric-change">Loading...</text>
      </view>
    );
  }

  const changeClass =
    data.metrics.watchTimeChange >= 0 ? 'positive' : 'negative';
  const changeIcon = data.metrics.watchTimeChange >= 0 ? '📈' : '📉';

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
      <text className="metric-value">
        {Math.round(data.metrics.watchTime)}%
      </text>
      <text className={`metric-change ${changeClass}`}>
        {changeIcon} {data.metrics.watchTimeChange >= 0 ? '+' : ''}
        {data.metrics.watchTimeChange}%
      </text>
    </view>
  );
};

// Comments Card Component
const CommentsCard = ({ data, isLoading }: MetricCardProps) => {
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (isLoading || !data) {
    return (
      <view className="metric-card loading">
        <view className="metric-icon">
          <text>💬</text>
        </view>
        <text className="metric-label">Comments</text>
        <text className="metric-value">--</text>
        <text className="metric-change">Loading...</text>
      </view>
    );
  }

  const changeClass =
    data.metrics.commentsChange >= 0 ? 'positive' : 'negative';
  const changeIcon = data.metrics.commentsChange >= 0 ? '📈' : '📉';

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
      <text className="metric-value">
        {formatNumber(data.metrics.comments)}
      </text>
      <text className={`metric-change ${changeClass}`}>
        {changeIcon} {data.metrics.commentsChange >= 0 ? '+' : ''}
        {data.metrics.commentsChange}%
      </text>
    </view>
  );
};

// Shares Card Component
const SharesCard = ({ data, isLoading }: MetricCardProps) => {
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (isLoading || !data) {
    return (
      <view className="metric-card loading">
        <view className="metric-icon">
          <text>📤</text>
        </view>
        <text className="metric-label">Shares</text>
        <text className="metric-value">--</text>
        <text className="metric-change">Loading...</text>
      </view>
    );
  }

  const changeClass = data.metrics.sharesChange >= 0 ? 'positive' : 'negative';
  const changeIcon = data.metrics.sharesChange >= 0 ? '📈' : '📉';

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
      <text className="metric-value">{formatNumber(data.metrics.shares)}</text>
      <text className={`metric-change ${changeClass}`}>
        {changeIcon} {data.metrics.sharesChange >= 0 ? '+' : ''}
        {data.metrics.sharesChange}%
      </text>
    </view>
  );
};

// ===== REVENUE TAB COMPONENTS =====

// Total Revenue Section Component
interface TotalRevenueSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
}

const TotalRevenueSection = ({
  data,
  isLoading,
  timeRange,
}: TotalRevenueSectionProps) => {
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

  const getTimePeriodText = (timeRange: TimeRange) => {
    switch (timeRange) {
      case '7d':
        return 'last week';
      case '30d':
        return 'last month';
      case '90d':
        return 'last quarter';
      case '1y':
        return 'last year';
      default:
        return 'last week';
    }
  };

  if (isLoading || !data) {
    return (
      <view className="total-revenue-section">
        <text className="revenue-label">Total Revenue</text>
        <text className="revenue-value">Loading...</text>
        <view className="revenue-growth">
          <text className="growth-text">Loading data...</text>
        </view>
      </view>
    );
  }

  return (
    <view
      className="total-revenue-section"
      main-thread:bindtap={handleSectionPress}
      bindtap={handleSectionTap}
    >
      <text className="revenue-label">Total Revenue</text>
      <text className="revenue-value">${data.totalRevenue.toFixed(2)}</text>
      <view className="revenue-growth">
        <text className="growth-icon">
          {data.revenueGrowth >= 0 ? '📈' : '📉'}
        </text>
        <text className="growth-text">
          {data.revenueGrowth >= 0 ? '+' : ''}
          {data.revenueGrowth.toFixed(1)}% from {getTimePeriodText(timeRange)}
        </text>
      </view>
    </view>
  );
};

// Revenue Chart Section Component
interface RevenueChartSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const RevenueChartSection = ({ data, isLoading }: RevenueChartSectionProps) => {
  if (isLoading || !data) {
    return (
      <view className="chart-section">
        <text className="chart-title">Revenue Over Time</text>
        <view className="chart-container">
          <text>Loading chart data...</text>
        </view>
      </view>
    );
  }

  const chartData = data.revenueChartData;
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const midValue = maxValue / 2;
  const minValue = Math.min(...chartData.map((d) => d.value));
  const yAxisLabels = [
    `$${maxValue.toFixed(2)}`,
    `$${midValue.toFixed(2)}`,
    `$${minValue.toFixed(2)}`,
  ];

  return (
    <view className="chart-section">
      <text className="chart-title">Revenue Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          {yAxisLabels.map((label, index) => (
            <text key={index} className="y-axis-label">
              {label}
            </text>
          ))}
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view
                  className="revenue-bar"
                  style={{
                    height: `${Math.max(8, (item.value / Math.max(...chartData.map((d) => d.value))) * 100)}%`,
                    animationDelay: `${index * 0.1}s`,
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
interface RevenueBreakdownSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const RevenueBreakdownSection = ({
  data,
  isLoading,
}: RevenueBreakdownSectionProps) => {
  return (
    <view className="breakdown-section">
      <text className="breakdown-title">Revenue Breakdown</text>
      <PremiumCoinsItem data={data} isLoading={isLoading} />
      <StandardCoinsItem data={data} isLoading={isLoading} />
    </view>
  );
};

// Premium Coins Item Component
interface BreakdownItemProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

const PremiumCoinsItem = ({ data, isLoading }: BreakdownItemProps) => {
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

  if (isLoading || !data) {
    return (
      <view className="breakdown-item">
        <view className="breakdown-header">
          <view className="icon-container premium">
            <text className="breakdown-icon">👑</text>
          </view>
          <view className="breakdown-info">
            <text className="breakdown-title"> ByteCoins</text>
            <text className="breakdown-amount">Loading...</text>
            <text className="breakdown-percentage">-- of total</text>
          </view>
        </view>
        <view className="progress-container">
          <view className="progress-track">
            <view className="progress-fill premium" style={{ width: '0%' }} />
          </view>
        </view>
      </view>
    );
  }

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
          <text className="breakdown-title"> ByteCoins</text>
          <text className="breakdown-amount">
            ${data.revenueBreakdown.premiumCoins.toFixed(2)}
          </text>
          <text className="breakdown-percentage">
            {data.revenueBreakdown.premiumPercentage}% of total
          </text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view
            className="progress-fill premium"
            style={{ width: `${data.revenueBreakdown.premiumPercentage}%` }}
          />
        </view>
      </view>
    </view>
  );
};

// Standard Coins Item Component
const StandardCoinsItem = ({ data, isLoading }: BreakdownItemProps) => {
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

  if (isLoading || !data) {
    return (
      <view className="breakdown-item">
        <view className="breakdown-header">
          <view className="icon-container standard">
            <text className="breakdown-icon">🪙</text>
          </view>
          <view className="breakdown-info">
            <text className="breakdown-title">Standard Coins</text>
            <text className="breakdown-amount">Loading...</text>
            <text className="breakdown-percentage">-- of total</text>
          </view>
        </view>
        <view className="progress-container">
          <view className="progress-track">
            <view className="progress-fill standard" style={{ width: '0%' }} />
          </view>
        </view>
      </view>
    );
  }

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
          <text className="breakdown-amount">
            ${data.revenueBreakdown.standardCoins.toFixed(2)}
          </text>
          <text className="breakdown-percentage">
            {data.revenueBreakdown.standardPercentage}% of total
          </text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view
            className="progress-fill standard"
            style={{ width: `${data.revenueBreakdown.standardPercentage}%` }}
          />
        </view>
      </view>
    </view>
  );
};
