// src/components/video-stats/earnings/EarningsPerViewCard.tsx

interface EarningsPerViewCardProps {
  videoData: any;
}

export function EarningsPerViewCard({ videoData }: EarningsPerViewCardProps) {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Earnings per view card tapped');
  };

  const earningsPerView = videoData.earnings_per_view || 
    (videoData.views > 0 ? videoData.proj_earnings / videoData.views : 0);

  // Average earnings per view across industry (mock data)
  const industryAverage = 0.0015;
  const isAboveAverage = earningsPerView > industryAverage;
  const performancePercent = ((earningsPerView - industryAverage) / industryAverage * 100);

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      {/* Header */}
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <text style={{ fontSize: '20px' }}>💎</text>
        <text style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Earnings Per View
        </text>
      </view>

      {/* Main Metric */}
      <view style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <text style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold'
        }}>
          ${earningsPerView.toFixed(4)}
        </text>
        <text style={{
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          per view
        </text>
      </view>

      {/* Performance Comparison */}
      <view style={{
        background: isAboveAverage ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <view style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <text style={{
            color: '#9ca3af',
            fontSize: '12px'
          }}>
            vs Industry Average
          </text>
          <text style={{
            color: isAboveAverage ? '#10b981' : '#ef4444',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {isAboveAverage ? '📈' : '📉'} {isAboveAverage ? '+' : ''}{performancePercent.toFixed(1)}%
          </text>
        </view>
        
        <text style={{
          color: isAboveAverage ? '#10b981' : '#ef4444',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {isAboveAverage ? 'Above Average' : 'Below Average'} (${industryAverage.toFixed(4)})
        </text>
      </view>

      {/* Additional Context */}
      <view style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        paddingTop: '16px',
        borderTop: '1px solid #374151'
      }}>
        <view>
          <text style={{
            color: '#9ca3af',
            fontSize: '12px',
            marginBottom: '4px'
          }}>
            Total Views
          </text>
          <text style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            {videoData.views.toLocaleString()}
          </text>
        </view>
        <view>
          <text style={{
            color: '#9ca3af',
            fontSize: '12px',
            marginBottom: '4px'
          }}>
            Efficiency Rating
          </text>
          <text style={{
            color: isAboveAverage ? '#10b981' : '#f59e0b',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            {isAboveAverage ? 'High' : 'Moderate'}
          </text>
        </view>
      </view>
    </view>
  );
}