# Analytics Data Service

This directory contains the analytics data service that powers the TikTok Studio Analytics Dashboard.

## Files

### `analyticsService.ts`
Main service for fetching and processing analytics data.

**Key Features:**
- **Real Data Integration**: Connects to backend API via `/get-all-videos-data` endpoint
- **Time Range Support**: 7 days, 30 days, 90 days, 1 year
- **Data Processing**: Calculates metrics from raw video data
- **Fallback Support**: Uses mock data when API is unavailable
- **Chart Data Generation**: Creates chart-ready data with proper heights

**Exported Functions:**
- `getAnalyticsData(creatorId, timeRange)`: Main function to fetch analytics
- `TIME_RANGE_OPTIONS`: Available time range options for dropdown

**Data Types:**
- `AnalyticsData`: Complete analytics dataset
- `TimeRange`: Available time periods
- `ChartDataPoint`: Chart visualization data

## Integration

The service is used by:
1. **Analytics Dashboard** (`AnalyticsDashboard.tsx`) - Full analytics page
2. **TikTok Studio** (`TikTokStudioPageNew.tsx`) - Summary metrics card

## Backend API Dependencies

Requires the following API endpoints:
- `/get-all-videos-data?creator_id={id}` - Video metrics data
- Creator ID 1 is used as default (John Doe)

## Mock Data

When the backend API is unavailable, the service falls back to realistic mock data that demonstrates the full feature set across different time ranges.