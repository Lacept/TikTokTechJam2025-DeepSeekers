// src/data/hardcodedVideoStats.ts

export interface VideoStatsData {
  video_id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watch_completion: number;
  engagement_rate: number;
  engagement_diversity: number;
  rewatch: number;
  nlp_quality: number;
  compliance: number;
  rev_prop: number;
  proj_earnings: number;
  quality_score: number;
  created_at: string;
  demographics: {
    age_groups: Array<{
      range: string;
      percentage: number;
      color: string;
    }>;
    gender: Array<{
      type: string;
      percentage: number;
      color: string;
    }>;
    locations: Array<{
      country: string;
      percentage: number;
      color: string;
    }>;
  };
  earnings_timeline: Array<{
    date: string;
    amount: number;
    height: string;
  }>;
  revenue_split: {
    ad_revenue: number;
    premium_coins: number;
    standard_coins: number;
    ad_percentage: number;
    premium_percentage: number;
    standard_percentage: number;
  };
}

export interface VideoListData {
  video_id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watch_completion: number;
  engagement_rate: number;
  engagement_diversity: number;
  rewatch: number;
  nlp_quality: number;
  compliance: number;
  rev_prop: number;
  proj_earnings: number;
  quality_score: number;
  created_at: string;
  thumbnail_url?: string;
}

// Hardcoded video list data for Content tab
const HARDCODED_VIDEO_LIST: VideoListData[] = [
  {
    video_id: 1,
    title: 'Dancing Challenge #FYP',
    views: 450000,
    likes: 35000,
    comments: 2300,
    shares: 1500,
    watch_completion: 0.85,
    engagement_rate: 0.082,
    engagement_diversity: 0.75,
    rewatch: 0.45,
    nlp_quality: 0.88,
    compliance: 1,
    rev_prop: 0.68,
    proj_earnings: 125.4,
    quality_score: 0.92,
    created_at: '2024-08-25T10:30:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Dance',
  },
  {
    video_id: 2,
    title: 'Cooking Tutorial: Pasta',
    views: 320000,
    likes: 28000,
    comments: 1800,
    shares: 1200,
    watch_completion: 0.78,
    engagement_rate: 0.089,
    engagement_diversity: 0.82,
    rewatch: 0.35,
    nlp_quality: 0.91,
    compliance: 1,
    rev_prop: 0.72,
    proj_earnings: 98.75,
    quality_score: 0.89,
    created_at: '2024-08-24T14:15:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/4ecdc4/ffffff?text=Cook',
  },
  {
    video_id: 3,
    title: 'Pet Compilation Funny',
    views: 480000,
    likes: 42000,
    comments: 2800,
    shares: 2200,
    watch_completion: 0.92,
    engagement_rate: 0.104,
    engagement_diversity: 0.68,
    rewatch: 0.62,
    nlp_quality: 0.79,
    compliance: 1,
    rev_prop: 0.85,
    proj_earnings: 189.3,
    quality_score: 0.87,
    created_at: '2024-08-23T16:45:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/45b7d1/ffffff?text=Pets',
  },
  {
    video_id: 4,
    title: 'Fashion Trends 2024',
    views: 280000,
    likes: 22000,
    comments: 1200,
    shares: 800,
    watch_completion: 0.72,
    engagement_rate: 0.087,
    engagement_diversity: 0.91,
    rewatch: 0.28,
    nlp_quality: 0.94,
    compliance: 1,
    rev_prop: 0.59,
    proj_earnings: 67.85,
    quality_score: 0.81,
    created_at: '2024-08-22T11:20:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/f7b731/ffffff?text=Fashion',
  },
  {
    video_id: 5,
    title: 'Life Hacks You Need',
    views: 380000,
    likes: 31000,
    comments: 1900,
    shares: 1300,
    watch_completion: 0.81,
    engagement_rate: 0.093,
    engagement_diversity: 0.77,
    rewatch: 0.41,
    nlp_quality: 0.86,
    compliance: 1,
    rev_prop: 0.74,
    proj_earnings: 89.6,
    quality_score: 0.84,
    created_at: '2024-08-21T09:10:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/5f27cd/ffffff?text=Tips',
  },
  {
    video_id: 6,
    title: 'Travel Vlog: Japan',
    views: 420000,
    likes: 36000,
    comments: 2100,
    shares: 1600,
    watch_completion: 0.88,
    engagement_rate: 0.089,
    engagement_diversity: 0.84,
    rewatch: 0.52,
    nlp_quality: 0.92,
    compliance: 1,
    rev_prop: 0.76,
    proj_earnings: 134.5,
    quality_score: 0.91,
    created_at: '2024-08-20T13:25:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/fd79a8/ffffff?text=Travel',
  },
  {
    video_id: 7,
    title: 'Gaming Highlights Epic',
    views: 350000,
    likes: 29000,
    comments: 1700,
    shares: 1100,
    watch_completion: 0.75,
    engagement_rate: 0.091,
    engagement_diversity: 0.71,
    rewatch: 0.48,
    nlp_quality: 0.83,
    compliance: 1,
    rev_prop: 0.69,
    proj_earnings: 102.8,
    quality_score: 0.86,
    created_at: '2024-08-19T19:40:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/00d2d3/ffffff?text=Game',
  },
  {
    video_id: 8,
    title: 'Workout Routine at Home',
    views: 290000,
    likes: 24000,
    comments: 1400,
    shares: 900,
    watch_completion: 0.79,
    engagement_rate: 0.088,
    engagement_diversity: 0.79,
    rewatch: 0.36,
    nlp_quality: 0.89,
    compliance: 1,
    rev_prop: 0.71,
    proj_earnings: 78.9,
    quality_score: 0.83,
    created_at: '2024-08-18T07:15:00Z',
    thumbnail_url: 'https://via.placeholder.com/400x600/ff9ff3/ffffff?text=Fit',
  },
  {
    video_id: 9,
    title: 'Art Tutorial: Watercolor',
    views: 220000,
    likes: 18000,
    comments: 950,
    shares: 600,
    watch_completion: 0.83,
    engagement_rate: 0.091,
    engagement_diversity: 0.88,
    rewatch: 0.31,
    nlp_quality: 0.95,
    compliance: 1,
    rev_prop: 0.63,
    proj_earnings: 56.4,
    quality_score: 0.88,
    created_at: '2024-08-17T15:30:00Z',
    thumbnail_url: 'https://via.placeholder.com/400x600/a55eea/ffffff?text=Art',
  },
  {
    video_id: 10,
    title: 'Music Cover Acoustic',
    views: 360000,
    likes: 30000,
    comments: 1600,
    shares: 1000,
    watch_completion: 0.86,
    engagement_rate: 0.092,
    engagement_diversity: 0.73,
    rewatch: 0.44,
    nlp_quality: 0.87,
    compliance: 1,
    rev_prop: 0.77,
    proj_earnings: 91.2,
    quality_score: 0.89,
    created_at: '2024-08-16T12:45:00Z',
    thumbnail_url:
      'https://via.placeholder.com/400x600/ff6348/ffffff?text=Music',
  },
];

