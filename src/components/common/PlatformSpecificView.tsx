import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  webStyle?: ViewStyle;
  mobileStyle?: ViewStyle;
  iosStyle?: ViewStyle;
  androidStyle?: ViewStyle;
}

export default function PlatformSpecificView({
  children,
  style,
  webStyle,
  mobileStyle,
  iosStyle,
  androidStyle
}: Props) {
  const platformStyle = Platform.select({
    web: webStyle,
    ios: { ...mobileStyle, ...iosStyle },
    android: { ...mobileStyle, ...androidStyle },
  });

  return (
    <View style={[style, platformStyle]}>
      {children}
    </View>
  );
} 