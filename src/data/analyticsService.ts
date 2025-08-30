// src/data/analyticsService.ts
import { getAllVideosData } from '../api/profile.js';
import type { Video } from '../api/profile.js';

export type TimeRange = '7d' | '30d' | '90d' | '1y';

export type AnalyticsData = {
  totalViews: number;
  totalRevenue: number;
  viewsGrowth: number;
  revenueGrowth: number;
  chartData: ChartDataPoint[];
  revenueChartData: ChartDataPoint[];
  metrics: {
    engagementRate: number;
    watchTime: number;
    comments: number;
    shares: number;
    engagementChange: number;
    watchTimeChange: number;
    commentsChange: number;
    sharesChange: number;
  };
  revenueBreakdown: {
    adRevenue: number;
    premiumCoins: number;
    standardCoins: number;
    adPercentage: number;
    premiumPercentage: number;
    standardPercentage: number;
  };
};

export type ChartDataPoint = {
  day: string;
  value: number;
  height: string;
};

// Mock data for different time ranges - in a real app this would come from API
const mockPreviousPeriodData = {
  '7d': { views: 16800, revenue: 106.2 },
  '30d': { views: 65000, revenue: 380.5 },
  '90d': { views: 195000, revenue: 1142.3 },
  '1y': { views: 850000, revenue: 4856.8 }
};

export async function getAnalyticsData(
  creatorId: number = 1,
  timeRange: TimeRange = '7d'
): Promise<AnalyticsData> {
  try {
    // Get real video data from API
    console.log('Attempting to fetch real data for creator:', creatorId);
    const videos = await getAllVideosData(creatorId);
    console.log('Fetched videos from API:', videos.length, 'videos');
    
    // Calculate analytics based on real data and time range
    const analytics = calculateAnalyticsFromVideos(videos, timeRange);
    console.log('Using real data - Total views:', analytics.totalViews, 'Total revenue:', analytics.totalRevenue);
    return analytics;
  } catch (error) {
    console.warn('Failed to fetch real data, using mock data:', error);
    const mockData = getMockAnalyticsData(timeRange);
    console.log('Using mock data - Total views:', mockData.totalViews, 'Total revenue:', mockData.totalRevenue);
    return mockData;
  }
}

function calculateAnalyticsFromVideos(videos: Video[], timeRange: TimeRange): AnalyticsData {
  // Filter videos based on time range
  const now = new Date();
  const timeRangeMs = getTimeRangeInMs(timeRange);
  const cutoffDate = new Date(now.getTime() - timeRangeMs);
  
  const filteredVideos = videos.filter(video => {
    const createdAt = new Date(video.created_at);
    return createdAt >= cutoffDate;
  });

  // Calculate totals
  const totalViews = filteredVideos.reduce((sum, video) => sum + video.views, 0);
  const totalRevenue = filteredVideos.reduce((sum, video) => sum + video.proj_earnings, 0);
  const totalComments = filteredVideos.reduce((sum, video) => sum + video.comments, 0);
  const totalShares = filteredVideos.reduce((sum, video) => sum + video.shares, 0);
  const totalLikes = filteredVideos.reduce((sum, video) => sum + video.likes, 0);

  // Calculate averages
  const avgEngagementRate = filteredVideos.length > 0 
    ? filteredVideos.reduce((sum, video) => sum + video.engagement_rate, 0) / filteredVideos.length * 100
    : 0;
  const avgWatchCompletion = filteredVideos.length > 0
    ? filteredVideos.reduce((sum, video) => sum + video.watch_completion, 0) / filteredVideos.length * 100
    : 0;

  // Generate chart data
  const chartData = generateChartData(filteredVideos, timeRange, 'views');
  const revenueChartData = generateChartData(filteredVideos, timeRange, 'revenue');

  // Calculate growth (mock for now - would need historical data)
  const mockPrevious = mockPreviousPeriodData[timeRange];
  const viewsGrowth = mockPrevious.views > 0 ? ((totalViews - mockPrevious.views) / mockPrevious.views) * 100 : 0;
  const revenueGrowth = mockPrevious.revenue > 0 ? ((totalRevenue - mockPrevious.revenue) / mockPrevious.revenue) * 100 : 0;

  // Calculate revenue breakdown (using realistic percentages)
  const adPercentage = 68.0;
  const premiumPercentage = 20.0;
  const standardPercentage = 12.0;
  const adRevenue = totalRevenue * (adPercentage / 100);
  const premiumCoins = totalRevenue * (premiumPercentage / 100);
  const standardCoins = totalRevenue * (standardPercentage / 100);

  return {
    totalViews,
    totalRevenue,
    viewsGrowth,
    revenueGrowth,
    chartData,
    revenueChartData,
    metrics: {
      engagementRate: avgEngagementRate,
      watchTime: avgWatchCompletion,
      comments: totalComments,
      shares: totalShares,
      engagementChange: 12, // Mock
      watchTimeChange: 8,   // Mock  
      commentsChange: 25,   // Mock
      sharesChange: -3,     // Mock
    },
    revenueBreakdown: {
      adRevenue,
      premiumCoins,
      standardCoins,
      adPercentage,
      premiumPercentage,
      standardPercentage,
    },
  };
}

