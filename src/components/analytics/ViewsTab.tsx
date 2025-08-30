// src/components/analytics/ViewsTab.tsx
import type { AnalyticsData, TimeRange } from '../../data/analyticsService.js';
import { LynxChart } from './LynxChart.js';

interface ViewsTabProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
}

export function ViewsTab({ data, isLoading, timeRange }: ViewsTabProps) {
  return (
    <>
      {/* Total Views Section */}
      <TotalViewsSection
        data={data}
        isLoading={isLoading}
        timeRange={timeRange}
      />

      {/* Chart Section - Using Lynx SVG Chart */}
      {!isLoading && data ? (
        <LynxChart data={data.chartData} title="Views Over Time" type="views" />
      ) : (
        <view
          style={{
            background: '#374151',
            borderRadius: '12px',
            padding: '20px',
            margin: '16px',
          }}
        >
          <text style={{ color: 'white', fontSize: '18px' }}>
            Views Over Time
          </text>
          <text style={{ color: '#9ca3af', marginTop: '20px' }}>
            Loading chart data...
          </text>
        </view>
      )}

      {/* Metrics Grid */}
      <MetricsGrid data={data} isLoading={isLoading} />
    </>
  );
}

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
