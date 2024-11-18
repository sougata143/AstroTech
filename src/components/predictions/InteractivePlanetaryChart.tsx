import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G } from 'react-native-svg';
import {
  PinchGestureHandler,
  RotationGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedGestureHandler, withSpring, withTiming } from 'react-native-reanimated';
import { PlanetaryPosition } from '../types/Predictions';

interface PlanetDetails {
  planet: string;
  longitude: number;
  house: number;
  description: string;
  aspects: {
    planet: string;
    type: string;
    angle: number;
  }[];
}

interface Props {
  planetaryPositions: PlanetDetails[];
  onPlanetPress?: (planet: PlanetDetails) => void;
}

export default function InteractivePlanetaryChart({ planetaryPositions, onPlanetPress }: Props) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetDetails | null>(null);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.scale = scale.value;
    },
    onActive: (event, ctx) => {
      scale.value = Math.max(0.5, Math.min(3, ctx.scale * event.scale));
    },
    onEnd: () => {
      if (scale.value < 0.7) {
        scale.value = withSpring(0.7);
      } else if (scale.value > 2.5) {
        scale.value = withSpring(2.5);
      }
    },
  });

  const rotationHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.rotation = rotation.value;
    },
    onActive: (event, ctx) => {
      rotation.value = ctx.rotation + event.rotation;
    },
    onEnd: () => {
      // Snap to nearest 30 degrees for house alignment
      const snapRotation = Math.round(rotation.value / (Math.PI / 6)) * (Math.PI / 6);
      rotation.value = withSpring(snapRotation);
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.translateX + event.translationX;
      translateY.value = ctx.translateY + event.translationY;
    },
    onEnd: () => {
      // Bounce back if dragged too far
      const maxTranslation = 100;
      if (Math.abs(translateX.value) > maxTranslation) {
        translateX.value = withSpring(Math.sign(translateX.value) * maxTranslation);
      }
      if (Math.abs(translateY.value) > maxTranslation) {
        translateY.value = withSpring(Math.sign(translateY.value) * maxTranslation);
      }
    },
  });

  const doubleTapRef = React.useRef();
  const handleDoubleTap = () => {
    // Reset all transformations
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const longPressHandler = (planet: PlanetDetails) => {
    // Show detailed planet information
    setSelectedPlanet(planet);
    // Trigger haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <RotationGestureHandler onGestureEvent={rotationHandler}>
          <Animated.View
            style={[
              styles.chartContainer,
              {
                transform: [
                  { scale: scale.value },
                  { rotate: `${rotation.value}rad` },
                  { translateX: translateX.value },
                  { translateY: translateY.value },
                ],
              },
            ]}
          >
            <ChartContent
              planetaryPositions={planetaryPositions}
              selectedPlanet={selectedPlanet}
              onPlanetPress={onPlanetPress}
              onPlanetLongPress={longPressHandler}
              doubleTapRef={doubleTapRef}
              onDoubleTap={handleDoubleTap}
            />
          </Animated.View>
        </RotationGestureHandler>
      </PinchGestureHandler>

      {selectedPlanet && (
        <PlanetDetailsOverlay
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </GestureHandlerRootView>
  );
}

// Add new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ... existing styles
});