# TikTok Studio Dashboard - Lynx ReactLynx Implementation Prompt

## Overview
Create a mobile-first TikTok Studio dashboard component using Lynx framework with ReactLynx, featuring analytics metrics, creator tools, finance tracking, and monetization programs in a responsive grid layout with native performance.

## Component Structure

### 1. Header Section
- **Title**: "TikTok Studio" (centered, bold, 24px) - Use `<text>` element
- **Background**: Pure black (#000000)
- **Height**: ~60px
- **Container**: `<view>` with flex centering

### 2. Tab Navigation
- **Two tabs**: "Tools" (ACTIVE) and "LIVE"
- **Active state**: White text with bottom border
- **Inactive state**: Gray text (#9ca3af)
- **Background**: Black, seamless with header
- **Implementation**: `<view>` containers with `bindtap` handlers

### 3. Analytics Section
- **Container**: `<view>` with section styling
- **Scrollable**: Use `<scroll-view>` for main content area

#### Section Header
- **Title**: "Analytics" - `<text>` element (left aligned, 18px semibold)
- **Action**: "View all >" - `<text>` with `bindtap` (right aligned, blue link)

#### Metrics Row (3 cards horizontal)
- **Layout**: `<view>` with CSS Grid or Flexbox
- **Cards**: Individual `<view>` elements with `bindtap` handlers

**Post Views Card Structure:**
```jsx
<view className="analytics-card" bindtap={handlePostViewsTap}>
  <text className="metric-value">22.3K</text>
  <text className="metric-label">Post views</text>
  <view className="growth-indicator positive">
    <text className="growth-icon">📈</text>
    <text className="growth-text">72.6% 7d</text>
  </view>
</view>
```

### 4. Tools Grid Section (2x2 grid)
- **Container**: `<view>` with CSS Grid layout
- **Cards**: Individual `<view>` elements with `bindtap` and MTS

**Account Check Tool Structure:**
```jsx
<view 
  className="tool-card"
  main-thread:bindtap={handleToolPress}
  bindtap={() => handleToolNavigation('account-check')}
>
  <view className="tool-icon-container green">
    <text className="tool-icon">✓</text>
  </view>
  <text className="tool-label">Account check</text>
</view>
```

### 5. Finance Section
- **Container**: `<view>` with section styling
- **Rows**: Individual `<view>` elements with `bindtap`

**Balance Row Structure:**
```jsx
<view className="finance-row" bindtap={handleBalanceTap}>
  <text className="finance-label">Balance</text>
  <view className="finance-right">
    <text className="finance-amount">$26.72</text>
    <text className="chevron">›</text>
  </view>
</view>
```

### 6. Monetization Programs Section
- **Container**: `<view>` with section styling
- **Grid**: 2x2 layout using CSS Grid

## Technical Implementation - Lynx Specific

### Lynx Elements Usage
```jsx
// Use Lynx native elements
<view>        // Instead of <div>
<text>        // Instead of <p>, <span>, <h1>, etc.
<scroll-view> // Instead of scrollable <div>
```

### Component Structure (ReactLynx)
```jsx
import { useState, useCallback } from '@lynx-js/react';
import './TikTokStudio.css';

export function TikTokStudioDashboard() {
  const [activeTab, setActiveTab] = useState('tools');
  
  const handleTabSwitch = useCallback((tab) => {
    'background only'; // Background thread for state updates
    setActiveTab(tab);
  }, []);

  const handleAnalyticsViewAll = useCallback(() => {
    'background only';
    // Navigate to analytics page
    console.log('Navigate to analytics');
  }, []);

  return (
    <view className="studio-dashboard">
      <StudioHeader />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />
      <scroll-view className="main-content">
        <AnalyticsSection onViewAll={handleAnalyticsViewAll} />
        <ToolsGrid />
        <FinanceSection />
        <MonetizationSection />
      </scroll-view>
    </view>
  );
}
```

### Analytics Section with Interactive Cards
```jsx
const AnalyticsSection = ({ onViewAll }) => {
  const analyticsData = [
    {
      id: "post-views",
      value: "22.3K",
      label: "Post views",
      growth: "+72.6%",
      period: "7d",
      trend: "positive"
    },
    {
      id: "net-followers",
      value: "-2",
      label: "Net followers",
      growth: "0%",
      period: "7d", 
      trend: "neutral"
    },
    {
      id: "likes",
      value: "1.9K",
      label: "Likes",
      growth: "+159%",
      period: "7d",
      trend: "positive"
    }
  ];

  const handleMetricTap = useCallback((metricId) => {
    'background only';
    console.log('Metric tapped:', metricId);
  }, []);

  return (
    <view className="analytics-section">
      <view className="section-header">
        <text className="section-title">Analytics</text>
        <text className="view-all-link" bindtap={onViewAll}>View all ›</text>
      </view>
      <view className="analytics-grid">
        {analyticsData.map((metric) => (
          <AnalyticsCard 
            key={metric.id}
            metric={metric}
            onTap={() => handleMetricTap(metric.id)}
          />
        ))}
      </view>
    </view>
  );
};

const AnalyticsCard = ({ metric, onTap }) => {
  const handlePress = (event) => {
    'main thread'; // MTS for immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  return (
    <view 
      className="analytics-card"
      main-thread:bindtap={handlePress}
      bindtap={onTap}
    >
      <text className="metric-value">{metric.value}</text>
      <text className="metric-label">{metric.label}</text>
      <view className={`growth-indicator ${metric.trend}`}>
        <text className="growth-icon">
          {metric.trend === 'positive' ? '📈' : metric.trend === 'negative' ? '📉' : '—'}
        </text>
        <text className="growth-text">{metric.growth} {metric.period}</text>
      </view>
    </view>
  );
};
```

### Tools Grid with MTS Interactions
```jsx
const ToolsGrid = () => {
  const toolsData = [
    {
      id: "account-check",
      name: "Account check",
      icon: "✓",
      color: "green",
      route: "/account-check"
    },
    {
      id: "creator-academy", 
      name: "Creator Academy",
      icon: "🎓",
      color: "yellow",
      route: "/creator-academy"
    },
    {
      id: "promote",
      name: "Promote", 
      icon: "↗️",
      color: "blue",
      route: "/promote"
    },
    {
      id: "benefits",
      name: "Benefits",
      icon: "🎁",
      color: "pink",
      route: "/benefits"
    }
  ];

  const handleToolNavigation = useCallback((toolId) => {
    'background only';
    console.log('Navigate to tool:', toolId);
  }, []);

  return (
    <view className="tools-section">
      <view className="tools-grid">
        {toolsData.map((tool) => (
          <ToolCard 
            key={tool.id}
            tool={tool}
            onTap={() => handleToolNavigation(tool.id)}
          />
        ))}
      </view>
    </view>
  );
};

const ToolCard = ({ tool, onTap }) => {
  const handlePress = (event) => {
    'main thread'; // Immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.95)');
    
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  return (
    <view 
      className="tool-card"
      main-thread:bindtap={handlePress}
      bindtap={onTap}
    >
      <view className={`tool-icon-container ${tool.color}`}>
        <text className="tool-icon">{tool.icon}</text>
      </view>
      <text className="tool-label">{tool.name}</text>
    </view>
  );
};
```

### Finance Section with Interactive Rows
```jsx
const FinanceSection = () => {
  const financeData = [
    {
      id: "balance",
      label: "Balance",
      amount: "$26.72",
      route: "/finance/balance"
    },
    {
      id: "rewards",
      label: "Estimated rewards",
      amount: "$0.00",
      route: "/finance/rewards"
    }
  ];

  const handleFinanceNavigation = useCallback((financeId) => {
    'background only';
    console.log('Navigate to finance:', financeId);
  }, []);

  return (
    <view className="finance-section">
      {financeData.map((item) => (
        <FinanceRow 
          key={item.id}
          item={item}
          onTap={() => handleFinanceNavigation(item.id)}
        />
      ))}
    </view>
  );
};

const FinanceRow = ({ item, onTap }) => {
  const handlePress = (event) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  return (
    <view 
      className="finance-row"
      main-thread:bindtap={handlePress}
      bindtap={onTap}
    >
      <text className="finance-label">{item.label}</text>
      <view className="finance-right">
        <text className="finance-amount">{item.amount}</text>
        <text className="chevron">›</text>
      </view>
    </view>
  );
};
```

### CSS Styling (Native CSS Support)
```css
/* Studio Dashboard Styles */
.studio-dashboard {
  display: flex;
  flex-direction: column;
  background: #000000;
  min-height: 100vh;
  color: white;
}

.main-content {
  flex: 1;
  padding: 16px;
}

/* Header Styles */
.studio-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
}

.studio-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  background: #000000;
  border-bottom: 1px solid #374151;
}

.tab-item {
  flex: 1;
  padding: 12px 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.tab-item.active {
  color: white;
  border-bottom: 2px solid white;
}

.tab-item.inactive {
  color: #9ca3af;
}

/* Section Styles */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.view-all-link {
  font-size: 14px;
  color: #3b82f6;
}

/* Analytics Grid */
.analytics-section {
  margin-bottom: 24px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.analytics-card {
  background: #1f2937;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease;
}

.metric-value {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.growth-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
}

.growth-indicator.positive {
  color: #10b981;
}

.growth-indicator.negative {
  color: #ef4444;
}

.growth-indicator.neutral {
  color: #9ca3af;
}

/* Tools Grid */
.tools-section {
  margin-bottom: 24px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.tool-card {
  background: #1f2937;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
}

.tool-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.tool-icon-container.green {
  background: #10b981;
}

.tool-icon-container.yellow {
  background: #f59e0b;
}

.tool-icon-container.blue {
  background: #3b82f6;
}

.tool-icon-container.pink {
  background: #ec4899;
}

.tool-icon {
  font-size: 24px;
}

.tool-label {
  font-size: 14px;
  color: white;
  text-align: center;
  line-height: 1.3;
}

/* Finance Section */
.finance-section {
  margin-bottom: 24px;
}

.finance-row {
  background: #1f2937;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  transition: background-color 0.2s ease;
}

.finance-label {
  font-size: 16px;
  color: white;
}

.finance-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.finance-amount {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.chevron {
  font-size: 16px;
  color: #9ca3af;
}

/* Monetization Section */
.monetization-section {
  margin-bottom: 24px;
}

.monetization-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.monetization-card {
  background: #1f2937;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
}

.monetization-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.monetization-icon-container.red {
  background: #ef4444;
}

.monetization-icon-container.purple {
  background: #8b5cf6;
}

.monetization-icon-container.cyan {
  background: #06b6d4;
}

.monetization-label {
  font-size: 14px;
  color: white;
  text-align: center;
  line-height: 1.3;
}
```

### Data Structure
```javascript
const studioData = {
  analytics: {
    postViews: {
      value: "22.3K",
      growth: "+72.6%",
      period: "7d",
      trend: "positive"
    },
    netFollowers: {
      value: "-2", 
      growth: "0%",
      period: "7d",
      trend: "neutral"
    },
    likes: {
      value: "1.9K",
      growth: "+159%", 
      period: "7d",
      trend: "positive"
    }
  },
  finance: {
    balance: "$26.72",
    estimatedRewards: "$0.00"
  },
  tools: [
    {
      id: "account-check",
      name: "Account check",
      icon: "✓",
      color: "green",
      route: "/account-check"
    },
    {
      id: "creator-academy", 
      name: "Creator Academy",
      icon: "🎓",
      color: "yellow",
      route: "/creator-academy"
    },
    {
      id: "promote",
      name: "Promote", 
      icon: "↗️",
      color: "blue",
      route: "/promote"
    },
    {
      id: "benefits",
      name: "Benefits",
      icon: "🎁",
      color: "pink",
      route: "/benefits"
    }
  ],
  monetizationPrograms: [
    {
      id: "tiktok-shop",
      name: "TikTok Shop",
      icon: "🛒",
      color: "red"
    },
    {
      id: "service-plus",
      name: "Service+",
      icon: "🎧",
      color: "purple"
    },
    {
      id: "subscription",
      name: "Subscription",
      icon: "👥",
      color: "cyan"
    },
    {
      id: "live-incentive",
      name: "LIVE Incentive Program",
      icon: "⚡",
      color: "yellow"
    }
  ]
};
```

### File Structure (Lynx Project)
```
src/
├── components/
│   ├── Studio/
│   │   ├── TikTokStudioDashboard.tsx
│   │   ├── StudioHeader.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── AnalyticsSection.tsx
│   │   ├── AnalyticsCard.tsx
│   │   ├── ToolsGrid.tsx
│   │   ├── ToolCard.tsx
│   │   ├── FinanceSection.tsx
│   │   ├── FinanceRow.tsx
│   │   ├── MonetizationSection.tsx
│   │   └── MonetizationCard.tsx
│   └── shared/
│       └── InteractiveButton.tsx
├── styles/
│   └── studio.css
└── App.tsx
```

This implementation creates a pixel-perfect TikTok Studio dashboard using Lynx's native components, Main Thread Scripting for smooth interactions, and proper dual-threaded architecture for optimal performance on mobile devices.