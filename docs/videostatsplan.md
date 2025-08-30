### **Task 1: Create New "Content" Tab in Analytics Dashboard**

**Tab Navigation Update:**

- Modify the `TabNavigation` component in `AnalyticsDashboardNew.tsx` to include a third tab: "Content"
- Update the tab state management to handle three tabs: `'views' | 'revenue' | 'content'`
- The tab order should be: Views, Revenue, Content

**Component Creation:**

- Create a new `ContentTab.tsx` component in `src/components/analytics/`
- This tab should follow the same structure as `ViewsTab.tsx` and `RevenueTab.tsx`
- Include the same time range filtering (7d, 30d, 90d, 1y) that can be reused from existing components

**Content Tab Layout:**

- **Individual Video Performance List**: The main focus of this tab
- Use the high-performance Lynx `<list>` element to render video cards
- Each video card should display individual video metrics and revenue data
- **Time Range Filtering**: Reuse the existing `TimeFilter` component to filter videos by creation date

---

### **Task 2: Implement Video Cards in Content Tab**

**Video Card Component:**

- Create a reusable `VideoCard` component for each video in the list
- Each card must contain the following elements:
  - **Video Title**: e.g., "Morning routine tips"
  - **Thumbnail**: Video thumbnail image (can use placeholder for now)
  - **Performance Stats**: Views, likes, comments, shares
  - **Revenue Metrics**: Projected earnings, revenue proportion
  - **Quality Indicators**: Quality score, compliance status
  - **Engagement Data**: Engagement rate, watch completion percentage

**Data Integration:**

- Use the existing video data from the backend API (the 5 sample videos for "John Doe")
- Filter videos based on the selected time range
- Sort videos by performance metrics (views, revenue, or quality score)

**Interactive Features:**

- Each video card should be tappable with `bindtap` event handler
- Tapping a card should navigate to the detailed `VideoStatsPage` (Task 3)
- Include sorting/filtering options (by views, revenue, date, etc.)

---

### **Task 3: Create the `VideoStatsPage.tsx` Detail Page**

**Component Structure & Architecture:**

```
src/components/video-stats/
├── VideoStatsPage.tsx              # Main page component
├── VideoStatsHeader.tsx            # Header with back button and video title
├── VideoStatsTabNavigation.tsx     # Tab navigation (Overview, Earnings)
├── overview/
│   ├── OverviewTab.tsx             # Overview tab container
│   ├── PrimaryKPISection.tsx       # Top 3 KPI cards (emphasized stats)
│   ├── OptimizerMetricsGrid.tsx    # Key optimizer metrics (green section)
│   ├── PerformanceMetricsGrid.tsx  # User interaction metrics
│   ├── ViewerDemographics.tsx      # Gender and age breakdown
│   └── TopLocationsSection.tsx     # Geographic breakdown (top 5)
└── earnings/
    ├── EarningsTab.tsx             # Earnings tab container
    ├── TotalEarningsCard.tsx       # Total projected earnings
    ├── EarningsOverTimeChart.tsx   # Earnings timeline chart
    ├── EarningsPerViewCard.tsx     # Revenue per view metric
    └── EarningSplitSection.tsx     # Revenue breakdown by source
```

#### **Task 3.1: Main VideoStatsPage Component**

**Component Creation:**

- Build the main `VideoStatsPage.tsx` component with dark mode styling
- Accept `video_id` as prop and manage navigation state
- Implement tab state management for two tabs: `'overview' | 'earnings'`

**Data Integration:**

- Fetch video data using `video_id` from API endpoint `/get-video-data?video_id=X`
- Include fallback to hardcoded video data if API unavailable
- Pass data down to child components via props

**Layout Structure:**

- Dark background (`#111827` or similar)
- Header with back navigation
- Tab navigation bar (Overview | Earnings)
- Scrollable content area for active tab

#### **Task 3.2: Header Component (`VideoStatsHeader.tsx`)**

**Header Elements:**

- Back arrow button (left) - returns to Content tab
- Video title (center) - e.g., "Morning routine tips"
- Optional menu button (right) for future features

**Styling:**

- Dark header background (`#1f2937`)
- White text and icons
- Consistent with existing app header patterns

#### **Task 3.3: Tab Navigation (`VideoStatsTabNavigation.tsx`)**

**Tab Structure:**

- Two tabs: "Overview", "Earnings"
- Active tab indicator (underline or background highlight)
- Smooth transition animations between tabs

**Interactive Features:**

- `bindtap` handlers for tab switching
- Visual feedback on tab press (MTS for immediate response)
- Reuse styling patterns from existing analytics tabs

#### **Task 3.4: Overview Tab Implementation**

**3.4.1: Primary KPI Section (`PrimaryKPISection.tsx`)**

- **Three prominent cards displaying the most critical business metrics:**
  - **Projected Earnings**: `${proj_earnings.toFixed(2)}` with growth indicator and trend
  - **Revenue Proportion**: `${(rev_prop * 100).toFixed(1)}%` of total TikTok ad revenue
  - **Quality Score**: `${(quality_score * 100).toFixed(0)}%` with color-coded status

