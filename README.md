# TikTok-like App with Lynx Framework

A TikTok-inspired mobile application built using ByteDance's Lynx cross-platform framework. This app demonstrates the power of building native mobile experiences using familiar web technologies like React and CSS.

## Features

- **For You Page**: Full-screen video experience with TikTok-like interactions
- **Profile Page**: User profile with video grid and stats
- **Bottom Navigation**: Navigate between different sections
- **Responsive Design**: Optimized for mobile devices
- **Native Performance**: Leverages Lynx's dual-threaded architecture

## Pages Implemented

### ✅ For You Page
- Full-screen video background with real video simulation
- **Interactive Like Button**: Tap to like/unlike with filled/unfilled heart icons, real-time count updates and visual feedback
- **TikTok-Style Comment System**: Tap to open comment modal with:
  - Authentic TikTok-style layout and design
  - Scrollable comments list with colorful user avatars
  - Like individual comments with filled/unfilled hearts
  - View replies functionality with reply counts
  - Verified user badges
  - Real-time like count formatting (8K, etc.)
  - 579 comments matching the reference design
- **Interactive Share Modal**: Tap to open share options with:
  - Multiple sharing platforms (Message, WhatsApp, Instagram, Twitter, Facebook)
  - Copy link and save video options
  - Report functionality
- **Interactive User Profile**: Tap to follow/unfollow with visual state changes
- **Animated Music Disc**: Rotating disc with play/pause functionality
- **Main Thread Scripting (MTS)**: Smooth button press animations using Lynx's dual-threaded architecture

### ✅ Profile Page  
- **Interactive Profile Header**: Add friends and menu buttons with press animations
- **Profile Menu Modal**: Bottom sheet menu with TikTok Studio, Balance, QR code, and Settings options
- **Interactive Profile Avatar**: Tap-responsive avatar with dynamic color generation
- **Interactive Stats**: Tap-responsive Following, Followers, and Likes counters
- **Interactive Action Buttons**: Edit profile and bookmark buttons with press feedback
- **Interactive Tab Selector**: Switch between Posts and Liked videos with visual feedback
- **Interactive Video Grid**: Tap-responsive video thumbnails with view counts and durations
- **Create Video Button**: Interactive "Tap to create" button with gradient background
- **Removed Status Bar**: Clean design without fixed phone status bar

### ✅ Bottom Navigation
- Home (For You page)
- Discover (placeholder)
- Create (placeholder) 
- Inbox (placeholder)
- Profile (Me page)

## Getting Started

### Prerequisites
- Node.js 18 or later
- Lynx Explorer app installed on your device/simulator

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Scan the QR code with Lynx Explorer to view the app

## Project Structure

```
src/
├── components/
│   ├── BottomNavigation.tsx    # Reusable bottom navigation
│   ├── ForYouPage.tsx         # Main video feed page with interactions
│   ├── ProfilePage.tsx        # Interactive user profile page
│   ├── BlankPage.tsx          # Placeholder for unimplemented pages
│   ├── InteractiveButton.tsx  # Reusable interactive button component
│   ├── CommentModal.tsx       # TikTok-style comment system
│   ├── ShareModal.tsx         # Share options modal
│   ├── MusicDisc.tsx          # Animated rotating music disc
│   ├── UserProfile.tsx        # Interactive user profile component
│   ├── TextInput.tsx          # Custom text input component
│   ├── ProfileHeader.tsx      # Interactive profile page header
│   ├── ProfileAvatar.tsx      # Interactive profile avatar component
│   ├── ProfileStats.tsx       # Interactive stats component
│   ├── ProfileActionButtons.tsx # Interactive action buttons
│   ├── ProfileTabSelector.tsx # Interactive tab selector
│   ├── VideoGrid.tsx          # Interactive video grid component
│   └── ProfileMenuModal.tsx   # Profile menu bottom sheet modal
├── assets/                    # Images and icons
├── App.tsx                    # Main app component with navigation
├── App.css                    # Global styles with animations
└── index.tsx                  # App entry point
```

## Interactive Components

