import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: any;
  webStyle?: any;
  mobileStyle?: any;
  iosStyle?: any;
  androidStyle?: any;
}

export default function PlatformView({ 
  children, 
  style,
  webStyle,
  mobileStyle,
  iosStyle,
  androidStyle
}: Props) {
  const platformStyle = Platform.select({
    web: [styles.web, webStyle],
    ios: [styles.ios, mobileStyle, iosStyle],
    android: [styles.android, mobileStyle, androidStyle],
    default: []
  });

  return (
    <View style={[styles.base, style, platformStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  web: {
    maxWidth: 1200,
    alignSelf: 'center',
    padding: 20,
  },
  ios: {
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  android: {
    paddingTop: 10,
  },
}); 