// Detailed video stats data with demographics and earnings
const HARDCODED_VIDEO_STATS: Record<number, VideoStatsData> = {
  1: {
    video_id: 1,
    title: 'Dancing Challenge #FYP',
    views: 450000,
    likes: 35000,
    comments: 2300,
    shares: 1500,
    watch_completion: 0.85,
    engagement_rate: 0.082,
    engagement_diversity: 0.75,
    rewatch: 0.45,
    nlp_quality: 0.88,
    compliance: 1,
    rev_prop: 0.68,
    proj_earnings: 125.4,
    quality_score: 0.92,
    created_at: '2024-08-25T10:30:00Z',
    demographics: {
      age_groups: [
        { range: '13-17', percentage: 32.5, color: '#3b82f6' },
        { range: '18-24', percentage: 28.1, color: '#10b981' },
        { range: '25-34', percentage: 22.4, color: '#f59e0b' },
        { range: '35-44', percentage: 12.8, color: '#ef4444' },
        { range: '45+', percentage: 4.2, color: '#8b5cf6' },
      ],
      gender: [
        { type: 'Female', percentage: 64.2, color: '#ec4899' },
        { type: 'Male', percentage: 35.8, color: '#3b82f6' },
      ],
      locations: [
        { country: 'United States', percentage: 45.3, color: '#3b82f6' },
        { country: 'Brazil', percentage: 18.7, color: '#10b981' },
        { country: 'India', percentage: 12.4, color: '#f59e0b' },
        { country: 'Mexico', percentage: 8.9, color: '#ef4444' },
        { country: 'Others', percentage: 14.7, color: '#6b7280' },
      ],
    },
    earnings_timeline: [
      { date: 'Week 1', amount: 28.5, height: '23%' },
      { date: 'Week 2', amount: 45.2, height: '36%' },
      { date: 'Week 3', amount: 125.4, height: '100%' },
      { date: 'Week 4', amount: 98.3, height: '78%' },
      { date: 'Week 5', amount: 67.8, height: '54%' },
      { date: 'Week 6', amount: 42.1, height: '34%' },
      { date: 'Week 7', amount: 31.2, height: '25%' },
    ],
    revenue_split: {
      ad_revenue: 85.2,
      premium_coins: 25.1,
      standard_coins: 15.1,
      ad_percentage: 67.9,
      premium_percentage: 20.0,
      standard_percentage: 12.1,
    },
  },
  2: {
    video_id: 2,
    title: 'Cooking Tutorial: Pasta',
    views: 320000,
    likes: 28000,
    comments: 1800,
    shares: 1200,
    watch_completion: 0.78,
    engagement_rate: 0.089,
    engagement_diversity: 0.82,
    rewatch: 0.35,
    nlp_quality: 0.91,
    compliance: 1,
    rev_prop: 0.72,
    proj_earnings: 98.75,
    quality_score: 0.89,
    created_at: '2024-08-24T14:15:00Z',
    demographics: {
      age_groups: [
        { range: '13-17', percentage: 18.2, color: '#3b82f6' },
        { range: '18-24', percentage: 34.7, color: '#10b981' },
        { range: '25-34', percentage: 28.9, color: '#f59e0b' },
        { range: '35-44', percentage: 15.1, color: '#ef4444' },
        { range: '45+', percentage: 3.1, color: '#8b5cf6' },
      ],
      gender: [
        { type: 'Female', percentage: 58.4, color: '#ec4899' },
        { type: 'Male', percentage: 41.6, color: '#3b82f6' },
      ],
      locations: [
        { country: 'United States', percentage: 38.9, color: '#3b82f6' },
        { country: 'United Kingdom', percentage: 22.1, color: '#10b981' },
        { country: 'Canada', percentage: 15.7, color: '#f59e0b' },
        { country: 'Australia', percentage: 11.2, color: '#ef4444' },
        { country: 'Others', percentage: 12.1, color: '#6b7280' },
      ],
    },
    earnings_timeline: [
      { date: 'Week 1', amount: 22.4, height: '23%' },
      { date: 'Week 2', amount: 38.7, height: '39%' },
      { date: 'Week 3', amount: 98.75, height: '100%' },
      { date: 'Week 4', amount: 76.2, height: '77%' },
      { date: 'Week 5', amount: 54.3, height: '55%' },
      { date: 'Week 6', amount: 35.8, height: '36%' },
      { date: 'Week 7', amount: 26.9, height: '27%' },
    ],
    revenue_split: {
      ad_revenue: 68.5,
      premium_coins: 18.8,
      standard_coins: 11.45,
      ad_percentage: 69.4,
      premium_percentage: 19.0,
      standard_percentage: 11.6,
    },
  },
  3: {
    video_id: 3,
    title: 'Pet Compilation Funny',
    views: 480000,
    likes: 42000,
    comments: 2800,
    shares: 2200,
    watch_completion: 0.92,
    engagement_rate: 0.104,
    engagement_diversity: 0.68,
    rewatch: 0.62,
    nlp_quality: 0.79,
    compliance: 1,
    rev_prop: 0.85,
    proj_earnings: 189.3,
    quality_score: 0.87,
    created_at: '2024-08-23T16:45:00Z',
    demographics: {
      age_groups: [
        { range: '13-17', percentage: 28.4, color: '#3b82f6' },
        { range: '18-24', percentage: 25.8, color: '#10b981' },
        { range: '25-34', percentage: 24.1, color: '#f59e0b' },
        { range: '35-44', percentage: 16.2, color: '#ef4444' },
        { range: '45+', percentage: 5.5, color: '#8b5cf6' },
      ],
      gender: [
        { type: 'Female', percentage: 52.7, color: '#ec4899' },
        { type: 'Male', percentage: 47.3, color: '#3b82f6' },
      ],
      locations: [
        { country: 'United States', percentage: 42.1, color: '#3b82f6' },
        { country: 'Germany', percentage: 16.3, color: '#10b981' },
        { country: 'France', percentage: 13.8, color: '#f59e0b' },
        { country: 'Japan', percentage: 9.4, color: '#ef4444' },
        { country: 'Others', percentage: 18.4, color: '#6b7280' },
      ],
    },
    earnings_timeline: [
      { date: 'Week 1', amount: 42.6, height: '23%' },
      { date: 'Week 2', amount: 68.3, height: '36%' },
      { date: 'Week 3', amount: 189.3, height: '100%' },
      { date: 'Week 4', amount: 147.6, height: '78%' },
      { date: 'Week 5', amount: 102.2, height: '54%' },
      { date: 'Week 6', amount: 63.4, height: '34%' },
      { date: 'Week 7', amount: 47.1, height: '25%' },
    ],
    revenue_split: {
      ad_revenue: 128.4,
      premium_coins: 36.5,
      standard_coins: 24.4,
      ad_percentage: 67.8,
      premium_percentage: 19.3,
      standard_percentage: 12.9,
    },
  },
  4: {
    video_id: 4,
    title: 'Fashion Trends 2024',
    views: 280000,
    likes: 22000,
    comments: 1200,
    shares: 800,
    watch_completion: 0.72,
    engagement_rate: 0.087,
    engagement_diversity: 0.91,
    rewatch: 0.28,
    nlp_quality: 0.94,
    compliance: 1,
    rev_prop: 0.59,
    proj_earnings: 67.85,
    quality_score: 0.81,
    created_at: '2024-08-22T11:20:00Z',
    demographics: {
      age_groups: [
        { range: '13-17', percentage: 15.3, color: '#3b82f6' },
        { range: '18-24', percentage: 42.1, color: '#10b981' },
        { range: '25-34', percentage: 28.7, color: '#f59e0b' },
        { range: '35-44', percentage: 11.2, color: '#ef4444' },
        { range: '45+', percentage: 2.7, color: '#8b5cf6' },
      ],
      gender: [
        { type: 'Female', percentage: 78.9, color: '#ec4899' },
        { type: 'Male', percentage: 21.1, color: '#3b82f6' },
      ],
      locations: [
        { country: 'United States', percentage: 35.2, color: '#3b82f6' },
        { country: 'Italy', percentage: 19.8, color: '#10b981' },
        { country: 'France', percentage: 17.4, color: '#f59e0b' },
        { country: 'Spain', percentage: 12.7, color: '#ef4444' },
        { country: 'Others', percentage: 14.9, color: '#6b7280' },
      ],
    },
    earnings_timeline: [
      { date: 'Week 1', amount: 15.3, height: '23%' },
      { date: 'Week 2', amount: 24.4, height: '36%' },
      { date: 'Week 3', amount: 67.85, height: '100%' },
      { date: 'Week 4', amount: 52.9, height: '78%' },
      { date: 'Week 5', amount: 36.6, height: '54%' },
      { date: 'Week 6', amount: 22.7, height: '34%' },
      { date: 'Week 7', amount: 16.9, height: '25%' },
    ],
    revenue_split: {
      ad_revenue: 46.2,
      premium_coins: 13.0,
      standard_coins: 8.65,
      ad_percentage: 68.1,
      premium_percentage: 19.2,
      standard_percentage: 12.7,
    },
  },
  5: {
    video_id: 5,
    title: 'Life Hacks You Need',
    views: 380000,
    likes: 31000,
    comments: 1900,
    shares: 1300,
    watch_completion: 0.81,
    engagement_rate: 0.093,
    engagement_diversity: 0.77,
    rewatch: 0.41,
    nlp_quality: 0.86,
    compliance: 1,
    rev_prop: 0.74,
    proj_earnings: 89.6,
    quality_score: 0.84,
    created_at: '2024-08-21T09:10:00Z',
    demographics: {
      age_groups: [
        { range: '13-17', percentage: 22.8, color: '#3b82f6' },
        { range: '18-24', percentage: 31.5, color: '#10b981' },
        { range: '25-34', percentage: 26.9, color: '#f59e0b' },
        { range: '35-44', percentage: 14.1, color: '#ef4444' },
        { range: '45+', percentage: 4.7, color: '#8b5cf6' },
      ],
      gender: [
        { type: 'Female', percentage: 61.3, color: '#ec4899' },
        { type: 'Male', percentage: 38.7, color: '#3b82f6' },
      ],
      locations: [
        { country: 'United States', percentage: 41.8, color: '#3b82f6' },
        { country: 'India', percentage: 20.4, color: '#10b981' },
        { country: 'Philippines', percentage: 14.2, color: '#f59e0b' },
        { country: 'Indonesia', percentage: 10.1, color: '#ef4444' },
        { country: 'Others', percentage: 13.5, color: '#6b7280' },
      ],
    },
    earnings_timeline: [
      { date: 'Week 1', amount: 20.2, height: '23%' },
      { date: 'Week 2', amount: 32.3, height: '36%' },
      { date: 'Week 3', amount: 89.6, height: '100%' },
      { date: 'Week 4', amount: 69.9, height: '78%' },
      { date: 'Week 5', amount: 48.4, height: '54%' },
      { date: 'Week 6', amount: 30.1, height: '34%' },
      { date: 'Week 7', amount: 22.4, height: '25%' },
    ],
    revenue_split: {
      ad_revenue: 61.0,
      premium_coins: 17.2,
      standard_coins: 11.4,
      ad_percentage: 68.1,
      premium_percentage: 19.2,
      standard_percentage: 12.7,
    },
  },
};

export function getHardcodedVideoList(): VideoListData[] {
  return HARDCODED_VIDEO_LIST.sort((a, b) => b.views - a.views);
}

export function getHardcodedVideoStats(videoId: number): VideoStatsData | null {
  return HARDCODED_VIDEO_STATS[videoId] || null;
}

export function getTopPerformingVideos(limit: number = 3): VideoListData[] {
  return HARDCODED_VIDEO_LIST.sort((a, b) => b.views - a.views).slice(0, limit);
}
