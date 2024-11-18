import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { responsiveDimensions } from '../../styles/platformStyles';

interface Props {
  children: React.ReactNode;
  style?: any;
  maxWidth?: number;
  centerContent?: boolean;
}

export default function ResponsiveContainer({ 
  children, 
  style,
  maxWidth = 1200,
  centerContent = true
}: Props) {
  const { isWeb, isSmallScreen } = responsiveDimensions;

  return (
    <View style={[
      styles.container,
      isWeb && !isSmallScreen && { maxWidth, alignSelf: centerContent ? 'center' : 'auto' },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: Platform.select({
      web: 24,
      ios: 16,
      android: 16,
    }),
  },
}); 