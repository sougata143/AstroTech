import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, G } from 'react-native-svg';
import { KutaResult } from '../../services/matching/KutaCalculator';

interface Props {
  kutaResults: KutaResult[];
  totalScore: number;
  maxScore: number;
  onKutaSelect?: (kuta: KutaResult) => void;
}

export default function KutaResultsVisualization({ 
  kutaResults, 
  totalScore, 
  maxScore, 
  onKutaSelect 
}: Props) {
  const [selectedKuta, setSelectedKuta] = useState<KutaResult | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 300);
  const center = size / 2;
  const radius = (size - 40) / 2;

  const getKutaColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#8BC34A';
    if (percentage >= 40) return '#FFC107';
    if (percentage >= 20) return '#FF9800';
    return '#F44336';
  };

  const handleKutaSelect = (kuta: KutaResult) => {
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
    onKutaSelect?.(kuta);
  };

  const renderKutaWheel = () => {
    const totalAngle = 360 * (totalScore / maxScore);
    const arcPath = describeArc(center, center, radius, 0, totalAngle);

    return (
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="20"
        />
        {/* Score arc */}
        <Path
          d={arcPath}
          stroke={getKutaColor(totalScore, maxScore)}
          strokeWidth="20"
          fill="none"
        />
        {/* Total score text */}
        <SvgText
          x={center}
          y={center}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={getKutaColor(totalScore, maxScore)}
        >
          {Math.round((totalScore / maxScore) * 100)}%
        </SvgText>
      </Svg>
    );
  };

  const renderKutaCards = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.kutaCardsContainer}
      >
        {kutaResults.map((kuta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.kutaCard,
              selectedKuta?.score === kuta.score && styles.selectedCard
            ]}
            onPress={() => handleKutaSelect(kuta)}
          >
            <View style={styles.kutaHeader}>
              <View style={[
                styles.scoreIndicator,
                { backgroundColor: getKutaColor(kuta.score, kuta.maxScore) }
              ]} />
              <Text style={styles.kutaScore}>
                {kuta.score}/{kuta.maxScore}
              </Text>
            </View>
            <Text style={styles.kutaDescription}>{kuta.details.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderKutaDetails = () => {
    if (!selectedKuta) return null;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.detailsTitle}>Detailed Analysis</Text>
        
        <View style={styles.strengthsContainer}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          {selectedKuta.details.positivePoints.map((point, index) => (
            <Text key={index} style={styles.strengthText}>• {point}</Text>
          ))}
        </View>

        {selectedKuta.details.challenges.length > 0 && (
          <View style={styles.challengesContainer}>
            <Text style={styles.sectionTitle}>Challenges</Text>
            {selectedKuta.details.challenges.map((challenge, index) => (
              <Text key={index} style={styles.challengeText}>• {challenge}</Text>
            ))}
          </View>
        )}

        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {selectedKuta.details.recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendationText}>• {recommendation}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kuta Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderKutaWheel()}
      </View>

      {renderKutaCards()}
      {renderKutaDetails()}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  kutaCardsContainer: {
    marginVertical: 16,
  },
  kutaCard: {
    width: 200,
    padding: 16,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  kutaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  kutaScore: {
    fontSize: 16,
    fontWeight: '600',
  },
  kutaDescription: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  strengthsContainer: {
    marginBottom: 16,
  },
  strengthText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  challengesContainer: {
    marginBottom: 16,
  },
  challengeText: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 4,
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
}); 