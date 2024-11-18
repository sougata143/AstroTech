import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, G } from 'react-native-svg';
import { RemedialMeasure } from '../../services/remedies/VedicRemedialMeasures';

interface Props {
  remedies: RemedialMeasure[];
  onRemedySelect?: (remedy: RemedialMeasure) => void;
  planetaryStrength?: number;
}

export default function RemedialMeasuresVisualization({ 
  remedies, 
  onRemedySelect,
  planetaryStrength = 0.5 
}: Props) {
  const [selectedRemedy, setSelectedRemedy] = useState<RemedialMeasure | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const getRemedyTypeColor = (type: string): string => {
    const colors = {
      gemstone: '#9C27B0',
      mantra: '#2196F3',
      ritual: '#4CAF50',
      charity: '#FF9800',
      fasting: '#795548',
      yantra: '#F44336'
    };
    return colors[type as keyof typeof colors] || '#000000';
  };

  const renderEffectivenessWheel = (effectiveness: number) => {
    const size = 120;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - effectiveness);

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={getEffectivenessColor(effectiveness)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${centerX} ${centerY})`}
        />
        <SvgText
          x={centerX}
          y={centerY}
          fontSize="14"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={getEffectivenessColor(effectiveness)}
        >
          {Math.round(effectiveness * 100)}%
        </SvgText>
      </Svg>
    );
  };

  const getEffectivenessColor = (effectiveness: number): string => {
    if (effectiveness >= 0.8) return '#4CAF50';
    if (effectiveness >= 0.6) return '#8BC34A';
    if (effectiveness >= 0.4) return '#FFC107';
    if (effectiveness >= 0.2) return '#FF9800';
    return '#F44336';
  };

  const renderRemedyCard = (remedy: RemedialMeasure) => {
    const isSelected = selectedRemedy?.type === remedy.type;
    const effectiveness = calculateEffectiveness(remedy);

    return (
      <TouchableOpacity
        style={[styles.remedyCard, isSelected && styles.selectedCard]}
        onPress={() => handleRemedySelect(remedy)}
      >
        <View style={styles.remedyHeader}>
          <View style={[styles.typeIndicator, { backgroundColor: getRemedyTypeColor(remedy.type) }]} />
          <Text style={styles.remedyType}>{remedy.type}</Text>
        </View>
        
        <View style={styles.effectivenessContainer}>
          {renderEffectivenessWheel(effectiveness)}
        </View>

        <Text style={styles.remedyDescription}>{remedy.description}</Text>
        
        <View style={styles.timingContainer}>
          <Text style={styles.timingLabel}>Best Time:</Text>
          <Text style={styles.timingText}>{remedy.timing.bestTime}</Text>
        </View>

        <View style={styles.benefitsContainer}>
          {remedy.benefits.slice(0, 2).map((benefit, index) => (
            <Text key={index} style={styles.benefitText}>• {benefit}</Text>
          ))}
          {remedy.benefits.length > 2 && (
            <Text style={styles.moreText}>+{remedy.benefits.length - 2} more</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleRemedySelect = (remedy: RemedialMeasure) => {
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

    setSelectedRemedy(remedy);
    onRemedySelect?.(remedy);
  };

  const calculateEffectiveness = (remedy: RemedialMeasure): number => {
    // Calculate effectiveness based on planetary strength and remedy type
    const baseEffectiveness = 0.7;
    const planetaryFactor = 1 - (planetaryStrength || 0.5);
    const typeEffectiveness = {
      gemstone: 0.9,
      mantra: 0.85,
      ritual: 0.8,
      charity: 0.75,
      fasting: 0.7,
      yantra: 0.8
    };

    return baseEffectiveness * 
      (1 + planetaryFactor) * 
      (typeEffectiveness[remedy.type as keyof typeof typeEffectiveness] || 0.7);
  };

  const renderDetailedView = () => {
    if (!selectedRemedy) return null;

    return (
      <Animated.View style={[styles.detailedView, { opacity: fadeAnim }]}>
        <Text style={styles.detailedTitle}>{selectedRemedy.description}</Text>
        
        <View style={styles.procedureContainer}>
          <Text style={styles.sectionTitle}>Procedure</Text>
          {selectedRemedy.procedure.map((step, index) => (
            <Text key={index} style={styles.procedureStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        <View style={styles.timingDetailsContainer}>
          <Text style={styles.sectionTitle}>Timing Details</Text>
          <Text style={styles.timingDetail}>Best Days: {selectedRemedy.timing.bestDays.join(', ')}</Text>
          <Text style={styles.timingDetail}>Duration: {selectedRemedy.timing.duration}</Text>
        </View>

        <View style={styles.precautionsContainer}>
          <Text style={styles.sectionTitle}>Precautions</Text>
          {selectedRemedy.precautions.map((precaution, index) => (
            <Text key={index} style={styles.precautionText}>• {precaution}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Remedial Measures</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.remedyCardsContainer}
      >
        {remedies.map((remedy, index) => (
          <View key={index} style={styles.cardWrapper}>
            {renderRemedyCard(remedy)}
          </View>
        ))}
      </ScrollView>

      {renderDetailedView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  remedyCardsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cardWrapper: {
    marginRight: 16,
    width: 280,
  },
  remedyCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  remedyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  remedyType: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  effectivenessContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  remedyDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  timingContainer: {
    marginBottom: 12,
  },
  timingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timingText: {
    fontSize: 14,
    color: '#444',
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  moreText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  detailedView: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  detailedTitle: {
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
  procedureContainer: {
    marginBottom: 16,
  },
  procedureStep: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  timingDetailsContainer: {
    marginBottom: 16,
  },
  timingDetail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  precautionsContainer: {
    marginBottom: 16,
  },
  precautionText: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 4,
  },
}); 