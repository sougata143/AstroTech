import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LagnaChart } from '../../types/LagnaChart';

interface Props {
  planetaryAnalysis?: {
    planet: string;
    strength: number;
    aspects: Array<{
      planet: string;
      type: string;
      strength: number;
    }>;
    houses: Array<{
      house: number;
      strength: number;
    }>;
  }[];
  onPlanetSelect?: (planet: string) => void;
}

export default function DetailedPlanetaryAnalysisChart({ 
  planetaryAnalysis = [], 
  onPlanetSelect 
}: Props) {
  if (!planetaryAnalysis || planetaryAnalysis.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No planetary analysis available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {planetaryAnalysis.map((analysis, index) => (
        <View key={index} style={styles.planetCard}>
          <Text style={styles.planetName}>{analysis.planet}</Text>
          <Text style={styles.strengthText}>
            Strength: {Math.round(analysis.strength * 100)}%
          </Text>
          <View style={styles.aspectsContainer}>
            <Text style={styles.sectionTitle}>Aspects:</Text>
            {analysis.aspects.map((aspect, aspectIndex) => (
              <Text key={aspectIndex} style={styles.aspectText}>
                {aspect.planet} - {aspect.type} ({Math.round(aspect.strength * 100)}%)
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  planetCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  strengthText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  aspectsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  aspectText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
}); 