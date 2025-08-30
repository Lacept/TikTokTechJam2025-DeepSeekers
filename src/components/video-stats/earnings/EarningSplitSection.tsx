// src/components/video-stats/earnings/EarningSplitSection.tsx

interface EarningSplitSectionProps {
  videoData: any;
}

export function EarningSplitSection({ videoData }: EarningSplitSectionProps) {
  if (!videoData.revenue_split) {
    return null;
  }

  const { revenue_split } = videoData;
  
  // Transform flat structure to expected nested structure
  const adRevenueData = {
    amount: revenue_split.ad_revenue,
    percentage: revenue_split.ad_percentage
  };
  
  const premiumData = {
    amount: revenue_split.premium_coins,
    percentage: revenue_split.premium_percentage
  };
  
  const standardData = {
    amount: revenue_split.standard_coins,
    percentage: revenue_split.standard_percentage
  };

  return (
    <view style={{ marginBottom: '24px' }}>
      <text style={{
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Revenue Breakdown by Source
      </text>

      <view style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <AdRevenueCard adRevenueData={adRevenueData} />
        <PremiumCoinsCard premiumData={premiumData} />
        <StandardCoinsCard standardData={standardData} />
        <TotalValidation 
          adRevenue={adRevenueData}
          premium={premiumData}
          standard={standardData}
          total={videoData.proj_earnings}
        />
      </view>
    </view>
  );
}

// Ad Revenue Card
interface AdRevenueCardProps {
  adRevenueData: { amount: number; percentage: number };
}

const AdRevenueCard = ({ adRevenueData }: AdRevenueCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Ad revenue tapped');
  };

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '12px'
      }}>
        {/* Icon */}
        <view style={{
          width: '48px',
          height: '48px',
          background: '#10b981',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <text style={{ fontSize: '24px' }}>📺</text>
        </view>

        {/* Content */}
        <view style={{ flex: '1' }}>
          <text style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            Ad Revenue
          </text>
          <text style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            ${adRevenueData.amount.toFixed(2)}
          </text>
          <text style={{
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            {adRevenueData.percentage}% of total
          </text>
        </view>
      </view>

      {/* Progress Bar */}
      <view style={{
        width: '100%',
        height: '6px',
        background: '#374151',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <view style={{
          width: `${adRevenueData.percentage}%`,
          height: '100%',
          background: '#10b981',
          borderRadius: '3px',
          animation: 'fillProgress 0.8s ease-out forwards'
        }} />
      </view>
    </view>
  );
};

// Premium Coins Card
interface CoinsCardProps {
  premiumData: { amount: number; percentage: number };
}

const PremiumCoinsCard = ({ premiumData }: CoinsCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Premium coins tapped');
  };

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '12px'
      }}>
        {/* Icon */}
        <view style={{
          width: '48px',
          height: '48px',
          background: '#fbbf24',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <text style={{ fontSize: '24px' }}>👑</text>
        </view>

        {/* Content */}
        <view style={{ flex: '1' }}>
          <text style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            ByteCoins
          </text>
          <text style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            ${premiumData.amount.toFixed(2)}
          </text>
          <text style={{
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            {premiumData.percentage}% of total
          </text>
        </view>
      </view>

      {/* Progress Bar */}
      <view style={{
        width: '100%',
        height: '6px',
        background: '#374151',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <view style={{
          width: `${premiumData.percentage}%`,
          height: '100%',
          background: '#fbbf24',
          borderRadius: '3px',
          animation: 'fillProgress 1.0s ease-out forwards'
        }} />
      </view>
    </view>
  );
};

// Standard Coins Card
interface StandardCoinsCardProps {
  standardData: { amount: number; percentage: number };
}

const StandardCoinsCard = ({ standardData }: StandardCoinsCardProps) => {
  const handlePress = (event: any) => {
    'main thread';
    event.currentTarget.setStyleProperty('transform', 'scale(0.98)');
    setTimeout(() => {
      event.currentTarget.setStyleProperty('transform', 'scale(1)');
    }, 150);
  };

  const handleTap = () => {
    'background only';
    console.log('Standard coins tapped');
  };

  return (
    <view
      style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '16px',
        transition: 'transform 0.2s ease'
      }}
      main-thread:bindtap={handlePress}
      bindtap={handleTap}
    >
      <view style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '12px'
      }}>
        {/* Icon */}
        <view style={{
          width: '48px',
          height: '48px',
          background: '#6b7280',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <text style={{ fontSize: '24px' }}>🪙</text>
        </view>

        {/* Content */}
        <view style={{ flex: '1' }}>
          <text style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            Standard Coins
          </text>
          <text style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            ${standardData.amount.toFixed(2)}
          </text>
          <text style={{
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            {standardData.percentage}% of total
          </text>
        </view>
      </view>

      {/* Progress Bar */}
      <view style={{
        width: '100%',
        height: '6px',
        background: '#374151',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <view style={{
          width: `${standardData.percentage}%`,
          height: '100%',
          background: '#6b7280',
          borderRadius: '3px',
          animation: 'fillProgress 1.2s ease-out forwards'
        }} />
      </view>
    </view>
  );
};

// Total Validation Card
interface TotalValidationProps {
  adRevenue: { amount: number; percentage: number };
  premium: { amount: number; percentage: number };
  standard: { amount: number; percentage: number };
  total: number;
}

const TotalValidation = ({ adRevenue, premium, standard, total }: TotalValidationProps) => {
  const calculatedTotal = adRevenue.amount + premium.amount + standard.amount;
  const totalPercentage = adRevenue.percentage + premium.percentage + standard.percentage;
  const isValid = Math.abs(calculatedTotal - total) < 0.01 && Math.abs(totalPercentage - 100) < 0.1;

  return (
    <view style={{
      background: isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      border: `1px solid ${isValid ? '#10b981' : '#ef4444'}`,
      borderRadius: '12px',
      padding: '16px'
    }}>
      <view style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <text style={{
          color: isValid ? '#10b981' : '#ef4444',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {isValid ? '✅' : '❌'} Revenue Split Validation
        </text>
        <text style={{
          color: isValid ? '#10b981' : '#ef4444',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {totalPercentage.toFixed(1)}%
        </text>
      </view>

      <view style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <text style={{
          color: '#9ca3af',
          fontSize: '12px'
        }}>
          Total: ${calculatedTotal.toFixed(2)} / Expected: ${total.toFixed(2)}
        </text>
        <text style={{
          color: isValid ? '#10b981' : '#ef4444',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {isValid ? 'Valid' : 'Error'}
        </text>
      </view>
    </view>
  );
};