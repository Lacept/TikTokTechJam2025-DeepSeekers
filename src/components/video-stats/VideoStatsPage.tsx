// src/components/video-stats/VideoStatsPage.tsx
import { useState, useEffect } from '@lynx-js/react';
import { VideoStatsHeader } from './VideoStatsHeader.js';
import { VideoStatsTabNavigation } from './VideoStatsTabNavigation.js';
import { OverviewTab } from './overview/OverviewTab.js';
import { EarningsTab } from './earnings/EarningsTab.js';
import { getHardcodedVideoStats } from '../../data/hardcodedVideoStats.js';
import type { VideoStatsData } from '../../data/hardcodedVideoStats.js';
import './VideoStats.css';

interface VideoStatsPageProps {
  videoId: number;
  onBack: () => void;
}


export function VideoStatsPage({ videoId, onBack }: VideoStatsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings'>('overview');
  const [videoData, setVideoData] = useState<VideoStatsData | null>(null);

  useEffect(() => {
    'background only';
    const data = getHardcodedVideoStats(videoId);
    setVideoData(data);
  }, [videoId]);

  const handleTabChange = (tab: 'overview' | 'earnings') => {
    'background only';
    setActiveTab(tab);
  };

  const handleBack = () => {
    'background only';
    onBack();
  };

  if (!videoData) {
    return (
      <view style={{ 
        flex: 1, 
        background: '#111827', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <text style={{ color: 'white', fontSize: '16px' }}>
          Loading video data...
        </text>
      </view>
    );
  }


  return (
    <view style={{ flex: 1, background: '#111827', height: '100vh' }}>
      {/* Header */}
      <VideoStatsHeader 
        title={videoData?.title || 'Loading...'} 
        onBack={handleBack}
      />

      {/* Tab Navigation */}
      <VideoStatsTabNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <scroll-view 
        style={{ 
          flex: 1, 
          background: '#111827',
          height: 'calc(100vh - 112px)', // Subtract header (64px) + tabs (48px)
          overflow: 'auto'
        }}
        scroll-orientation="vertical"
        show-scrollbar="true"
      >
        <view style={{ minHeight: '120vh', padding: '0' }}>
          {activeTab === 'overview' ? (
            <OverviewTab videoData={videoData} />
          ) : (
            <EarningsTab videoData={videoData} />
          )}
        </view>
      </scroll-view>
    </view>
  );
}