// src/components/ProfilePage.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';
import { BottomNavigation } from './BottomNavigation.js';
import { ProfileHeader } from './ProfileHeader.js';
import { ProfileAvatar } from './ProfileAvatar.js';
import { ProfileStats } from './ProfileStats.js';
import { ProfileActionButtons } from './ProfileActionButtons.js';
import { ProfileTabSelector } from './ProfileTabSelector.js';
import { VideoGrid } from './VideoGrid.js';
import { ProfileMenuModal } from './ProfileMenuModal.js';
import userProfileImageUrl from '../assets/user-profile.png';
import backgroundImageUrl from '../assets/background.png';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';
type ProfileTabType = 'posts' | 'liked';

interface ProfilePageProps {
  onTabChange: (tab: TabType) => void;
  onNavigateToStudio?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onTabChange, onNavigateToStudio }) => {
  const [selectedTab, setSelectedTab] = useState<ProfileTabType>('posts');
  const [showMenu, setShowMenu] = useState(false);

  const profileData = {
    username: "@jacob_w",
    displayName: "Jacob West",
    following: 14,
    followers: 38,
    likes: 91,
    bio: "Tap to add bio"
  };

  // Mock video thumbnails data with more realistic data
  const videos = [
    { id: 1, thumbnail: backgroundImageUrl, views: '1.2M', duration: '0:15' },
    { id: 2, thumbnail: backgroundImageUrl, views: '856K', duration: '0:23' },
    { id: 3, thumbnail: backgroundImageUrl, views: '2.1M', duration: '0:18' },
    { id: 4, thumbnail: backgroundImageUrl, views: '445K', duration: '0:12' },
    { id: 5, thumbnail: backgroundImageUrl, views: '1.8M', duration: '0:30' },
    { id: 6, thumbnail: backgroundImageUrl, views: '623K', duration: '0:25' },
  ];

  // Event handlers
  const handleAddFriends = () => {
    'background only';
    console.log('Add friends pressed');
  };

  const handleMenu = () => {
    'background only';
    setShowMenu(true);
  };

  const handleFollowingPress = () => {
    'background only';
    console.log('Following pressed');
  };

  const handleFollowersPress = () => {
    'background only';
    console.log('Followers pressed');
  };

  const handleLikesPress = () => {
    'background only';
    console.log('Likes pressed');
  };

  const handleEditProfile = () => {
    'background only';
    console.log('Edit profile pressed');
  };

  const handleBookmark = () => {
    'background only';
    console.log('Bookmark pressed');
  };

  const handleVideoPress = (video: any) => {
    'background only';
    console.log('Video pressed:', video.id);
  };

  const handleCreatePress = () => {
    'background only';
    console.log('Create video pressed');
  };

  const handleAvatarPress = () => {
    'background only';
    console.log('Avatar pressed');
  };

  return (
    <view style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'white'
    }}>
      {/* Header */}
      <view style={{
        height: '104px',
        backgroundColor: 'white',
        paddingTop: '44px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        {/* Add Friends Button */}
        <view 
          style={{
            width: '32px',
            height: '32px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          bindtap={handleAddFriends}
        >
          <text style={{ fontSize: '20px' }}>👤</text>
        </view>

        {/* Display Name */}
        <view style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <text style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#000',
            marginRight: '4px'
          }}>
            {profileData.displayName}
          </text>
          <text style={{ 
            fontSize: '14px', 
            color: '#666'
          }}>
            ▼
          </text>
        </view>

        {/* Menu Button */}
        <view 
          style={{
            width: '32px',
            height: '32px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          bindtap={handleMenu}
        >
          <text style={{ fontSize: '20px' }}>☰</text>
        </view>
      </view>

      {/* Profile Content */}
      <scroll-view style={{
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 0,
        paddingRight: 0
      }}>
        {/* Profile Info */}
        <view style={{ padding: '20px', alignItems: 'center' }}>
          {/* Profile Avatar */}
          <view style={{
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: '#ff6b6b',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <text style={{ fontSize: '24px', color: 'white' }}>JW</text>
          </view>
          
          {/* Username */}
          <text style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '16px' 
          }}>
            {profileData.username}
          </text>

          {/* Stats */}
          <view style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginBottom: '20px'
          }}>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileData.following}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Following</text>
            </view>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileData.followers}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Followers</text>
            </view>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{profileData.likes}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Likes</text>
            </view>
          </view>

          {/* Action Buttons */}
          <view style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <view style={{
              width: '200px',
              height: '36px',
              backgroundColor: '#ff6b6b',
              borderRadius: '4px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <text style={{ color: 'white', fontWeight: 'bold' }}>Edit profile</text>
            </view>
          </view>
        </view>

        {/* TikTok Studio and Your Orders Section */}
        <view style={{
          width: '100%',
          paddingLeft: '20px',
          paddingRight: '20px',
          marginBottom: '20px',
          alignItems: 'center'
        }}>
          <view style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: '40px'
          }}>
            {/* TikTok Studio Button */}
            <view 
              style={{
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                onNavigateToStudio?.();
              }}
            >
              <text style={{ 
                fontSize: '16px', 
                color: '#000',
                fontWeight: '500'
              }}>TikTok Studio</text>
            </view>

            {/* Your Orders Button */}
            <view 
              style={{
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                console.log('Your orders pressed');
              }}
            >
              <text style={{ 
                fontSize: '16px', 
                color: '#000',
                fontWeight: '500'
              }}>Your orders</text>
            </view>
          </view>
        </view>

        {/* Tab Selector - Completely Redesigned */}
        <view style={{
          height: '44px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: 'white',
          position: 'relative'
        }}>
          {/* Posts Tab */}
          <view 
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              height: '44px',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
            bindtap={() => setSelectedTab('posts')}
          >
            <text style={{ 
              fontSize: '16px',
              fontWeight: selectedTab === 'posts' ? 'bold' : 'normal',
              color: selectedTab === 'posts' ? '#000' : '#666'
            }}>
              Posts
            </text>
            {selectedTab === 'posts' && (
              <view style={{
                position: 'absolute',
                bottom: 0,
                left: '25%',
                width: '50%',
                height: '2px',
                backgroundColor: '#000'
              }} />
            )}
          </view>

          {/* Liked Tab */}
          <view 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '50%',
              height: '44px',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
            bindtap={() => setSelectedTab('liked')}
          >
            <text style={{ 
              fontSize: '16px',
              fontWeight: selectedTab === 'liked' ? 'bold' : 'normal',
              color: selectedTab === 'liked' ? '#000' : '#666'
            }}>
              Liked
            </text>
            {selectedTab === 'liked' && (
              <view style={{
                position: 'absolute',
                bottom: 0,
                left: '25%',
                width: '50%',
                height: '2px',
                backgroundColor: '#000'
              }} />
            )}
          </view>
        </view>

        {/* Video Grid - Empty for now */}
        <view style={{ 
          flex: 1,
          width: '100%'
        }}>
          {/* Content will be added here later */}
        </view>
      </scroll-view>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="profile" onTabChange={onTabChange} />

      {/* Profile Menu Modal */}
      {showMenu && (
        <view 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
            zIndex: 100
          }}
          bindtap={() => setShowMenu(false)}
        >
          <view 
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '20px',
              paddingBottom: '40px'
            }}
            bindtap={(e) => {
              'background only';
              e.stopPropagation?.();
            }}
          >
            <text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Menu</text>
            <view 
              style={{ 
                padding: '15px', 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                setShowMenu(false);
                onNavigateToStudio?.();
              }}
            >
              <text style={{ fontSize: '20px', marginRight: '15px' }}>🎬</text>
              <text style={{ fontSize: '16px' }}>TikTok Studio</text>
            </view>
            <view 
              style={{ 
                padding: '15px', 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                setShowMenu(false);
                console.log('Balance pressed');
              }}
            >
              <text style={{ fontSize: '20px', marginRight: '15px' }}>💰</text>
              <text style={{ fontSize: '16px' }}>Balance</text>
            </view>
            <view 
              style={{ 
                padding: '15px', 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                setShowMenu(false);
                console.log('QR code pressed');
              }}
            >
              <text style={{ fontSize: '20px', marginRight: '15px' }}>📱</text>
              <text style={{ fontSize: '16px' }}>Your QR code</text>
            </view>
            <view 
              style={{ 
                padding: '15px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              bindtap={() => {
                'background only';
                setShowMenu(false);
                console.log('Settings pressed');
              }}
            >
              <text style={{ fontSize: '20px', marginRight: '15px' }}>⚙️</text>
              <text style={{ fontSize: '16px' }}>Settings and privacy</text>
            </view>
          </view>
        </view>
      )}
    </view>
  );
};