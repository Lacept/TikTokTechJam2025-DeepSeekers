// src/components/video-stats/overview/OverviewTab.tsx
import { PrimaryKPISection } from './PrimaryKPISection.js';
import { OptimizerMetricsGrid } from './OptimizerMetricsGrid.js';
import { PerformanceMetricsGrid } from './PerformanceMetricsGrid.js';
import { ViewerDemographics } from './ViewerDemographics.js';
import { TopLocationsSection } from './TopLocationsSection.js';
import type { VideoStatsData } from '../../../data/hardcodedVideoStats.js';

interface OverviewTabProps {
  videoData: VideoStatsData | null;
}

export function OverviewTab({ videoData }: OverviewTabProps) {
  if (!videoData) {
    return (
      <view style={{ padding: '20px' }}>
        <text style={{ color: 'white', textAlign: 'center' }}>Loading video data...</text>
      </view>
    );
  }

  return (
    <view style={{ 
      padding: '16px', 
      background: '#111827',
      minHeight: '150vh',
      paddingBottom: '100px'
    }}>
      {/* Primary KPIs - Most Important Business Metrics */}
      <PrimaryKPISection videoData={videoData} />

      {/* Optimizer Metrics - Green Section with Key Performance Indicators */}
      <OptimizerMetricsGrid videoData={videoData} />

      {/* Performance Metrics - User Interaction Data */}
      <PerformanceMetricsGrid videoData={videoData} />

      {/* Demographics - Viewer Breakdown */}
      <ViewerDemographics videoData={videoData} />

      {/* Top Locations - Geographic Data */}
      <TopLocationsSection videoData={videoData} />
      
      {/* Extra spacing to ensure scrolling */}
      <view style={{ height: '200px' }}>
        <text style={{ color: '#9ca3af', textAlign: 'center', marginTop: '50px' }}>
          End of Overview Data
        </text>
      </view>
    </view>
  );
}