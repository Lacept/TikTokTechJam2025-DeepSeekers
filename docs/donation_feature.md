# TikTok Clone Donation System Implementation Plan

## Phase 1: User Side Implementation

### 1.1 Enhanced Home Page (FYP) with Video Support
**Goal**: Transform static background to scrollable video feed with donation capability

**Components to Build**:
- `VideoFeedContainer` - Main scrollable container using Lynx `<list>` for performance
- `VideoPlayer` - Individual video player component with native video support
- `VideoOverlay` - UI elements over video (creator info, engagement buttons)
- `DonationButton` - Floating donation button with Main Thread Scripting (MTS) for instant response

**Lynx-Specific Implementation**:
```jsx
// src/components/VideoFeedContainer.tsx
import { useState, useCallback } from '@lynx-js/react';

const VideoFeedContainer = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useCallback((event) => {
    'background only'; // Lynx directive for background thread
    const { scrollTop } = event.detail;
    const newIndex = Math.floor(scrollTop / window.innerHeight);
    setCurrentIndex(newIndex);
  }, []);

  return (
    <list
      list-type="single"
      span-count={1}
      scroll-orientation="vertical"
      bindscroll={handleScroll}
      style="height:100vh;"
    >
      {videos.map((video, index) => (
        <list-item 
          key={video.id} 
          item-key={`video-${index}`}
          estimated-main-axis-size-px={window.innerHeight}
        >
          <VideoPlayer 
            video={video} 
            isActive={index === currentIndex}
          />
        </list-item>
      ))}
    </list>
  );
};
```

**Video Player with Donation Overlay**:
```jsx
// src/components/VideoPlayer.tsx
const VideoPlayer = ({ video, isActive }) => {
  const handleDonationTap = useCallback((event) => {
    'main thread'; // MTS for instant UI response
    // Immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 100);
  }, []);

  return (
    <view style="position:relative;width:100%;height:100vh;">
      {/* Video Background */}
      <video 
        src={video.url}
        autoplay={isActive}
        loop
        muted
        style="width:100%;height:100%;objectFit:cover;"
      />
      
      {/* Video Overlay */}
      <view style="position:absolute;top:0;left:0;right:0;bottom:0;">
        <VideoOverlay video={video} onDonationTap={handleDonationTap} />
      </view>
    </view>
  );
};
```

**Engagement Bar with Donation Button**:
```jsx
// src/components/VideoOverlay.tsx
const VideoOverlay = ({ video, onDonationTap }) => {
  return (
    <view style="flex:1;justifyContent:space-between;padding:20px;">
      {/* Creator Info */}
      <view style="alignSelf:flex-start;">
        <CreatorInfo creator={video.creator} />
      </view>
      
      {/* Engagement Bar */}
      <view style="alignSelf:flex-end;alignItems:center;gap:15px;">
        <LikeButton likes={video.likes} />
        <CommentButton comments={video.comments} />
        <ShareButton shares={video.shares} />
        <DonationButton 
          main-thread:bindtap={onDonationTap}
          creator={video.creator}
        />
      </view>
    </view>
  );
};
```

**Key Lynx Features Utilized**:
- `<list>` with virtualization for smooth infinite scroll
- Main Thread Scripting (MTS) for instant donation button feedback
- Background thread directives for scroll handling
- Native video element support
- CSS-in-JS styling with Lynx performance optimizations

### 1.2 Live Stream Page
**Goal**: Separate UI layout optimized for live streaming with real-time donations

**Components to Build**:
- `LiveStreamPlayer` - Video player for live content with Lynx native video
- `LiveChatFeed` - Real-time chat using Lynx `<scroll-view>` with auto-scroll
- `LiveDonationButton` - Prominent donation CTA with MTS
- `DonationAlert` - Live donation notifications with CSS animations

