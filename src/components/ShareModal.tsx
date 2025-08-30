// src/components/ShareModal.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

interface ShareOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ShareModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoUsername: string;
  videoDescription: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isVisible,
  onClose,
  videoUsername,
  videoDescription,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const shareOptions: ShareOption[] = [
    { id: 'message', name: 'Message', icon: '💬', color: '#007AFF' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱', color: '#25D366' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: '#1877F2' },
    { id: 'copy', name: 'Copy Link', icon: '🔗', color: '#666' },
    { id: 'save', name: 'Save Video', icon: '💾', color: '#FF9500' },
    { id: 'report', name: 'Report', icon: '⚠️', color: '#FF3B30' },
  ];

  const handleShareOption = (optionId: string) => {
    'background only';
    setSelectedOption(optionId);

    // Simulate sharing action
    setTimeout(() => {
      console.log(`Sharing via ${optionId}:`, {
        username: videoUsername,
        description: videoDescription,
      });
      setSelectedOption(null);
      onClose();
    }, 500);
  };

  const handleClose = () => {
    'background only';
    onClose();
  };

  if (!isVisible) return null;

  return (
    <view
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
      }}
    >
      {/* Modal Background Overlay */}
      <view
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        bindtap={handleClose}
      />

      {/* Modal Content */}
      <view
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          paddingBottom: '20px',
        }}
      >
        {/* Header */}
        <view
          style={{
            padding: '16px',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <view
            style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#ccc',
              borderRadius: '2px',
              marginBottom: '12px',
            }}
          />
          <text
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Share to
          </text>
        </view>

        {/* Video Info */}
        <view
          style={{
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <text
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '4px',
            }}
          >
            {videoUsername}
          </text>
          <text
            style={{
              fontSize: '12px',
              color: '#666',
              lineHeight: '16px',
            }}
          >
            {videoDescription}
          </text>
        </view>

        {/* Share Options Grid */}
        <view
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {shareOptions.map((option) => (
            <view
              key={option.id}
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: '20px',
                opacity: selectedOption === option.id ? 0.6 : 1,
                transform:
                  selectedOption === option.id ? 'scale(0.95)' : 'scale(1)',
              }}
              bindtap={() => handleShareOption(option.id)}
            >
              <view
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: option.color,
                  borderRadius: '28px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <text
                  style={{
                    fontSize: '24px',
                  }}
                >
                  {option.icon}
                </text>
              </view>
              <text
                style={{
                  fontSize: '12px',
                  color: '#333',
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                {option.name}
              </text>
            </view>
          ))}
        </view>

        {/* Cancel Button */}
        <view
          style={{
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '10px',
          }}
        >
          <view
            style={{
              height: '48px',
              backgroundColor: '#f5f5f5',
              borderRadius: '24px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bindtap={handleClose}
          >
            <text
              style={{
                fontSize: '16px',
                color: '#333',
                fontWeight: '600',
              }}
            >
              Cancel
            </text>
          </view>
        </view>
      </view>
    </view>
  );
};
