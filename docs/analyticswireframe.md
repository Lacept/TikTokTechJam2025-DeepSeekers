# Analytics Dashboard - ASCII Wireframes

## Views Tab Layout

```
┌─────────────────────────────────────┐
│ ← Analytics                         │  Header (dark bg)
├─────────────────────────────────────┤
│ [Views]  Revenue                    │  Tab Navigation
├─────────────────────────────────────┤
│ [7 days ▼]                          │  Time Filter
├─────────────────────────────────────┤
│                                     │
│            Total Views              │  
│             22.3K                   │  Main Metric (large)
│       📈 +72.6% from last week      │  Growth Indicator (green)
│                                     │
├─────────────────────────────────────┤
│ Views Over Time                     │  Chart Section Title
│                                     │
│ 5.2K ┤                        ██    │  
│      │                     ██ ██ ██ │  Bar Chart
│ 2.6K ┤        ██    ██    ██       │  (7 bars, green)
│      │    ██  ██ ██ ██ ██          │  
│ 2.4K ┼────██──────────────────────  │  
│      21  22  23  24  25  26  27     │  X-axis labels
│                                     │
│ ● Views                             │  Legend
│                                     │
├─────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ │  Metrics Grid (2x2)
│ │❤️ Engagement   │ │👁️ Avg. Watch  │  
│ │   Rate        │ │   Time        │  
│ │   8.4%        │ │   45s         │  
│ │ 📈 +2.1%      │ │ 📈 +12%       │  
│ └───────────────┘ └───────────────┘ │
│                                     │
│ ┌───────────────┐ ┌───────────────┐ │
│ │💬 Comments     │ │📤 Shares       │  
│ │   1.2K        │ │   340         │  
│ │ 📈 +89%       │ │ 📉 -5%        │  
│ └───────────────┘ └───────────────┘ │
└─────────────────────────────────────┘
```

## Revenue Tab Layout

```
┌─────────────────────────────────────┐
│ ← Analytics                         │  Header (dark bg)
├─────────────────────────────────────┤
│ Views  [Revenue]                    │  Tab Navigation (Revenue active)
├─────────────────────────────────────┤
│ [7 days ▼]                          │  Time Filter
├─────────────────────────────────────┤
│                                     │
│           Total Revenue             │  
│            $142.50                  │  Main Metric (large)
│      📈 +34.2% from last week       │  Growth Indicator (green)
│                                     │
├─────────────────────────────────────┤
│ Revenue Over Time                   │  Chart Section Title
│                                     │
│$28.40┤                        ██    │  Y-axis with $ values
│      │                        ██ ██ │  Bar Chart (7 bars, yellow)
│$14.20┤        ██         ██         │  
│      │    ██  ██ ██ ██ ██          │  
│$12.50┼────██──────────────────────  │  
│      21  22  23  24  25  26  27     │  X-axis labels
│                                     │
│ ● Revenue ($)                       │  Legend (yellow dot)
│                                     │
├─────────────────────────────────────┤
│ Revenue Breakdown                   │  Breakdown Section Title
│                                     │
│ 👑 Premium Coins                    │  
│    $95.40                           │  Amount (large)
│    66.9% of total                   │  Percentage
│    ████████████████▓▓▓▓▓▓▓▓         │  Progress Bar (67% filled)
│                                     │
│ 🪙 Standard Coins                   │  
│    $47.10                           │  Amount (large)
│    33.1% of total                   │  Percentage  
│    ████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │  Progress Bar (33% filled)
│                                     │
│                     ⚡ Made in Bolt │  Footer Brand (bottom right)
└─────────────────────────────────────┘
```

## Component Breakdown Structure

```
Analytics Dashboard
├── Header
│   ├── BackButton (←)
│   └── Title ("Analytics")
├── TabNavigation  
│   ├── ViewsTab
│   └── RevenueTab (active state with underline)
├── TimeFilter
│   └── DropdownButton ("7 days")
└── MainContent
    ├── TotalMetricSection
    │   ├── Label ("Total Views" / "Total Revenue")
    │   ├── MainNumber ("22.3K" / "$142.50")
    │   └── GrowthIndicator ("+72.6%" / "+34.2%")
    ├── ChartSection
    │   ├── ChartTitle
    │   ├── BarChart
    │   │   ├── YAxis (Revenue tab only)
    │   │   ├── Bars (7 bars, color varies)
    │   │   └── XAxis (days 21-27)
    │   └── Legend
    └── MetricsSection
        ├── Views Tab: MetricsGrid (2x2)
        │   ├── EngagementCard
        │   ├── WatchTimeCard  
        │   ├── CommentsCard
        │   └── SharesCard
        └── Revenue Tab: BreakdownSection
            ├── PremiumCoinsItem
            │   ├── Icon + Title
            │   ├── Amount + Percentage
            │   └── ProgressBar
            └── StandardCoinsItem
                ├── Icon + Title
                ├── Amount + Percentage
                └── ProgressBar
```

## Layout Specifications

### Dimensions & Spacing
```
Mobile Container: 375px max-width
├── Padding: 16px horizontal
├── Section Spacing: 24-32px vertical  
├── Card Spacing: 16px gap
└── Component Padding: 16-20px internal

Header: 64px height
├── Back Button: 24x24px
├── Title: 20px font, centered
└── Background: #1f2937 (dark)

Tabs: 48px height
├── Tab Padding: 12px vertical
├── Active: white text + bottom border
└── Inactive: gray text (#9ca3af)

Chart: 200px height
├── Bars: flex-grow with 8px gap
├── Y-axis: 40px width (Revenue tab)
├── Labels: 12px font, gray text
└── Container: #374151 background

Cards: auto height
├── Padding: 16-20px
├── Border-radius: 8px
├── Background: #1f2937
└── Text: white primary, gray secondary
```

### Color Coding
```
Views Tab Theme:
├── Primary: Green (#10b981)
├── Charts: Green bars
└── Growth: Green indicators

Revenue Tab Theme:  
├── Primary: Yellow (#fbbf24)
├── Charts: Yellow bars
├── Premium: Yellow progress
└── Standard: Gray progress (#6b7280)

Universal Dark Theme:
├── Background: #111827
├── Cards: #1f2937  
├── Text Primary: #ffffff
├── Text Secondary: #9ca3af
└── Borders: #374151
```

This ASCII representation provides a clear structural understanding that an agent can interpret to build the responsive mobile analytics dashboard with proper component hierarchy and styling specifications.