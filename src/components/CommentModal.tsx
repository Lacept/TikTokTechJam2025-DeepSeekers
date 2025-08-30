// src/components/CommentModal.tsx

import { useState } from '@lynx-js/react';
import type * as React from 'react';

interface Comment {
  id: string;
  username: string;
  text: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  hasReplies?: boolean;
  replyCount?: number;
  isVerified?: boolean;
}

interface CommentModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoUsername: string;
  commentCount: number;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  onClose,
  videoUsername,
  commentCount,
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'martini_rond',
      text: 'How neatly I write the date in my book',
      likes: 8098,
      timestamp: '22h',
      isLiked: false,
      hasReplies: true,
      replyCount: 4,
    },
    {
      id: '2',
      username: 'maxjacobson',
      text: "Now that's a skill very talented",
      likes: 8098,
      timestamp: '22h',
      isLiked: false,
      hasReplies: true,
      replyCount: 1,
    },
    {
      id: '3',
      username: 'zackjohn',
      text: 'Doing this would make me so anxious',
      likes: 8098,
      timestamp: '22h',
      isLiked: false,
    },
    {
      id: '4',
      username: 'kiero_d',
      text: 'Use that on r air forces to whiten them',
      likes: 8098,
      timestamp: '21h',
      isLiked: false,
      hasReplies: true,
      replyCount: 9,
    },
    {
      id: '5',
      username: 'mis_potter',
      text: "Sjpuld've used that on his forces 😂😂",
      likes: 8098,
      timestamp: '13h',
      isLiked: false,
      hasReplies: true,
      replyCount: 4,
      isVerified: true,
    },
    {
      id: '6',
      username: 'karennne',
      text: 'No prressure',
      likes: 8098,
      timestamp: '22h',
      isLiked: false,
      hasReplies: true,
      replyCount: 2,
    },
    {
      id: '7',
      username: 'joshua_l',
      text: "My OCD couldn't do it",
      likes: 8098,
      timestamp: '15h',
      isLiked: false,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleLikeComment = (commentId: string) => {
    'background only';
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    );
  };

  const handleAddComment = () => {
    'background only';
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'you',
        text: newComment.trim(),
        likes: 0,
        timestamp: 'now',
        isLiked: false,
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleClose = () => {
    'background only';
    onClose();
  };

  if (!isVisible) return null;

  const getAvatarColor = (username: string) => {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#96ceb4',
      '#feca57',
      '#ff9ff3',
      '#54a0ff',
      '#5f27cd',
    ];
    const index = username.length % colors.length;
    return colors[index];
  };

  const formatLikes = (likes: number): string => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(0)}K`;
    }
    return likes.toString();
  };

  return (
    <view
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
          height: '75%',
          backgroundColor: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        {/* Header */}
        <view
          style={{
            padding: '16px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <view
            style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#e0e0e0',
              borderRadius: '2px',
              marginBottom: '16px',
            }}
          />
          <text
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#000',
            }}
          >
            {commentCount} comments
          </text>
          <view
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              width: '32px',
              height: '32px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bindtap={handleClose}
          >
            <text
              style={{
                fontSize: '18px',
                color: '#666',
              }}
            >
              ✕
            </text>
          </view>
        </view>

        {/* Comments List */}
        <scroll-view
          style={{
            flex: 1,
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {comments.map((comment) => (
            <view
              key={comment.id}
              style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {/* Avatar */}
              <view
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  backgroundColor: getAvatarColor(comment.username),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '12px',
                }}
              >
                <text
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  {comment.username[0].toUpperCase()}
                </text>
              </view>

              {/* Comment Content */}
              <view style={{ flex: 1 }}>
                {/* Username and timestamp */}
                <view
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <text
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000',
                      marginRight: '8px',
                    }}
                  >
                    {comment.username}
                  </text>
                  {comment.isVerified && (
                    <text
                      style={{
                        fontSize: '12px',
                        color: '#1da1f2',
                        marginRight: '8px',
                      }}
                    >
                      ✓
                    </text>
                  )}
                  <text
                    style={{
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    {comment.timestamp}
                  </text>
                </view>

                {/* Comment text */}
                <text
                  style={{
                    fontSize: '14px',
                    color: '#000',
                    lineHeight: '20px',
                    marginBottom: '8px',
                  }}
                >
                  {comment.text}
                </text>

                {/* View replies */}
                {comment.hasReplies && (
                  <text
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    View replies ({comment.replyCount})
                  </text>
                )}
              </view>

              {/* Like button and count */}
              <view
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: '4px',
                }}
              >
                <view
                  style={{
                    padding: '8px',
                  }}
                  bindtap={() => handleLikeComment(comment.id)}
                >
                  <text
                    style={{
                      fontSize: '16px',
                      color: comment.isLiked ? '#ff2d55' : '#666',
                    }}
                  >
                    {comment.isLiked ? '♥' : '♡'}
                  </text>
                </view>
                <text
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px',
                  }}
                >
                  {formatLikes(comment.likes)}
                </text>
              </view>
            </view>
          ))}
        </scroll-view>

        {/* Comment Input */}
        <view
          style={{
            padding: '16px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <view
            style={{
              flex: 1,
              height: '40px',
              backgroundColor: '#f8f8f8',
              borderRadius: '20px',
              paddingLeft: '16px',
              paddingRight: '16px',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <text
              style={{
                fontSize: '14px',
                color: '#999',
              }}
            >
              Add comment...
            </text>
          </view>

          <text
            style={{
              fontSize: '20px',
              color: '#666',
              marginRight: '12px',
            }}
          >
            @
          </text>

          <text
            style={{
              fontSize: '20px',
              color: '#666',
            }}
          >
            😊
          </text>
        </view>

        {/* Bottom safe area */}
        <view
          style={{
            height: '20px',
            backgroundColor: 'white',
          }}
        />
      </view>
    </view>
  );
};
