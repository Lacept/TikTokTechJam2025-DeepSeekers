// src/contexts/AnalyticsContext.tsx
import { createContext, useContext, useState } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';
import { getHardcodedAnalytics } from '../data/hardcodedAnalytics.js';
import type { AnalyticsData, TimeRange } from '../data/analyticsService.js';

interface AnalyticsContextType {
  analyticsData: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
  refreshAnalytics: (timeRange?: TimeRange) => void;
  preloadAnalytics: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(getHardcodedAnalytics('7d'));
  const [isLoading] = useState(false); // Always false since data is hardcoded
  const [error] = useState<string | null>(null); // No errors with hardcoded data

  const refreshAnalytics = (timeRange: TimeRange = '7d') => {
    'background only';
    console.log('Loading hardcoded analytics data for timeRange:', timeRange);
    const data = getHardcodedAnalytics(timeRange);
    setAnalyticsData(data);
    console.log('Analytics data loaded instantly:', data.totalViews, 'views');
  };

  const preloadAnalytics = () => {
    'background only';
    // Data is already loaded instantly, no need to preload
    console.log('Analytics data already available (hardcoded), no preload needed');
  };

  const contextValue: AnalyticsContextType = {
    analyticsData,
    isLoading,
    error,
    refreshAnalytics,
    preloadAnalytics,
  };

  // Debug logging
  console.log('AnalyticsContext state:', {
    hasData: !!analyticsData,
    isLoading,
    totalViews: analyticsData?.totalViews,
    dataSource: 'hardcoded',
  });

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}