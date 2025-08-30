// src/components/video-stats/earnings/EarningsTab.tsx
import { TotalEarningsCard } from './TotalEarningsCard.js';
import { EarningsOverTimeChart } from './EarningsOverTimeChart.js';
import { EarningsPerViewCard } from './EarningsPerViewCard.js';
import { EarningSplitSection } from './EarningSplitSection.js';
import type { VideoStatsData } from '../../../data/hardcodedVideoStats.js';

interface EarningsTabProps {
  videoData: VideoStatsData | null;
}

export function EarningsTab({ videoData }: EarningsTabProps) {
  if (!videoData) {
    return (
      <view style={{ padding: '20px' }}>
        <text style={{ color: 'white', textAlign: 'center' }}>Loading earnings data...</text>
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
      {/* Total Earnings Card */}
      <TotalEarningsCard videoData={videoData} />

      {/* Revenue Split Section - Moved to top */}
      <EarningSplitSection videoData={videoData} />

      {/* Earnings Over Time Chart - Moved below breakdown */}
      <EarningsOverTimeChart videoData={videoData} />

      {/* Earnings Per View Card */}
      <EarningsPerViewCard videoData={videoData} />
      
      {/* Extra spacing to ensure scrolling */}
      <view style={{ height: '200px' }}>
        <text style={{ color: '#9ca3af', textAlign: 'center', marginTop: '50px' }}>
          End of Earnings Data
        </text>
      </view>
    </view>
  );
}