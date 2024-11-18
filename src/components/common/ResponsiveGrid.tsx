import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { responsiveDimensions } from '../../styles/platformStyles';

interface Props {
  children: React.ReactNode;
  columns?: {
    small: number;
    medium: number;
    large: number;
  };
  spacing?: number;
  style?: any;
}

export default function ResponsiveGrid({ 
  children,
  columns = { small: 1, medium: 2, large: 3 },
  spacing = 16,
  style
}: Props) {
  const { isSmallScreen, isMediumScreen, isLargeScreen } = responsiveDimensions;

  const getColumnCount = () => {
    if (isSmallScreen) return columns.small;
    if (isMediumScreen) return columns.medium;
    return columns.large;
  };

  const columnCount = getColumnCount();
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, { margin: -spacing / 2 }, style]}>
      {Array.from({ length: Math.ceil(childrenArray.length / columnCount) }).map((_, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { margin: spacing / 2 }]}>
          {childrenArray.slice(rowIndex * columnCount, (rowIndex + 1) * columnCount).map((child, index) => (
            <View 
              key={index} 
              style={[
                styles.column, 
                { 
                  flex: 1 / columnCount,
                  padding: spacing / 2 
                }
              ]}
            >
              {child}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexGrow: 1,
    flexShrink: 0,
  },
}); 