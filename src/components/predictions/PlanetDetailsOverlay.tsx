import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { PlanetaryInterpretation } from '../../services/interpretations/PlanetaryInterpretations';

interface Props {
  planet: {
    planet: string;
    house: number;
    longitude: number;
    aspects: Array<{
      planet: string;
      type: string;
      angle: number;
    }>;
  };
  interpretation: PlanetaryInterpretation;
  onClose: () => void;
}

export default function PlanetDetailsOverlay({ planet, interpretation, onClose }: Props) {
  const renderSection = (title: string, content: string) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <Modal
      transparent
      animationType="fade"
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {Platform.OS === 'ios' && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={10}
          />
        )}
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <Text style={styles.planetName}>{planet.planet}</Text>
          <Text style={styles.position}>
            House {planet.house} • {Math.floor(planet.longitude)}°
          </Text>

          <ScrollView style={styles.scrollContent}>
            {renderSection('General', interpretation.interpretation.general)}
            {renderSection('Career', interpretation.interpretation.career)}
            {renderSection('Relationships', interpretation.interpretation.relationships)}
            {renderSection('Health', interpretation.interpretation.health)}
            {renderSection('Spirituality', interpretation.interpretation.spirituality)}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Aspects</Text>
              {planet.aspects.map((aspect, index) => (
                <Text key={index} style={styles.aspectText}>
                  {aspect.type} with {aspect.planet} ({aspect.angle}°)
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              {interpretation.recommendations.map((rec, index) => (
                <Text key={index} style={styles.recommendationText}>
                  • {rec}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#666',
  },
  planetName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    marginTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  aspectText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  recommendationText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
    paddingLeft: 8,
  },
}); 