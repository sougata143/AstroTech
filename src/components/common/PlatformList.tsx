import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  Animated
} from 'react-native';

interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onPress?: () => void;
}

interface Props {
  data: ListItem[];
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  separatorStyle?: ViewStyle;
  showSeparators?: boolean;
  animated?: boolean;
}

export default function PlatformList({
  data,
  style,
  itemStyle,
  titleStyle,
  subtitleStyle,
  separatorStyle,
  showSeparators = true,
  animated = true
}: Props) {
  const [hoveredId, setHoveredId] = React.useState<string | number | null>(null);
  const fadeAnims = React.useRef(
    data.map(() => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    if (animated) {
      Animated.stagger(50, 
        fadeAnims.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }, []);

  const renderItem = (item: ListItem, index: number) => {
    const isHovered = hoveredId === item.id;
    const Container = item.onPress ? TouchableOpacity : View;

    const itemContent = (
      <>
        {item.leftElement && (
          <View style={styles.leftElement}>
            {item.leftElement}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.title,
              titleStyle,
              Platform.select({
                web: isHovered && styles.hoveredTitle
              })
            ]}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]}>
              {item.subtitle}
            </Text>
          )}
        </View>
        {item.rightElement && (
          <View style={styles.rightElement}>
            {item.rightElement}
          </View>
        )}
      </>
    );

    const animatedStyle = animated ? {
      opacity: fadeAnims[index],
      transform: [{
        translateY: fadeAnims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })
      }]
    } : {};

    return (
      <React.Fragment key={item.id}>
        <Animated.View style={animatedStyle}>
          <Container
            style={[
              styles.item,
              itemStyle,
              Platform.select({
                web: isHovered && styles.hoveredItem
              })
            ]}
            onPress={item.onPress}
            onMouseEnter={Platform.OS === 'web' ? () => setHoveredId(item.id) : undefined}
            onMouseLeave={Platform.OS === 'web' ? () => setHoveredId(null) : undefined}
          >
            {itemContent}
          </Container>
        </Animated.View>
        {showSeparators && index < data.length - 1 && (
          <View style={[styles.separator, separatorStyle]} />
        )}
      </React.Fragment>
    );
  };

  return (
    <ScrollView
      style={[styles.container, style]}
      showsVerticalScrollIndicator={Platform.OS !== 'web'}
    >
      {data.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  hoveredItem: {
    backgroundColor: '#f8f9fa',
  },
  leftElement: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#333',
    ...Platform.select({
      web: {
        transition: 'color 0.2s ease',
      },
    }),
  },
  hoveredTitle: {
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rightElement: {
    marginLeft: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginLeft: 16,
  },
}); 