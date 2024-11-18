import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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
  relationships: Array<{
    planets: [string, string];
    relationship: 'friend' | 'neutral' | 'enemy';
    strength: number;
  }>;
  onAreaSelect?: (area: string) => void;
}

export default function RelationshipCompatibilityAnalysis({ relationships, onAreaSelect }: Props) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleAreaSelect = (areaName: string) => {
    setSelectedArea(areaName);
    onAreaSelect?.(areaName);
  };

  const compatibilityAreas: CompatibilityArea[] = [
    {
      name: 'Mental Compatibility',
      score: calculateMentalCompatibility(relationships),
      maxScore: 20,
      details: generateMentalCompatibilityDetails()
    },
    {
      name: 'Emotional Harmony',
      score: calculateEmotionalHarmony(relationships),
      maxScore: 20,
      details: generateEmotionalHarmonyDetails()
    },
    {
      name: 'Spiritual Connection',
      score: calculateSpiritualConnection(relationships),
      maxScore: 20,
      details: generateSpiritualConnectionDetails()
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relationship Compatibility Analysis</Text>
      {compatibilityAreas.map((area, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.areaCard,
            selectedArea === area.name && styles.selectedCard
          ]}
          onPress={() => handleAreaSelect(area.name)}
        >
          <Text style={styles.areaName}>{area.name}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {area.score}/{area.maxScore}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(area.score / area.maxScore) * 100}%` }
                ]} 
              />
            </View>
          </View>
          {selectedArea === area.name && (
            <View style={styles.details}>
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Strengths:</Text>
                {area.details.strengths.map((strength, i) => (
                  <Text key={i} style={styles.detailText}>• {strength}</Text>
                ))}
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Challenges:</Text>
                {area.details.challenges.map((challenge, i) => (
                  <Text key={i} style={styles.detailText}>• {challenge}</Text>
                ))}
              </View>
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Recommendations:</Text>
                {area.details.recommendations.map((rec, i) => (
                  <Text key={i} style={styles.detailText}>• {rec}</Text>
                ))}
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function calculateMentalCompatibility(relationships: Props['relationships']): number {
  if (!relationships.length) return 0;
  return Math.round(relationships.reduce((sum, rel) => sum + rel.strength, 0) / relationships.length * 20);
}

function calculateEmotionalHarmony(relationships: Props['relationships']): number {
  if (!relationships.length) return 0;
  return Math.round(relationships.reduce((sum, rel) => sum + rel.strength, 0) / relationships.length * 20);
}

function calculateSpiritualConnection(relationships: Props['relationships']): number {
  if (!relationships.length) return 0;
  return Math.round(relationships.reduce((sum, rel) => sum + rel.strength, 0) / relationships.length * 20);
}

function generateMentalCompatibilityDetails() {
  return {
    strengths: [
      'Strong intellectual connection',
      'Good communication',
      'Shared interests'
    ],
    challenges: [
      'Different thinking patterns',
      'Communication gaps'
    ],
    recommendations: [
      'Practice active listening',
      'Share intellectual pursuits'
    ]
  };
}

function generateEmotionalHarmonyDetails() {
  return {
    strengths: [
      'Deep emotional understanding',
      'Strong empathy',
      'Emotional support'
    ],
    challenges: [
      'Emotional sensitivity',
      'Different expression styles'
    ],
    recommendations: [
      'Practice emotional sharing',
      'Respect emotional boundaries'
    ]
  };
}

function generateSpiritualConnectionDetails() {
  return {
    strengths: [
      'Shared spiritual values',
      'Deep connection',
      'Mutual growth'
    ],
    challenges: [
      'Different spiritual paths',
      'Varying practices'
    ],
    recommendations: [
      'Share spiritual practices',
      'Respect different beliefs'
    ]
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  areaCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  areaName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
    marginRight: 8,
    width: 50,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  details: {
    marginTop: 12,
  },
  detailSection: {
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    paddingLeft: 8,
  },
}); 