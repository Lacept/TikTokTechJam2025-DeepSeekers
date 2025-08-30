// src/components/TikTokStudioPageNew.tsx
import { useCallback, useState } from '@lynx-js/react';
import { useAnalytics } from '../contexts/AnalyticsContext.js';
import type { AnalyticsData } from '../data/analyticsService.js';
import './TikTokStudioPageNew.css';

interface TikTokStudioPageNewProps {
  onBack: () => void;
  onNavigateToAnalytics?: () => void;
}

export function TikTokStudioPageNew({
  onBack,
  onNavigateToAnalytics,
}: TikTokStudioPageNewProps) {
  const [activeTab, setActiveTab] = useState<'tools' | 'live'>('tools');
  const { analyticsData } = useAnalytics();

  // Analytics data is now hardcoded and always available - no preloading needed

  // Event handlers
  const handleTabSwitch = useCallback((tab: 'tools' | 'live') => {
    'background only';
    setActiveTab(tab);
  }, []);

  const handleAnalyticsViewAll = useCallback(() => {
    'background only';
    if (onNavigateToAnalytics) {
      onNavigateToAnalytics();
    }
  }, [onNavigateToAnalytics]);

  const handleMonetizationViewAll = useCallback(() => {
    'background only';
    console.log('Navigate to monetization programs');
  }, []);

  return (
    <view className="studio-dashboard">
      {/* Header */}
      <Header onBack={onBack} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />

      {/* Main Content */}
      <scroll-view className="scrollable-content">
        {/* Analytics Section */}
        <AnalyticsSection 
          onViewAll={handleAnalyticsViewAll} 
          analyticsData={analyticsData}
        />

        {/* Tools Grid */}
        <ToolsGrid />

        {/* Finance Section */}
        <FinanceSection />

        {/* Monetization Section */}
        <MonetizationSection onViewAll={handleMonetizationViewAll} />
      </scroll-view>
    </view>
  );
}

// Header Component
interface HeaderProps {
  onBack: () => void;
}

const Header = ({ onBack }: HeaderProps) => {
  const handleBackPress = () => {
    'background only';
    onBack();
  };

  return (
    <view className="header">
      <view className="back-button" bindtap={handleBackPress}>
        <text className="back-icon">←</text>
      </view>
      <text className="header-title">TikTok Studio</text>
      <view className="header-spacer" />
    </view>
  );
};

// Tab Navigation Component
interface TabNavigationProps {
  activeTab: 'tools' | 'live';
  onTabChange: (tab: 'tools' | 'live') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <view className="tab-navigation">
      <ToolsTab
        isActive={activeTab === 'tools'}
        onPress={() => onTabChange('tools')}
      />
      <LiveTab
        isActive={activeTab === 'live'}
        onPress={() => onTabChange('live')}
      />
    </view>
  );
};

// Tools Tab Component
interface ToolsTabProps {
  isActive: boolean;
  onPress: () => void;
}

const ToolsTab = ({ isActive, onPress }: ToolsTabProps) => {
  const handlePress = () => {
    'background only';
    onPress();
  };

  return (
    <view
      className={`tab-item ${isActive ? 'active' : 'inactive'}`}
      bindtap={handlePress}
    >
      <text className="tab-text">Tools</text>
    </view>
  );
};

// Live Tab Component
interface LiveTabProps {
  isActive: boolean;
  onPress: () => void;
}

const LiveTab = ({ isActive, onPress }: LiveTabProps) => {
  const handlePress = () => {
    'background only';
    onPress();
  };

  return (
    <view
      className={`tab-item ${isActive ? 'active' : 'inactive'}`}
      bindtap={handlePress}
    >
      <text className="tab-text">LIVE</text>
    </view>
  );
};

// Analytics Section Component
interface AnalyticsSectionProps {
  onViewAll: () => void;
  analyticsData: AnalyticsData | null;
}

