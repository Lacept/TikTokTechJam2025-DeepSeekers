// src/components/TextInput.tsx
import * as React from 'react';
import { useState } from '@lynx-js/react';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  style?: object;
  textStyle?: object;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  multiline = false,
  maxLength,
  style = {},
  textStyle = {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handlePress = () => {
    'background only';
    setIsFocused(true);
    setIsEditing(true);
    
    // Simulate text input - in a real app, this would trigger native input
    // For demo purposes, we'll show a simple prompt-like behavior
    setTimeout(() => {
      const newText = prompt(placeholder || 'Enter text:') || '';
      if (newText !== null) {
        const finalText = maxLength ? newText.slice(0, maxLength) : newText;
        onChangeText(finalText);
      }
      setIsEditing(false);
      setIsFocused(false);
    }, 100);
  };

  const handleFocus = () => {
    'main thread';
    setIsFocused(true);
  };

  const handleBlur = () => {
    'main thread';
    setIsFocused(false);
  };

  return (
    <view 
      style={{
        borderWidth: '1px',
        borderColor: isFocused ? '#007AFF' : '#e0e0e0',
        borderRadius: '8px',
        padding: '12px',
        backgroundColor: isFocused ? '#f8f9fa' : 'white',
        minHeight: multiline ? '80px' : '44px',
        justifyContent: multiline ? 'flex-start' : 'center',
        ...style
      }}
      bindtap={handlePress}
      main-thread:bindtouchstart={handleFocus}
      main-thread:bindtouchend={handleBlur}
    >
      <text style={{
        fontSize: '16px',
        color: value ? '#333' : '#999',
        lineHeight: '20px',
        ...textStyle
      }}>
        {value || placeholder}
      </text>
      
      {/* Character count */}
      {maxLength && value && (
        <text style={{
          position: 'absolute',
          bottom: '4px',
          right: '8px',
          fontSize: '12px',
          color: value.length > maxLength * 0.9 ? '#ff3b30' : '#999'
        }}>
          {value.length}/{maxLength}
        </text>
      )}
      
      {/* Editing indicator */}
      {isEditing && (
        <view style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '20px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <text style={{
            fontSize: '12px',
            color: '#007AFF'
          }}>
            ✏️
          </text>
        </view>
      )}
    </view>
  );
};