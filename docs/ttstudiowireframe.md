# TikTok Studio Dashboard - ASCII Wireframe

## Main Studio Page Layout

```
┌─────────────────────────────────────┐
│            TikTok Studio            │  Header (centered title)
├─────────────────────────────────────┤
│ [Tools]  LIVE                       │  Tab Navigation (Tools active)
├─────────────────────────────────────┤
│                                     │
│ Analytics                 View all >│  Section Header with CTA
│                                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │  Analytics Cards Row
│ │ 22.3K   │ │   -2    │ │  1.9K   │  (3 metric cards)
│ │Post     │ │Net      │ │Likes    │  
│ │views    │ │followers│ │         │  
│ │📈72.6%7d│ │—0% 7d   │ │📈159%7d │  Growth indicators
│ └─────────┘ └─────────┘ └─────────┘ │
│                                     │
├─────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │  Tools Grid (2x2)
│ │  ✓   │ │ 🎓   │ │ ↗️   │ │ 🎁   │  Icons in circles
│ │Account│ │Creator│ │Promote│ │Benefits│
│ │check  │ │Academy│ │      │ │      │  
│ └──────┘ └──────┘ └──────┘ └──────┘ │
│                                     │
├─────────────────────────────────────┤
│ Balance                   $26.72 >  │  Balance Row (clickable)
├─────────────────────────────────────┤
│ Estimated rewards         $0.00  >  │  Rewards Row (clickable)
├─────────────────────────────────────┤
│                                     │
│ Monetization Programs     View all >│  Section Header with CTA
│                                     │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │  Monetization Grid (2x2)
│ │ 🛒   │ │ 🎧   │ │ 👥   │ │ ⚡   │  Icons in circles
│ │TikTok │ │Service+ │Subscription│LIVE │
│ │Shop  │ │      │ │      │Incentive│  
│ │      │ │      │ │      │Program │  
│ └──────┘ └──────┘ └──────┘ └──────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Component Structure Tree

```
TikTok Studio Dashboard
├── Header
│   └── Title ("TikTok Studio")
├── TabNavigation
│   ├── ToolsTab (active)
│   └── LiveTab  
├── AnalyticsSection
│   ├── SectionHeader
│   │   ├── Title ("Analytics")
│   │   └── ViewAllLink
│   └── MetricsRow
│       ├── PostViewsCard
│       │   ├── Value ("22.3K")
│       │   ├── Label ("Post views")
│       │   └── Growth ("📈 72.6% 7d")
│       ├── FollowersCard
│       │   ├── Value ("-2")
│       │   ├── Label ("Net followers")
│       │   └── Growth ("— 0% 7d")
│       └── LikesCard
│           ├── Value ("1.9K")
│           ├── Label ("Likes")
│           └── Growth ("📈 159% 7d")
├── ToolsGrid
│   ├── AccountCheckTool
│   │   ├── Icon ("✓")
│   │   └── Label ("Account check")
│   ├── CreatorAcademyTool
│   │   ├── Icon ("🎓")
│   │   └── Label ("Creator Academy")
│   ├── PromoteTool
│   │   ├── Icon ("↗️")
│   │   └── Label ("Promote")
│   └── BenefitsTool
│       ├── Icon ("🎁")
│       └── Label ("Benefits")
├── FinanceSection
│   ├── BalanceRow
│   │   ├── Label ("Balance")
│   │   ├── Amount ("$26.72")
│   │   └── ChevronRight
│   └── RewardsRow
│       ├── Label ("Estimated rewards")
│       ├── Amount ("$0.00")
│       └── ChevronRight
└── MonetizationSection
    ├── SectionHeader
    │   ├── Title ("Monetization Programs")
    │   └── ViewAllLink
    └── ProgramsGrid
        ├── TikTokShopProgram
        │   ├── Icon ("🛒")
        │   └── Label ("TikTok Shop")
        ├── ServicePlusProgram
        │   ├── Icon ("🎧")
        │   └── Label ("Service+")
        ├── SubscriptionProgram
        │   ├── Icon ("👥")
        │   └── Label ("Subscription")
        └── LiveIncentiveProgram
            ├── Icon ("⚡")
            └── Label ("LIVE Incentive Program")
