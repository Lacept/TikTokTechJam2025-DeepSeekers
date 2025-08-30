/** @jsxImportSource @lynx-js/react */
// src/components/ProfilePage.tsx

import { useState, useEffect } from '@lynx-js/react';
import { BottomNavigation } from './BottomNavigation.js';
import {
  getProfile,
  getCreatorByName,
  __getApiBase,
  setApiBase,
} from '../api/profile.js';

/* ---------- import your static thumbnails here ---------- */
/* Replace these paths with your real files in /src/assets */
import thumbAUrl from '../assets/thumb-a.png';
import thumbBUrl from '../assets/thumb-b.png';
import thumbCUrl from '../assets/thumb-c.png';

type TabType = 'home' | 'discover' | 'create' | 'inbox' | 'profile';
type ProfileTabType = 'posts' | 'liked';

interface ProfilePageProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onNavigateToStudio?: () => void;
  refreshSignal?: number;
}

// Must match creators.name in DB
const USERNAME = 'John Doe';

// Set this to the LAN IP Flask prints (e.g. 192.168.x.x)
const FLASK_LAN_IP = '192.168.10.114';

export function ProfilePage({
  activeTab,
  onTabChange,
  onNavigateToStudio,
  refreshSignal = 0,
}: ProfilePageProps) {
  const [selectedTab, setSelectedTab] = useState<ProfileTabType>('posts');
  const [showMenu, setShowMenu] = useState(false);

  // stats as primitives
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Force API base so the phone can reach your PC (kept for stats fetching)
  useEffect(() => {
    setApiBase(FLASK_LAN_IP, 'http:');
  }, []);

  // Fetch basic counts when Profile tab becomes active
  useEffect(() => {
    if (activeTab !== 'profile') return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // Try bundled endpoint first (if you added it on backend)
        try {
          const bundle = await getProfile(USERNAME);
          if (cancelled) return;

          setFollowingCount(Number(bundle.creator.following || 0));
          setFollowersCount(Number(bundle.creator.followers || 0));
          setLikesCount(Number(bundle.creator.likes || 0));
          return;
        } catch {
          // Fallback: per-creator endpoint
          const creator = await getCreatorByName(USERNAME);
          if (cancelled) return;

          setFollowingCount(Number(creator.following || 0));
          setFollowersCount(Number(creator.followers || 0));
          setLikesCount(Number(creator.likes || 0));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load profile');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeTab, refreshSignal]);

  const handleAddFriends = () => { 'background only'; };
  const handleMenu = () => setShowMenu(true);
  const handleVideoPress = (i: number) => { 'background only'; console.log('Static thumb pressed:', i); };

  // Format large numbers (optional)
  const formatCount = (count: number): string => {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M';
    if (count >= 1_000) return (count / 1_000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <view style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      {/* Header */}
      <view
        style={{
          height: '104px',
          backgroundColor: 'white',
          paddingTop: '44px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <view style={{ width: '32px', height: '32px', justifyContent: 'center', alignItems: 'center' }} bindtap={handleAddFriends}>
          <text style={{ fontSize: '20px' }}>👤</text>
        </view>

        <view style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <text style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', marginRight: '4px' }}>
            {USERNAME}
          </text>
          <text style={{ fontSize: '14px', color: '#666' }}>▼</text>
        </view>

        <view style={{ width: '32px', height: '32px', justifyContent: 'center', alignItems: 'center' }} bindtap={handleMenu}>
          <text style={{ fontSize: '20px' }}>☰</text>
        </view>
      </view>

      {/* Optional error banner */}
      {!!error && (
        <view style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '6px', paddingBottom: '6px' }}>
          <text style={{ fontSize: '12px', color: '#c00' }}>{error}</text>
        </view>
      )}

      {/* Profile Content */}
      <scroll-view style={{ flex: 1, backgroundColor: 'white' }}>
        <view style={{ padding: '20px', alignItems: 'center' }}>
          <view
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '40px',
              backgroundColor: '#ff6b6b',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <text style={{ fontSize: '24px', color: 'white' }}>JD</text>
          </view>

          <text style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', marginBottom: '16px' }}>
            {USERNAME}
          </text>

          {/* Stats */}
          <view style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: '20px' }}>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCount(followingCount)}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Following</text>
            </view>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCount(followersCount)}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Followers</text>
            </view>
            <view style={{ alignItems: 'center' }}>
              <text style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCount(likesCount)}</text>
              <text style={{ fontSize: '14px', color: '#666' }}>Likes</text>
            </view>
          </view>

          {/* Edit Profile */}
          <view
            style={{
              width: '200px',
              height: '36px',
              backgroundColor: '#ff6b6b',
              borderRadius: '4px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <text style={{ color: 'white', fontWeight: 'bold' }}>Edit profile</text>
          </view>
        </view>

        {/* Tabs */}
        <view style={{ height: '44px', borderBottom: '1px solid #e0e0e0', backgroundColor: 'white', position: 'relative' }}>
          <view
            style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '44px', justifyContent: 'center', alignItems: 'center' }}
            bindtap={() => setSelectedTab('posts')}
          >
            <text style={{ fontSize: '16px', fontWeight: selectedTab === 'posts' ? 'bold' : 'normal', color: selectedTab === 'posts' ? '#000' : '#666' }}>
              Posts
            </text>
            {selectedTab === 'posts' && (<view style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '2px', backgroundColor: '#000' }} />)}
          </view>
          <view
            style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '44px', justifyContent: 'center', alignItems: 'center' }}
            bindtap={() => setSelectedTab('liked')}
          >
            <text style={{ fontSize: '16px', fontWeight: selectedTab === 'liked' ? 'bold' : 'normal', color: selectedTab === 'liked' ? '#000' : '#666' }}>
              Liked
            </text>
            {selectedTab === 'liked' && (<view style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '2px', backgroundColor: '#000' }} />)}
          </view>
        </view>

        {/* Posts → 3 static thumbnails from assets, 2px apart */}
        {selectedTab === 'posts' ? (
          <view
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '2px',                 // 2px spacing between tiles
              padding: '8px',
            }}
          >
            {[thumbAUrl, thumbBUrl, thumbCUrl].map((src, idx) => (
              <view
                key={idx}
                bindtap={() => handleVideoPress(idx)}
                style={{
                  width: 'calc((100% - 4px) / 3)',  // 3 columns; two gaps (2px each) => 4px
                  aspectRatio: 1,                    // square tiles
                  backgroundColor: '#f0f0f0',
                  overflow: 'hidden',
                  borderRadius: '4px',
                }}
              >
                <image
                  src={src}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </view>
            ))}
          </view>
        ) : (
          <view style={{ width: '100%', padding: '40px', alignItems: 'center' }}>
            <text style={{ fontSize: '14px', color: '#999' }}>No liked videos yet</text>
          </view>
        )}
      </scroll-view>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />

      {/* Menu Modal (unchanged) */}
      {showMenu && (
        <view
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 100 }}
          bindtap={() => setShowMenu(false)}
        >
          <view
            style={{ backgroundColor: 'white', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px', paddingBottom: '40px' }}
            bindtap={(e) => { 'background only'; e.stopPropagation?.(); }}
          >
            <text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Menu</text>

            <view style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              bindtap={() => { 'background only'; setShowMenu(false); onNavigateToStudio?.(); }}>
              <text style={{ fontSize: '20px', marginRight: '15px' }}>🎬</text>
              <text style={{ fontSize: '16px' }}>TikTok Studio</text>
            </view>

            <view style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <text style={{ fontSize: '20px', marginRight: '15px' }}>💰</text>
              <text style={{ fontSize: '16px' }}>Balance</text>
            </view>

            <view style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <text style={{ fontSize: '20px', marginRight: '15px' }}>📱</text>
              <text style={{ fontSize: '16px' }}>Your QR code</text>
            </view>

            <view style={{ padding: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <text style={{ fontSize: '20px', marginRight: '15px' }}>⚙️</text>
              <text style={{ fontSize: '16px' }}>Settings and privacy</text>
            </view>
          </view>
        </view>
      )}
    </view>
  );
}
