import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { HouseSignificance } from '../../services/interpretations/AdvancedHouseInterpretations';

interface Props {
  houseNumber: number;
  areaAnalysis: HouseSignificance['advancedSignifications'];
  planetaryInfluences: HouseSignificance['planetaryInfluences'];
  onAreaSelect?: (area: keyof HouseSignificance['advancedSignifications']) => void;
}

export default function SpecializedAreaVisualization({
  houseNumber,
  areaAnalysis,
  planetaryInfluences,
  onAreaSelect
}: Props) {
  const [selectedArea, setSelectedArea] = useState<keyof HouseSignificance['advancedSignifications'] | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 300);

  const handleAreaSelect = (area: keyof HouseSignificance['advancedSignifications']) => {
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

  const getAreaColor = (area: string): string => {
    const colors: Record<string, string> = {
      career: '#2196F3',
      relationships: '#E91E63',
      spirituality: '#9C27B0',
      health: '#4CAF50',
      wealth: '#FFC107'
    };
    return colors[area] || '#666666';
  };

  const renderAreaWheel = () => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const areas = Object.keys(areaAnalysis) as Array<keyof typeof areaAnalysis>;
    const anglePerArea = (2 * Math.PI) / areas.length;

    return (
      <Svg width={size} height={size}>
        <G transform={`translate(${centerX},${centerY})`}>
          {areas.map((area, index) => {
            const startAngle = index * anglePerArea;
            const endAngle = (index + 1) * anglePerArea;
            const isSelected = selectedArea === area;

            const path = describeArc(0, 0, radius, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius + 20;
            const labelX = labelRadius * Math.cos(midAngle);
            const labelY = labelRadius * Math.sin(midAngle);

            return (
              <G key={area}>
                <Path
                  d={path}
                  fill={getAreaColor(area)}
                  opacity={isSelected ? 1 : 0.7}
                  onPress={() => handleAreaSelect(area)}
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
                  {area.charAt(0).toUpperCase() + area.slice(1)}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderAreaDetails = () => {
    if (!selectedArea) return null;

    const significations = areaAnalysis[selectedArea];
    const relevantPlanets = Object.entries(planetaryInfluences)
      .filter(([_, influence]) => 
        influence.positive.some(effect => effect.toLowerCase().includes(selectedArea)) ||
        influence.negative.some(effect => effect.toLowerCase().includes(selectedArea))
      );

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.areaTitle}>
          {selectedArea.charAt(0).toUpperCase() + selectedArea.slice(1)} Analysis
        </Text>

        <View style={styles.significationsList}>
          <Text style={styles.sectionTitle}>Key Significations</Text>
          {significations.map((sig, index) => (
            <Text key={index} style={styles.significationText}>• {sig}</Text>
          ))}
        </View>

        <View style={styles.planetaryInfluences}>
          <Text style={styles.sectionTitle}>Planetary Influences</Text>
          {relevantPlanets.map(([planet, influence]) => (
            <View key={planet} style={styles.planetCard}>
              <Text style={[styles.planetName, { color: getPlanetColor(planet) }]}>
                {planet}
              </Text>
              
              <View style={styles.effectsList}>
                {influence.positive
                  .filter(effect => effect.toLowerCase().includes(selectedArea))
                  .map((effect, index) => (
                    <Text key={`pos-${index}`} style={styles.positiveEffect}>
                      + {effect}
                    </Text>
                  ))
                }
                
                {influence.negative
                  .filter(effect => effect.toLowerCase().includes(selectedArea))
                  .map((effect, index) => (
                    <Text key={`neg-${index}`} style={styles.negativeEffect}>
                      - {effect}
                    </Text>
                  ))
                }
              </View>

              <View style={styles.remediesList}>
                {influence.remedies.map((remedy, index) => (
                  <Text key={index} style={styles.remedyText}>• {remedy}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>House {houseNumber} Area Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderAreaWheel()}
      </View>

      {renderAreaDetails()}
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

function getPlanetColor(planet: string): string {
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
  return colors[planet] || '#666666';
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
  areaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  significationsList: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  significationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  planetaryInfluences: {
    marginBottom: 24,
  },
  planetCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  effectsList: {
    marginBottom: 12,
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
  remediesList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 12,
  },
  remedyText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
}); 