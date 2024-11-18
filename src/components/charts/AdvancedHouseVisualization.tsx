import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { ExtendedHouseAnalysis } from '../../services/interpretations/ExtendedHousePlanetInterpretations';

interface Props {
  houseNumber: number;
  analysis: ExtendedHouseAnalysis;
  planetaryStrengths: Record<string, number>;
  onPlanetSelect?: (planet: string) => void;
}

export default function AdvancedHouseVisualization({
  houseNumber,
  analysis,
  planetaryStrengths,
  onPlanetSelect
}: Props) {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 300);

  const handlePlanetSelect = (planet: string) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedPlanet(planet);
    onPlanetSelect?.(planet);
  };

  const renderPlanetaryStrengthChart = () => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const planets = Object.keys(planetaryStrengths);
    const anglePerPlanet = (2 * Math.PI) / planets.length;

    return (
      <Svg width={size} height={size}>
        <G transform={`translate(${centerX},${centerY})`}>
          {planets.map((planet, index) => {
            const startAngle = index * anglePerPlanet;
            const endAngle = (index + 1) * anglePerPlanet;
            const strength = planetaryStrengths[planet];
            const isSelected = selectedPlanet === planet;

            const outerRadius = radius;
            const innerRadius = radius * 0.6;
            const strengthRadius = innerRadius + (outerRadius - innerRadius) * strength;

            const path = describeArc(0, 0, strengthRadius, startAngle, endAngle);
            const labelAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius + 20;
            const labelX = labelRadius * Math.cos(labelAngle);
            const labelY = labelRadius * Math.sin(labelAngle);

            return (
              <G key={planet}>
                <Path
                  d={path}
                  fill={getPlanetColor(planet)}
                  opacity={isSelected ? 1 : 0.7}
                  onPress={() => handlePlanetSelect(planet)}
                />
                <Circle
                  cx={0}
                  cy={0}
                  r={innerRadius}
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="1"
                />
                <SvgText
                  x={labelX}
                  y={labelY}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                  transform={`rotate(${(labelAngle * 180) / Math.PI - 90}, ${labelX}, ${labelY})`}
                >
                  {planet}
                </SvgText>
                <SvgText
                  x={strengthRadius * Math.cos(labelAngle) * 0.7}
                  y={strengthRadius * Math.sin(labelAngle) * 0.7}
                  fontSize="10"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#fff"
                >
                  {Math.round(strength * 100)}%
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderPlanetaryDetails = () => {
    if (!selectedPlanet) return null;

    const planetInfluence = analysis.planetaryInfluences[selectedPlanet];
    if (!planetInfluence) return null;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.planetTitle}>{selectedPlanet} in House {houseNumber}</Text>
        
        <View style={styles.effectsContainer}>
          <Text style={styles.sectionTitle}>Positive Effects</Text>
          {planetInfluence.positive.map((effect, index) => (
            <Text key={index} style={styles.positiveEffect}>• {effect}</Text>
          ))}
        </View>

        <View style={styles.effectsContainer}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          {planetInfluence.negative.map((effect, index) => (
            <Text key={index} style={styles.negativeEffect}>• {effect}</Text>
          ))}
        </View>

        <View style={styles.remediesContainer}>
          <Text style={styles.sectionTitle}>Remedial Measures</Text>
          {planetInfluence.remedies.map((remedy, index) => (
            <Text key={index} style={styles.remedyText}>• {remedy}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>House {houseNumber} Planetary Influences</Text>
      
      <View style={styles.chartContainer}>
        {renderPlanetaryStrengthChart()}
      </View>

      {renderPlanetaryDetails()}
    </ScrollView>
  );
}

// Helper functions
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', x, y,
    'Z'
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadians: number) {
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function getPlanetColor(planet: string): string {
  const colors: Record<string, string> = {
    Sun: '#FFB74D',
    Moon: '#E0E0E0',
    Mars: '#EF5350',
    Mercury: '#66BB6A',
    Jupiter: '#FDD835',
    Venus: '#F06292',
    Saturn: '#616161',
    Rahu: '#90A4AE',
    Ketu: '#78909C'
  };
  return colors[planet] || '#666666';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  planetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  effectsContainer: {
    marginBottom: 16,
  },
  positiveEffect: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  negativeEffect: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 4,
  },
  remediesContainer: {
    marginBottom: 16,
  },
  remedyText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
}); 