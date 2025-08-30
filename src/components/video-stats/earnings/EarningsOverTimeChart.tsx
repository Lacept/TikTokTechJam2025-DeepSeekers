// src/components/video-stats/earnings/EarningsOverTimeChart.tsx
import { LynxChart } from '../../analytics/LynxChart.js';
import type { ChartDataPoint } from '../../../data/analyticsService.js';

interface EarningsOverTimeChartProps {
  videoData: any;
}

export function EarningsOverTimeChart({ videoData }: EarningsOverTimeChartProps) {
  if (!videoData.earnings_timeline || videoData.earnings_timeline.length === 0) {
    return null;
  }

  // Transform earnings_timeline data to ChartDataPoint format
  const chartData: ChartDataPoint[] = videoData.earnings_timeline.map((item: any) => ({
    day: item.date,
    value: item.amount
  }));

  return (
    <view style={{ marginBottom: '20px' }}>
      <LynxChart 
        data={chartData}
        title="Earnings Over Time"
        type="revenue"
      />
      
      {/* Summary Stats */}
      <view style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        margin: '16px',
        marginTop: '0'
      }}>
        <view style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          <view style={{ textAlign: 'center' }}>
            <text style={{
              color: '#9ca3af',
              fontSize: '14px',
              marginBottom: '4px'
            }}>
              Average Weekly
            </text>
            <text style={{
              color: '#fbbf24',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              ${(videoData.proj_earnings / videoData.earnings_timeline.length).toFixed(2)}
            </text>
          </view>
          <view style={{ textAlign: 'center' }}>
            <text style={{
              color: '#9ca3af',
              fontSize: '14px',
              marginBottom: '4px'
            }}>
              Peak Week
            </text>
            <text style={{
              color: '#10b981',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              ${Math.max(...videoData.earnings_timeline.map((item: any) => item.amount)).toFixed(2)}
            </text>
          </view>
        </view>
      </view>
    </view>
  );
}