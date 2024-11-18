import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  ScrollView 
} from 'react-native';
import Svg, { Path, Circle, Text as SvgText, G, Line } from 'react-native-svg';
import { 
  PinchGestureHandler, 
  RotationGestureHandler,
  PanGestureHandler,
  State,
  GestureHandlerRootView 
} from 'react-native-gesture-handler';
import { 
  useSharedValue, 
  useAnimatedGestureHandler, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate 
} from 'react-native-reanimated';
import { PlanetaryHarmony } from '../../services/matching/ExtendedKutaCalculator';

interface Props {
  relationship: PlanetaryHarmony;
  onClose: () => void;
  isVisible: boolean;
}

export default function DetailedRelationshipAnalysis({ relationship, onClose, isVisible }: Props) {
  const translateY = useSharedValue(Dimensions.get('window').height);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 300 });
      rotation.value = withSpring(0);
    } else {
      translateY.value = withSpring(Dimensions.get('window').height);
      scale.value = withSpring(0.8);
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible]);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
      const progress = interpolate(
        translateY.value,
        [0, 200],
        [1, 0.8],
        Extrapolate.CLAMP
      );
      scale.value = progress;
      opacity.value = progress;
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        translateY.value = withSpring(Dimensions.get('window').height);
        scale.value = withSpring(0.8);
        opacity.value = withTiming(0, { duration: 300 });
        onClose();
      } else {
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
        opacity.value = withTiming(1, { duration: 300 });
      }
    },
  });

  const renderRelationshipStrengthChart = () => {
    const size = 200;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 80;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="10"
        />
        <Path
          d={describeArc(
            centerX,
            centerY,
            radius,
            0,
            relationship.strength * 360
          )}
          stroke={getRelationshipColor(relationship.relationship)}
          strokeWidth="10"
          fill="none"
        />
        <SvgText
          x={centerX}
          y={centerY}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={getRelationshipColor(relationship.relationship)}
        >
          {Math.round(relationship.strength * 100)}%
        </SvgText>
      </Svg>
    );
  };

  const renderEffectsList = () => {
    return (
      <View style={styles.effectsContainer}>
        <Text style={styles.sectionTitle}>Effects</Text>
        {relationship.effects.map((effect, index) => (
          <View key={index} style={styles.effectItem}>
            <View 
              style={[
                styles.effectDot,
                { backgroundColor: getRelationshipColor(relationship.relationship) }
              ]} 
            />
            <Text style={styles.effectText}>{effect}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: translateY.value },
                { scale: scale.value }
              ],
              opacity: opacity.value
            }
          ]}
        >
          <View style={styles.handle} />
          
          <ScrollView style={styles.content}>
            <Text style={styles.title}>
              {relationship.planets[0]} - {relationship.planets[1]} Relationship
            </Text>

            <View style={styles.strengthSection}>
              {renderRelationshipStrengthChart()}
              <Text style={[
                styles.relationshipType,
                { color: getRelationshipColor(relationship.relationship) }
              ]}>
                {relationship.relationship.toUpperCase()}
              </Text>
            </View>

            {renderEffectsList()}

            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              {getRecommendations(relationship).map((rec, index) => (
                <Text key={index} style={styles.recommendationText}>• {rec}</Text>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const getRelationshipColor = (relationship: string): string => {
  switch (relationship) {
    case 'friend': return '#4CAF50';
    case 'neutral': return '#FFC107';
    case 'enemy': return '#F44336';
    default: return '#9E9E9E';
  }
};

const getRecommendations = (relationship: PlanetaryHarmony): string[] => {
  // Implement recommendation logic based on relationship type and strength
  return [];
};

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  strengthSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  relationshipType: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  effectsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  effectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  effectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  effectText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  recommendationsSection: {
    marginBottom: 20,
  },
  recommendationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
}); 