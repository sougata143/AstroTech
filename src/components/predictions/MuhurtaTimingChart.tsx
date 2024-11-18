import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
import { format } from 'date-fns';

interface MuhurtaTimings {
  start: Date;
  end: Date;
  quality: 'excellent' | 'good' | 'neutral' | 'inauspicious';
  suitableFor: string[];
  unsuitable: string[];
  planetaryLord: string;
  element: 'fire' | 'earth' | 'air' | 'water' | 'ether';
}

interface Props {
  muhurtas: MuhurtaTimings[];
  selectedDate: Date;
  onMuhurtaSelect?: (muhurta: MuhurtaTimings) => void;
}

export default function MuhurtaTimingChart({ muhurtas, selectedDate, onMuhurtaSelect }: Props) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 32;
  const chartHeight = 200;
  const hourWidth = chartWidth / 24; // 24 hours in a day

  const getQualityColor = (quality: MuhurtaTimings['quality']): string => {
    const colors = {
      excellent: '#4CAF50',
      good: '#8BC34A',
      neutral: '#FFC107',
      inauspicious: '#F44336'
    };
    return colors[quality];
  };

  const getElementSymbol = (element: MuhurtaTimings['element']): string => {
    const symbols = {
      fire: '🔥',
      earth: '🌍',
      air: '💨',
      water: '💧',
      ether: '✨'
    };
    return symbols[element];
  };

  const getTimePosition = (time: Date): number => {
    const hours = time.getHours() + time.getMinutes() / 60;
    return hours * hourWidth;
  };

  const renderTimeAxis = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (
      <>
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <Line
              x1={hour * hourWidth}
              y1={0}
              x2={hour * hourWidth}
              y2={10}
              stroke="#666"
              strokeWidth="1"
            />
            <SvgText
              x={hour * hourWidth}
              y={20}
              fontSize="10"
              textAnchor="middle"
              fill="#666"
            >
              {`${hour}:00`}
            </SvgText>
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderMuhurtaBlocks = () => {
    return muhurtas.map((muhurta, index) => {
      const startX = getTimePosition(muhurta.start);
      const endX = getTimePosition(muhurta.end);
      const width = endX - startX;

      return (
        <React.Fragment key={index}>
          <Rect
            x={startX}
            y={30}
            width={width}
            height={100}
            fill={getQualityColor(muhurta.quality)}
            opacity={0.7}
            onPress={() => onMuhurtaSelect?.(muhurta)}
          />
          <SvgText
            x={startX + width / 2}
            y={70}
            fontSize="12"
            textAnchor="middle"
            fill="#000"
          >
            {getElementSymbol(muhurta.element)}
          </SvgText>
          <SvgText
            x={startX + width / 2}
            y={90}
            fontSize="10"
            textAnchor="middle"
            fill="#000"
          >
            {muhurta.planetaryLord}
          </SvgText>
        </React.Fragment>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Muhurta Chart for {format(selectedDate, 'dd MMM yyyy')}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <Svg width={chartWidth} height={chartHeight}>
            {renderTimeAxis()}
            {renderMuhurtaBlocks()}
          </Svg>
        </View>
      </ScrollView>
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Quality Legend:</Text>
        <View style={styles.legendItems}>
          {['excellent', 'good', 'neutral', 'inauspicious'].map(quality => (
            <View key={quality} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: getQualityColor(quality as MuhurtaTimings['quality']) }
                ]}
              />
              <Text style={styles.legendText}>
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.elementLegend}>
        <Text style={styles.legendTitle}>Elements:</Text>
        <View style={styles.legendItems}>
          {['fire', 'earth', 'air', 'water', 'ether'].map(element => (
            <View key={element} style={styles.legendItem}>
              <Text style={styles.elementSymbol}>
                {getElementSymbol(element as MuhurtaTimings['element'])}
              </Text>
              <Text style={styles.legendText}>
                {element.charAt(0).toUpperCase() + element.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    marginVertical: 16,
  },
  legendContainer: {
    marginTop: 16,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
  },
  elementLegend: {
    marginTop: 16,
  },
  elementSymbol: {
    fontSize: 16,
    marginRight: 4,
  },
}); 