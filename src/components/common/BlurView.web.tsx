import React from 'react';
import { View, ViewProps } from 'react-native';

interface BlurViewProps extends ViewProps {
  blurType?: string;
  blurAmount?: number;
}

export default function BlurView({ children, style, blurType, blurAmount, ...props }: BlurViewProps) {
  return (
    <View 
      {...props}
      style={[
        style,
        {
          backdropFilter: `blur(${blurAmount || 10}px)`,
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }
      ]}
    >
      {children}
    </View>
  );
} 