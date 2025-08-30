// src/components/video-stats/earnings/TotalEarningsCard.tsx

interface TotalEarningsCardProps {
  videoData: any;
}

export function TotalEarningsCard({ videoData }: TotalEarningsCardProps) {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Total earnings card tapped');
  };

  // Mock growth calculation (would be from historical data)
  const growth = 8.3;

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      {/* Header */}
      <view style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <text style={{ fontSize: '32px' }}>💰</text>
        <text style={{
          color: '#9ca3af',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          Total Projected Earnings
        </text>
      </view>

      {/* Main Earnings Display */}
      <text style={{
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '8px'
      }}>
        ${videoData.proj_earnings.toFixed(2)}
      </text>

      {/* Revenue Proportion Context */}
      <text style={{
        color: '#9ca3af',
        fontSize: '14px',
        marginBottom: '12px'
      }}>
        {(videoData.rev_prop * 100).toFixed(1)}% of your total ad revenue
      </text>

      {/* Growth Indicator */}
      <view style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        background: 'rgba(16, 185, 129, 0.1)',
        padding: '8px 16px',
        borderRadius: '20px',
        width: 'fit-content',
        margin: '0 auto'
      }}>
        <text style={{ color: '#10b981', fontSize: '16px' }}>📈</text>
        <text style={{
          color: '#10b981',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          +{growth.toFixed(1)}% growth trend
        </text>
      </view>
    </view>
  );
}