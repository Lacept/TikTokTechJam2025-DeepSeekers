# Mobile Analytics Dashboard - Lynx ReactLynx Implementation Prompt

## Overview

Create a mobile-first analytics dashboard component using Lynx framework with ReactLynx, featuring dark theme styling and native performance optimizations.

## Component Structure

### 1. Header Section

- **Back arrow button** (clickable, positioned left) - Use `<view>` with `bindtap`
- **Title**: "Analytics" (centered, white text) - Use `<text>` element
- **Background**: Dark (#1f2937 or similar)
- **Height**: ~64px

### 2. Tab Navigation

- **Two tabs**: "Views" (active) and "Revenue"
- **Active state**: White text with bottom border
- **Inactive state**: Gray text (#9ca3af)
- **Background**: Continues dark theme from header
- **Use**: `<view>` containers with `bindtap` handlers

### 3. Time Filter

- **Dropdown/Button**: "7 days"
- **Style**: Dark background with subtle border
- **Position**: Left-aligned below tabs
- **Implementation**: `<view>` with `bindtap` for dropdown functionality

### 4. Main Content Area (Dark background: #111827)

- **Container**: `<scroll-view>` for scrollable content
- **Layout**: Flexbox using CSS `display: flex`

#### A. Total Views Section

- **Layout**: Centered using `<view>` with flex styles
- **Label**: "Total Views" - `<text>` with gray styling
- **Main metric**: "22.3K" - `<text>` with large, bold styling
- **Growth indicator**: "+72.6% from last week" - `<text>` with green styling

#### B. Chart Section

- **Title**: "Views Over Time" - `<text>` element
- **Chart Container**: `<view>` with dark background
- **Chart Implementation**: Custom `<view>` elements as bars (no external chart library)
- **Bar colors**: Green (#10b981)
- **X-axis labels**: `<text>` elements for "21", "22", "23", "24", "25", "26", "27"
- **Legend**: `<view>` with green dot and "Views" `<text>`

#### C. Metrics Grid (2x2 layout)

- **Container**: `<view>` with CSS Grid or Flexbox
- **Cards**: Individual `<view>` elements with `bindtap` handlers

**Card Structure (for each metric):**

```jsx
<view className="metric-card" bindtap={handleMetricTap}>
  <view className="metric-icon">
    <text>📊</text> {/* Use emoji or custom icons */}
  </view>
  <text className="metric-value">8.4%</text>
  <text className="metric-label">Engagement Rate</text>
  <text className="metric-change positive">+2.1%</text>
</view>
```

## Technical Requirements - Lynx Specific

### Lynx Elements Usage

```jsx
// Use Lynx native elements instead of HTML
<view>        // Instead of <div>
<text>        // Instead of <p>, <span>, <h1>, etc.
<image>       // Instead of <img>
<scroll-view> // Instead of scrollable <div>
```

### Event Handling (Lynx Pattern)

```jsx
// Use bindtap instead of onClick
<view bindtap={handleBackPress} className="back-button">
  <text>←</text>
</view>

// For smooth animations, use Main Thread Scripting
<view main-thread:bindtap={handleTabPress} className="tab">
  <text>Views</text>
</view>

const handleTabPress = (event) => {
  'main thread'; // MTS directive for smooth UI updates
  // Immediate visual feedback
  event.currentTarget.setStyleProperty('background-color', '#374151');
};
```

### Component Structure (ReactLynx)

```jsx
import { useState, useCallback } from '@lynx-js/react';
import './AnalyticsDashboard.css';

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('views');

  const handleTabSwitch = useCallback((tab) => {
    'background only'; // Background thread for state updates
    setActiveTab(tab);
  }, []);

  return (
    <view className="analytics-dashboard">
      <AnalyticsHeader />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabSwitch} />
      <scroll-view className="main-content">
        <TotalViewsSection />
        <ChartSection />
        <MetricsGrid />
      </scroll-view>
    </view>
  );
}
```

### CSS Styling (Native CSS Support)

```css
/* Use standard CSS with Lynx */
.analytics-dashboard {
  display: flex;
  flex-direction: column;
  background: #111827;
  min-height: 100vh;
}

.metric-card {
  background: #1f2937;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
}

.metric-card:active {
  transform: scale(0.98);
}

.chart-bar {
  background: #10b981;
  border-radius: 4px 4px 0 0;
  transition: height 0.8s ease-out;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    height: 0;
  }
  to {
    height: var(--bar-height);
  }
}
```

### Custom Chart Implementation (No External Libraries)

```jsx
const ChartSection = () => {
  const chartData = [
    { day: '21', views: 2400, height: '60%' },
    { day: '22', views: 2800, height: '70%' },
    { day: '23', views: 2200, height: '55%' },
    { day: '24', views: 3200, height: '80%' },
    { day: '25', views: 2900, height: '72%' },
    { day: '26', views: 4000, height: '100%' },
    { day: '27', views: 3500, height: '87%' },
  ];

  return (
    <view className="chart-section">
      <text className="chart-title">Views Over Time</text>
      <view className="chart-container">
        <view className="chart-bars">
          {chartData.map((item, index) => (
            <view key={item.day} className="bar-container">
              <view className="chart-bar" style={{ height: item.height }} />
              <text className="bar-label">{item.day}</text>
            </view>
          ))}
        </view>
        <view className="chart-legend">
          <view className="legend-item">
            <view className="legend-dot" />
            <text className="legend-text">Views</text>
          </view>
        </view>
      </view>
    </view>
  );
};
```

### Performance Optimizations (Lynx Specific)

#### Main Thread Scripting for Smooth Interactions

```jsx
const MetricCard = ({ metric, onPress }) => {
  const handlePress = (event) => {
    'main thread'; // Run on UI thread for immediate response

    // Immediate visual feedback
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');

    // Reset after animation
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTapEnd = () => {
    'background only'; // Background thread for navigation
    onPress(metric.id);
  };

  return (
    <view
      className="metric-card"
      main-thread:bindtap={handlePress}
      bindtap={handleTapEnd}
    >
      <text className="metric-value">{metric.value}</text>
      <text className="metric-label">{metric.title}</text>
      <text className={`metric-change ${metric.trend}`}>{metric.change}</text>
    </view>
  );
};
```

### Data Structure

```javascript
const analyticsData = {
  totalViews: '22.3K',
  growth: '+72.6%',
  growthTrend: 'positive',
  chartData: [
    { day: '21', views: 2400 },
    { day: '22', views: 2800 },
    { day: '23', views: 2200 },
    { day: '24', views: 3200 },
    { day: '25', views: 2900 },
    { day: '26', views: 4000 },
    { day: '27', views: 3500 },
  ],
  metrics: [
    {
      id: 'engagement',
      title: 'Engagement Rate',
      value: '8.4%',
      change: '+2.1%',
      trend: 'positive',
      icon: '📊',
    },
    {
      id: 'watch-time',
      title: 'Avg. Watch Time',
      value: '45s',
      change: '+12%',
      trend: 'positive',
      icon: '⏱️',
    },
    {
      id: 'comments',
      title: 'Comments',
      value: '1.2K',
      change: '+89%',
      trend: 'positive',
      icon: '💬',
    },
    {
      id: 'shares',
      title: 'Shares',
      value: '340',
      change: '-5%',
      trend: 'negative',
      icon: '📤',
    },
  ],
};
```

### File Structure (Lynx Project)

```
src/
├── components/
│   ├── Analytics/
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── AnalyticsHeader.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── TotalViewsSection.tsx
│   │   ├── ChartSection.tsx
│   │   ├── MetricsGrid.tsx
│   │   └── MetricCard.tsx
│   └── shared/
│       └── InteractiveButton.tsx
├── styles/
│   └── analytics.css
└── App.tsx
```

### Navigation Integration

```jsx
// In App.tsx - Add analytics route
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToAnalytics = useCallback(() => {
    'background only';
    setCurrentPage('analytics');
  }, []);

  if (currentPage === 'analytics') {
    return <AnalyticsDashboard onBack={() => setCurrentPage('home')} />;
  }

  // ... rest of app
}
```

This implementation leverages Lynx's dual-threaded architecture, native CSS support, and ReactLynx patterns for optimal performance and smooth user interactions on mobile devices.
