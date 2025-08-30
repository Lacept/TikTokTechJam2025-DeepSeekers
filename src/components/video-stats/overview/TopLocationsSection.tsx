// src/components/video-stats/overview/TopLocationsSection.tsx

interface TopLocationsSectionProps {
  videoData: any;
}

export function TopLocationsSection({ videoData }: TopLocationsSectionProps) {
  if (!videoData.demographics?.top_locations) {
    return null;
  }

  const { top_locations } = videoData.demographics;
  
  // Convert to array and sort by percentage
  const sortedLocations = Object.entries(top_locations)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5); // Top 5 locations

  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Top locations tapped');
  };

  return (
    <view style={{ marginBottom: '24px' }}>
      <text style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Top Locations
      </text>
      
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
          marginBottom: '16px'
        }}>
          <text style={{ fontSize: '18px' }}>🌍</text>
          <text style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Geographic Distribution
          </text>
        </view>

        {sortedLocations.map(([location, percentage], index) => (
          <LocationItem
            key={location}
            location={location}
            percentage={percentage as number}
            index={index}
            isLast={index === sortedLocations.length - 1}
          />
        ))}
      </view>
    </view>
  );
}

// Individual Location Item Component
interface LocationItemProps {
  location: string;
  percentage: number;
  index: number;
  isLast: boolean;
}

const LocationItem = ({ location, percentage, index, isLast }: LocationItemProps) => {
  const getLocationColor = (index: number) => {
    const colors = [
      '#3b82f6', // Blue
      '#10b981', // Green
      '#f59e0b', // Amber
      '#ec4899', // Pink
      '#8b5cf6'  // Purple
    ];
    return colors[index] || '#9ca3af';
  };

  const getCountryFlag = (location: string) => {
    const flags: { [key: string]: string } = {
      'Singapore': '🇸🇬',
      'Malaysia': '🇲🇾',
      'Myanmar (Burma)': '🇲🇲',
      'Philippines': '🇵🇭',
      'Thailand': '🇹🇭',
      'Indonesia': '🇮🇩',
      'Vietnam': '🇻🇳',
      'Other': '🌐'
    };
    return flags[location] || '🌐';
  };

  const handleItemPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background', 'rgba(255, 255, 255, 0.05)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background', 'transparent');
    }, 150);
  };

  const handleItemTap = () => {
    'background only';
    console.log(`Location ${location} tapped`);
  };

  return (
    <view
      style={{
        marginBottom: isLast ? '0px' : '12px',
        padding: '8px',
        borderRadius: '8px',
        transition: 'background-color 0.15s ease'
      }}
      main-thread:bindtap={handleItemPress}
      bindtap={handleItemTap}
    >
      <view style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px'
      }}>
        <view style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <text style={{ fontSize: '16px' }}>
            {getCountryFlag(location)}
          </text>
          <text style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {location}
          </text>
        </view>
        <text style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {percentage.toFixed(1)}%
        </text>
      </view>
      
      {/* Progress Bar */}
      <view style={{
        width: '100%',
        height: '4px',
        background: '#374151',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <view style={{
          width: `${Math.max(percentage, 2)}%`, // Minimum 2% for visibility
          height: '100%',
          background: getLocationColor(index),
          borderRadius: '2px',
          animation: `fillLocation${index} 0.8s ease-out forwards`
        }} />
      </view>
    </view>
  );
};