import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { devUtils } from '../../utils/development';
import { DEV_CONFIG } from '../../config/development';

export function DebugOverlay() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!DEV_CONFIG.showDebugOverlay) return;

    const listener = (message: string) => {
      setMessages(prev => [...prev, message].slice(-100)); // Keep last 100 messages
    };

    devUtils.addDebugListener(listener);
    return () => devUtils.removeDebugListener(listener);
  }, []);

  if (!DEV_CONFIG.showDebugOverlay || !isVisible) {
    return (
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.toggleButtonText}>Debug</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => setIsVisible(false)}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.message}>{message}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  message: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 2,
  },
}); 