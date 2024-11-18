import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText, Path, G } from 'react-native-svg';
import { PlanetaryHarmony } from '../../services/matching/ExtendedKutaCalculator';
import { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  relationships: PlanetaryHarmony[];
  onRelationshipSelect?: (relationship: PlanetaryHarmony) => void;
}

interface TooltipInfo {
  x: number;
  y: number;
  relationship: PlanetaryHarmony;
}

export default function PlanetaryRelationshipChart({ relationships, onRelationshipSelect }: Props) {
  const [selectedRelationship, setSelectedRelationship] = useState<PlanetaryHarmony | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const scale = useSharedValue(1);

  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 400);
  const center = size / 2;
  const radius = (size - 80) / 2;

  const getPlanetColor = (planet: string): string => {
    const colors = {
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
    return colors[planet as keyof typeof colors] || '#000000';
  };

  const getRelationshipColor = (relationship: string): string => {
    switch (relationship) {
      case 'friend': return '#4CAF50';
      case 'neutral': return '#FFC107';
      case 'enemy': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const handleRelationshipPress = (relationship: PlanetaryHarmony, x: number, y: number) => {
    setSelectedRelationship(relationship);
    setTooltipInfo({ x, y, relationship });
    onRelationshipSelect?.(relationship);

    // Animate selection
    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
    });

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderRelationshipLines = () => {
    const uniquePlanets = Array.from(
      new Set(relationships.flatMap(r => r.planets))
    );
    const planetPositions = new Map(
      uniquePlanets.map((planet, index) => {
        const angle = (index * 2 * Math.PI) / uniquePlanets.length;
        return [
          planet,
          {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
          },
        ]
      })
    );

    return (
      <G>
        {relationships.map((rel, index) => {
          const start = planetPositions.get(rel.planets[0]);
          const end = planetPositions.get(rel.planets[1]);
          if (!start || !end) return null;

          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          const isSelected = selectedRelationship === rel;

          return (
            <G key={`relationship-${index}`}>
              <Line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={getRelationshipColor(rel.relationship)}
                strokeWidth={isSelected ? '3' : '1.5'}
                opacity={isSelected ? 1 : 0.6}
                onPress={() => handleRelationshipPress(rel, midX, midY)}
              />
              <Circle
                cx={midX}
                cy={midY}
                r={5}
                fill={getRelationshipColor(rel.relationship)}
                opacity={rel.strength}
                onPress={() => handleRelationshipPress(rel, midX, midY)}
              />
            </G>
          );
        })}
      </G>
    );
  };

  const renderPlanets = () => {
    const uniquePlanets = Array.from(
      new Set(relationships.flatMap(r => r.planets))
    );

    return uniquePlanets.map((planet, index) => {
      const angle = (index * 2 * Math.PI) / uniquePlanets.length;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      return (
        <G key={`planet-${planet}`}>
          <Circle
            cx={x}
            cy={y}
            r={20}
            fill={getPlanetColor(planet)}
            stroke="#fff"
            strokeWidth="2"
          />
          <SvgText
            x={x}
            y={y}
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#fff"
          >
            {planet}
          </SvgText>
        </G>
      );
    });
  };

  const renderTooltip = () => {
    if (!tooltipInfo) return null;

    return (
      <G>
        <Path
          d={`M ${tooltipInfo.x} ${tooltipInfo.y - 10} 
             l -10 -10 h -80 v -60 h 160 v 60 h -80 z`}
          fill="#fff"
          stroke="#000"
          strokeWidth="1"
        />
        <SvgText
          x={tooltipInfo.x}
          y={tooltipInfo.y - 50}
          fontSize="12"
          textAnchor="middle"
        >
          {`${tooltipInfo.relationship.planets.join(' - ')}`}
        </SvgText>
        <SvgText
          x={tooltipInfo.x}
          y={tooltipInfo.y - 35}
          fontSize="12"
          textAnchor="middle"
          fill={getRelationshipColor(tooltipInfo.relationship.relationship)}
        >
          {tooltipInfo.relationship.relationship.toUpperCase()}
        </SvgText>
        <SvgText
          x={tooltipInfo.x}
          y={tooltipInfo.y - 20}
          fontSize="12"
          textAnchor="middle"
        >
          {`Strength: ${Math.round(tooltipInfo.relationship.strength * 100)}%`}
        </SvgText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetary Relationships</Text>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {renderRelationshipLines()}
        {renderPlanets()}
        {renderTooltip()}
      </Svg>
      {selectedRelationship && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            {selectedRelationship.planets.join(' - ')} Relationship
          </Text>
          <View style={styles.effectsContainer}>
            {selectedRelationship.effects.map((effect, index) => (
              <Text key={index} style={styles.effectText}>• {effect}</Text>
            ))}
          </View>
        </View>
      )}
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