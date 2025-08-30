// src/components/video-stats/VideoStatsHeader.tsx

interface VideoStatsHeaderProps {
  title: string;
  onBack: () => void;
}

export function VideoStatsHeader({ title, onBack }: VideoStatsHeaderProps) {
  const handleBackPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', 'rgba(255, 255, 255, 0.1)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', 'transparent');
    }, 150);
  };

  const handleBackTap = () => {
    'background only';
    onBack();
  };

  return (
    <view style={{
      height: '64px',
      background: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      borderBottom: '1px solid #374151'
    }}>
      {/* Back Button */}
      <view
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          background: 'transparent',
          transition: 'background-color 0.15s ease'
        }}
        main-thread:bindtap={handleBackPress}
        bindtap={handleBackTap}
      >
        <text style={{
          color: 'white',
          fontSize: '18px'
        }}>
          ←
        </text>
      </view>

      {/* Title */}
      <text style={{
        flex: '1',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginLeft: '-40px', // Offset the back button to center the title
        paddingRight: '40px'
      }}>
        {title}
      </text>
    </view>
  );
}