**Lynx Implementation for Live Streaming**:
```jsx
// src/components/LiveStreamPage.tsx
import { useState, useEffect, useRef } from '@lynx-js/react';

const LiveStreamPage = ({ streamId }) => {
  const [donations, setDonations] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const chatScrollRef = useRef(null);

  // Real-time updates using background thread
  useEffect(() => {
    'background only';
    const ws = new WebSocket(`wss://api.example.com/live/${streamId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'donation') {
        setDonations(prev => [...prev, data.donation]);
        showDonationAlert(data.donation);
      } else if (data.type === 'chat') {
        setChatMessages(prev => [...prev, data.message]);
        scrollChatToBottom();
      }
    };

    return () => ws.close();
  }, [streamId]);

  const scrollChatToBottom = useCallback(() => {
    'main thread'; // MTS for smooth scrolling
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  return (
    <view style="flex:1;flexDirection:row;">
      {/* Live Video Player */}
      <view style="flex:2;">
        <LiveStreamPlayer streamId={streamId} />
        <DonationAlertOverlay donations={donations} />
      </view>
      
      {/* Chat Sidebar */}
      <view style="flex:1;background:#000;opacity:0.8;">
        <LiveChatFeed 
          messages={chatMessages}
          scrollRef={chatScrollRef}
        />
        <LiveDonationButton streamId={streamId} />
      </view>
    </view>
  );
};
```

**Live Chat with Lynx Scroll Performance**:
```jsx
// src/components/LiveChatFeed.tsx
const LiveChatFeed = ({ messages, scrollRef }) => {
  return (
    <view style="flex:1;padding:10px;">
      <scroll-view
        ref={scrollRef}
        style="flex:1;"
        scroll-orientation="vertical"
        enable-scroll-to-end
        bindscrolltolower={() => {
          'background only';
          // Load more chat history if needed
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={`msg-${index}`} 
            message={message}
            isDonation={message.type === 'donation'}
          />
        ))}
      </scroll-view>
    </view>
  );
};
```

**Layout Differences from FYP**:
- Horizontal flexbox layout for video + chat
- Real-time WebSocket integration on background thread
- Auto-scrolling chat with MTS for smooth performance
- Live donation alerts with CSS keyframe animations
- Responsive design using Lynx flex layout system

### 1.3 Donation Flow Modal System
**Goal**: Universal donation popup that works from both FYP and Live pages

**Components to Build**:
- `DonationModal` - Main popup container with Lynx modal animations
- `CoinSelector` - Choose between standard/premium coins with MTS interactions
- `AmountSelector` - Predefined amounts + custom input with native feel
- `PaymentConfirmation` - Review before payment with loading states
- `DonationSuccess` - Success message with CSS animations
- `UserBalanceManager` - Track user's coin balance with ReactLynx context

**Lynx Modal Implementation**:
```jsx
// src/components/DonationModal.tsx
import { useState, useContext } from '@lynx-js/react';
import { UserBalanceContext } from '../contexts/UserBalanceContext';

