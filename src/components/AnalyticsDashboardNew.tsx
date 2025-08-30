// src/components/AnalyticsDashboardNew.tsx
import { useCallback, useState } from '@lynx-js/react';
import { useAnalytics } from '../contexts/AnalyticsContext.js';
import type { TimeRange } from '../data/analyticsService.js';
import { AnalyticsHeader } from './analytics/AnalyticsHeader.js';
import { TabNavigation } from './analytics/TabNavigation.js';
import { TimeFilter } from './analytics/TimeFilter.js';
import { ViewsTab } from './analytics/ViewsTab.js';
import { RevenueTab } from './analytics/RevenueTab.js';
import { ContentTab } from './analytics/ContentTab.js';
import './AnalyticsDashboard.css';

interface AnalyticsDashboardProps {
  onBack: () => void;
  onVideoSelect?: (videoId: number) => void;
}

export function AnalyticsDashboardNew({ onBack, onVideoSelect }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'views' | 'revenue' | 'content'>('views');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const { analyticsData, isLoading, refreshAnalytics } = useAnalytics();

  const handleTabSwitch = useCallback((tab: 'views' | 'revenue' | 'content') => {
    'background only';
    setActiveTab(tab);
  }, []);

  const handleBackPress = useCallback(() => {
    'background only';
    onBack();
  }, [onBack]);

  const handleTimeRangeChange = useCallback((newTimeRange: TimeRange) => {
    'background only';
    setTimeRange(newTimeRange);
    // Refresh data when time range changes
    refreshAnalytics(newTimeRange);
  }, [refreshAnalytics]);

  const handleVideoSelect = useCallback((videoId: number) => {
    'background only';
    if (onVideoSelect) {
      onVideoSelect(videoId);
    }
  }, [onVideoSelect]);

  return (
    <view className="analytics-dashboard">
      {/* Header */}
      <AnalyticsHeader onBack={handleBackPress} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />

      {/* Time Filter */}
      <TimeFilter timeRange={timeRange} onTimeRangeChange={handleTimeRangeChange} />

      {/* Main Content */}
      <scroll-view className="main-content">
        {activeTab === 'views' ? (
          <ViewsTab 
            data={analyticsData} 
            isLoading={isLoading && !analyticsData} 
            timeRange={timeRange}
          />
        ) : activeTab === 'revenue' ? (
          <RevenueTab 
            data={analyticsData} 
            isLoading={isLoading && !analyticsData}
            timeRange={timeRange}
          />
        ) : (
          <ContentTab
            data={analyticsData}
            isLoading={isLoading && !analyticsData}
            timeRange={timeRange}
            onVideoSelect={handleVideoSelect}
          />
        )}
      </scroll-view>
    </view>
  );
}