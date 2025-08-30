// src/components/video-stats/overview/PerformanceMetricsGrid.tsx

interface PerformanceMetricsGridProps {
  videoData: any;
}

export function PerformanceMetricsGrid({ videoData }: PerformanceMetricsGridProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <view style={{ marginBottom: '24px' }}>
      <text style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        User Interaction Metrics
      </text>
      
      <view style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        <ViewsCard videoData={videoData} formatNumber={formatNumber} />
        <LikesCard videoData={videoData} formatNumber={formatNumber} />
        <CommentsCard videoData={videoData} formatNumber={formatNumber} />
        <SharesCard videoData={videoData} formatNumber={formatNumber} />
      </view>
    </view>
  );
}

// Views Card
interface MetricCardProps {
  videoData: any;
  formatNumber: (num: number) => string;
}

const ViewsCard = ({ videoData, formatNumber }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Views tapped');
  };

  // Calculate view velocity (views per day) - mock calculation
  const daysOld = 7; // Would be calculated from created_at
  const viewVelocity = Math.round(videoData.views / daysOld);

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
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <text style={{ fontSize: '20px' }}>👁️</text>
        <text style={{
          color: '#9ca3af',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Total Views
        </text>
      </view>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {formatNumber(videoData.views)}
      </text>
      <text style={{
        color: '#10b981',
        fontSize: '14px'
      }}>
        ~{formatNumber(viewVelocity)} views/day
      </text>
    </view>
  );
};

// Likes Card
const LikesCard = ({ videoData, formatNumber }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Likes tapped');
  };

  // Calculate like rate percentage
  const likeRate = ((videoData.likes / videoData.views) * 100).toFixed(1);

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
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <text style={{ fontSize: '20px' }}>❤️</text>
        <text style={{
          color: '#9ca3af',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Likes
        </text>
      </view>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {formatNumber(videoData.likes)}
      </text>
      <text style={{
        color: '#10b981',
        fontSize: '14px'
      }}>
        {likeRate}% like rate
      </text>
    </view>
  );
};

// Comments Card
const CommentsCard = ({ videoData, formatNumber }: MetricCardProps) => {
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

  // Calculate comment engagement rate
  const commentRate = ((videoData.comments / videoData.views) * 100).toFixed(2);

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
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <text style={{ fontSize: '20px' }}>💬</text>
        <text style={{
          color: '#9ca3af',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Comments
        </text>
      </view>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {formatNumber(videoData.comments)}
      </text>
      <text style={{
        color: '#10b981',
        fontSize: '14px'
      }}>
        {commentRate}% comment rate
      </text>
    </view>
  );
};

// Shares Card
const SharesCard = ({ videoData, formatNumber }: MetricCardProps) => {
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

  // Calculate viral coefficient (shares per view)
  const viralCoefficient = ((videoData.shares / videoData.views) * 100).toFixed(2);

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
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <text style={{ fontSize: '20px' }}>📤</text>
        <text style={{
          color: '#9ca3af',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Shares
        </text>
      </view>
      <text style={{
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '4px'
      }}>
        {formatNumber(videoData.shares)}
      </text>
      <text style={{
        color: '#10b981',
        fontSize: '14px'
      }}>
        {viralCoefficient}% viral rate
      </text>
    </view>
  );
};