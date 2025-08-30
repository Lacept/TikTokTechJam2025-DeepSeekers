// src/components/analytics/TimeFilter.tsx
import { useState } from '@lynx-js/react';
import { TIME_RANGE_OPTIONS } from '../../data/analyticsService.js';
import type { TimeRange } from '../../data/analyticsService.js';

interface TimeFilterProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

export function TimeFilter({ timeRange, onTimeRangeChange }: TimeFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterPress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('background-color', '#374151');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('background-color', '#1f2937');
    }, 150);
  };

  const handleFilterTap = () => {
    'background only';
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: TimeRange) => {
    'background only';
    onTimeRangeChange(option);
    setIsDropdownOpen(false);
  };

  const currentLabel = TIME_RANGE_OPTIONS.find(opt => opt.value === timeRange)?.label || '7 days';

  return (
    <view className="time-filter">
      <view
        className="filter-button"
        main-thread:bindtap={handleFilterPress}
        bindtap={handleFilterTap}
      >
        <text className="filter-text">{currentLabel}</text>
        <text className="filter-arrow">{isDropdownOpen ? '▲' : '▼'}</text>
      </view>
      {isDropdownOpen && (
        <view className="dropdown-menu">
          {TIME_RANGE_OPTIONS.map((option) => (
            <view
              key={option.value}
              className={`dropdown-item ${timeRange === option.value ? 'selected' : ''}`}
              bindtap={() => handleOptionSelect(option.value)}
            >
              <text className="dropdown-text">{option.label}</text>
            </view>
          ))}
        </view>
      )}
    </view>
  );
}