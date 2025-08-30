# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
- `npm run dev` - Start development server with QR code for Lynx Explorer
- `npm run build` - Build for production deployment
- `npm run preview` - Preview production build locally

### Code Quality Commands
- `npm run lint` - Run ESLint for TypeScript/React files
- `npm run check` - Run Biome formatter and linter with auto-fix
- `npm run format` - Format code with Biome
- `npm test` - Run Vitest unit tests

### Backend Development
- Navigate to `backend/` directory for Python Flask API server
- Uses SQLite database (`app.db`) with video metadata and user profiles
- Flask server provides REST endpoints for profile data and video analytics

## Architecture

### Frontend - Lynx Framework
This is a **TikTok-like mobile application** built with ByteDance's **Lynx cross-platform framework**, not a traditional web app. Key architectural differences:

- **Dual-threaded Architecture**: UI rendering on main thread, business logic on background thread
- **Lynx Native Elements**: Uses `<view>`, `<text>`, `<image>`, `<scroll-view>` instead of HTML elements
- **Event Handling**: Uses `bindtap` instead of `onClick` with thread-specific directives
- **Main Thread Scripting (MTS)**: Critical interactions run on UI thread for instant response
- **ReactLynx**: React implementation for Lynx via `@lynx-js/react` package
- **Cross-platform**: Runs on iOS, Android, and web through Lynx Explorer

### Project Structure
```
src/
├── components/           # React components for Lynx
│   ├── ForYouPage.tsx   # Main video feed with TikTok-like interactions
│   ├── ProfilePage.tsx  # User profile with video grid and stats
│   ├── BottomNavigation.tsx # Tab-based navigation
│   ├── CommentModal.tsx # TikTok-style comment system
│   ├── ShareModal.tsx   # Share options modal
│   ├── InteractiveButton.tsx # Reusable button with MTS animations
│   └── [other components]
├── api/                 # API integration layer
├── assets/              # Images and static resources
├── App.tsx             # Main app with navigation logic
└── index.tsx           # Entry point with API bootstrap

backend/
├── app.py              # Flask REST API server
├── app.db              # SQLite database
└── static/             # Video assets and thumbnails
```

### Key Technologies
- **Lynx Framework**: ByteDance's cross-platform UI framework
- **@lynx-js/rspeedy**: Build tool (rspeedy) similar to Vite but for Lynx
- **TypeScript**: Type-safe development with Lynx-specific types
- **Flask Backend**: Python API server with SQLite database
- **Biome**: Fast formatter and linter (replaces Prettier + ESLint for formatting)
- **Vitest**: Testing framework with Lynx-specific test utilities

### Development Workflow Specifics

#### Lynx-Specific Considerations
- Import paths require `.js` extensions due to ES module requirements
- CSS properties like `object-fit` are not supported - use Lynx-specific styling
- No HTML elements - use Lynx components: `<view>`, `<text>`, `<image>`, `<scroll-view>`
- Event handlers use `bindtap` with thread directives for performance optimization

#### Interactive Components Pattern
Components use a specialized pattern with:
- **Active/inactive states** with custom colors and animations
- **Press animations** using Main Thread Scripting for immediate feedback  
- **State management** with React hooks for real-time updates
- **Dual icon support** (e.g., filled/unfilled hearts for like buttons)

#### API Integration
- Frontend connects to Flask backend at configurable host
- API base URL can be overridden via URL parameter `?apiHost=` or localStorage
- Bootstrap logic in App.tsx handles API configuration for both foreground and background threads

#### Testing
- Uses Lynx-specific testing utilities from `@lynx-js/react/testing-library`
- Vitest configured with Lynx test environment
- Test files should account for Lynx component behavior differences

#### Building and Deployment
- `rspeedy build` creates optimized bundles for native deployment
- QR code plugin enables easy testing on mobile devices via Lynx Explorer
- Production builds target native mobile applications, not web browsers

### Current Implementation Status
- ✅ For You Page: Full video feed with interactive like/comment/share system
- ✅ Profile Page: Complete user profile with stats, video grid, and menu modals
- ✅ Bottom Navigation: Tab-based navigation system
- ✅ Backend API: Flask server with SQLite database for profiles and analytics
- 🔄 Additional pages (Discover, Create, Inbox) are placeholder implementations