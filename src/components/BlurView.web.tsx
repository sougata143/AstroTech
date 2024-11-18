import React from 'react';
import { View } from 'react-native';

export default function BlurView({ children, ...props }) {
  return (
    <View 
      {...props}
      style={[
        props.style,
        { 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }
      ]}
    >
      {children}
    </View>
  );
} 