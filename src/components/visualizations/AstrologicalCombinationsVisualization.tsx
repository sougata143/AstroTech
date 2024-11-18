import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { useChartAnimations } from '../../hooks/useChartAnimations';

interface AstrologicalCombination {
  type: string;
  planets: string[];
  strength: number;
  effects: {
    positive: string[];
    negative: string[];
  };
  timing: {
    peak: string;
    favorable: string[];
    challenging: string[];
  };
  remedies: string[];
}

interface Props {
  combinations: AstrologicalCombination[];
  onCombinationSelect?: (combination: AstrologicalCombination) => void;
}

export default function AstrologicalCombinationsVisualization({ combinations, onCombinationSelect }: Props) {
  const [selectedCombination, setSelectedCombination] = useState<AstrologicalCombination | null>(null);
  const { animate, getAnimatedStyle } = useChartAnimations();
  const [fadeAnim] = useState(new Animated.Value(1));

  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 400);
  const center = size / 2;
  const radius = (size - 40) / 2;

  const handleCombinationSelect = (combination: AstrologicalCombination) => {
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

    setSelectedCombination(combination);
    onCombinationSelect?.(combination);
  };

  const getCombinationColor = (type: string): string => {
    const colors: Record<string, string> = {
      'Raja Yoga': '#4CAF50',
      'Dhana Yoga': '#FFC107',
      'Kesari Yoga': '#2196F3',
      'Vipreet Raja Yoga': '#9C27B0',
      'Neecha Bhanga Raja Yoga': '#FF5722'
    };
    return colors[type] || '#666666';
  };

  const renderCombinationsWheel = () => {
    const anglePerCombination = (2 * Math.PI) / combinations.length;

    return (
      <Svg width={size} height={size}>
        <G transform={`translate(${center},${center})`}>
          {combinations.map((combination, index) => {
            const startAngle = index * anglePerCombination;
            const endAngle = (index + 1) * anglePerCombination;
            const isSelected = selectedCombination === combination;

            const path = describeArc(0, 0, radius, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius + 20;
            const labelX = labelRadius * Math.cos(midAngle);
            const labelY = labelRadius * Math.sin(midAngle);

            return (
              <G key={`${combination.type}-${index}`}>
                <Path
                  d={path}
                  fill={getCombinationColor(combination.type)}
                  opacity={isSelected ? 1 : 0.7}
                  onPress={() => handleCombinationSelect(combination)}
                />
                <SvgText
                  x={labelX}
                  y={labelY}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                  transform={`rotate(${(midAngle * 180) / Math.PI - 90}, ${labelX}, ${labelY})`}
                >
                  {combination.type}
                </SvgText>
                <SvgText
                  x={radius * 0.7 * Math.cos(midAngle)}
                  y={radius * 0.7 * Math.sin(midAngle)}
                  fontSize="10"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#fff"
                >
                  {Math.round(combination.strength * 100)}%
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderCombinationDetails = () => {
    if (!selectedCombination) return null;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.combinationTitle}>{selectedCombination.type}</Text>
        
        <View style={styles.planetsContainer}>
          <Text style={styles.sectionTitle}>Participating Planets</Text>
          <View style={styles.planetsRow}>
            {selectedCombination.planets.map((planet, index) => (
              <View key={index} style={styles.planetBadge}>
                <Text style={styles.planetText}>{planet}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.effectsContainer}>
          <Text style={styles.sectionTitle}>Effects</Text>
          <View style={styles.effectsSection}>
            <Text style={styles.subsectionTitle}>Positive</Text>
            {selectedCombination.effects.positive.map((effect, index) => (
              <Text key={index} style={styles.positiveEffect}>• {effect}</Text>
            ))}
          </View>
          <View style={styles.effectsSection}>
            <Text style={styles.subsectionTitle}>Challenges</Text>
            {selectedCombination.effects.negative.map((effect, index) => (
              <Text key={index} style={styles.negativeEffect}>• {effect}</Text>
            ))}
          </View>
        </View>

        <View style={styles.timingContainer}>
          <Text style={styles.sectionTitle}>Timing</Text>
          <Text style={styles.peakPeriod}>Peak: {selectedCombination.timing.peak}</Text>
          <View style={styles.timingSection}>
            <Text style={styles.subsectionTitle}>Favorable Periods</Text>
            {selectedCombination.timing.favorable.map((period, index) => (
              <Text key={index} style={styles.favorablePeriod}>• {period}</Text>
            ))}
          </View>
          <View style={styles.timingSection}>
            <Text style={styles.subsectionTitle}>Challenging Periods</Text>
            {selectedCombination.timing.challenging.map((period, index) => (
              <Text key={index} style={styles.challengingPeriod}>• {period}</Text>
            ))}
          </View>
        </View>

        <View style={styles.remediesContainer}>
          <Text style={styles.sectionTitle}>Remedial Measures</Text>
          {selectedCombination.remedies.map((remedy, index) => (
            <Text key={index} style={styles.remedyText}>• {remedy}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Astrological Combinations</Text>
      
      <View style={styles.wheelContainer}>
        {renderCombinationsWheel()}
      </View>

      {renderCombinationDetails()}
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
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  combinationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  planetsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  planetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  planetBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  planetText: {
    fontSize: 14,
    color: '#1976d2',
  },
  effectsContainer: {
    marginBottom: 16,
  },
  effectsSection: {
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
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
  timingContainer: {
    marginBottom: 16,
  },
  peakPeriod: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 12,
  },
  timingSection: {
    marginBottom: 12,
  },
  favorablePeriod: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  challengingPeriod: {
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