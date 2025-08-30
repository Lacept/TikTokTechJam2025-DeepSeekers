// src/components/analytics/RevenueTab.tsx
import type { AnalyticsData, TimeRange } from '../../data/analyticsService.js';
import { LynxChart } from './LynxChart.js';

interface RevenueTabProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
}

export function RevenueTab({ data, isLoading, timeRange }: RevenueTabProps) {
  return (
    <>
      {/* Total Revenue Section */}
      <TotalRevenueSection 
        data={data} 
        isLoading={isLoading}
        timeRange={timeRange}
      />

      {/* Revenue Chart Section - Using Lynx SVG Chart */}
      {!isLoading && data ? (
        <LynxChart 
          data={data.revenueChartData}
          title="Revenue Over Time"
          type="revenue"
        />
      ) : (
        <view style={{
          background: '#374151',
          borderRadius: '12px',
          padding: '20px',
          margin: '16px'
        }}>
          <text style={{ color: 'white', fontSize: '18px' }}>Revenue Over Time</text>
          <text style={{ color: '#9ca3af', marginTop: '20px' }}>Loading chart data...</text>
        </view>
      )}

      {/* Revenue Breakdown Section */}
      <RevenueBreakdownSection 
        data={data} 
        isLoading={isLoading}
      />
    </>
  );
}

// Total Revenue Section Component
interface TotalRevenueSectionProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
}

const TotalRevenueSection = ({ data, isLoading, timeRange }: TotalRevenueSectionProps) => {
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
      case '7d': return 'last week';
      case '30d': return 'last month';
      case '90d': return 'last quarter';
      case '1y': return 'last year';
      default: return 'last week';
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
        <text className="growth-icon">{data.revenueGrowth >= 0 ? '📈' : '📉'}</text>
        <text className="growth-text">
          {data.revenueGrowth >= 0 ? '+' : ''}{data.revenueGrowth.toFixed(1)}% from {getTimePeriodText(timeRange)}
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

  // Generate dynamic Y-axis labels from 0 to max (proper chart scaling)
  const values = chartData.map(item => item.value);
  const maxValue = Math.max(...values);
  const midValue = maxValue / 2;
  const minValue = 0; // Y-axis should always start from 0

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(0)}`;
  };

  // Use pre-calculated heights from hardcoded data, or calculate if not available
  const getRevenueBarHeight = (item: any) => {
    // If we have pre-calculated height, use it
    if (item.height) {
      return item.height;
    }
    
    // Fallback calculation if height not provided
    if (maxValue === 0) return '8%';
    const percentage = (item.value / maxValue) * 100;
    const minVisibleHeight = 8;
    return `${Math.max(minVisibleHeight, percentage)}%`;
  };

  return (
    <view className="chart-section">
      <text className="chart-title">Revenue Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          <text className="y-axis-label">{formatCurrency(maxValue)}</text>
          <text className="y-axis-label">{formatCurrency(midValue)}</text>
          <text className="y-axis-label">{formatCurrency(minValue)}</text>
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view
                  className="revenue-bar"
                  style={{
                    height: getRevenueBarHeight(item),
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

const RevenueBreakdownSection = ({ data, isLoading }: RevenueBreakdownSectionProps) => {
  return (
    <view className="breakdown-section">
      <text className="breakdown-title">Revenue Breakdown</text>
      <AdRevenueItem data={data} isLoading={isLoading} />
      <PremiumCoinsItem data={data} isLoading={isLoading} />
      <StandardCoinsItem data={data} isLoading={isLoading} />
    </view>
  );
};

// Ad Revenue Item Component
const AdRevenueItem = ({ data, isLoading }: BreakdownItemProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Ad revenue tapped');
  };

  if (isLoading || !data) {
    return (
      <view className="breakdown-item">
        <view className="breakdown-header">
          <view className="icon-container ad-revenue">
            <text className="breakdown-icon">📺</text>
          </view>
          <view className="breakdown-info">
            <text className="breakdown-title">Ad Revenue</text>
            <text className="breakdown-amount">Loading...</text>
            <text className="breakdown-percentage">-- of total</text>
          </view>
        </view>
        <view className="progress-container">
          <view className="progress-track">
            <view className="progress-fill ad-revenue" style={{ width: '0%' }} />
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
        <view className="icon-container ad-revenue">
          <text className="breakdown-icon">📺</text>
        </view>
        <view className="breakdown-info">
          <text className="breakdown-title">Ad Revenue</text>
          <text className="breakdown-amount">${data.revenueBreakdown.adRevenue.toFixed(2)}</text>
          <text className="breakdown-percentage">{data.revenueBreakdown.adPercentage.toFixed(1)}% of total</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view className="progress-fill ad-revenue" style={{ width: `${data.revenueBreakdown.adPercentage}%` }} />
        </view>
      </view>
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
            <text className="breakdown-title">Premium Coins</text>
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
          <text className="breakdown-title">Premium Coins</text>
          <text className="breakdown-amount">${data.revenueBreakdown.premiumCoins.toFixed(2)}</text>
          <text className="breakdown-percentage">{data.revenueBreakdown.premiumPercentage}% of total</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view className="progress-fill premium" style={{ width: `${data.revenueBreakdown.premiumPercentage}%` }} />
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
          <text className="breakdown-amount">${data.revenueBreakdown.standardCoins.toFixed(2)}</text>
          <text className="breakdown-percentage">{data.revenueBreakdown.standardPercentage}% of total</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view className="progress-fill standard" style={{ width: `${data.revenueBreakdown.standardPercentage}%` }} />
        </view>
      </view>
    </view>
  );
};