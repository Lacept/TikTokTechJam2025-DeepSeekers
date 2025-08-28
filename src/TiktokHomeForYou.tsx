// src/TiktokHomeForYou.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

// --- Import all local assets from the assets folder ---
import userProfileImageUrl from './assets/user-profile.png';
import plusIconUrl from './assets/plus-icon.png';
import likeIconUrl from './assets/like-icon.png';
import likedIconUrl from './assets/liked-icon.png';
import commentIconUrl from './assets/comment-icon.png';
import shareIconUrl from './assets/share-icon.png';
import musicDiscUrl from './assets/music-disc.png';
import homeIconUrl from './assets/home-icon.png';
import shopIconUrl from './assets/shop-icon.png';
import addIconUrl from './assets/add-icon.png';
import inboxIconUrl from './assets/inbox-icon.png';
import accountIconUrl from './assets/account-icon.png';
import backgroundImageUrl from './assets/background.png'; 
import discoverIconUrl from './assets/discover-icon.png';
import liveIconUrl from './assets/live-icon.png';


// --- Reusable Icon Component ---
const Icon = ({ src, style }: { src: string; style?: object }) => (
  <image src={src} style={style} />
);

// --- Main Component ---
export const TiktokHomeForYou = (): JSX.Element => {
  // --- State for Interactivity ---
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // --- Event Handlers ---
  const handleLike = () => setIsLiked(!isLiked);
  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleComment = () => console.log("Open comments");
  const handleShare = () => console.log("Share video");

  // --- Mock Data ---
  const videoData = {
    username: "@craig_love",
    description: "The most satisfying Job",
    hashtags: "#fyp #satisfying #roadmarking",
    music: "Roddy Roundicch - The Rou",
    likes: "328.7K",
    comments: "578",
  };

  return (
    <view style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      {/* Layer 1: Background Image - Stays fullscreen */}
      <image
        src={backgroundImageUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* This new view acts as a "safe area" for all UI elements */}
      <view style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingTop: '44px' }}>
        {/* Layer 2: Top Header */}
        <view
          style={{
            position: 'absolute',
            top: '55px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '12px',   // ✅ fixed
            paddingRight: '12px',  // ✅ fixed
          }}
        >
          {/* Left Icon (Live placeholder) */}
          <view style={{ width: '40px', alignItems: 'flex-start' }}>
            <Icon src={liveIconUrl} style={{ width: '25px', height: '25px' }} />
          </view>

          {/* Center Tabs */}
          <view
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '12px', // ✅ Lynx/modern CSS way instead of gap
            }}
          >
            <text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>STEM</text>
            <text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Explore</text>
            <text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Friends</text>
            <text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Following</text>
            <text style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>For You</text>
          </view>

          {/* Right Icon (Search placeholder) */}
          <view style={{ width: '35px', alignItems: 'flex-end' }}>
            <Icon src={discoverIconUrl} style={{ width: '20px', height: '20px' }} />
          </view>
        </view>

        {/* Layer 3: Right Action Bar */}
        <view style={{ position: 'absolute', bottom: '90px', right: '10px', alignItems: 'center' }}>
          {/* User Profile Image with Follow Button */}
          <view style={{ marginBottom: '30px', alignItems: 'center' }} bindtap={handleFollow}>
            <Icon src={userProfileImageUrl} style={{ width: '49px', height: '49px' }} />
            {!isFollowing && (
              <view style={{ position: 'absolute', bottom: '-10px', width: '21px', height: '21px', borderRadius: '10.5px', backgroundColor: '#FE2C55', justifyContent: 'center', alignItems: 'center' }}>
                <Icon src={plusIconUrl} style={{ width: '10px', height: '10px' }} />
              </view>
            )}
          </view>

          {/* Like Button */}
          <view style={{ alignItems: 'center', marginBottom: '20px' }} bindtap={handleLike}>
            <Icon src={isLiked ? likedIconUrl : likeIconUrl} style={{ width: '36px', height: '32px' }} />
            <text style={{ color: 'white', fontSize: '13px', marginTop: '6px' }}>{videoData.likes}</text>
          </view>

          {/* Comment Button */}
          <view style={{ alignItems: 'center', marginBottom: '20px' }} bindtap={handleComment}>
            <Icon src={commentIconUrl} style={{ width: '35px', height: '33px' }} />
            <text style={{ color: 'white', fontSize: '13px', marginTop: '6px' }}>{videoData.comments}</text>
          </view>

          {/* Share Button */}
          <view style={{ alignItems: 'center', marginBottom: '20px' }} bindtap={handleShare}>
            <Icon src={shareIconUrl} style={{ width: '34px', height: '27px' }} />
            <text style={{ color: 'white', fontSize: '13px', marginTop: '6px' }}>Share</text>
          </view>

          {/* Music Disc */}
          <Icon src={musicDiscUrl} style={{ width: '49px', height: '49px' }} />
        </view>

        {/* Layer 4: Bottom Info Panel */}
        <view style={{ position: 'absolute', bottom: '90px', left: '15px', right: '80px' }}>
          <text style={{ color: 'white', fontSize: '17px', fontWeight: '600' }}>{videoData.username}</text>
          <text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', lineHeight: '19.5px', marginTop: '10px' }}>
            {videoData.description} {videoData.hashtags}
          </text>
          <text style={{ color: 'white', fontSize: '15px', marginTop: '10px' }}>
            {videoData.music}
          </text>
        </view>

        {/* Layer 5: Bottom Navigation Bar */}
        <view style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '83px',
          backgroundColor: 'black',
          borderTop: '1px solid #262626',
          display: 'flex',                // 🔑 ensure flex context
          flexDirection: 'row',           // 🔑 row layout
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          {/* Home */}
          <view style={{
            flex: 1,
            display: 'flex',              // 🔑 enforce flexbox
            flexDirection: 'column',      // stack icon + text vertically
            alignItems: 'center'
          }}>
            <Icon src={homeIconUrl} style={{ width: '23px', height: '21px' }} />
            <text style={{ color: 'white', fontSize: '10px', marginTop: '5px' }}>Home</text>
          </view>

          {/* Shop */}
          <view style={{
            flex: 1,
            display: 'flex',              // 🔑 enforce flexbox
            flexDirection: 'column',      // stack icon + text vertically
            alignItems: 'center'
          }}>
            <Icon src={shopIconUrl} style={{ width: '23px', height: '21px' }} />
            <text style={{ color: 'white', fontSize: '10px', marginTop: '5px' }}>Shop</text>
          </view>

          {/* Add */}
          <view style={{
            flex: 1,
            display: 'flex',              // 🔑 enforce flexbox
            flexDirection: 'column',      // stack icon + text vertically
            alignItems: 'center'
          }}>
            <Icon src={addIconUrl} style={{ width: '43px', height: '28px' }} />
          </view>

          {/* Inbox */}
          <view style={{
            flex: 1,
            display: 'flex',              // 🔑 enforce flexbox
            flexDirection: 'column',      // stack icon + text vertically
            alignItems: 'center'
          }}>
            <Icon src={inboxIconUrl} style={{ width: '23px', height: '21px' }} />
            <text style={{ color: 'white', fontSize: '10px', marginTop: '5px' }}>Inbox</text>
          </view>

          {/* Me */}
          <view style={{
            flex: 1,
            display: 'flex',              // 🔑 enforce flexbox
            flexDirection: 'column',      // stack icon + text vertically
            alignItems: 'center'
          }}>
            <Icon src={accountIconUrl} style={{ width: '23px', height: '21px' }} />
            <text style={{ color: 'white', fontSize: '10px', marginTop: '5px' }}>Me</text>
          </view>
        </view>
      </view>
    </view>
  );
};
