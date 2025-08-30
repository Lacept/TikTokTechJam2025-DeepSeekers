// src/components/video-stats/overview/ViewerDemographics.tsx

interface ViewerDemographicsProps {
  videoData: any;
}

export function ViewerDemographics({ videoData }: ViewerDemographicsProps) {
  if (!videoData.demographics) {
    return null;
  }

  return (
    <view style={{ marginBottom: '24px' }}>
      <text style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Viewer Demographics
      </text>
      
      <view style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <GenderDistribution demographics={videoData.demographics} />
        <AgeDistribution demographics={videoData.demographics} />
      </view>
    </view>
  );
}

// Gender Distribution Component
interface DemographicsProps {
  demographics: any;
}

const GenderDistribution = ({ demographics }: DemographicsProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Gender distribution tapped');
  };

  const { gender } = demographics;

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
        marginBottom: '12px'
      }}>
        <text style={{ fontSize: '18px' }}>👥</text>
        <text style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Gender Distribution
        </text>
      </view>

      {/* Male Bar */}
      <view style={{ marginBottom: '8px' }}>
        <view style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <text style={{ color: '#9ca3af', fontSize: '14px' }}>Male</text>
          <text style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            {gender.male}%
          </text>
        </view>
        <view style={{
          width: '100%',
          height: '6px',
          background: '#374151',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <view style={{
            width: `${gender.male}%`,
            height: '100%',
            background: '#3b82f6',
            borderRadius: '3px'
          }} />
        </view>
      </view>

      {/* Female Bar */}
      <view style={{ marginBottom: '8px' }}>
        <view style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <text style={{ color: '#9ca3af', fontSize: '14px' }}>Female</text>
          <text style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
            {gender.female}%
          </text>
        </view>
        <view style={{
          width: '100%',
          height: '6px',
          background: '#374151',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <view style={{
            width: `${gender.female}%`,
            height: '100%',
            background: '#ec4899',
            borderRadius: '3px'
          }} />
        </view>
      </view>

      {/* Other Bar (if > 0) */}
      {gender.other > 0 && (
        <view>
          <view style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px'
          }}>
            <text style={{ color: '#9ca3af', fontSize: '14px' }}>Other</text>
            <text style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
              {gender.other}%
            </text>
          </view>
          <view style={{
            width: '100%',
            height: '6px',
            background: '#374151',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <view style={{
              width: `${gender.other}%`,
              height: '100%',
              background: '#10b981',
              borderRadius: '3px'
            }} />
          </view>
        </view>
      )}
    </view>
  );
};

// Age Distribution Component
const AgeDistribution = ({ demographics }: DemographicsProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Age distribution tapped');
  };

  const { age_groups } = demographics;
  
  // Get top 3 age groups
  const sortedAgeGroups = Object.entries(age_groups)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 3);

  const getAgeGroupColor = (index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    return colors[index] || '#9ca3af';
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
      <view style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <text style={{ fontSize: '18px' }}>📊</text>
        <text style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Age Distribution (Top 3)
        </text>
      </view>

      {sortedAgeGroups.map(([ageGroup, percentage], index) => (
        <view key={ageGroup} style={{ marginBottom: '8px' }}>
          <view style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px'
          }}>
            <text style={{ color: '#9ca3af', fontSize: '12px' }}>{ageGroup}</text>
            <text style={{ color: 'white', fontSize: '12px', fontWeight: '500' }}>
              {(percentage as number)}%
            </text>
          </view>
          <view style={{
            width: '100%',
            height: '6px',
            background: '#374151',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <view style={{
              width: `${percentage}%`,
              height: '100%',
              background: getAgeGroupColor(index),
              borderRadius: '3px'
            }} />
          </view>
        </view>
      ))}
    </view>
  );
};