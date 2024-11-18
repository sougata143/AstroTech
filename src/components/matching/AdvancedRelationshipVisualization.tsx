import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, G, Line } from 'react-native-svg';
import { RelationshipStrength } from '../../services/calculations/AdvancedRelationshipCalculator';

interface Props {
  relationshipStrengths: {
    intellectual: RelationshipStrength;
    emotional: RelationshipStrength;
    spiritual: RelationshipStrength;
    physical: RelationshipStrength;
  };
  onAreaSelect?: (area: keyof typeof strengthColors) => void;
}

const strengthColors = {
  intellectual: '#2196F3', // Blue
  emotional: '#E91E63', // Pink
  spiritual: '#9C27B0', // Purple
  physical: '#4CAF50', // Green
};

export default function AdvancedRelationshipVisualization({ relationshipStrengths, onAreaSelect }: Props) {
  const [selectedArea, setSelectedArea] = useState<keyof typeof strengthColors | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const screenWidth = Dimensions.get('window').width;
  const size = Math.min(screenWidth - 40, 300);

  const handleAreaSelect = (area: keyof typeof strengthColors) => {
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

  const renderStrengthWheel = () => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const areas = Object.entries(relationshipStrengths);
    const anglePerArea = (2 * Math.PI) / areas.length;

    return (
      <Svg width={size} height={size}>
        <G transform={`translate(${centerX},${centerY})`}>
          {areas.map(([key, strength], index) => {
            const startAngle = index * anglePerArea;
            const endAngle = (index + 1) * anglePerArea;
            const path = describeArc(0, 0, radius, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const textRadius = radius + 25;
            const textX = textRadius * Math.cos(midAngle);
            const textY = textRadius * Math.sin(midAngle);

            return (
              <G key={key}>
                <Path
                  d={path}
                  fill={strengthColors[key as keyof typeof strengthColors]}
                  opacity={selectedArea === key ? 1 : 0.7}
                  onPress={() => handleAreaSelect(key as keyof typeof strengthColors)}
                />
                <SvgText
                  x={textX}
                  y={textY}
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                  transform={`rotate(${(midAngle * 180) / Math.PI - 90}, ${textX}, ${textY})`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </SvgText>
                <SvgText
                  x={0}
                  y={0}
                  fontSize="24"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#333"
                >
                  {Math.round(strength.score * 100)}%
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    );
  };

  const renderFactorDetails = (strength: RelationshipStrength) => {
    return (
      <View style={styles.factorsContainer}>
        <Text style={styles.factorsTitle}>Strength Factors</Text>
        {Object.entries(strength.factors).map(([factor, value]) => (
          <View key={factor} style={styles.factorRow}>
            <Text style={styles.factorName}>
              {factor.charAt(0).toUpperCase() + factor.slice(1)}:
            </Text>
            <View style={styles.factorBarContainer}>
              <View 
                style={[
                  styles.factorBar,
                  { width: `${value * 100}%`, backgroundColor: selectedArea ? strengthColors[selectedArea] : '#666' }
                ]} 
              />
            </View>
            <Text style={styles.factorValue}>{Math.round(value * 100)}%</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderDetails = () => {
    if (!selectedArea || !relationshipStrengths[selectedArea]) return null;

    const strength = relationshipStrengths[selectedArea];
    
    return (
      <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.detailsTitle, { color: strengthColors[selectedArea] }]}>
          {selectedArea.charAt(0).toUpperCase() + selectedArea.slice(1)} Compatibility
        </Text>
        
        {renderFactorDetails(strength)}

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          {strength.details.strengths.map((item, index) => (
            <Text key={index} style={styles.strengthText}>• {item}</Text>
          ))}
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          {strength.details.challenges.map((item, index) => (
            <Text key={index} style={styles.challengeText}>• {item}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced Compatibility Analysis</Text>
      
      <View style={styles.wheelContainer}>
        {renderStrengthWheel()}
      </View>

      {renderDetails()}
    </ScrollView>
  );
}

// Helper function for SVG arc path
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  factorsContainer: {
    marginBottom: 20,
  },
  factorsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  factorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  factorName: {
    width: 100,
    fontSize: 14,
  },
  factorBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  factorBar: {
    height: '100%',
    borderRadius: 4,
  },
  factorValue: {
    width: 40,
    fontSize: 12,
    textAlign: 'right',
  },
  detailsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
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