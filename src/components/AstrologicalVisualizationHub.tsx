import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import LagnaChartVisualization from './charts/LagnaChartVisualization';
import DetailedPlanetaryAnalysisChart from './charts/DetailedPlanetaryAnalysisChart';
import HouseInterpretationVisualization from './charts/HouseInterpretationVisualization';
import PlanetaryHarmonyChart from './charts/PlanetaryHarmonyChart';
import RelationshipCompatibilityAnalysis from './charts/RelationshipCompatibilityAnalysis';
import MuhurtaTimingChart from './charts/MuhurtaTimingChart';
import DashaTimeline from './charts/DashaTimeline';
import { LagnaChart } from '../types/LagnaChart';
import { LagnaChartCalculator } from '../services/calculations/LagnaChartCalculator';
import { MuhurtaCalculator } from '../services/calculations/MuhurtaCalculator';

export function AstrologicalVisualizationHub() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lagnaChart, setLagnaChart] = useState<LagnaChart | undefined>(undefined);
  const [planetaryAnalysis, setPlanetaryAnalysis] = useState<any[]>([]);
  const [selectedHouse, setSelectedHouse] = useState(1);
  const [relationships, setRelationships] = useState<Array<{
    planets: [string, string];
    relationship: 'friend' | 'neutral' | 'enemy';
    strength: number;
  }>>([]);
  const [muhurtas, setMuhurtas] = useState<Array<{
    startTime: Date;
    endTime: Date;
    name: string;
    quality: 'auspicious' | 'neutral' | 'inauspicious';
    activities: string[];
  }>>([]);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Calculate birth chart
      const birthDateTime = new Date(); // Replace with actual birth date/time
      const chartData = await LagnaChartCalculator.calculateLagnaChart(
        birthDateTime,
        22.648161467294305,  // Replace with actual latitude
        88.08340541824847   // Replace with actual longitude
      );

      if (!chartData) {
        throw new Error('Failed to calculate chart data');
      }

      console.log('Chart Data:', chartData);
      setLagnaChart(chartData);

      // Calculate planetary analysis
      if (chartData.planets) {
        const analysis = chartData.planets.map(planet => ({
          planet: planet.planet,
          strength: 0.7,
          aspects: planet.aspects || [],
          houses: [{ house: planet.house, strength: 0.8 }]
        }));
        setPlanetaryAnalysis(analysis);

        // Calculate relationships
        const rels = chartData.planets.flatMap((p1, i) => 
          chartData.planets.slice(i + 1).map(p2 => ({
            planets: [p1.planet, p2.planet] as [string, string],
            relationship: ['friend', 'neutral', 'enemy'][Math.floor(Math.random() * 3)] as 'friend' | 'neutral' | 'enemy',
            strength: Math.random()
          }))
        );
        setRelationships(rels);
      }

      // Calculate muhurta timings
      const muhurtaTimings = MuhurtaCalculator.calculateMuhurtaTimings(birthDateTime);
      setMuhurtas(muhurtaTimings);

    } catch (err) {
      console.error('Error loading chart data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  const houseSignificance = {
    basicSignifications: [
      'Physical appearance',
      'Personality',
      'Self-expression'
    ],
    advancedSignifications: {
      career: ['Leadership', 'Public image'],
      relationships: ['Self in relationships', 'Personal boundaries'],
      spirituality: ['Soul purpose', 'Spiritual direction'],
      health: ['Vitality', 'Constitution'],
      wealth: ['Personal resources', 'Earning capacity']
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading birth chart analysis...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText} onPress={loadChartData}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Birth Chart</Text>
        <LagnaChartVisualization 
          lagnaChart={lagnaChart}
          onHouseSelect={setSelectedHouse}
          onPlanetSelect={(planet) => console.log('Selected planet:', planet)}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Planetary Analysis</Text>
        <DetailedPlanetaryAnalysisChart 
          planetaryAnalysis={planetaryAnalysis}
          onPlanetSelect={(planet) => console.log('Selected planet:', planet)}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>House Interpretation</Text>
        <HouseInterpretationVisualization 
          houseNumber={selectedHouse}
          significance={houseSignificance}
          onAreaSelect={(area) => console.log('Selected area:', area)}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Planetary Relationships</Text>
        <PlanetaryHarmonyChart 
          relationships={relationships}
          onRelationshipSelect={(planets) => console.log('Selected planets:', planets)}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Muhurta Timings</Text>
        <MuhurtaTimingChart 
          muhurtas={muhurtas}
          onMuhurtaSelect={(muhurta) => console.log('Selected muhurta:', muhurta)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 14,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  chartSection: {
    minHeight: 300,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
}); 