const DonationModal = ({ isVisible, creator, onClose }) => {
  const [step, setStep] = useState('coinSelect'); // coinSelect, amount, confirm, success
  const [selectedCoin, setSelectedCoin] = useState('standard');
  const [amount, setAmount] = useState(0);
  const { balance, updateBalance } = useContext(UserBalanceContext);

  const handleCoinSelect = useCallback((coinType) => {
    'main thread'; // Instant visual feedback
    setSelectedCoin(coinType);
    setStep('amount');
  }, []);

  const handleAmountSelect = useCallback((selectedAmount) => {
    'main thread';
    setAmount(selectedAmount);
    setStep('confirm');
  }, []);

  if (!isVisible) return null;

  return (
    <view style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);justifyContent:center;alignItems:center;zIndex:1000;">
      <view style="background:white;borderRadius:20px;padding:20px;width:90%;maxWidth:400px;animation:slideUp 0.3s ease-out;">
        {step === 'coinSelect' && (
          <CoinSelector 
            onSelect={handleCoinSelect}
            balance={balance}
          />
        )}
        {step === 'amount' && (
          <AmountSelector 
            coinType={selectedCoin}
            onSelect={handleAmountSelect}
            onBack={() => setStep('coinSelect')}
          />
        )}
        {step === 'confirm' && (
          <PaymentConfirmation 
            creator={creator}
            coinType={selectedCoin}
            amount={amount}
            onConfirm={() => processDonation()}
            onBack={() => setStep('amount')}
          />
        )}
        {step === 'success' && (
          <DonationSuccess 
            creator={creator}
            amount={amount}
            coinType={selectedCoin}
            onClose={onClose}
          />
        )}
      </view>
    </view>
  );
};
```

**Coin Selector with MTS**:
```jsx
// src/components/CoinSelector.tsx
const CoinSelector = ({ onSelect, balance }) => {
  const handleCoinTap = useCallback((coinType) => {
    'main thread'; // Immediate response
    // Add press animation
    const element = lynx.querySelector(`#coin-${coinType}`);
    element.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      element.setStyleProperty('transform', 'scale(1)');
      onSelect(coinType);
    }, 100);
  }, [onSelect]);

  return (
    <view style="alignItems:center;">
      <text style="fontSize:20px;fontWeight:bold;marginBottom:20px;">
        Choose Coin Type
      </text>
      
      <view style="flexDirection:row;gap:20px;">
        <view 
          id="coin-standard"
          main-thread:bindtap={() => handleCoinTap('standard')}
          style="alignItems:center;padding:20px;border:2px solid #007AFF;borderRadius:15px;minWidth:120px;"
        >
          <text style="fontSize:30px;">🪙</text>
          <text style="fontSize:16px;fontWeight:bold;">Standard</text>
          <text style="fontSize:12px;color:gray;">$0.01 each</text>
          <text style="fontSize:14px;marginTop:5px;">Balance: {balance.standard}</text>
        </view>
        
        <view 
          id="coin-premium"
          main-thread:bindtap={() => handleCoinTap('premium')}
          style="alignItems:center;padding:20px;border:2px solid #FFD700;borderRadius:15px;minWidth:120px;"
        >
          <text style="fontSize:30px;">💎</text>
          <text style="fontSize:16px;fontWeight:bold;">Premium</text>
          <text style="fontSize:12px;color:gray;">$0.05 each</text>
          <text style="fontSize:14px;marginTop:5px;">Balance: {balance.premium}</text>
        </view>
      </view>
    </view>
  );
};
```

**User Balance Context with ReactLynx**:
```jsx
// src/contexts/UserBalanceContext.tsx
import { createContext, useState, useEffect } from '@lynx-js/react';

export const UserBalanceContext = createContext();

export const UserBalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({ standard: 0, premium: 0 });

  const updateBalance = useCallback((coinType, amount) => {
    'background only';
    setBalance(prev => ({
      ...prev,
      [coinType]: prev[coinType] - amount
    }));
    
    // Sync with backend
    fetch('/api/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coinType, amount })
    });
  }, []);

  return (
    <UserBalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </UserBalanceContext.Provider>
  );
};
```

**Flow Structure with Lynx Optimizations**:
1. User taps donation button (MTS for instant feedback)
2. DonationModal opens with CSS slide-up animation
3. User selects coin type (MTS for immediate visual response)
4. User selects/enters amount (Background thread for calculations)
5. Payment confirmation screen (Loading states with CSS animations)
6. Process payment (Background thread for crypto transaction)
7. Success screen with celebration animations
8. Return to video with donation effect overlay

**Coin Types with Visual Effects**:
- **Standard Coins**: Basic donation currency with coin animation
- **Premium Coins**: Higher value with diamond sparkle effects and special recognition

## Phase 2: Creator Side Implementation

### 2.1 Enhanced Analytics - Revenue Tracking
**Goal**: Real-time revenue updates and payment triggers in TikTok Studio

**Components to Enhance**:
- `RevenueChart` - Add real-time update capability with Lynx animations
- `PaymentTrigger` - Manual button with MTS for instant feedback
- `LiveRevenueCounter` - Real-time revenue display with smooth number transitions
- `NotificationSystem` - Alert creators using Lynx modal system

**Lynx Implementation for Enhanced Analytics**:
```jsx
// src/components/EnhancedAnalyticsDashboard.tsx
import { useState, useEffect, useCallback } from '@lynx-js/react';

const EnhancedAnalyticsDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Real-time revenue updates on background thread
  useEffect(() => {
    'background only';
    const ws = new WebSocket('wss://api.example.com/creator/revenue');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'donation') {
        updateRevenueData(data.donation);
        showNotification(data.donation);
      }
    };

    return () => ws.close();
  }, []);

  const simulatePayment = useCallback(() => {
    'main thread'; // Instant button feedback
    // Visual button press effect
    const button = lynx.querySelector('#simulate-btn');
    button.setStyleProperty('transform', 'scale(0.95)');
    button.setStyleProperty('background', '#005bb5');
    
    setTimeout(() => {
      button.setStyleProperty('transform', 'scale(1)');
      button.setStyleProperty('background', '#007AFF');
      
      // Trigger simulated donation on background thread
      triggerSimulatedDonation();
    }, 150);
  }, []);

  return (
    <scroll-view style="flex:1;padding:20px;">
      {/* Live Revenue Counter */}
      <view style="background:white;borderRadius:15px;padding:20px;marginBottom:20px;boxShadow:0 2px 10px rgba(0,0,0,0.1);">
        <text style="fontSize:16px;color:gray;marginBottom:5px;">Total Revenue</text>
        <LiveRevenueCounter value={totalRevenue} />
        
        <view 
          id="simulate-btn"
          main-thread:bindtap={simulatePayment}
          style="marginTop:15px;padding:12px;background:#007AFF;borderRadius:8px;alignItems:center;"
        >
          <text style="color:white;fontWeight:bold;">Simulate Payment</text>
        </view>
      </view>

      {/* Enhanced Revenue Chart */}
      <view style="background:white;borderRadius:15px;padding:20px;marginBottom:20px;">
        <text style="fontSize:18px;fontWeight:bold;marginBottom:15px;">Revenue Analytics</text>
        <RevenueChart data={revenueData} />
      </view>

      {/* Donation Breakdown */}
      <DonationBreakdown />
      
      {/* Notification System */}
      <NotificationSystem notifications={notifications} />
    </scroll-view>
  );
};
```

**Live Revenue Counter with Smooth Animations**:
```jsx
// src/components/LiveRevenueCounter.tsx
const LiveRevenueCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    'background only';
    if (value !== displayValue) {
      setIsAnimating(true);
      animateToValue(value);
    }
  }, [value]);

  const animateToValue = useCallback((targetValue) => {
    'background only';
    const startValue = displayValue;
    const difference = targetValue - startValue;
    const duration = 1000; // 1 second animation
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (difference * easeOut);
      
      setDisplayValue(Math.round(currentValue * 100) / 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    animate();
  }, [displayValue]);

  return (
    <view style="alignItems:center;">
      <text style={`fontSize:32px;fontWeight:bold;color:#007AFF;${isAnimating ? 'animation:pulse 0.5s ease-in-out;' : ''}`}>
        ${displayValue.toFixed(2)}
      </text>
      {isAnimating && (
        <text style="fontSize:12px;color:green;animation:fadeIn 0.3s;">
          +${(value - displayValue).toFixed(2)}
        </text>
      )}
    </view>
  );
};
```

**Real-time Chart Updates**:
```jsx
// src/components/RevenueChart.tsx
const RevenueChart = ({ data }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    'background only';
    // Smooth chart data transitions
    setChartData(data);
  }, [data]);

  return (
    <view style="height:200px;position:relative;">
      {/* Chart implementation with CSS animations */}
      <view style="position:absolute;bottom:0;left:0;right:0;height:100%;flexDirection:row;alignItems:flex-end;gap:2px;">
        {chartData.map((point, index) => (
          <view 
            key={index}
            style={`flex:1;background:#007AFF;borderRadius:2px 2px 0 0;height:${(point.value / Math.max(...chartData.map(d => d.value))) * 100}%;animation:slideUp 0.5s ease-out ${index * 0.1}s both;`}
          />
        ))}
      </view>
    </view>
  );
};
```

**New Features with Lynx Optimizations**:
- "Simulate Payment" button with MTS for instant visual feedback
- Real-time chart updates using background thread WebSocket connections
- Smooth number animations using requestAnimationFrame
- Push notifications using Lynx modal system with CSS animations
- Revenue breakdown by coin type with interactive charts

### 2.2 Donation Log & History
**Goal**: Comprehensive view of all received donations with high-performance scrolling

**New Components to Build**:
- `DonationLogPage` - Main donations history view using Lynx `<list>` virtualization
- `DonationListItem` - Individual donation entry with MTS interactions
- `DonationFilter` - Filter by time, amount, coin type with instant search
- `DonationExport` - Export donation data with background processing
- `UserProfileLink` - Link to donator's profile with navigation

**Lynx Implementation for Donation Log**:
```jsx
// src/components/DonationLogPage.tsx
import { useState, useEffect, useCallback } from '@lynx-js/react';

