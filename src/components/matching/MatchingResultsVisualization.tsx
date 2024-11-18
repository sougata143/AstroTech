import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, Line } from 'react-native-svg';
import { KutaScore, MatchingResult } from '../../services/matching/HoroscopeMatchingCalculator';

interface Props {
  matchingResult: MatchingResult;
  onKutaPress?: (kuta: KutaScore) => void;
}

export default function MatchingResultsVisualization({ matchingResult, onKutaPress }: Props) {
  const [selectedKuta, setSelectedKuta] = useState<KutaScore | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const { totalScore, maxPossibleScore, kutas } = matchingResult;
  const compatibilityPercentage = (totalScore / maxPossibleScore) * 100;

  const getCompatibilityColor = (percentage: number): string => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#8BC34A';
    if (percentage >= 40) return '#FFC107';
    if (percentage >= 20) return '#FF9800';
    return '#F44336';
  };

  const handleKutaSelect = (kuta: KutaScore) => {
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

    setSelectedKuta(kuta);
    onKutaPress?.(kuta);
  };

  const renderCompatibilityWheel = () => {
    const size = 200;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 80;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="10"
        />

        {/* Progress arc */}
        <Path
          d={describeArc(centerX, centerY, radius, 0, (compatibilityPercentage * 360) / 100)}
          stroke={getCompatibilityColor(compatibilityPercentage)}
          strokeWidth="10"
          fill="none"
        />

        {/* Percentage text */}
        <SvgText
          x={centerX}
          y={centerY}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={getCompatibilityColor(compatibilityPercentage)}
        >
          {Math.round(compatibilityPercentage)}%
        </SvgText>
      </Svg>
    );
  };

  const renderKutaCards = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kutaCardsContainer}>
        {kutas.map((kuta, index) => (
          <TouchableOpacity
            key={kuta.name}
            style={[
              styles.kutaCard,
              selectedKuta?.name === kuta.name && styles.selectedKutaCard,
            ]}
            onPress={() => handleKutaSelect(kuta)}
          >
            <Text style={styles.kutaName}>{kuta.name}</Text>
            <Text style={styles.kutaScore}>
              {kuta.score}/{kuta.maxScore}
            </Text>
            <View style={[
              styles.kutaIndicator,
              { backgroundColor: getCompatibilityColor((kuta.score / kuta.maxScore) * 100) }
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDetailedAnalysis = () => {
    if (!selectedKuta) return null;

    return (
      <Animated.View style={[styles.analysisContainer, { opacity: fadeAnim }]}>
        <Text style={styles.analysisTitle}>{selectedKuta.name} Analysis</Text>
        <Text style={styles.analysisDescription}>{selectedKuta.description}</Text>
        
        <View style={styles.effectsContainer}>
          <Text style={styles.effectsTitle}>Effects:</Text>
          {selectedKuta.effects.map((effect, index) => (
            <Text key={index} style={styles.effectText}>• {effect}</Text>
          ))}
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Recommendations:</Text>
          {selectedKuta.recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendationText}>• {recommendation}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compatibility Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderCompatibilityWheel()}
      </View>

      {renderKutaCards()}
      {renderDetailedAnalysis()}

      <View style={styles.strengthsContainer}>
        <Text style={styles.sectionTitle}>Key Strengths</Text>
        {matchingResult.detailedAnalysis.strengths.map((strength, index) => (
          <Text key={index} style={styles.strengthText}>• {strength}</Text>
        ))}
      </View>

      <View style={styles.challengesContainer}>
        <Text style={styles.sectionTitle}>Areas for Attention</Text>
        {matchingResult.detailedAnalysis.challenges.map((challenge, index) => (
          <Text key={index} style={styles.challengeText}>• {challenge}</Text>
        ))}
      </View>
    </View>
  );
}

// Helper function to create SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  kutaCardsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  kutaCard: {
    padding: 16,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: 120,
  },
  selectedKutaCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  kutaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  kutaScore: {
    fontSize: 14,
    color: '#666',
  },
  kutaIndicator: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  analysisContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  analysisDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  effectsContainer: {
    marginBottom: 16,
  },
  effectsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  effectText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  strengthsContainer: {
    marginTop: 16,
  },
  challengesContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  strengthText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  challengeText: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 4,
  },
}); 