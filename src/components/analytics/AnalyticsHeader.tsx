// src/components/analytics/AnalyticsHeader.tsx

interface AnalyticsHeaderProps {
  onBack: () => void;
}

export function AnalyticsHeader({ onBack }: AnalyticsHeaderProps) {
  const handleBackPress = () => {
    'background only';
    onBack();
  };

  return (
    <view className="analytics-header">
      <view className="back-button" bindtap={handleBackPress}>
        <text className="back-icon">←</text>
      </view>
      <text className="header-title">Analytics</text>
      <view className="header-spacer" />
    </view>
  );
}