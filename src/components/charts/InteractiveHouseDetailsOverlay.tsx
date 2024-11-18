import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Animated,
  Platform 
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { DetailedHousePlanetInterpretations } from '../../services/interpretations/DetailedHousePlanetInterpretations';

interface Props {
  house: number;
  planets: Array<{ planet: string; strength: number }>;
  isVisible: boolean;
  onClose: () => void;
}

export default function InteractiveHouseDetailsOverlay({
  house,
  planets,
  isVisible,
  onClose
}: Props) {
  const slideAnim = React.useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 11
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: Dimensions.get('window').height,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.8,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isVisible]);

  const analysis = DetailedHousePlanetInterpretations.getDetailedHouseAnalysis(house, planets);
  if (!analysis) return null;

  const renderSignificanceSection = () => (
    <Animated.View 
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [
            { 
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }
          ]
        }
      ]}
    >
      <Text style={styles.sectionTitle}>House Significations</Text>
      {analysis.significations.map((sig, index) => (
        <Text key={index} style={styles.significationText}>• {sig}</Text>
      ))}
    </Animated.View>
  );

  const renderPlanetaryInfluences = () => (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [
            { 
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }
          ]
        }
      ]}
    >
      <Text style={styles.sectionTitle}>Planetary Influences</Text>
      {analysis.planetaryInfluences.map((influence, index) => (
        <View key={index} style={styles.influenceCard}>
          <Text style={styles.planetName}>{influence.planet}</Text>
          <View style={styles.strengthBar}>
            <Animated.View 
              style={[
                styles.strengthFill,
                {
                  width: `${influence.strength * 100}%`,
                  backgroundColor: getPlanetColor(influence.planet)
                }
              ]}
            />
          </View>
          {influence.effects.map((effect, i) => (
            <Text key={i} style={styles.effectText}>• {effect}</Text>
          ))}
        </View>
      ))}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
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
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollContent}>
          {renderSignificanceSection()}
          {renderPlanetaryInfluences()}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
    paddingHorizontal: 16,
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
  scrollContent: {
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  significationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  influenceCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  planetName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 12,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  effectText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

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
  return colors[planet] || '#000000';
} 