**3.4.2: Optimizer Metrics Grid (`OptimizerMetricsGrid.tsx`) - EMPHASIZED SECTION**

- **Key Performance Indicators (Green Section from Image):**
  - **Watch Completion**: `${(watch_completion * 100).toFixed(1)}%` - Critical engagement metric
  - **Engagement Rate**: `${(engagement_rate * 100).toFixed(1)}%` - Overall interaction rate
  - **Engagement Diversity**: `${(engagement_diversity * 100).toFixed(1)}%` - Variety of interactions
  - **Rewatch Rate**: `${(rewatch * 100).toFixed(1)}%` - Content replay value
  - **NLP Quality**: `${(nlp_quality * 100).toFixed(0)}%` - Content quality score
  - **Compliance**: Status badge with clear visual indicator (✅ Compliant / ❌ Non-compliant)

**3.4.3: Performance Metrics Grid (`PerformanceMetricsGrid.tsx`)**

- **User Interaction Metrics:**
  - **Total Views**: `${views.toLocaleString()}` with view velocity
  - **Likes**: `${likes.toLocaleString()}` with like rate percentage
  - **Comments**: `${comments.toLocaleString()}` with comment engagement rate
  - **Shares**: `${shares.toLocaleString()}` with viral coefficient

**3.4.4: Viewer Demographics (`ViewerDemographics.tsx`)**

- **Gender Distribution (Compact):**
  - Horizontal bar or donut chart: Male 80%, Female 20%, Other 0%
- **Age Distribution (Top 3 segments):**
  - 18-24: 61%, 25-34: 32%, 35-44: 4%
  - Horizontal progress bars with percentages

**3.4.5: Top Locations Section (`TopLocationsSection.tsx`)**

- **Geographic Breakdown (Top 5 locations only):**
  - Singapore: 60.1%
  - Other: 17.1%
  - Malaysia: 10.8%
  - Myanmar (Burma): 2.5%
  - Philippines: 2.0%
- Compact horizontal progress bars with country flags (optional)

#### **Task 3.5: Earnings Tab Implementation**

**3.6.1: Total Earnings Card (`TotalEarningsCard.tsx`)**

- Large earnings display: `$${proj_earnings.toFixed(2)}`
- Revenue proportion context: "X% of total ad revenue"
- Growth indicator and trend

**3.6.2: Earnings Over Time Chart (`EarningsOverTimeChart.tsx`)**

- Line or bar chart showing earnings progression
- Time-based X-axis (days/weeks based on video age)
- Cumulative earnings growth
- Reuse existing chart components and styling

**3.6.3: Earnings Per View Card (`EarningsPerViewCard.tsx`)**

- Calculate and display: `$${(proj_earnings / views).toFixed(4)} per view`
- Comparison to average earnings per view
- Efficiency indicator (above/below average)

**3.6.4: Earning Split Section (`EarningSplitSection.tsx`)**

- Revenue breakdown by source:
  - Premium coins percentage and amount
  - Standard coins percentage and amount
  - Other revenue sources if applicable
- Progress bars showing split percentages
- Total validation showing 100% breakdown

#### **Task 3.6: Styling and Dark Mode Implementation**

**Color Scheme:**

- Background: `#111827` (dark gray)
- Cards: `#1f2937` (lighter dark gray)
- Text: `#ffffff` (white) and `#9ca3af` (light gray)
- Accent: `#3b82f6` (blue) for charts and highlights
- Success: `#10b981` (green) for positive metrics
- Warning: `#f59e0b` (amber) for attention items

**Component Styling:**

- Consistent card styling with rounded corners (`border-radius: 12px`)
- Proper spacing and padding (`padding: 20px`)
- Smooth transitions and hover effects
- Responsive layout for different screen sizes

#### **Task 3.7: Navigation and State Management**

**Navigation Flow:**

- Back button returns to Analytics Dashboard Content tab
- Maintain video_id in navigation state
- Handle deep linking if needed

**Data Flow:**

- Fetch video data on component mount
- Loading states for all sections
- Error handling with fallback UI
- Refresh capability for real-time updates

---

### **Task 4: Add "Top Performing Content" Section to Content Tab**

**Section Placement:**

- After implementing the main Content tab with individual video cards, add a "Top Performing Content" section
- This section should appear at the top of the Content tab, above the full video list
- Use `<text className="section-title">Top Performing Content</text>` for the title

**Content Display:**

- Show the top 3-5 performing videos based on the selected time range
- Use a horizontal scrollable list or compact card layout
- Each item should show key metrics: title, views, engagement rate
- Include quick navigation to the full `VideoStatsPage` for each video

**Integration:**

- This section should respect the same time range filter as the main video list
- Automatically update when the user changes the time range (7d, 30d, 90d, 1y)
- Use the same video data source and sorting logic as the main Content tab
