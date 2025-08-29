// src/components/ForYouPage.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';
import { BottomNavigation } from './BottomNavigation.js';
import { InteractiveButton } from './InteractiveButton.js';
import { CommentModal } from './CommentModal.js';
import { ShareModal } from './ShareModal.js';
import { MusicDisc } from './MusicDisc.js';
import { UserProfile } from './UserProfile.js';
import userProfileImageUrl from '../assets/user-profile.png';
import backgroundImageUrl from '../assets/background.png';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';

interface ForYouPageProps {
  onTabChange: (tab: TabType) => void;
}

export const ForYouPage: React.FC<ForYouPageProps> = ({ onTabChange }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likeCount, setLikeCount] = useState(4445);
  const [commentCount, setCommentCount] = useState(579);

  const videoData = {
    username: "@karennne",
    description: "#avicii #wflove",
    music: "♪ Avicii - Waiting For Love (ft.",
    timestamp: "1:28"
  };

  const handleLike = () => {
    'background only';
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
  };

  const handleFollow = () => {
    'background only';
    setIsFollowing(!isFollowing);
  };

  const handleComment = () => {
    'background only';
    setShowComments(true);
  };

  const handleShare = () => {
    'background only';
    setShowShare(true);
  };

  const handleMusicPress = () => {
    'background only';
    setIsPlaying(!isPlaying);
  };

  const handleProfilePress = () => {
    'background only';
    console.log('Navigate to profile:', videoData.username);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <view style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      {/* Background Image */}
      <image
        src={backgroundImageUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Safe area container */}
      <view style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingTop: '44px' }}>
        
        {/* Top Header */}
        <view style={{
          position: 'absolute',
          top: '55px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}>
          <view style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '24px',
          }}>
            <text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Following</text>
            <text style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>For You</text>
          </view>
        </view>

        {/* Right Action Bar */}
        <view style={{ position: 'absolute', bottom: '140px', right: '12px', alignItems: 'center' }}>
          {/* User Profile */}
          <UserProfile
            username={videoData.username}
            avatarUrl={userProfileImageUrl}
            isFollowing={isFollowing}
            onFollow={handleFollow}
            onProfilePress={handleProfilePress}
            size="medium"
            showFollowButton={true}
            style={{ marginBottom: '20px' }}
          />

          {/* Like Button */}
          <InteractiveButton
            icon="♡"
            activeIcon="♥"
            count={formatCount(likeCount)}
            isActive={isLiked}
            activeColor="#ff2d55"
            inactiveColor="white"
            onPress={handleLike}
            size="medium"
            style={{ marginBottom: '20px' }}
          />

          {/* Comment Button */}
          <InteractiveButton
            icon="💬"
            count={commentCount.toString()}
            isActive={false}
            inactiveColor="white"
            onPress={handleComment}
            size="medium"
            style={{ marginBottom: '20px' }}
          />

          {/* Share Button */}
          <InteractiveButton
            icon="↗"
            count="Share"
            isActive={false}
            inactiveColor="white"
            onPress={handleShare}
            size="medium"
            style={{ marginBottom: '20px' }}
          />

          {/* Music Disc */}
          <MusicDisc
            isPlaying={isPlaying}
            size="medium"
            onPress={handleMusicPress}
          />
        </view>

        {/* Bottom Info Panel */}
        <view style={{ position: 'absolute', bottom: '140px', left: '16px', right: '80px' }}>
          <text style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            {videoData.username} • {videoData.timestamp}
          </text>
          <text style={{ color: 'white', fontSize: '15px', lineHeight: '20px', marginBottom: '12px' }}>
            {videoData.description}
          </text>
          <view style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <view style={{
              width: '16px',
              height: '16px',
              borderRadius: '8px',
              backgroundColor: '#333',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '8px'
            }}>
              <text style={{ color: 'white', fontSize: '10px' }}>♪</text>
            </view>
            <text style={{ color: 'white', fontSize: '14px' }}>
              {videoData.music}
            </text>
          </view>
        </view>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" onTabChange={onTabChange} />
      </view>

      {/* Comment Modal */}
      <CommentModal
        isVisible={showComments}
        onClose={() => setShowComments(false)}
        videoUsername={videoData.username}
        commentCount={commentCount}
      />

      {/* Share Modal */}
      <ShareModal
        isVisible={showShare}
        onClose={() => setShowShare(false)}
        videoUsername={videoData.username}
        videoDescription={videoData.description}
      />
    </view>
  );
};