import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, G, Line } from 'react-native-svg';
import { PlanetaryHarmony } from '../../services/matching/ExtendedKutaCalculator';
import { DetailedCompatibilityArea } from '../../services/calculations/DetailedRelationshipCalculator';

interface Props {
  analysisAreas: Record<string, DetailedCompatibilityArea>;
  planetaryHarmonies: PlanetaryHarmony[];
  onAreaSelect?: (area: string) => void;
}

export default function DetailedAnalysisVisualization({ 
  analysisAreas, 
  planetaryHarmonies,
  onAreaSelect 
}: Props) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const screenWidth = Dimensions.get('window').width;
  const chartSize = Math.min(screenWidth - 40, 300);

  const handleAreaSelect = (areaKey: string) => {
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

    setSelectedArea(areaKey);
    onAreaSelect?.(areaKey);
  };

  const renderAnalysisWheel = () => {
    const centerX = chartSize / 2;
    const centerY = chartSize / 2;
    const radius = chartSize * 0.4;
    const areas = Object.entries(analysisAreas);
    const anglePerArea = (2 * Math.PI) / areas.length;

    return (
      <Svg width={chartSize} height={chartSize}>
        <G transform={`translate(${centerX},${centerY})`}>
          {areas.map(([key, area], index) => {
            const startAngle = index * anglePerArea;
            const endAngle = (index + 1) * anglePerArea;
            const score = area.score / area.maxScore;
            
            const path = describeArc(0, 0, radius, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const labelX = (radius + 20) * Math.cos(midAngle);
            const labelY = (radius + 20) * Math.sin(midAngle);

            return (
              <G key={key}>
                <Path
                  d={path}
                  fill={getScoreColor(score)}
                  opacity={selectedArea === key ? 1 : 0.7}
                  onPress={() => handleAreaSelect(key)}
                />
                <SvgText
                  x={labelX}
                  y={labelY}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                  transform={`rotate(${(midAngle * 180) / Math.PI - 90})`}
                >
                  {area.name}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderSubAreaDetails = (area: DetailedCompatibilityArea) => {
    return (
      <View style={styles.subAreasContainer}>
        <Text style={styles.subAreasTitle}>Detailed Analysis</Text>
        {area.subAreas.map((subArea, index) => (
          <View key={index} style={styles.subAreaCard}>
            <View style={styles.subAreaHeader}>
              <Text style={styles.subAreaName}>{subArea.name}</Text>
              <Text style={styles.subAreaScore}>
                {subArea.score}/{subArea.maxScore}
              </Text>
            </View>
            
            <View style={styles.influenceContainer}>
              {subArea.influence.map((inf, i) => (
                <Text key={i} style={styles.influenceText}>• {inf}</Text>
              ))}
            </View>

            <View style={styles.potentialContainer}>
              {subArea.potential.map((pot, i) => (
                <Text key={i} style={styles.potentialText}>◆ {pot}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderTimingAnalysis = (area: DetailedCompatibilityArea) => {
    return (
      <View style={styles.timingContainer}>
        <Text style={styles.timingTitle}>Timing Analysis</Text>
        
        <View style={styles.timingSection}>
          <Text style={styles.timingSubtitle}>Favorable Periods</Text>
          {area.timing.favorable.map((period, index) => (
            <Text key={index} style={styles.favorableText}>• {period}</Text>
          ))}
        </View>

        <View style={styles.timingSection}>
          <Text style={styles.timingSubtitle}>Challenging Periods</Text>
          {area.timing.challenging.map((period, index) => (
            <Text key={index} style={styles.challengingText}>• {period}</Text>
          ))}
        </View>

        <View style={styles.timingSection}>
          <Text style={styles.timingSubtitle}>Peak Periods</Text>
          {area.timing.peakPeriods.map((period, index) => (
            <Text key={index} style={styles.peakText}>• {period}</Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detailed Compatibility Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderAnalysisWheel()}
      </View>

      {selectedArea && (
        <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
          {renderSubAreaDetails(analysisAreas[selectedArea])}
          {renderTimingAnalysis(analysisAreas[selectedArea])}
        </Animated.View>
      )}
    </ScrollView>
  );
}

// Helper function for creating SVG arcs
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

function getScoreColor(score: number): string {
  if (score >= 0.8) return '#4CAF50';
  if (score >= 0.6) return '#8BC34A';
  if (score >= 0.4) return '#FFC107';
  if (score >= 0.2) return '#FF9800';
  return '#F44336';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  detailsContainer: {
    marginTop: 24,
  },
  subAreasContainer: {
    marginBottom: 24,
  },
  subAreasTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  subAreaCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subAreaName: {
    fontSize: 16,
    fontWeight: '600',
  },
  subAreaScore: {
    fontSize: 14,
    color: '#666',
  },
  influenceContainer: {
    marginBottom: 12,
  },
  influenceText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
  potentialContainer: {
    marginBottom: 8,
  },
  potentialText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  timingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  timingTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  timingSection: {
    marginBottom: 16,
  },
  timingSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  favorableText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  challengingText: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 4,
  },
  peakText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
}); 