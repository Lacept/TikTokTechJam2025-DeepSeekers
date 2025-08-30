// src/components/analytics/VideoCard.tsx
import type { VideoListData } from '../../data/hardcodedVideoStats.js';

interface VideoCardProps {
  video: VideoListData;
  onPress: () => void;
}

export const VideoCard = ({ video, onPress }: VideoCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.99)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    onPress();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getQualityColor = (score: number) => {
    if (score >= 0.8) return '#10b981'; // Green
    if (score >= 0.6) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <view
      className="video-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      {/* Video Thumbnail */}
      <view className="video-thumbnail">
        <text className="thumbnail-icon">📹</text>
      </view>

      {/* Video Info */}
      <view className="video-info">
        {/* Title Row with Menu */}
        <view className="title-row">
          <text className="video-title">{video.title}</text>
          <text className="menu-icon">•••</text>
        </view>

        {/* Row 1: Views, Likes, Comments */}
        <view className="metrics-row">
          <view className="metric-item">
            <text className="metric-text">Views</text>
            <text className="metric-text">{formatNumber(video.views)}</text>
          </view>
          <view className="metric-item">
            <text className="metric-text">Likes</text>
            <text className="metric-text">{formatNumber(video.likes)}</text>
          </view>
          <view className="metric-item">
            <text className="metric-text">Comments</text>
            <text className="metric-text">{formatNumber(video.comments)}</text>
          </view>
        </view>

        {/* Row 2: Proj Rev, Compliant */}
        <view className="metrics-row">
          <view className="metric-item">
            <text className="metric-text">Revenue</text>
            <text className="metric-text">${video.proj_earnings.toFixed(2)}</text>
          </view>
          <view className="metric-item">
            <text className="metric-text">Compliant</text>
            <text className="metric-text">
              {video.compliance ? 'Yes' : 'No'}
            </text>
          </view>
          <view className="metric-item-spacer"></view>
        </view>

        {/* Row 3: Engagement, Quality */}
        <view className="metrics-row">
          <view className="metric-item">
            <text className="metric-text">Engagement</text>
            <text className="metric-text">
              {(video.engagement_rate * 100).toFixed(1)}%
            </text>
          </view>
          <view className="metric-item">
            <text className="metric-text">Quality</text>
            <text
              className="metric-text"
              style={{ color: getQualityColor(video.quality_score) }}
            >
              {(video.quality_score * 100).toFixed(0)}%
            </text>
          </view>
          <view className="metric-item-spacer"></view>
        </view>
      </view>
    </view>
  );
};
