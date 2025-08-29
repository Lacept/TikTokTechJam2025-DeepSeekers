// src/components/StudioTabs.tsx
import * as React from 'react';

interface StudioTabsLightProps {
  activeTab: 'tools' | 'live';
  onTabChange: (tab: 'tools' | 'live') => void;
}

export const StudioTabsLight: React.FC<StudioTabsLightProps> = ({ activeTab, onTabChange }) => {
  const handleTabPress = (tab: 'tools' | 'live') => {
    'background only';
    onTabChange(tab);
  };

  return (
    <view style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#000',
      paddingTop: '8px',
      paddingBottom: '8px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderBottomWidth: '1px',
      borderBottomColor: '#333'
    }}>
      {/* Tools Tab */}
      <view style={{
        flex: 1,
        alignItems: 'flex-start',
        position: 'relative'
      }}>
        <view
          style={{
            paddingBottom: '4px'
          }}
          bindtap={() => handleTabPress('tools')}
        >
          <text style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: activeTab === 'tools' ? '#fff' : '#666'
          }}>
            Tools
          </text>
        </view>
        
        {/* Active underline for Tools */}
        {activeTab === 'tools' && (
          <view style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '80px',
            height: '3px',
            backgroundColor: '#25F4EE'
          }} />
        )}
      </view>

      {/* LIVE Tab */}
      <view style={{
        flex: 1,
        alignItems: 'center',
        position: 'relative'
      }}>
        <view
          style={{
            paddingBottom: '4px'
          }}
          bindtap={() => handleTabPress('live')}
        >
          <text style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: activeTab === 'live' ? '#fff' : '#666'
          }}>
            LIVE
          </text>
        </view>
        
        {/* Active underline for LIVE */}
        {activeTab === 'live' && (
          <view style={{
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            marginLeft: '-30px',
            width: '60px',
            height: '3px',
            backgroundColor: '#25F4EE'
          }} />
        )}
      </view>
    </view>
  );
};