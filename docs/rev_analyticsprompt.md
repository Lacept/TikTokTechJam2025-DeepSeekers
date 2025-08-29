# Mobile Revenue Analytics Dashboard - Lynx ReactLynx Implementation Prompt

## Overview
Create a mobile-first revenue analytics dashboard component using Lynx framework with ReactLynx, featuring the "Revenue" tab view with dark theme styling, revenue breakdown, and custom chart visualization.

## Component Structure

### 1. Header Section (Same as Views)
- **Back arrow button** (clickable, positioned left) - Use `<view>` with `bindtap`
- **Title**: "Analytics" (centered, white text) - Use `<text>` element
- **Background**: Dark (#1f2937)

### 2. Tab Navigation
- **Two tabs**: "Views" (inactive) and "Revenue" (ACTIVE)
- **Active state**: "Revenue" has white text with bottom border
- **Inactive state**: "Views" has gray text (#9ca3af)
- **Implementation**: `<view>` containers with `bindtap` handlers

### 3. Time Filter
- **Button**: "7 days" with dark styling
- **Implementation**: `<view>` with `bindtap` for dropdown functionality

### 4. Main Content Area (Dark background: #111827)
- **Container**: `<scroll-view>` for scrollable content

#### A. Total Revenue Section
- **Layout**: Centered using `<view>` with flex styles
- **Label**: "Total Revenue" - `<text>` with gray styling
- **Main metric**: "$142.50" - `<text>` with large, bold styling
- **Growth indicator**: "+34.2% from last week" - `<text>` with green styling

#### B. Revenue Chart Section
- **Title**: "Revenue Over Time" - `<text>` element
- **Chart Container**: `<view>` with dark background
- **Chart Implementation**: Custom `<view>` elements as bars (no external chart library)
- **Bar colors**: Yellow/Gold (#fbbf24)
- **Y-axis labels**: Custom `<text>` elements for "$28.40", "$14.20", "$12.50"
- **X-axis labels**: `<text>` elements for "21", "22", "23", "24", "25", "26", "27"
- **Legend**: `<view>` with yellow dot and "Revenue ($)" `<text>`

#### C. Revenue Breakdown Section
- **Section Title**: "Revenue Breakdown" - `<text>` element
- **Cards**: Individual `<view>` elements with progress bars

**Premium Coins Card Structure:**
```jsx
<view className="breakdown-card" bindtap={handlePremiumTap}>
  <view className="breakdown-header">
    <view className="icon-container premium">
      <text className="icon">👑</text>
    </view>
    <view className="breakdown-info">
      <text className="breakdown-title">Premium Coins</text>
      <text className="breakdown-amount">$95.40</text>
      <text className="breakdown-percentage">66.9% of total</text>
    </view>
  </view>
  <view className="progress-container">
    <view className="progress-bar">
      <view className="progress-fill premium" style="width: 66.9%;" />
    </view>
  </view>
</view>
```

## Technical Requirements - Lynx Specific

### Lynx Elements Usage
```jsx
// Use Lynx native elements
<view>        // Instead of <div>
<text>        // Instead of <p>, <span>, <h1>, etc.
<scroll-view> // Instead of scrollable <div>
```

### Component Structure (ReactLynx)
```jsx
import { useState, useCallback, useEffect } from '@lynx-js/react';
import './RevenueAnalytics.css';

export function RevenueAnalyticsDashboard({ onBack }) {
  const [animateProgress, setAnimateProgress] = useState(false);
  
  useEffect(() => {
    // Trigger progress bar animations after component mounts
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <view className="revenue-analytics">
      <AnalyticsHeader onBack={onBack} />
      <TabNavigation activeTab="revenue" />
      <scroll-view className="main-content">
        <TotalRevenueSection />
        <RevenueChartSection />
        <RevenueBreakdownSection animate={animateProgress} />
      </scroll-view>
    </view>
  );
}
```

### Custom Chart Implementation (No External Libraries)
```jsx
const RevenueChartSection = () => {
  const chartData = [
    { day: "21", revenue: 12.50, height: "44%" },
    { day: "22", revenue: 15.30, height: "54%" },
    { day: "23", revenue: 13.20, height: "46%" },
    { day: "24", revenue: 18.40, height: "65%" },
    { day: "25", revenue: 16.80, height: "59%" },
    { day: "26", revenue: 28.40, height: "100%" },
    { day: "27", revenue: 25.30, height: "89%" }
  ];

  const yAxisLabels = ["$28.40", "$14.20", "$12.50"];

  return (
    <view className="chart-section">
      <text className="chart-title">Revenue Over Time</text>
      <view className="chart-container">
        <view className="chart-y-axis">
          {yAxisLabels.map((label, index) => (
            <text key={index} className="y-axis-label">{label}</text>
          ))}
        </view>
        <view className="chart-content">
          <view className="chart-bars">
            {chartData.map((item, index) => (
              <view key={item.day} className="bar-container">
                <view 
                  className="revenue-bar"
                  style={{ 
                    height: item.height,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <text className="bar-label">{item.day}</text>
              </view>
            ))}
          </view>
        </view>
        <view className="chart-legend">
          <view className="legend-item">
            <view className="legend-dot revenue" />
            <text className="legend-text">Revenue ($)</text>
          </view>
        </view>
      </view>
    </view>
  );
};
```

### Revenue Breakdown with Animated Progress Bars
```jsx
const RevenueBreakdownSection = ({ animate }) => {
  const breakdownData = [
    {
      id: "premium",
      name: "Premium Coins",
      icon: "👑",
      amount: "$95.40",
      percentage: "66.9% of total",
      progressWidth: 66.9,
      color: "premium"
    },
    {
      id: "standard", 
      name: "Standard Coins",
      icon: "🪙",
      amount: "$47.10",
      percentage: "33.1% of total", 
      progressWidth: 33.1,
      color: "standard"
    }
  ];

  const handleBreakdownTap = useCallback((itemId) => {
    'background only';
    console.log('Breakdown item tapped:', itemId);
  }, []);

  return (
    <view className="breakdown-section">
      <text className="section-title">Revenue Breakdown</text>
      {breakdownData.map((item) => (
        <BreakdownItem 
          key={item.id}
          item={item}
          animate={animate}
          onTap={() => handleBreakdownTap(item.id)}
        />
      ))}
    </view>
  );
};

const BreakdownItem = ({ item, animate, onTap }) => {
  const handlePress = (event) => {
    'main thread'; // MTS for immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  return (
    <view 
      className="breakdown-item"
      main-thread:bindtap={handlePress}
      bindtap={onTap}
    >
      <view className="breakdown-header">
        <view className={`icon-container ${item.color}`}>
          <text className="breakdown-icon">{item.icon}</text>
        </view>
        <view className="breakdown-info">
          <text className="breakdown-title">{item.name}</text>
          <text className="breakdown-amount">{item.amount}</text>
          <text className="breakdown-percentage">{item.percentage}</text>
        </view>
      </view>
      <view className="progress-container">
        <view className="progress-track">
          <view 
            className={`progress-fill ${item.color}`}
            style={{ 
              width: animate ? `${item.progressWidth}%` : '0%'
            }}
          />
        </view>
      </view>
    </view>
  );
};
```

### CSS Styling (Native CSS Support)
```css
/* Revenue Analytics Styles */
.revenue-analytics {
  display: flex;
  flex-direction: column;
  background: #111827;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 16px;
}

/* Chart Styles */
.chart-section {
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.chart-container {
  display: flex;
  margin-top: 16px;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 200px;
  padding-right: 8px;
}

.y-axis-label {
  color: #9ca3af;
  font-size: 12px;
  text-align: right;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
  height: 200px;
  gap: 8px;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.revenue-bar {
  background: #fbbf24;
  border-radius: 4px 4px 0 0;
  width: 100%;
  min-height: 4px;
  animation: slideUpRevenue 0.8s ease-out forwards;
  transform-origin: bottom;
}

@keyframes slideUpRevenue {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bar-label {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 8px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.revenue {
  background: #fbbf24;
}

/* Breakdown Styles */
.breakdown-section {
  margin-top: 24px;
}

.section-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.breakdown-item {
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: transform 0.2s ease;
}

.breakdown-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container.premium {
  background: #fbbf24;
}

.icon-container.standard {
  background: #6b7280;
}

.breakdown-icon {
  font-size: 24px;
}

.breakdown-info {
  flex: 1;
}

.breakdown-title {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.breakdown-amount {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.breakdown-percentage {
  color: #9ca3af;
  font-size: 14px;
}

.progress-container {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: #374151;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s ease-out;
}

.progress-fill.premium {
  background: #fbbf24;
}

.progress-fill.standard {
  background: #6b7280;
}

/* Total Revenue Section */
.total-revenue-section {
  text-align: center;
  margin-bottom: 32px;
}

.revenue-label {
  color: #9ca3af;
  font-size: 16px;
  margin-bottom: 8px;
}

.revenue-value {
  color: white;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 8px;
}

.revenue-growth {
  color: #10b981;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
```

### Revenue Data Structure
```javascript
const revenueData = {
  totalRevenue: "$142.50",
  growth: "+34.2%",
  growthTrend: "positive",
  chartData: [
    { day: "21", revenue: 12.50 },
    { day: "22", revenue: 15.30 },
    { day: "23", revenue: 13.20 },
    { day: "24", revenue: 18.40 },
    { day: "25", revenue: 16.80 },
    { day: "26", revenue: 28.40 },
    { day: "27", revenue: 25.30 }
  ],
  breakdown: [
    {
      id: "premium",
      name: "Premium Coins",
      icon: "👑",
      amount: "$95.40",
      percentage: "66.9% of total",
      progressWidth: 66.9,
      color: "premium"
    },
    {
      id: "standard", 
      name: "Standard Coins",
      icon: "🪙",
      amount: "$47.10",
      percentage: "33.1% of total", 
      progressWidth: 33.1,
      color: "standard"
    }
  ]
};
```

### Performance Optimizations (Lynx Specific)

#### Main Thread Scripting for Smooth Interactions
```jsx
const TotalRevenueSection = () => {
  const handleRevenuePress = (event) => {
    'main thread'; // Immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 200);
  };

  return (
    <view 
      className="total-revenue-section"
      main-thread:bindtap={handleRevenuePress}
    >
      <text className="revenue-label">Total Revenue</text>
      <text className="revenue-value">$142.50</text>
      <view className="revenue-growth">
        <text>📈</text>
        <text>+34.2% from last week</text>
      </view>
    </view>
  );
};
```

### File Structure (Lynx Project)
```
src/
├── components/
│   ├── Analytics/
│   │   ├── RevenueAnalyticsDashboard.tsx
│   │   ├── shared/
│   │   │   ├── AnalyticsHeader.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   └── TimeFilter.tsx
│   │   ├── TotalRevenueSection.tsx
│   │   ├── RevenueChartSection.tsx
│   │   ├── RevenueBreakdownSection.tsx
│   │   └── BreakdownItem.tsx
│   └── shared/
│       └── InteractiveButton.tsx
├── styles/
│   └── revenue-analytics.css
└── App.tsx
```

This implementation creates a comprehensive revenue analytics dashboard using Lynx's native components and performance optimizations, with custom chart visualization and smooth animated progress bars.