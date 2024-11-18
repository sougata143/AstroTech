import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

interface PlanetPosition {
  planet: string;
  longitude: number;
  house: number;
}

interface Props {
  planetaryPositions: PlanetPosition[];
}

const getPlanetColor = (planet: string): string => {
  const colors: Record<string, string> = {
    Sun: '#FFB74D',
    Moon: '#E0E0E0',
    Mars: '#EF5350',
    Rahu: '#90A4AE',
    Jupiter: '#FDD835',
    Saturn: '#616161',
    Mercury: '#66BB6A',
    Ketu: '#78909C',
    Venus: '#F06292',
  };
  return colors[planet] || '#000000';
};

export default function PlanetaryChart({ planetaryPositions }: Props) {
  const size = Math.min(Dimensions.get('window').width - 32, 300);
  const center = size / 2;
  const radius = (size - 40) / 2;

  const getPositionOnCircle = (degrees: number, offset: number = 0) => {
    const radian = (degrees - 90) * (Math.PI / 180);
    return {
      x: center + (radius - offset) * Math.cos(radian),
      y: center + (radius - offset) * Math.sin(radian),
    };
  };

  const generateHousePaths = () => {
    const paths = [];
    for (let i = 0; i < 12; i++) {
      const startAngle = i * 30;
      const start = getPositionOnCircle(startAngle);
      const end = getPositionOnCircle(startAngle + 30);
      paths.push(
        <Path
          key={`house-${i}`}
          d={`M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y} Z`}
          fill="none"
          stroke="#000"
          strokeWidth="1"
        />
      );
    }
    return paths;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetary Positions</Text>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {generateHousePaths()}
        {planetaryPositions.map((position, index) => {
          const pos = getPositionOnCircle(position.longitude, 20);
          return (
            <SvgText
              key={position.planet}
              x={pos.x}
              y={pos.y}
              fontSize="12"
              textAnchor="middle"
              fill={getPlanetColor(position.planet)}
            >
              {position.planet}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 