import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

interface AnimationConfig {
  duration?: number;
  easing?: Animated.EasingFunction;
  useNativeDriver?: boolean;
}

export function useChartAnimations() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animate = useCallback((
    visible: boolean,
    config: AnimationConfig = {}
  ) => {
    const {
      duration = 300,
      easing = Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver = true
    } = config;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration,
        easing,
        useNativeDriver,
      }),
      Animated.spring(scaleAnim, {
        toValue: visible ? 1 : 0.8,
        tension: 50,
        friction: 7,
        useNativeDriver,
      }),
      Animated.timing(rotateAnim, {
        toValue: visible ? 1 : 0,
        duration: duration * 1.2,
        easing,
        useNativeDriver,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const getAnimatedStyle = useCallback(() => {
    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return {
      opacity: fadeAnim,
      transform: [
        { scale: scaleAnim },
        { rotate: spin }
      ],
    };
  }, [fadeAnim, scaleAnim, rotateAnim]);

  return {
    animate,
    getAnimatedStyle,
    fadeAnim,
    scaleAnim,
    rotateAnim,
  };
} 