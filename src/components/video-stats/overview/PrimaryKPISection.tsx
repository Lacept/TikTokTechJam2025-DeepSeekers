// src/components/video-stats/overview/PrimaryKPISection.tsx

interface PrimaryKPISectionProps {
  videoData: any;
}

export function PrimaryKPISection({ videoData }: PrimaryKPISectionProps) {
  return (
    <view style={{ marginBottom: '24px' }}>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Key Business Metrics
      </text>
      
      <view style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <ProjectedEarningsCard videoData={videoData} />
        <RevenueProportionCard videoData={videoData} />
        <QualityScoreCard videoData={videoData} />
      </view>
    </view>
  );
}

// Projected Earnings Card
interface KPICardProps {
  videoData: any;
}

const ProjectedEarningsCard = ({ videoData }: KPICardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Projected earnings tapped');
  };

  // Mock growth calculation
  const growth = 12.5; // Would be calculated from historical data

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{ marginBottom: '8px' }}>
        <text style={{
          color: '#10b981',
          fontSize: '24px'
        }}>
          💰
        </text>
      </view>
      <text style={{
        color: '#9ca3af',
        fontSize: '14px',
        marginBottom: '4px'
      }}>
        Projected Earnings
      </text>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        ${videoData.proj_earnings.toFixed(2)}
      </text>
      <view style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <text style={{ color: '#10b981', fontSize: '14px' }}>
          📈 +{growth.toFixed(1)}%
        </text>
      </view>
    </view>
  );
};

// Revenue Proportion Card
const RevenueProportionCard = ({ videoData }: KPICardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Revenue proportion tapped');
  };

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{ marginBottom: '8px' }}>
        <text style={{
          color: '#3b82f6',
          fontSize: '24px'
        }}>
          📊
        </text>
      </view>
      <text style={{
        color: '#9ca3af',
        fontSize: '14px',
        marginBottom: '4px'
      }}>
        Revenue Proportion
      </text>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {(videoData.rev_prop * 100).toFixed(1)}%
      </text>
      <text style={{
        color: '#9ca3af',
        fontSize: '14px'
      }}>
        of total ad revenue
      </text>
    </view>
  );
};

// Quality Score Card
const QualityScoreCard = ({ videoData }: KPICardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Quality score tapped');
  };

  const getQualityColor = (score: number) => {
    if (score >= 0.8) return '#10b981'; // Green
    if (score >= 0.6) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const qualityColor = getQualityColor(videoData.quality_score);

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{ marginBottom: '8px' }}>
        <text style={{
          color: qualityColor,
          fontSize: '24px'
        }}>
          ⭐
        </text>
      </view>
      <text style={{
        color: '#9ca3af',
        fontSize: '14px',
        marginBottom: '4px'
      }}>
        Quality Score
      </text>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {(videoData.quality_score * 100).toFixed(0)}%
      </text>
      <text style={{
        color: qualityColor,
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {videoData.quality_score >= 0.8 ? 'Excellent' : 
         videoData.quality_score >= 0.6 ? 'Good' : 'Needs Improvement'}
      </text>
    </view>
  );
};