```

## Layout Specifications

### Dimensions & Spacing
```
Mobile Container: 375px max-width
├── Horizontal Padding: 16px
├── Section Spacing: 24px vertical
├── Card Grid Gap: 12px
└── Row Spacing: 16px between elements

Header: 60px height
├── Title: 24px font, bold, centered
└── Background: #000000 (black)

Tabs: 48px height
├── Tab Padding: 12px vertical, 16px horizontal
├── Active: white text + bottom border
├── Inactive: gray text (#9ca3af)
└── Font: 16px medium

Analytics Cards: auto height
├── Width: flex-grow (3 equal columns)
├── Padding: 16px
├── Border-radius: 8px
├── Background: #1f2937 (dark gray)
├── Gap: 12px between cards
└── Min-height: 100px

Value Text:
├── Font-size: 28px
├── Font-weight: bold
├── Color: #ffffff (white)
└── Margin-bottom: 4px

Label Text:
├── Font-size: 14px
├── Color: #9ca3af (gray)
└── Margin-bottom: 8px

Growth Indicators:
├── Font-size: 12px
├── Positive: #10b981 (green) with 📈
├── Negative: #ef4444 (red) with 📉
├── Neutral: #9ca3af (gray) with —
└── Format: "72.6% 7d"

Tools Grid: 2x2 layout
├── Card Size: equal flex
├── Padding: 20px
├── Border-radius: 8px
├── Background: #1f2937
├── Icon Size: 32px
├── Icon Background: circular, 48px diameter
└── Label: 14px, centered below icon

Finance Rows:
├── Height: 56px
├── Padding: 16px horizontal
├── Background: #1f2937
├── Border-radius: 8px
├── Display: flex, space-between, center aligned
├── Label: 16px, left aligned
├── Amount: 18px, bold, right aligned
└── Chevron: 16px, gray

Monetization Grid: 2x2 layout (similar to tools)
├── Multi-line labels supported
├── Text-align: center
├── Icon backgrounds: match brand colors
└── Responsive: stack on smaller screens
```

### Color Coding & Theme
```
Background Hierarchy:
├── App Background: #000000 (black)
├── Card Background: #1f2937 (dark gray)
├── Text Primary: #ffffff (white)
├── Text Secondary: #9ca3af (gray)
├── Accent Green: #10b981 (positive growth)
├── Accent Red: #ef4444 (negative growth)
└── Interactive: #3b82f6 (blue links)

Icon Colors:
├── Account Check: #10b981 (green)
├── Creator Academy: #f59e0b (yellow)
├── Promote: #3b82f6 (blue)  
├── Benefits: #ec4899 (pink)
├── TikTok Shop: #ef4444 (red)
├── Service+: #8b5cf6 (purple)
├── Subscription: #06b6d4 (cyan)
└── LIVE Incentive: #f59e0b (yellow)

Typography Scale:
├── Header Title: 24px bold
├── Section Titles: 18px semibold
├── Metric Values: 28px bold
├── Card Labels: 14px medium
├── Growth Text: 12px medium
├── Finance Amounts: 18px bold
└── Links: 14px medium with chevron
```

### Interactive States
```
Tab Navigation:
├── Active: white text, bottom border, no background
├── Inactive: gray text, transparent background
└── Hover: subtle background highlight

Cards (Analytics/Tools/Monetization):
├── Default: dark gray background
├── Hover: slightly lighter background
├── Active/Pressed: subtle scale down (0.98)
└── Transition: 200ms ease-in-out

Finance Rows:
├── Default: dark gray background  
├── Hover: slightly lighter background
├── Active: subtle highlight
└── Chevron: rotates slightly on hover

View All Links:
├── Default: blue text with chevron
├── Hover: underline
└── Active: darker blue
```

This wireframe provides a complete structural blueprint for implementing the TikTok Studio dashboard with precise specifications for layout, typography, colors, and interactions.