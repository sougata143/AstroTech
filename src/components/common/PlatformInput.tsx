import React, { useState } from 'react';
import { 
  TextInput, 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Animated
} from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  multiline?: boolean;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function PlatformInput({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  type = 'text',
  multiline = false,
  maxLength,
  style,
  inputStyle,
  labelStyle,
  disabled = false,
  onFocus,
  onBlur
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnimation] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
    if (!value) {
      animateLabel(0);
    }
  };

  const animateLabel = (toValue: number) => {
    Animated.timing(labelAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    transform: [
      {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
      {
        scale: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
          disabled && styles.disabled,
          Platform.select({
            web: styles.webInput,
            ios: styles.iosInput,
            android: styles.androidInput,
          }),
          inputStyle,
        ]}
        secureTextEntry={type === 'password'}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        multiline={multiline}
        maxLength={maxLength}
        editable={!disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  label: {
    position: 'absolute',
    left: 12,
    top: 10,
    fontSize: 16,
    color: '#666',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  focused: {
    borderColor: '#2196F3',
  },
  error: {
    borderColor: '#f44336',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
  // Platform-specific styles
  webInput: {
    outline: 'none',
    ':hover': {
      borderColor: '#2196F3',
    },
  },
  iosInput: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  androidInput: {
    elevation: 1,
  },
}); 