const AnalyticsSection = ({ onViewAll, analyticsData }: AnalyticsSectionProps) => {
  const handleCardPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleCardTap = () => {
    'background only';
    onViewAll();
  };

  return (
    <view 
      className="analytics-section-card"
      main-thread:bindtap={handleCardPress}
      bindtap={handleCardTap}
    >
      <view className="section-header">
        <text className="section-title">Analytics</text>
        <text className="view-all-link">View all ›</text>
      </view>
      <MetricsRow analyticsData={analyticsData} />
    </view>
  );
};

// Section Header Component
interface SectionHeaderProps {
  title: string;
  onViewAll: () => void;
}

const SectionHeader = ({ title, onViewAll }: SectionHeaderProps) => {
  return (
    <view className="section-header">
      <text className="section-title">{title}</text>
      <ViewAllLink onPress={onViewAll} />
    </view>
  );
};

// View All Link Component
interface ViewAllLinkProps {
  onPress: () => void;
}

const ViewAllLink = ({ onPress }: ViewAllLinkProps) => {
  const handlePress = () => {
    'background only';
    onPress();
  };

  return (
    <text className="view-all-link" bindtap={handlePress}>
      View all ›
    </text>
  );
};

// Metrics Row Component
interface MetricsRowProps {
  analyticsData: AnalyticsData | null;
}

const MetricsRow = ({ analyticsData }: MetricsRowProps) => {
  return (
    <view className="metrics-row">
      <PostViewsMetric data={analyticsData} />
      <FollowersMetric data={analyticsData} />
      <LikesMetric data={analyticsData} />
    </view>
  );
};

// Post Views Metric Component (no card background)
interface StudioMetricProps {
  data: AnalyticsData | null;
}

const PostViewsMetric = ({ data }: StudioMetricProps) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const views = data?.totalViews ?? 0;
  const growth = data?.viewsGrowth ?? 0;
  const isPositive = growth >= 0;

  return (
    <view className="analytics-metric">
      <text className="metric-value">{data ? formatViews(views) : '---'}</text>
      <text className="metric-label">Post views</text>
      <view className={`growth-indicator ${isPositive ? 'positive' : 'negative'}`}>
        <text className="growth-icon">{isPositive ? '📈' : '📉'}</text>
        <text className="growth-text">
          {data ? `${isPositive ? '+' : ''}${growth.toFixed(1)}% 7d` : '-- 7d'}
        </text>
      </view>
    </view>
  );
};

// Followers Metric Component (no card background)  
const FollowersMetric = ({ data }: StudioMetricProps) => {
  // Mock follower data since it's not in the analytics API
  const followers = -2; // Static for now
  const growth = 0;
  
  return (
    <view className="analytics-metric">
      <text className="metric-value">{followers}</text>
      <text className="metric-label">Net followers</text>
      <view className="growth-indicator neutral">
        <text className="growth-icon">—</text>
        <text className="growth-text">{growth}% 7d</text>
      </view>
    </view>
  );
};

// Likes Metric Component (no card background)
const LikesMetric = ({ data }: StudioMetricProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Calculate total likes from analytics data (if available)
  const totalLikes = data?.totalViews ? Math.round(data.totalViews * (data.metrics.engagementRate / 100) * 0.7) : 0;
  const growth = 159; // Mock growth for consistency
  
  return (
    <view className="analytics-metric">
      <text className="metric-value">{data ? formatNumber(totalLikes) : '---'}</text>
      <text className="metric-label">Likes</text>
      <view className="growth-indicator positive">
        <text className="growth-icon">📈</text>
        <text className="growth-text">{data ? `${growth}% 7d` : '-- 7d'}</text>
      </view>
    </view>
  );
};

// Tools Grid Component
const ToolsGrid = () => {
  return (
    <view className="tools-section-card">
      <view className="section-header">
        <text className="section-title">Tools</text>
      </view>
      <view className="tools-grid">
        <AccountCheckTool />
        <CreatorAcademyTool />
        <PromoteTool />
        <BenefitsTool />
      </view>
    </view>
  );
};

