// src/components/VideoGrid.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

interface Video {
  id: number;
  thumbnail: string;
  views?: string;
  duration?: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoPress?: (video: Video) => void;
  onCreatePress?: () => void;
  showCreateButton?: boolean;
  style?: object;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onVideoPress,
  onCreatePress,
  showCreateButton = true,
  style = {}
}) => {
  const [pressedVideo, setPressedVideo] = useState<number | 'create' | null>(null);

  const handleVideoPress = (video: Video) => {
    'background only';
    setPressedVideo(video.id);
    setTimeout(() => setPressedVideo(null), 150);
    onVideoPress?.(video);
  };

  const handleCreatePress = () => {
    'background only';
    setPressedVideo('create');
    setTimeout(() => setPressedVideo(null), 150);
    onCreatePress?.();
  };

  const handlePressStart = (id: number | 'create') => {
    'main thread';
    setPressedVideo(id);
  };

  const handlePressEnd = () => {
    'main thread';
    setPressedVideo(null);
  };

  return (
    <view style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '1px',
      ...style
    }}>
      {videos.map((video) => (
        <view 
          key={video.id}
          style={{
            width: '33.333%',
            aspectRatio: '9/16',
            padding: '1px'
          }}
        >
          <view
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              opacity: pressedVideo === video.id ? 0.8 : 1,
              transform: pressedVideo === video.id ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.1s ease'
            }}
            bindtap={() => handleVideoPress(video)}
            main-thread:bindtouchstart={() => handlePressStart(video.id)}
            main-thread:bindtouchend={handlePressEnd}
          >
            <image
              src={video.thumbnail}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '4px'
              }}
            />
            
            {/* Video overlay info */}
            {(video.views || video.duration) && (
              <view style={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                right: '4px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {video.views && (
                  <text style={{
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    borderRadius: '2px'
                  }}>
                    {video.views}
                  </text>
                )}
                {video.duration && (
                  <text style={{
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    borderRadius: '2px'
                  }}>
                    {video.duration}
                  </text>
                )}
              </view>
            )}
          </view>
        </view>
      ))}
      
      {/* Create Video Button */}
      {showCreateButton && (
        <view style={{
          width: '33.333%',
          aspectRatio: '9/16',
          padding: '1px'
        }}>
          <view 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: pressedVideo === 'create' ? '#e8f4fd' : '#f0f8ff',
              borderRadius: '4px',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              opacity: pressedVideo === 'create' ? 0.8 : 1,
              transform: pressedVideo === 'create' ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.1s ease'
            }}
            bindtap={handleCreatePress}
            main-thread:bindtouchstart={() => handlePressStart('create')}
            main-thread:bindtouchend={handlePressEnd}
          >
            {/* Background gradient effect */}
            <view style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(78,205,196,0.1))',
              borderRadius: '4px'
            }} />
            
            {/* Content */}
            <text style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '4px',
              textAlign: 'center'
            }}>
              Tap to create
            </text>
            <text style={{
              fontSize: '12px',
              color: '#666',
              textAlign: 'center'
            }}>
              a new video
            </text>
          </view>
        </view>
      )}
    </view>
  );
};