const DonationLogPage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    coinType: 'all',
    dateRange: 'all',
    sortBy: 'timestamp'
  });

  // Load donations on background thread
  useEffect(() => {
    'background only';
    loadDonations();
  }, []);

  // Filter donations when filters change
  useEffect(() => {
    'background only';
    applyFilters();
  }, [donations, filters]);

  const loadDonations = useCallback(async () => {
    'background only';
    try {
      const response = await fetch('/api/donations/history');
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error('Failed to load donations:', error);
    }
  }, []);

  const applyFilters = useCallback(() => {
    'background only';
    let filtered = [...donations];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(donation => 
        donation.donatorUsername.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Coin type filter
    if (filters.coinType !== 'all') {
      filtered = filtered.filter(donation => donation.coinType === filters.coinType);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(donation => 
        new Date(donation.timestamp) >= cutoff
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'timestamp':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

    setFilteredDonations(filtered);
  }, [donations, filters]);

  return (
    <view style="flex:1;background:#f5f5f5;">
      {/* Filter Header */}
      <DonationFilter 
        filters={filters}
        onFiltersChange={setFilters}
        totalDonations={filteredDonations.length}
      />

      {/* Donation List with Virtualization */}
      <list
        list-type="single"
        span-count={1}
        scroll-orientation="vertical"
        style="flex:1;"
        preload-buffer-count={10}
      >
        {filteredDonations.map((donation, index) => (
          <list-item 
            key={donation.id} 
            item-key={`donation-${donation.id}`}
            estimated-main-axis-size-px={80}
          >
            <DonationListItem 
              donation={donation}
              index={index}
            />
          </list-item>
        ))}
      </list>

      {/* Export Button */}
      <DonationExport donations={filteredDonations} />
    </view>
  );
};
```

**High-Performance Donation List Item**:
```jsx
// src/components/DonationListItem.tsx
const DonationListItem = ({ donation, index }) => {
  const handleProfileTap = useCallback(() => {
    'main thread'; // Instant navigation feedback
    // Add press animation
    const element = lynx.querySelector(`#donation-${donation.id}`);
    element.setStyleProperty('background', '#f0f0f0');
    
    setTimeout(() => {
      element.setStyleProperty('background', 'white');
      // Navigate to user profile
      navigateToProfile(donation.donatorId);
    }, 100);
  }, [donation]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getCoinIcon = (coinType) => {
    return coinType === 'premium' ? '💎' : '🪙';
  };

  return (
    <view 
      id={`donation-${donation.id}`}
      style="background:white;marginHorizontal:10px;marginVertical:5px;borderRadius:10px;padding:15px;flexDirection:row;alignItems:center;boxShadow:0 1px 3px rgba(0,0,0,0.1);"
    >
      {/* Donator Avatar */}
      <view 
        main-thread:bindtap={handleProfileTap}
        style="marginRight:15px;"
      >
        <image 
          src={donation.donatorAvatar || '/assets/default-avatar.png'}
          style="width:40px;height:40px;borderRadius:20px;"
          auto-size
        />
      </view>

      {/* Donation Info */}
      <view style="flex:1;">
        <view style="flexDirection:row;alignItems:center;marginBottom:5px;">
          <text 
            style="fontSize:16px;fontWeight:bold;marginRight:10px;"
            main-thread:bindtap={handleProfileTap}
          >
            {donation.donatorUsername}
          </text>
          <text style="fontSize:20px;marginRight:5px;">
            {getCoinIcon(donation.coinType)}
          </text>
          <text style="fontSize:16px;fontWeight:bold;color:#007AFF;">
            {donation.amount}
          </text>
        </view>
        
        <text style="fontSize:12px;color:gray;marginBottom:3px;">
          {formatTimestamp(donation.timestamp)}
        </text>
        
        {donation.videoTitle && (
          <text style="fontSize:12px;color:#666;">
            Video: {donation.videoTitle}
          </text>
        )}
      </view>

      {/* Status & Amount */}
      <view style="alignItems:flex-end;">
        <text style={`fontSize:18px;fontWeight:bold;color:${donation.status === 'completed' ? '#28a745' : '#ffc107'};`}>
          ${(donation.amount * (donation.coinType === 'premium' ? 0.05 : 0.01)).toFixed(2)}
        </text>
        
        <view style={`padding:4px 8px;borderRadius:12px;background:${donation.status === 'completed' ? '#d4edda' : '#fff3cd'};marginTop:5px;`}>
          <text style={`fontSize:10px;color:${donation.status === 'completed' ? '#155724' : '#856404'};`}>
            {donation.status.toUpperCase()}
          </text>
        </view>
      </view>
    </view>
  );
};
```

**Smart Filter System**:
```jsx
// src/components/DonationFilter.tsx
const DonationFilter = ({ filters, onFiltersChange, totalDonations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = useCallback((key, value) => {
    'background only';
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  }, [onFiltersChange]);

  const handleSearchInput = useCallback((text) => {
    'background only';
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      updateFilter('search', text);
    }, 300);
  }, [updateFilter]);

  return (
    <view style="background:white;padding:15px;borderBottom:1px solid #eee;">
      {/* Search Bar */}
      <view style="flexDirection:row;alignItems:center;marginBottom:10px;">
        <TextInput
          placeholder="Search by username..."
          value={filters.search}
          onChangeText={handleSearchInput}
          style="flex:1;padding:10px;border:1px solid #ddd;borderRadius:8px;marginRight:10px;"
        />
        
        <view 
          bindtap={() => setIsExpanded(!isExpanded)}
          style="padding:10px;background:#007AFF;borderRadius:8px;"
        >
          <text style="color:white;">Filters</text>
        </view>
      </view>

      {/* Results Count */}
      <text style="fontSize:14px;color:gray;">
        {totalDonations} donations found
      </text>

      {/* Expanded Filters */}
      {isExpanded && (
        <view style="marginTop:15px;animation:slideDown 0.3s ease-out;">
          <FilterRow 
            label="Coin Type"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Standard', value: 'standard' },
              { label: 'Premium', value: 'premium' }
            ]}
            selected={filters.coinType}
            onSelect={(value) => updateFilter('coinType', value)}
          />
          
          <FilterRow 
            label="Date Range"
            options={[
              { label: 'All Time', value: 'all' },
              { label: 'Today', value: 'today' },
              { label: 'This Week', value: 'week' },
              { label: 'This Month', value: 'month' }
            ]}
            selected={filters.dateRange}
            onSelect={(value) => updateFilter('dateRange', value)}
          />
          
          <FilterRow 
            label="Sort By"
            options={[
              { label: 'Recent First', value: 'timestamp' },
              { label: 'Highest Amount', value: 'amount' }
            ]}
            selected={filters.sortBy}
            onSelect={(value) => updateFilter('sortBy', value)}
          />
        </view>
      )}
    </view>
  );
};
```

**Donation Log Structure with Lynx Optimizations**:
- Timestamp with local formatting
- Donator username/avatar with MTS tap handling
- Amount & coin type with visual icons
- Associated video/stream with navigation
- Transaction hash (crypto) with external link
- Status (pending/completed) with color coding

**Features with Lynx Performance**:
- Searchable by username with debounced input
- Filterable by date range, amount with background processing
- Sortable by various criteria with smooth transitions
- Export to CSV functionality using background thread
- Link to crypto transaction details with external browser
- Virtualized list for handling thousands of donations efficiently

### 2.3 Creator Verification System
**Goal**: Verify creators for crypto wallet integration

**Components to Build**:
- `VerificationBadge` - Visual indicator of verified status
- `VerificationFlow` - Multi-step verification process
- `WalletConnection` - Connect crypto wallet
- `VerificationStatus` - Current verification state display

**Verification Requirements**:
- Valid crypto wallet connection
- Identity verification (basic KYC)
- Minimum follower threshold
- Account age requirement
- Content guidelines compliance

**Verification Process**:
1. Creator applies for verification
2. Connects crypto wallet (MetaMask, etc.)
3. Provides basic identity verification
4. Review process (automated + manual)
5. Badge granted + wallet activated for donations

## Phase 3: Crypto Integration & Backend

### 3.1 Blockchain Infrastructure
**Smart Contract Functions**:
- `createDonation()` - Process donation transaction
- `withdrawBalance()` - Creator withdraws earnings
- `getBalance()` - Check creator balance
- `getDonationHistory()` - Retrieve donation logs

**Coin Economics**:
- Standard Coin = $0.01 USD equivalent
- Premium Coin = $0.05 USD equivalent  
- Platform fee: 5% per donation
- Minimum donation: 10 coins

### 3.2 Wallet Integration
**Supported Wallets**:
- MetaMask (primary)
- WalletConnect
- Mobile wallet apps

**Security Features**:
- Transaction signing
- Balance verification
- Anti-fraud measures
- Rate limiting

## Phase 4: UI/UX Enhancements

### 4.1 Donation Animations & Effects
**Visual Feedback**:
- Coin animation when donation sent
- Heart/star effects on video
- Sound effects for different coin types
- Creator notification animations

### 4.2 Responsive Design
**Multi-Platform Support**:
- Mobile-first design
- Tablet landscape mode (live streams)
- Desktop web version considerations
- Cross-platform state management

## Technical Considerations

### Data Models Needed
```javascript
// User
{
  id, username, avatar, coinBalance: {standard, premium}, 
  walletAddress, isVerified
}

