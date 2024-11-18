import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { useChartAnimations } from '../../hooks/useChartAnimations';

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  subPeriods: DashaPeriod[];
  effects: {
    areas: string[];
    positive: string[];
    negative: string[];
  };
  strength: number;
}

interface Props {
  dashaPeriods: DashaPeriod[];
  onPeriodSelect?: (period: DashaPeriod) => void;
}

export default function DashaPeriodVisualization({ dashaPeriods, onPeriodSelect }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<DashaPeriod | null>(null);
  const { animate, getAnimatedStyle } = useChartAnimations();
  const [fadeAnim] = useState(new Animated.Value(1));

  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 32, 400);
  const center = size / 2;
  const radius = (size - 40) / 2;

  const handlePeriodSelect = (period: DashaPeriod) => {
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

    setSelectedPeriod(period);
    onPeriodSelect?.(period);
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
    return colors[planet] || '#666666';
  };

  const renderDashaWheel = () => {
    const totalDuration = dashaPeriods.reduce(
      (total, period) => total + (period.endDate.getTime() - period.startDate.getTime()),
      0
    );
    let currentAngle = 0;

    return (
      <Svg width={size} height={size}>
        <G transform={`translate(${center},${center})`}>
          {dashaPeriods.map((period, index) => {
            const duration = period.endDate.getTime() - period.startDate.getTime();
            const sweepAngle = (duration / totalDuration) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sweepAngle;
            const isSelected = selectedPeriod === period;

            const path = describeArc(0, 0, radius, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius + 20;
            const labelX = labelRadius * Math.cos(midAngle * Math.PI / 180);
            const labelY = labelRadius * Math.sin(midAngle * Math.PI / 180);

            currentAngle = endAngle;

            return (
              <G key={`${period.planet}-${index}`}>
                <Path
                  d={path}
                  fill={getPlanetColor(period.planet)}
                  opacity={isSelected ? 1 : 0.7}
                  onPress={() => handlePeriodSelect(period)}
                />
                <SvgText
                  x={labelX}
                  y={labelY}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                  transform={`rotate(${midAngle}, ${labelX}, ${labelY})`}
                >
                  {period.planet}
                </SvgText>
                <SvgText
                  x={radius * 0.7 * Math.cos(midAngle * Math.PI / 180)}
                  y={radius * 0.7 * Math.sin(midAngle * Math.PI / 180)}
                  fontSize="10"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#fff"
                >
                  {Math.round(period.strength * 100)}%
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderSubPeriods = () => {
    if (!selectedPeriod?.subPeriods?.length) return null;

    return (
      <View style={styles.subPeriodsContainer}>
        <Text style={styles.sectionTitle}>Sub Periods</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectedPeriod.subPeriods.map((subPeriod, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.subPeriodCard,
                { borderColor: getPlanetColor(subPeriod.planet) }
              ]}
              onPress={() => handlePeriodSelect(subPeriod)}
            >
              <Text style={styles.planetName}>{subPeriod.planet}</Text>
              <Text style={styles.dateRange}>
                {subPeriod.startDate.toLocaleDateString()} -
                {'\n'}
                {subPeriod.endDate.toLocaleDateString()}
              </Text>
              <View style={styles.strengthIndicator}>
                <View 
                  style={[
                    styles.strengthBar,
                    { 
                      width: `${subPeriod.strength * 100}%`,
                      backgroundColor: getPlanetColor(subPeriod.planet)
                    }
                  ]} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderPeriodDetails = () => {
    if (!selectedPeriod) return null;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.periodTitle}>
          {selectedPeriod.planet} Period
        </Text>
        <Text style={styles.dateRange}>
          {selectedPeriod.startDate.toLocaleDateString()} - {selectedPeriod.endDate.toLocaleDateString()}
        </Text>

        <View style={styles.areasContainer}>
          <Text style={styles.sectionTitle}>Life Areas Affected</Text>
          <View style={styles.areasGrid}>
            {selectedPeriod.effects.areas.map((area, index) => (
              <View key={index} style={styles.areaTag}>
                <Text style={styles.areaText}>{area}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.effectsContainer}>
          <Text style={styles.sectionTitle}>Effects</Text>
          <View style={styles.effectsSection}>
            <Text style={styles.subsectionTitle}>Positive</Text>
            {selectedPeriod.effects.positive.map((effect, index) => (
              <Text key={index} style={styles.positiveEffect}>• {effect}</Text>
            ))}
          </View>
          <View style={styles.effectsSection}>
            <Text style={styles.subsectionTitle}>Challenges</Text>
            {selectedPeriod.effects.negative.map((effect, index) => (
              <Text key={index} style={styles.negativeEffect}>• {effect}</Text>
            ))}
          </View>
        </View>

        {renderSubPeriods()}
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Planetary Periods (Dashas)</Text>
      
      <View style={styles.wheelContainer}>
        {renderDashaWheel()}
      </View>

      {renderPeriodDetails()}
    </ScrollView>
  );
}

// Helper function for SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', x, y,
    'Z'
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
  periodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateRange: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  areasContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  areasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  areaTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  areaText: {
    fontSize: 14,
    color: '#1976d2',
  },
  effectsContainer: {
    marginBottom: 16,
  },
  effectsSection: {
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
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
  subPeriodsContainer: {
    marginTop: 16,
  },
  subPeriodCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    borderWidth: 2,
    width: 150,
  },
  planetName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  strengthIndicator: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginTop: 8,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
}); 