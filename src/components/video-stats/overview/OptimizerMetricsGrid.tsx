// src/components/video-stats/overview/OptimizerMetricsGrid.tsx

interface OptimizerMetricsGridProps {
  videoData: any;
}

export function OptimizerMetricsGrid({ videoData }: OptimizerMetricsGridProps) {
  return (
    <view
      style={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
      }}
    >
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Quality Score Breakdown
      </text>

      <view
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <WatchCompletionCard videoData={videoData} />
        <EngagementRateCard videoData={videoData} />
        <EngagementDiversityCard videoData={videoData} />
        <RewatchRateCard videoData={videoData} />
      </view>

      <view
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        <NLPQualityCard videoData={videoData} />
        <ComplianceCard videoData={videoData} />
      </view>
    </view>
  );
}

// Watch Completion Card
interface MetricCardProps {
  videoData: any;
}

const WatchCompletionCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Watch completion tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        Watch Completion
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {(videoData.watch_completion * 100).toFixed(1)}%
      </text>
    </view>
  );
};

// Engagement Rate Card
const EngagementRateCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Engagement rate tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        Engagement Rate
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {(videoData.engagement_rate * 100).toFixed(1)}%
      </text>
    </view>
  );
};

// Engagement Diversity Card
const EngagementDiversityCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Engagement diversity tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        Engagement Diversity
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {(videoData.engagement_diversity * 100).toFixed(1)}%
      </text>
    </view>
  );
};

// Rewatch Rate Card
const RewatchRateCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Rewatch rate tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        Rewatch Rate
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {(videoData.rewatch * 100).toFixed(1)}%
      </text>
    </view>
  );
};

// NLP Quality Card
const NLPQualityCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('NLP quality tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        NLP Quality
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {(videoData.nlp_quality * 100).toFixed(0)}%
      </text>
    </view>
  );
};

// Compliance Card
const ComplianceCard = ({ videoData }: MetricCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    event.currentTarget.setStyleProperty(
      'background',
      'rgba(255, 255, 255, 0.1)',
    );
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
      event.currentTarget.setStyleProperty(
        'background',
        'rgba(255, 255, 255, 0.05)',
      );
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Compliance tapped');
  };

  return (
    <view
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.2s ease',
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          marginBottom: '4px',
          opacity: '0.9',
        }}
      >
        Compliance
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {videoData.compliance ? '✅' : '❌'}
      </text>
      <text
        style={{
          color: 'white',
          fontSize: '14px',
          opacity: '0.8',
        }}
      >
        {videoData.compliance ? 'Compliant' : 'Non-compliant'}
      </text>
    </view>
  );
};
