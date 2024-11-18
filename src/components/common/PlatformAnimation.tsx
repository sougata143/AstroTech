import React from 'react';
import { Animated, Platform, ViewStyle, StyleProp } from 'react-native';
import { useChartAnimations } from '../../hooks/useChartAnimations';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  isVisible?: boolean;
}

export default function PlatformAnimation({
  children,
  style,
  animation = 'fade',
  duration = 300,
  delay = 0,
  isVisible = true
}: Props) {
  const { animate, getAnimatedStyle } = useChartAnimations();
  const [isInitialRender, setIsInitialRender] = React.useState(true);

  React.useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const timeout = setTimeout(() => {
      animate(isVisible, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, duration, delay]);

  const getWebAnimationStyle = () => {
    if (Platform.OS !== 'web') return {};

    const transitions = {
      fade: 'opacity',
      slide: 'transform',
      scale: 'transform',
      rotate: 'transform'
    };

    return {
      transition: `${transitions[animation]} ${duration}ms ease-in-out`,
      ...(animation === 'fade' && { opacity: isVisible ? 1 : 0 }),
      ...(animation === 'slide' && { 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)' 
      }),
      ...(animation === 'scale' && { 
        transform: isVisible ? 'scale(1)' : 'scale(0.95)' 
      }),
      ...(animation === 'rotate' && { 
        transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)' 
      }),
    };
  };

  return (
    <Animated.View style={[style, getAnimatedStyle(), getWebAnimationStyle()]}>
      {children}
    </Animated.View>
  );
} 