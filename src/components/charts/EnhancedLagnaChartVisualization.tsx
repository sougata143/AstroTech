import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { PanGestureHandler, PinchGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface Props {
  lagnaChart: any; // Use proper type from DetailedLagnaCalculator
  onHouseSelect?: (house: any) => void;
  onPlanetSelect?: (planet: any) => void;
}

export default function EnhancedLagnaChartVisualization({
  lagnaChart,
  onHouseSelect,
  onPlanetSelect
}: Props) {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  
  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const chartOpacity = useSharedValue(1);

  // Chart dimensions
  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 400);
  const center = size / 2;
  const radius = (size - 40) / 2;

  // Gesture handlers
  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.scale = scale.value;
    },
    onActive: (event, ctx) => {
      scale.value = Math.max(0.5, Math.min(2, ctx.scale * event.scale));
    },
    onEnd: () => {
      scale.value = withSpring(1);
    }
  });

  // Animation styles
  const chartStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateX: translateX.value },
      { translateY: translateY.value }
    ],
    opacity: chartOpacity.value
  }));

  const renderHouses = () => {
    return lagnaChart.houses.map((house: any, index: number) => {
      const startAngle = (index * 30) * Math.PI / 180;
      const endAngle = ((index + 1) * 30) * Math.PI / 180;
      const isSelected = selectedHouse === house.house;

      return (
        <G key={`house-${house.house}`}>
          <AnimatedHousePath
            house={house}
            startAngle={startAngle}
            endAngle={endAngle}
            isSelected={isSelected}
            onSelect={() => handleHouseSelect(house)}
          />
          <HouseLabels
            house={house}
            angle={(startAngle + endAngle) / 2}
            isSelected={isSelected}
          />
        </G>
      );
    });
  };

  const renderPlanets = () => {
    return lagnaChart.planets.map((planet: any) => (
      <AnimatedPlanet
        key={planet.planet}
        planet={planet}
        isSelected={selectedPlanet === planet.planet}
        onSelect={() => handlePlanetSelect(planet)}
      />
    ));
  };

  const renderAspects = () => {
    if (!selectedPlanet) return null;
    
    const planet = lagnaChart.planets.find((p: any) => p.planet === selectedPlanet);
    return planet.aspects.map((aspect: any, index: number) => (
      <AnimatedAspectLine
        key={`aspect-${index}`}
        aspect={aspect}
        planet={planet}
        planets={lagnaChart.planets}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Reanimated.View style={[styles.chartContainer, chartStyle]}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {renderHouses()}
            {renderAspects()}
            {renderPlanets()}
          </Svg>
        </Reanimated.View>
      </PinchGestureHandler>

      {selectedHouse && (
        <HouseDetailsOverlay
          house={lagnaChart.houses[selectedHouse - 1]}
          onClose={() => setSelectedHouse(null)}
        />
      )}

      {selectedPlanet && (
        <PlanetDetailsOverlay
          planet={lagnaChart.planets.find((p: any) => p.planet === selectedPlanet)}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </View>
  );
}

// Add component styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  // Add more styles...
}); 