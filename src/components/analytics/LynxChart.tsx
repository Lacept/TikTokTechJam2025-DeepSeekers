// src/components/analytics/LynxChart.tsx
import type { ChartDataPoint } from '../../data/analyticsService.js';

interface LynxChartProps {
  data: ChartDataPoint[];
  title: string;
  type: 'views' | 'revenue';
}

export function LynxChart({ data, title, type }: LynxChartProps) {
  const formatValue = (value: number) => {
    if (type === 'revenue') {
      return `$${value.toLocaleString()}`;
    }
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const getColor = (type: string) => {
    return type === 'views' ? '#10b981' : '#fbbf24';
  };

  // Calculate min/max values for scaling
  const values = data.map(item => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const valueRange = maxValue - minValue || 1;

  // Generate Y-axis labels
  const yAxisLabels = [
    { value: maxValue, position: 'top' },
    { value: (maxValue + minValue) / 2, position: 'middle' },
    { value: minValue, position: 'bottom' }
  ];

  return (
    <view style={{
      background: '#1f2937',
      borderRadius: '12px',
      padding: '20px',
      margin: '16px'
    }}>
      <text style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        {title}
      </text>
      
      {/* Chart Container */}
      <view style={{
        display: 'flex',
        height: '200px',
        marginBottom: '20px'
      }}>
        {/* Y-Axis Labels */}
        <view style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '60px',
          paddingRight: '10px',
          height: '100%'
        }}>
          {yAxisLabels.map((label, index) => (
            <text key={`y-${index}`} style={{
              color: '#9ca3af',
              fontSize: '14px',
              textAlign: 'right'
            }}>
              {formatValue(label.value)}
            </text>
          ))}
        </view>
        
        {/* Chart Area */}
        <view style={{
          flex: '1',
          position: 'relative',
          background: 'linear-gradient(to bottom, transparent 0%, transparent 33%, #4b556320 33%, #4b556320 34%, transparent 34%, transparent 66%, #4b556320 66%, #4b556320 67%, transparent 67%, transparent 100%)',
          borderLeft: '1px solid #4b5563'
        }}>
          {/* Bars Container */}
          <view style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 8px',
            gap: '4px'
          }}>
            {data.map((item, index) => {
              // Calculate height as percentage
              const heightPercent = maxValue > 0 ? ((item.value - minValue) / valueRange) * 100 : 0;
              const minHeight = 2; // Minimum 2% for visibility
              const finalHeightPercent = Math.max(minHeight, heightPercent);
              
              return (
                <view key={item.day} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: '1',
                  height: '100%'
                }}>
                  {/* Bar */}
                  <view style={{
                    width: '100%',
                    maxWidth: '24px',
                    height: `${finalHeightPercent}%`,
                    background: `linear-gradient(to top, ${getColor(type)}, ${getColor(type)}80)`,
                    borderRadius: '4px 4px 0 0',
                    marginTop: 'auto',
                    boxShadow: `0 2px 4px ${getColor(type)}40`,
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                  }} />
                </view>
              );
            })}
          </view>
        </view>
      </view>
      
      {/* X-Axis Labels */}
      <view style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '70px',
        paddingRight: '8px',
        marginBottom: '16px'
      }}>
        {data.map((item) => (
          <text key={`x-${item.day}`} style={{
            color: '#9ca3af',
            fontSize: '14px',
            textAlign: 'center',
            flex: '1'
          }}>
            {item.day}
          </text>
        ))}
      </view>
      
      {/* Legend */}
      <view style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
      }}>
        <view style={{
          width: '12px',
          height: '3px',
          borderRadius: '2px',
          background: getColor(type)
        }} />
        <text style={{
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          {type === 'views' ? 'Views' : 'Revenue ($)'}
        </text>
      </view>
    </view>
  );
}