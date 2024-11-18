import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { responsiveDimensions } from '../../styles/platformStyles';

interface Props {
  source: any;
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  quality?: 'low' | 'medium' | 'high';
  priority?: boolean;
}

export default function PlatformOptimizedImage({
  source,
  style,
  resizeMode = 'cover',
  quality = 'medium',
  priority = false
}: Props) {
  const { isWeb, isSmallScreen } = responsiveDimensions;

  const getQualityMultiplier = () => {
    switch (quality) {
      case 'low': return 0.5;
      case 'medium': return 1;
      case 'high': return 2;
      default: return 1;
    }
  };

  const getOptimizedSource = () => {
    if (!isWeb || typeof source === 'number') return source;

    const qualityMultiplier = getQualityMultiplier();
    const width = style?.width || 300;
    const height = style?.height || 300;

    return {
      ...source,
      width: width * qualityMultiplier,
      height: height * qualityMultiplier,
    };
  };

  const imageProps = Platform.select({
    web: {
      loading: priority ? 'eager' : 'lazy',
      decoding: priority ? 'sync' : 'async',
    },
    default: {}
  });

  return (
    <Image
      source={getOptimizedSource()}
      style={[styles.image, style]}
      resizeMode={resizeMode}
      {...imageProps}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
}); 