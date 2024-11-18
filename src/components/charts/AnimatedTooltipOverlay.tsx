import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import BlurView from '../common/BlurView.web';

interface TooltipContent {
  title: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
  recommendations?: string[];
}

interface Props {
  isVisible: boolean;
  content: TooltipContent;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function AnimatedTooltipOverlay({ isVisible, content, position, onClose }: Props) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const translateAnim = React.useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(translateAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.8,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(translateAnim, {
          toValue: 10,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const screenWidth = Dimensions.get('window').width;
  const tooltipWidth = Math.min(300, screenWidth - 40);
  const tooltipPosition = calculateTooltipPosition(position, tooltipWidth);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={3}
        />
        <Animated.View
          style={[
            styles.tooltipContainer,
            {
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              width: tooltipWidth,
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: translateAnim }
              ],
            },
          ]}
        >
          <View style={styles.tooltipArrow} />
          <View style={styles.tooltipContent}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.description}>{content.description}</Text>
            
            <View style={styles.detailsContainer}>
              {content.details.map((detail, index) => (
                <View key={index} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              ))}
            </View>

            {content.recommendations && (
              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommendations</Text>
                {content.recommendations.map((recommendation, index) => (
                  <Text key={index} style={styles.recommendationText}>
                    • {recommendation}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function calculateTooltipPosition(
  position: { x: number; y: number },
  tooltipWidth: number
): { x: number; y: number } {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  let x = position.x - tooltipWidth / 2;
  let y = position.y + 20; // Position below the touch point

  // Ensure tooltip stays within screen bounds
  if (x < 20) x = 20;
  if (x + tooltipWidth > screenWidth - 20) x = screenWidth - tooltipWidth - 20;
  if (y > screenHeight - 200) y = position.y - 150; // Show above if not enough space below

  return { x, y };
}

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tooltipArrow: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 8,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  tooltipContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
  },
  recommendationsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
}); 