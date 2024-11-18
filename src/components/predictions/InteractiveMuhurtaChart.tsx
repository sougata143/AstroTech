import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Svg, { Rect, Text as SvgText, Line, Circle } from 'react-native-svg';
import { format } from 'date-fns';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface MuhurtaTimings {
  start: Date;
  end: Date;
  quality: 'excellent' | 'good' | 'neutral' | 'inauspicious';
  suitableFor: string[];
  unsuitable: string[];
  planetaryLord: string;
  element: 'fire' | 'earth' | 'air' | 'water' | 'ether';
  effects: {
    spiritual: string[];
    material: string[];
    health: string[];
    relationships: string[];
  };
  specialPowers: string[];
  precautions: string[];
}

interface Props {
  muhurtas: MuhurtaTimings[];
  selectedDate: Date;
  onMuhurtaSelect?: (muhurta: MuhurtaTimings) => void;
  interactive?: boolean;
}

interface MuhurtaDetailsProps {
  muhurta: MuhurtaTimings;
  visible: boolean;
  onClose: () => void;
}

const MuhurtaDetails = ({ muhurta, visible, onClose }: MuhurtaDetailsProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(visible ? 1 : 0) }],
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            {format(muhurta.start, 'HH:mm')} - {format(muhurta.end, 'HH:mm')}
          </Text>
          <Text style={styles.modalSubtitle}>
            Planetary Lord: {muhurta.planetaryLord} • Element: {muhurta.element}
          </Text>

          <ScrollView style={styles.modalScroll}>
            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Spiritual Effects</Text>
              {muhurta.effects.spiritual.map((effect, index) => (
                <Text key={`spiritual-${index}`} style={styles.effectText}>• {effect}</Text>
              ))}
            </View>

            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Material Effects</Text>
              {muhurta.effects.material.map((effect, index) => (
                <Text key={`material-${index}`} style={styles.effectText}>• {effect}</Text>
              ))}
            </View>

            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Health Effects</Text>
              {muhurta.effects.health.map((effect, index) => (
                <Text key={`health-${index}`} style={styles.effectText}>• {effect}</Text>
              ))}
            </View>

            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Relationship Effects</Text>
              {muhurta.effects.relationships.map((effect, index) => (
                <Text key={`relationship-${index}`} style={styles.effectText}>• {effect}</Text>
              ))}
            </View>

            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Special Powers</Text>
              {muhurta.specialPowers.map((power, index) => (
                <Text key={`power-${index}`} style={styles.powerText}>• {power}</Text>
              ))}
            </View>

            <View style={styles.effectsSection}>
              <Text style={styles.sectionTitle}>Precautions</Text>
              {muhurta.precautions.map((precaution, index) => (
                <Text key={`precaution-${index}`} style={styles.precautionText}>• {precaution}</Text>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function InteractiveMuhurtaChart({ muhurtas, selectedDate, onMuhurtaSelect, interactive = true }: Props) {
  const [selectedMuhurta, setSelectedMuhurta] = useState<MuhurtaTimings | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 32;
  const chartHeight = 200;
  const hourWidth = chartWidth / 24;

  const handleMuhurtaPress = (muhurta: MuhurtaTimings) => {
    setSelectedMuhurta(muhurta);
    setShowDetails(true);
    onMuhurtaSelect?.(muhurta);
  };

  // ... rest of the rendering logic from MuhurtaTimingChart

  return (
    <View style={styles.container}>
      {/* ... existing chart rendering ... */}
      
      {selectedMuhurta && (
        <MuhurtaDetails
          muhurta={selectedMuhurta}
          visible={showDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  modalScroll: {
    maxHeight: '90%',
  },
  effectsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  effectText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  powerText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2196F3',
  },
  precautionText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#F44336',
  },
}); 