import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Platform,
  Animated,
  Dimensions
} from 'react-native';
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

export default function AnimatedPlanetDetailsOverlay({ planet, interpretation, onClose }: Props) {
  const slideAnim = new Animated.Value(Dimensions.get('window').height);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const renderSection = (title: string, content: string) => (
    <Animated.View 
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        },
      ]}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </Animated.View>
  );

  return (
    <Modal
      transparent
      animationType="none"
      visible={true}
      onRequestClose={handleClose}
    >
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {Platform.OS === 'ios' && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={10}
          />
        )}
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <Animated.Text 
            style={[
              styles.planetName,
              {
                opacity: fadeAnim,
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                }],
              },
            ]}
          >
            {planet.planet}
          </Animated.Text>

          <ScrollView style={styles.scrollContent}>
            {renderSection('General', interpretation.interpretation.general)}
            {renderSection('Career', interpretation.interpretation.career)}
            {renderSection('Relationships', interpretation.interpretation.relationships)}
            {renderSection('Health', interpretation.interpretation.health)}
            {renderSection('Spirituality', interpretation.interpretation.spirituality)}

            <Animated.View 
              style={[
                styles.section,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  }],
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Aspects</Text>
              {planet.aspects.map((aspect, index) => (
                <Text key={index} style={styles.aspectText}>
                  {aspect.type} with {aspect.planet} ({aspect.angle}°)
                </Text>
              ))}
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// ... existing styles remain the same 