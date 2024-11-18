import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, G } from 'react-native-svg';
import { PlanetaryHarmony } from '../../services/matching/ExtendedKutaCalculator';

interface CompatibilityArea {
  name: string;
  score: number;
  maxScore: number;
  details: {
    strengths: string[];
    challenges: string[];
    recommendations: string[];
  };
}

interface Props {
  relationships: PlanetaryHarmony[];
  onAreaSelect?: (area: CompatibilityArea) => void;
}

export default function RelationshipCompatibilityAnalysis({ relationships, onAreaSelect }: Props) {
  const [selectedArea, setSelectedArea] = useState<CompatibilityArea | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const compatibilityAreas: CompatibilityArea[] = [
    {
      name: 'Mental Compatibility',
      score: calculateMentalCompatibility(relationships),
      maxScore: 20,
      details: generateMentalCompatibilityDetails(relationships)
    },
    {
      name: 'Emotional Harmony',
      score: calculateEmotionalHarmony(relationships),
      maxScore: 20,
      details: generateEmotionalHarmonyDetails(relationships)
    },
    {
      name: 'Spiritual Connection',
      score: calculateSpiritualConnection(relationships),
      maxScore: 20,
      details: generateSpiritualConnectionDetails(relationships)
    },
    {
      name: 'Physical Chemistry',
      score: calculatePhysicalChemistry(relationships),
      maxScore: 20,
      details: generatePhysicalChemistryDetails(relationships)
    },
    {
      name: 'Life Goals',
      score: calculateLifeGoalsCompatibility(relationships),
      maxScore: 20,
      details: generateLifeGoalsDetails(relationships)
    }
  ];

  const handleAreaSelect = (area: CompatibilityArea) => {
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

    setSelectedArea(area);
    onAreaSelect?.(area);
  };

  const renderCompatibilityWheel = () => {
    const size = 300;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 120;
    const totalScore = compatibilityAreas.reduce((sum, area) => sum + area.score, 0);
    const maxTotalScore = compatibilityAreas.reduce((sum, area) => sum + area.maxScore, 0);
    const percentage = (totalScore / maxTotalScore) * 100;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="30"
        />
        <Path
          d={describeArc(centerX, centerY, radius, 0, (percentage * 360) / 100)}
          stroke={getCompatibilityColor(percentage)}
          strokeWidth="30"
          fill="none"
        />
        <SvgText
          x={centerX}
          y={centerY}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={getCompatibilityColor(percentage)}
        >
          {Math.round(percentage)}%
        </SvgText>
      </Svg>
    );
  };

  const renderAreaCards = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
        {compatibilityAreas.map((area, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.areaCard,
              selectedArea?.name === area.name && styles.selectedCard
            ]}
            onPress={() => handleAreaSelect(area)}
          >
            <Text style={styles.areaName}>{area.name}</Text>
            <Text style={styles.areaScore}>
              {area.score}/{area.maxScore}
            </Text>
            <View style={[
              styles.scoreIndicator,
              { backgroundColor: getCompatibilityColor((area.score / area.maxScore) * 100) }
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDetailedAnalysis = () => {
    if (!selectedArea) return null;

    return (
      <Animated.View style={[styles.analysisContainer, { opacity: fadeAnim }]}>
        <View style={styles.strengthsSection}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          {selectedArea.details.strengths.map((strength, index) => (
            <Text key={index} style={styles.strengthText}>• {strength}</Text>
          ))}
        </View>

        <View style={styles.challengesSection}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          {selectedArea.details.challenges.map((challenge, index) => (
            <Text key={index} style={styles.challengeText}>• {challenge}</Text>
          ))}
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {selectedArea.details.recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendationText}>• {recommendation}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relationship Compatibility Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderCompatibilityWheel()}
      </View>

      {renderAreaCards()}
      {renderDetailedAnalysis()}
    </View>
  );
}

// Helper functions for calculations
function calculateMentalCompatibility(relationships: PlanetaryHarmony[]): number {
  // Implement mental compatibility calculation based on Mercury, Moon, and Jupiter relationships
  return 15; // Placeholder
}

function calculateEmotionalHarmony(relationships: PlanetaryHarmony[]): number {
  // Implement emotional harmony calculation based on Moon, Venus, and Mars relationships
  return 16; // Placeholder
}

function calculateSpiritualConnection(relationships: PlanetaryHarmony[]): number {
  // Implement spiritual connection calculation based on Jupiter, Saturn, and Ketu relationships
  return 18; // Placeholder
}

function calculatePhysicalChemistry(relationships: PlanetaryHarmony[]): number {
  // Implement physical chemistry calculation based on Mars, Venus, and Sun relationships
  return 14; // Placeholder
}

function calculateLifeGoalsCompatibility(relationships: PlanetaryHarmony[]): number {
  // Implement life goals compatibility calculation based on Sun, Saturn, and Jupiter relationships
  return 17; // Placeholder
}

// Helper functions for generating details
function generateMentalCompatibilityDetails(relationships: PlanetaryHarmony[]): CompatibilityArea['details'] {
  // Generate detailed analysis of mental compatibility
  return {
    strengths: [
      'Strong intellectual connection',
      'Similar thought processes',
      'Good communication potential'
    ],
    challenges: [
      'Different learning styles',
      'Potential communication gaps'
    ],
    recommendations: [
      'Engage in intellectual discussions',
      'Share learning experiences',
      'Practice active listening'
    ]
  };
}

// Implement other detail generation functions similarly...

function getCompatibilityColor(percentage: number): string {
  if (percentage >= 80) return '#4CAF50';
  if (percentage >= 60) return '#8BC34A';
  if (percentage >= 40) return '#FFC107';
  if (percentage >= 20) return '#FF9800';
  return '#F44336';
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
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
  cardsContainer: {
    marginVertical: 16,
  },
  areaCard: {
    padding: 16,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: 150,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  areaScore: {
    fontSize: 14,
    color: '#666',
  },
  scoreIndicator: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  analysisContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  strengthsSection: {
    marginBottom: 16,
  },
  challengesSection: {
    marginBottom: 16,
  },
  recommendationsSection: {
    marginBottom: 16,
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
  recommendationText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
});

// Helper function for SVG arc path
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