// Account Check Tool Component
const AccountCheckTool = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Account check tapped');
  };

  return (
    <view
      className="tool-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container green">
        <text className="circular-icon">✓</text>
      </view>
      <text className="tool-label">Account check</text>
    </view>
  );
};

// Creator Academy Tool Component
const CreatorAcademyTool = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Creator Academy tapped');
  };

  return (
    <view
      className="tool-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container yellow">
        <text className="circular-icon">🎓</text>
      </view>
      <text className="tool-label">Creator Academy</text>
    </view>
  );
};

// Promote Tool Component
const PromoteTool = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Promote tapped');
  };

  return (
    <view
      className="tool-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container blue">
        <text className="circular-icon">↗</text>
      </view>
      <text className="tool-label">Promote</text>
    </view>
  );
};

// Benefits Tool Component
const BenefitsTool = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Benefits tapped');
  };

  return (
    <view
      className="tool-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container pink">
        <text className="circular-icon">🎁</text>
      </view>
      <text className="tool-label">Benefits</text>
    </view>
  );
};

// Finance Section Component
const FinanceSection = () => {
  return (
    <view className="finance-section-card">
      <view className="section-header">
        <text className="section-title">Finance</text>
      </view>
      <BalanceRow />
      <view className="finance-divider" />
      <RewardsRow />
    </view>
  );
};

// Balance Row Component
const BalanceRow = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', 'transparent');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Balance tapped');
  };

  return (
    <view
      className="finance-row-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text className="finance-label">Balance</text>
      <view className="finance-right">
        <text className="finance-amount">$26.72</text>
        <ChevronRight />
      </view>
    </view>
  );
};

// Rewards Row Component
const RewardsRow = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', 'transparent');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Estimated rewards tapped');
  };

  return (
    <view
      className="finance-row-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text className="finance-label">Estimated rewards</text>
      <view className="finance-right">
        <text className="finance-amount">$0.00</text>
        <ChevronRight />
      </view>
    </view>
  );
};

// Chevron Right Component
const ChevronRight = () => {
  return <text className="chevron">›</text>;
};

// Monetization Section Component
interface MonetizationSectionProps {
  onViewAll: () => void;
}

const MonetizationSection = ({ onViewAll }: MonetizationSectionProps) => {
  const handleViewAll = () => {
    'background only';
    onViewAll();
  };

  return (
    <view className="monetization-section-card">
      <view className="section-header">
        <text className="section-title">Monetization Programs</text>
        <text className="view-all-link" bindtap={handleViewAll}>View all ›</text>
      </view>
      <ProgramsGrid />
    </view>
  );
};

// Programs Grid Component
const ProgramsGrid = () => {
  return (
    <view className="programs-grid">
      <TikTokShopProgram />
      <ServicePlusProgram />
      <SubscriptionProgram />
      <LiveIncentiveProgram />
    </view>
  );
};

// TikTok Shop Program Component
const TikTokShopProgram = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('TikTok Shop tapped');
  };

  return (
    <view
      className="monetization-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container red">
        <text className="circular-icon">🛒</text>
      </view>
      <text className="monetization-label">TikTok Shop</text>
    </view>
  );
};

// Service Plus Program Component
const ServicePlusProgram = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Service+ tapped');
  };

  return (
    <view
      className="monetization-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container purple">
        <text className="circular-icon">🎧</text>
      </view>
      <text className="monetization-label">Service+</text>
    </view>
  );
};

// Subscription Program Component
const SubscriptionProgram = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('Subscription tapped');
  };

  return (
    <view
      className="monetization-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container cyan">
        <text className="circular-icon">👥</text>
      </view>
      <text className="monetization-label">Subscription</text>
    </view>
  );
};

// Live Incentive Program Component
const LiveIncentiveProgram = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  const handleTap = () => {
    'background only';
    console.log('LIVE Incentive Program tapped');
  };

  return (
    <view
      className="monetization-item"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="circular-icon-container yellow">
        <text className="circular-icon">⚡</text>
      </view>
      <text className="monetization-label">LIVE Incentive Program</text>
    </view>
  );
};
