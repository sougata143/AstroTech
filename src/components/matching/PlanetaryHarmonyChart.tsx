import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText, Path } from 'react-native-svg';
import { PlanetaryHarmony } from '../../services/matching/ExtendedKutaCalculator';

interface Props {
  harmonies: PlanetaryHarmony[];
  onHarmonySelect?: (harmony: PlanetaryHarmony) => void;
}

export default function PlanetaryHarmonyChart({ harmonies, onHarmonySelect }: Props) {
  const [selectedHarmony, setSelectedHarmony] = useState<PlanetaryHarmony | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 400);
  const center = size / 2;
  const radius = (size - 80) / 2;

  const getRelationshipColor = (relationship: 'friend' | 'neutral' | 'enemy'): string => {
    switch (relationship) {
      case 'friend': return '#4CAF50';
      case 'neutral': return '#FFC107';
      case 'enemy': return '#F44336';
    }
  };

  const getPlanetColor = (planet: string): string => {
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
    return colors[planet] || '#000000';
  };

  const getPlanetPosition = (index: number, totalPlanets: number) => {
    const angle = (index * 2 * Math.PI) / totalPlanets - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  const handleHarmonySelect = (harmony: PlanetaryHarmony) => {
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

    setSelectedHarmony(harmony);
    onHarmonySelect?.(harmony);
  };

  const renderPlanetaryConnections = () => {
    const uniquePlanets = Array.from(new Set(harmonies.flatMap(h => h.planets)));
    const planetPositions = new Map(
      uniquePlanets.map((planet, index) => [
        planet,
        getPlanetPosition(index, uniquePlanets.length)
      ])
    );

    return (
      <Svg width={size} height={size}>
        {/* Relationship Lines */}
        {harmonies.map((harmony, index) => {
          const start = planetPositions.get(harmony.planets[0]);
          const end = planetPositions.get(harmony.planets[1]);
          if (!start || !end) return null;

          const isSelected = selectedHarmony === harmony;
          const strokeWidth = isSelected ? '3' : '1.5';
          const opacity = isSelected ? '1' : '0.6';

          return (
            <React.Fragment key={`connection-${index}`}>
              <Line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={getRelationshipColor(harmony.relationship)}
                strokeWidth={strokeWidth}
                opacity={opacity}
                onPress={() => handleHarmonySelect(harmony)}
              />
              {/* Strength Indicator */}
              <Circle
                cx={(start.x + end.x) / 2}
                cy={(start.y + end.y) / 2}
                r={5}
                fill={getRelationshipColor(harmony.relationship)}
                opacity={harmony.strength}
              />
            </React.Fragment>
          );
        })}

        {/* Planet Nodes */}
        {Array.from(planetPositions.entries()).map(([planet, position]) => (
          <React.Fragment key={`planet-${planet}`}>
            <Circle
              cx={position.x}
              cy={position.y}
              r={20}
              fill={getPlanetColor(planet)}
              stroke="#fff"
              strokeWidth="2"
            />
            <SvgText
              x={position.x}
              y={position.y}
              fontSize="12"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#fff"
            >
              {planet}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    );
  };

  const renderHarmonyDetails = () => {
    if (!selectedHarmony) return null;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.detailsTitle}>
          {selectedHarmony.planets.join(' - ')} Relationship
        </Text>
        <View style={[
          styles.relationshipIndicator,
          { backgroundColor: getRelationshipColor(selectedHarmony.relationship) }
        ]}>
          <Text style={styles.relationshipText}>
            {selectedHarmony.relationship.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.strengthText}>
          Strength: {Math.round(selectedHarmony.strength * 100)}%
        </Text>
        <View style={styles.effectsContainer}>
          {selectedHarmony.effects.map((effect, index) => (
            <Text key={index} style={styles.effectText}>• {effect}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetary Harmony Analysis</Text>
      <View style={styles.chartContainer}>
        {renderPlanetaryConnections()}
      </View>
      {renderHarmonyDetails()}
    </View>
  );
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
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  detailsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  relationshipIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  relationshipText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  strengthText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  effectsContainer: {
    marginTop: 8,
  },
  effectText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    lineHeight: 20,
  },
}); 