// Creator  
{
  ...User, verificationStatus, totalEarnings, 
  connectedWallet, payoutHistory
}

// Donation
{
  id, fromUserId, toCreatorId, amount, coinType, 
  videoId, timestamp, transactionHash, status
}

// Video
{
  id, creatorId, url, title, hashtags, 
  totalDonations, donationCount
}
```

### State Management with Lynx
- **ReactLynx Context**: Global coin balance and user state management
- **Local Component State**: Donation modal flow and UI interactions
- **Background Thread**: WebSocket connections for real-time updates
- **Main Thread Scripting**: Critical UI interactions and animations

```jsx
// Global State Management
// src/contexts/AppContext.tsx
import { createContext, useState, useEffect } from '@lynx-js/react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userBalance, setUserBalance] = useState({ standard: 0, premium: 0 });
  const [donations, setDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Background thread for real-time updates
  useEffect(() => {
    'background only';
    const ws = new WebSocket('wss://api.example.com/realtime');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'balance_update':
          setUserBalance(data.balance);
          break;
        case 'new_donation':
          setDonations(prev => [data.donation, ...prev]);
          setNotifications(prev => [...prev, data.notification]);
          break;
      }
    };

    return () => ws.close();
  }, []);

  return (
    <AppContext.Provider value={{
      userBalance,
      donations,
      notifications,
      updateBalance: setUserBalance,
      addDonation: (donation) => setDonations(prev => [donation, ...prev])
    }}>
      {children}
    </AppContext.Provider>
  );
};
```

### Performance Optimizations with Lynx
- **Virtualized Lists**: Use `<list>` component for donation history and video feeds
- **Main Thread Scripting**: Critical interactions run on UI thread for instant response
- **Background Processing**: Heavy computations and API calls on background thread
- **Lazy Loading**: Load donation history and video content on demand
- **Caching Strategy**: Cache user balances and frequently accessed data
- **Optimized Video Loading**: Progressive loading for mobile bandwidth
- **Minimal Blockchain Calls**: Batch transactions and cache results

```jsx
// Performance-optimized video loading
// src/components/OptimizedVideoPlayer.tsx
const OptimizedVideoPlayer = ({ video, isActive }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    'background only';
    if (isActive && !isLoaded) {
      // Preload video on background thread
      preloadVideo(video.url).then(() => {
        setIsLoaded(true);
      });
    }
  }, [isActive, video.url, isLoaded]);

  const handleVideoLoad = useCallback(() => {
    'main thread'; // Immediate UI update
    if (videoRef.current && isActive) {
      videoRef.current.play();
    }
  }, [isActive]);

  return (
    <view style="width:100%;height:100vh;position:relative;">
      {isLoaded ? (
        <video
          ref={videoRef}
          src={video.url}
          autoplay={isActive}
          loop
          muted
          bindloadeddata={handleVideoLoad}
          style="width:100%;height:100%;objectFit:cover;"
        />
      ) : (
        <view style="width:100%;height:100%;background:#000;justifyContent:center;alignItems:center;">
          <text style="color:white;">Loading...</text>
        </view>
      )}
    </view>
  );
};
```

### Lynx-Specific Optimizations
- **Dual-Thread Architecture**: Separate UI rendering from business logic
- **Instant First-Frame Rendering**: Synchronous initial UI render
- **CSS Animations**: Hardware-accelerated animations using CSS
- **Native Element Mapping**: Direct mapping to platform UI components
- **Memory Management**: Efficient garbage collection with PrimJS engine

## Implementation Steps

### Step 1: Set Up Core Infrastructure
1. **Create Context Providers**:
   ```bash
   # Create context files
   touch src/contexts/AppContext.tsx
   touch src/contexts/UserBalanceContext.tsx
   touch src/contexts/DonationContext.tsx
   ```

2. **Set Up Base Components**:
   ```bash
   # Create component directories
   mkdir -p src/components/donation
   mkdir -p src/components/video
   mkdir -p src/components/analytics
   
   # Create base component files
   touch src/components/donation/DonationModal.tsx
   touch src/components/donation/CoinSelector.tsx
   touch src/components/donation/AmountSelector.tsx
   touch src/components/video/VideoFeedContainer.tsx
   touch src/components/video/VideoPlayer.tsx
   touch src/components/video/VideoOverlay.tsx
   ```

3. **Configure Lynx Project**:
   ```typescript
   // lynx.config.ts - Add donation-specific configurations
   export default defineConfig({
     environments: {
       lynx: {
         performance: {
           chunkSplit: {
             strategy: 'split-by-size',
             minSize: 20000,
             maxSize: 200000,
           },
         },
       },
     },
     // Enable WebSocket support for real-time features
     server: {
       proxy: {
         '/ws': {
           target: 'ws://localhost:8080',
           ws: true,
         },
       },
     },
   });
   ```

### Step 2: Implement Phase 1 Components
1. **Start with VideoFeedContainer** (builds on existing video infrastructure)
2. **Add DonationButton** to existing engagement bar
3. **Build DonationModal** system with coin selection
4. **Integrate UserBalanceContext** for state management

### Step 3: Enhance Creator Analytics
1. **Extend existing AnalyticsDashboard** with revenue tracking
2. **Add real-time WebSocket connections**
3. **Implement donation log and history**
4. **Create verification system components**

### Step 4: Testing and Optimization
1. **Test with Lynx Explorer** on multiple devices
2. **Optimize performance** using Lynx DevTool
3. **Add error boundaries** and loading states
4. **Implement proper TypeScript types**

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test on device via Lynx Explorer
# Scan QR code or enter bundle URL

# Debug with Lynx DevTool
# Connect via USB and use DevTool app
```

