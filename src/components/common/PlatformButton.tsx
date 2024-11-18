import React from 'react';
import { 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Platform, 
  View, 
  Text, 
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function PlatformButton({ 
  onPress, 
  title, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  icon
}: Props) {
  const Touchable = Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity
  });

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    Platform.select({
      web: styles.webButton,
      ios: styles.iosButton,
      android: styles.androidButton
    }),
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    Platform.select({
      web: styles.webText,
      ios: styles.iosText,
      android: styles.androidText
    }),
    textStyle
  ];

  const content = (
    <View style={buttonStyles}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={textStyles}>{title}</Text>
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        background={TouchableNativeFeedback.Ripple('#00000020', false)}
      >
        {content}
      </Touchable>
    );
  }

  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      style={buttonStyles}
    >
      {content}
    </Touchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2196F3',
  },
  secondary: {
    backgroundColor: '#9E9E9E',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 80,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 120,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 160,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#2196F3',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: '#999',
  },
  iconContainer: {
    marginRight: 8,
  },
  // Platform-specific styles
  webButton: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  iosButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  androidButton: {
    elevation: 3,
  },
  webText: {
    userSelect: 'none',
  },
  iosText: {
    fontFamily: 'System',
  },
  androidText: {
    fontFamily: 'Roboto',
  },
}); 