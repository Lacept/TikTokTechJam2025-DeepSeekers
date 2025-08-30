// src/components/analytics/ContentTab.tsx
import { useState, useEffect } from '@lynx-js/react';
import type { AnalyticsData, TimeRange } from '../../data/analyticsService.js';
import { getHardcodedVideoList, getTopPerformingVideos } from '../../data/hardcodedVideoStats.js';
import type { VideoListData } from '../../data/hardcodedVideoStats.js';
import { VideoCard } from './VideoCard.js';

interface ContentTabProps {
  data: AnalyticsData | null;
  isLoading: boolean;
  timeRange: TimeRange;
  onVideoSelect: (videoId: number) => void;
}


export function ContentTab({ data, isLoading, timeRange, onVideoSelect }: ContentTabProps) {
  const [videos, setVideos] = useState<VideoListData[]>([]);

  useEffect(() => {
    'background only';
    const videoData = getHardcodedVideoList();
    
    // Filter videos by time range if needed (for now show all)
    const filteredVideos = videoData.filter((video: VideoListData) => {
      // Could filter by created_at based on timeRange, for now show all
      return true;
    });

    setVideos(filteredVideos);
  }, [timeRange]);

  if (isLoading) {
    return (
      <view className="content-tab">
        <text className="loading-text">Loading content data...</text>
      </view>
    );
  }

  return (
    <view className="content-tab">
      {/* Top Performing Content Section */}
      <TopPerformingSection 
        videos={getTopPerformingVideos(3)} 
        onVideoSelect={onVideoSelect}
      />

      {/* Full Video List */}
      <view className="section-header">
        <text className="section-title">All Content</text>
        <text className="section-subtitle">{videos.length} videos</text>
      </view>

      <list
        className="video-list"
        list-type="single"
        span-count={1}
        scroll-orientation="vertical"
      >
        {videos.map((video, index) => (
          <list-item
            key={video.video_id}
            item-key={`video-${video.video_id}`}
          >
            <VideoCard
              video={video}
              onPress={() => onVideoSelect(video.video_id)}
            />
          </list-item>
        ))}
      </list>
    </view>
  );
}

// Top Performing Content Section
interface TopPerformingSectionProps {
  videos: VideoListData[];
  onVideoSelect: (videoId: number) => void;
}

const TopPerformingSection = ({ videos, onVideoSelect }: TopPerformingSectionProps) => {
  return (
    <view className="top-performing-section">
      <text className="section-title">Top Performing Content</text>
      <view className="top-videos-vertical">
        {videos.map((video) => (
          <VideoCard
            key={video.video_id}
            video={video}
            onPress={() => onVideoSelect(video.video_id)}
          />
        ))}
      </view>
    </view>
  );
};