### File Structure After Implementation
```
src/
├── components/
│   ├── donation/
│   │   ├── DonationModal.tsx
│   │   ├── CoinSelector.tsx
│   │   ├── AmountSelector.tsx
│   │   ├── PaymentConfirmation.tsx
│   │   ├── DonationSuccess.tsx
│   │   └── DonationButton.tsx
│   ├── video/
│   │   ├── VideoFeedContainer.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── VideoOverlay.tsx
│   │   └── OptimizedVideoPlayer.tsx
│   ├── analytics/
│   │   ├── EnhancedAnalyticsDashboard.tsx
│   │   ├── LiveRevenueCounter.tsx
│   │   ├── RevenueChart.tsx
│   │   └── DonationLogPage.tsx
│   └── live/
│       ├── LiveStreamPage.tsx
│       ├── LiveChatFeed.tsx
│       └── DonationAlert.tsx
├── contexts/
│   ├── AppContext.tsx
│   ├── UserBalanceContext.tsx
│   └── DonationContext.tsx
├── styles/
│   ├── donation.css
│   ├── animations.css
│   └── video.css
└── types/
    ├── donation.d.ts
    └── video.d.ts
```

This comprehensive plan leverages Lynx's unique features like dual-threaded architecture, Main Thread Scripting, and native performance optimizations to create a smooth, responsive donation system that maintains the high-quality user experience you've established in your TikTok clone.