### InteractiveButton
- Supports different sizes (small, medium, large)
- Active/inactive states with custom colors
- Dual icon support (filled/unfilled hearts for like button)
- Press animations using Main Thread Scripting
- Real-time count updates

### CommentModal
- Authentic TikTok-style design and layout
- Scrollable comments list with colorful user avatars
- Like/unlike individual comments with filled/unfilled hearts
- View replies functionality with reply counts
- Verified user badges support
- Real-time like count formatting (8K format)
- Smooth modal animations and transitions

### ShareModal
- Grid layout of sharing options
- Platform-specific icons and colors
- Visual feedback on selection
- Cancel functionality

### MusicDisc
- Continuous rotation animation when playing
- Play/pause toggle functionality
- Vinyl record visual effects
- Pulsing animation indicator

### UserProfile
- Dynamic avatar generation based on username
- Follow/unfollow state management
- Visual follow button with animations
- Profile press handling

## Profile Page Components

### ProfileHeader
- Interactive add friends and menu buttons
- Display name with dropdown indicator
- Press animations using Main Thread Scripting
- Clean header layout without status bar
- Uses actual menu icon from assets

### ProfileMenuModal
- Bottom sheet modal that slides up from bottom
- TikTok Studio option with studio icon
- Balance option with wallet icon
- Your QR code option with mobile emoji
- Settings and privacy option with settings icon
- Smooth modal animations and press feedback
- Tap outside to close functionality

### ProfileAvatar
- Interactive profile picture with press feedback
- Dynamic color generation for usernames without images
- Multiple size support (small, medium, large)
- Smooth scaling animations on press

### ProfileStats
- Interactive Following, Followers, and Likes counters
- Press animations and feedback
- Tap-responsive stat navigation
- Clean numerical display

### ProfileActionButtons
- Interactive Edit Profile button with press feedback
- Interactive Bookmark button
- Smooth scaling animations
- Proper button states and transitions

### ProfileTabSelector
- Interactive Posts and Liked tabs
- Visual active state indicators
- Smooth tab switching animations
- Press feedback with background changes

### VideoGrid
- Interactive video thumbnails with press animations
- View counts and duration overlays
- Interactive "Tap to create" button
- Responsive grid layout with proper aspect ratios
- Smooth scaling animations on video press

## Key Technologies

- **Lynx Framework**: Cross-platform UI framework by ByteDance
- **ReactLynx**: React implementation for Lynx with `@lynx-js/react`
- **TypeScript**: Type-safe development
- **CSS**: Native CSS support with animations and transitions
- **Lynx Native Elements**: `<view>`, `<text>`, `<image>`, `<scroll-view>` instead of HTML
- **Dual-Threaded Architecture**: Background thread for logic, main thread for UI
- **Main Thread Scripting (MTS)**: Critical interactions run on UI thread for instant response

## Architecture Highlights

- **Dual-threaded Design**: UI rendering on main thread, business logic on background thread
- **Component-based**: Modular React components for reusability
- **Interactive Components**: Custom-built interactive buttons, modals, and animations
- **State Management**: Local state with React hooks and real-time updates
- **Navigation**: Tab-based navigation system with modal overlays
- **Event Handling**: Uses `bindtap` instead of `onClick` with proper thread directives
- **Performance Optimized**: Leverages MTS for smooth animations and immediate user feedback

## Development Notes

- Uses Lynx-specific elements (`<view>`, `<text>`, `<image>`) instead of HTML
- Event handling with `bindtap` instead of `onClick`
- CSS properties like `object-fit` are not supported in Lynx
- Import paths require `.js` extensions due to ES module requirements

## Future Enhancements

- Implement video playback functionality
- Add real data fetching and state management
- Implement the remaining pages (Discover, Create, Inbox)
- Add user authentication
- Integrate with TikTok APIs
- Add more interactive animations

## Testing

Use Lynx Explorer to test the app on:
- iOS Simulator/Device
- Android Emulator/Device
- Web browser (development)

## Build for Production

```bash
npm run build
```

This creates optimized bundles for deployment to native applications.