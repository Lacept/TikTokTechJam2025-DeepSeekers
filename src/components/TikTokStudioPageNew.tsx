// src/components/TikTokStudioPageNew.tsx
import { useState, useCallback } from '@lynx-js/react';
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
      <Header />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />

      {/* Main Content */}
      <scroll-view className="scrollable-content">
        {/* Analytics Section */}
        <AnalyticsSection onViewAll={handleAnalyticsViewAll} />

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
const Header = () => {
  return (
    <view className="header">
      <text className="header-title">TikTok Studio</text>
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
}

const AnalyticsSection = ({ onViewAll }: AnalyticsSectionProps) => {
  return (
    <view className="analytics-section">
      <SectionHeader title="Analytics" onViewAll={onViewAll} />
      <MetricsRow />
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
const MetricsRow = () => {
  return (
    <view className="metrics-row">
      <PostViewsCard />
      <FollowersCard />
      <LikesCard />
    </view>
  );
};

// Post Views Card Component
const PostViewsCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Post views tapped');
  };

  return (
    <view
      className="analytics-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text className="metric-value">22.3K</text>
      <text className="metric-label">Post views</text>
      <view className="growth-indicator positive">
        <text className="growth-icon">📈</text>
        <text className="growth-text">72.6% 7d</text>
      </view>
    </view>
  );
};

// Followers Card Component
const FollowersCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Net followers tapped');
  };

  return (
    <view
      className="analytics-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text className="metric-value">-2</text>
      <text className="metric-label">Net followers</text>
      <view className="growth-indicator neutral">
        <text className="growth-icon">—</text>
        <text className="growth-text">0% 7d</text>
      </view>
    </view>
  );
};

// Likes Card Component
const LikesCard = () => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Likes tapped');
  };

  return (
    <view
      className="analytics-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <text className="metric-value">1.9K</text>
      <text className="metric-label">Likes</text>
      <view className="growth-indicator positive">
        <text className="growth-icon">📈</text>
        <text className="growth-text">159% 7d</text>
      </view>
    </view>
  );
};

// Tools Grid Component
const ToolsGrid = () => {
  return (
    <view className="tools-grid">
      <AccountCheckTool />
      <CreatorAcademyTool />
      <PromoteTool />
      <BenefitsTool />
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
      className="tool-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="tool-icon-container green">
        <text className="tool-icon">✓</text>
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
      className="tool-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="tool-icon-container yellow">
        <text className="tool-icon">🎓</text>
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
      className="tool-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="tool-icon-container blue">
        <text className="tool-icon">↗️</text>
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
      className="tool-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="tool-icon-container pink">
        <text className="tool-icon">🎁</text>
      </view>
      <text className="tool-label">Benefits</text>
    </view>
  );
};

// Finance Section Component
const FinanceSection = () => {
  return (
    <view className="finance-section">
      <BalanceRow />
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
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Balance tapped');
  };

  return (
    <view
      className="finance-row"
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
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Estimated rewards tapped');
  };

  return (
    <view
      className="finance-row"
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
  return (
    <view className="monetization-section">
      <SectionHeader title="Monetization Programs" onViewAll={onViewAll} />
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
      className="monetization-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="monetization-icon-container red">
        <text className="monetization-icon">🛒</text>
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
      className="monetization-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="monetization-icon-container purple">
        <text className="monetization-icon">🎧</text>
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
      className="monetization-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="monetization-icon-container cyan">
        <text className="monetization-icon">👥</text>
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
      className="monetization-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view className="monetization-icon-container yellow">
        <text className="monetization-icon">⚡</text>
      </view>
      <text className="monetization-label">LIVE Incentive Program</text>
    </view>
  );
};