function generateChartData(videos: Video[], timeRange: TimeRange, type: 'views' | 'revenue'): ChartDataPoint[] {
  const days = getTimeRangeDays(timeRange);
  const now = new Date();
  const points: ChartDataPoint[] = [];

  // Generate data points for the time range
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    let day: string;
    
    // Format day based on time range
    if (timeRange === '1y') {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      day = monthNames[date.getMonth()];
    } else {
      day = date.getDate().toString();
    }
    
    // For simplicity, distribute video metrics across the time range
    // In a real app, you'd group videos by actual creation date
    const dayIndex = days - 1 - i;
    const videoIndex = dayIndex % Math.max(1, videos.length);
    const video = videos[videoIndex] || { views: 0, proj_earnings: 0 };
    
    // Add some variation to make the chart more interesting
    const variation = 0.8 + Math.random() * 0.4; // 80% to 120% of base value
    const baseValue = type === 'views' ? video.views : video.proj_earnings;
    const value = Math.max(0, Math.round(baseValue * variation));
    
    points.push({
      day,
      value,
      height: '0%' // Will be calculated based on max value
    });
  }

  // Calculate heights based on max value with proper scaling
  const values = points.map(p => p.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  
  // Ensure we have a proper range for visualization
  const range = maxValue - minValue;
  const effectiveMin = range > 0 ? minValue : 0;
  const effectiveMax = range > 0 ? maxValue : Math.max(maxValue, 1);
  
  return points.map(point => {
    // Calculate percentage from 0 to max (not min to max) for better visualization
    const percentage = effectiveMax > 0 ? (point.value / effectiveMax) * 100 : 0;
    // Ensure minimum height for very small values so bars are visible
    const minVisibleHeight = 5; // 5% minimum height
    const finalHeight = Math.max(minVisibleHeight, percentage);
    
    return {
      ...point,
      height: `${finalHeight}%`
    };
  });
}

function getTimeRangeInMs(timeRange: TimeRange): number {
  switch (timeRange) {
    case '7d': return 7 * 24 * 60 * 60 * 1000;
    case '30d': return 30 * 24 * 60 * 60 * 1000;
    case '90d': return 90 * 24 * 60 * 60 * 1000;
    case '1y': return 365 * 24 * 60 * 60 * 1000;
    default: return 7 * 24 * 60 * 60 * 1000;
  }
}

function getTimeRangeDays(timeRange: TimeRange): number {
  switch (timeRange) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '1y': return 365;
    default: return 7;
  }
}

function getMockAnalyticsData(timeRange: TimeRange): AnalyticsData {
  // Generate mock chart data with proper scaling
  const generateMockChartData = (values: number[], days: string[]): ChartDataPoint[] => {
    const maxValue = Math.max(...values);
    return values.map((value, index) => ({
      day: days[index] || (index + 1).toString(),
      value,
      height: maxValue > 0 ? `${Math.max(5, (value / maxValue) * 100)}%` : '5%'
    }));
  };

  const mockData = {
    '7d': {
      totalViews: 22300,
      totalRevenue: 142.50,
      viewsGrowth: 72.6,
      revenueGrowth: 34.2,
      chartData: generateMockChartData(
        [2400, 2800, 2200, 3200, 2900, 5000, 4500],
        ['24', '25', '26', '27', '28', '29', '30']
      ),
      revenueChartData: generateMockChartData(
        [12.5, 15.3, 13.2, 18.4, 16.8, 28.4, 25.3],
        ['24', '25', '26', '27', '28', '29', '30']
      ),
    },
    '30d': {
      totalViews: 86500,
      totalRevenue: 523.75,
      viewsGrowth: 45.8,
      revenueGrowth: 28.1,
      chartData: generateMockChartData(
        [2800, 3200, 2900, 4100, 3800, 5200, 8000],
        ['1', '5', '10', '15', '20', '25', '30']
      ),
      revenueChartData: generateMockChartData(
        [18.5, 22.3, 19.8, 31.2, 28.9, 42.1, 65.7],
        ['1', '5', '10', '15', '20', '25', '30']
      ),
    },
    '90d': {
      totalViews: 245000,
      totalRevenue: 1485.25,
      viewsGrowth: 62.3,
      revenueGrowth: 41.7,
      chartData: generateMockChartData(
        [8500, 12200, 15800, 18900, 22300, 28600, 30500],
        ['1', '15', '30', '45', '60', '75', '90']
      ),
      revenueChartData: generateMockChartData(
        [52.3, 78.9, 95.4, 125.7, 156.8, 185.2, 203.6],
        ['1', '15', '30', '45', '60', '75', '90']
      ),
    },
    '1y': {
      totalViews: 985000,
      totalRevenue: 5825.40,
      viewsGrowth: 89.2,
      revenueGrowth: 67.8,
      chartData: generateMockChartData(
        [45000, 62000, 78000, 95000, 108000, 118000, 115000],
        ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec']
      ),
      revenueChartData: generateMockChartData(
        [285.3, 412.8, 548.9, 672.4, 745.6, 808.2, 798.5],
        ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec']
      ),
    },
  };

  const data = mockData[timeRange];
  
  return {
    ...data,
    metrics: {
      engagementRate: 8.4,
      watchTime: 45,
      comments: 1200,
      shares: 340,
      engagementChange: 12,
      watchTimeChange: 8,
      commentsChange: 25,
      sharesChange: -3,
    },
    revenueBreakdown: {
      adRevenue: data.totalRevenue * 0.68,
      premiumCoins: data.totalRevenue * 0.20,
      standardCoins: data.totalRevenue * 0.12,
      adPercentage: 68.0,
      premiumPercentage: 20.0,
      standardPercentage: 12.0,
    },
  };
}

export const TIME_RANGE_OPTIONS = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: '1y', label: '1 year' },
] as const;