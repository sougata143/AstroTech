import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Chart: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToChart = () => {
    navigation.navigate('Chart');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AstroTech</Text>
        <Text style={styles.subtitle}>Your Personal Astrological Guide</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={navigateToChart}
        >
          <Text style={styles.menuItemTitle}>Birth Chart Analysis</Text>
          <Text style={styles.menuItemDescription}>
            View your detailed birth chart and planetary positions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemTitle}>Daily Predictions</Text>
          <Text style={styles.menuItemDescription}>
            Get personalized daily astrological insights
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemTitle}>Muhurta Finder</Text>
          <Text style={styles.menuItemDescription}>
            Find auspicious times for your activities
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemTitle}>Compatibility Analysis</Text>
          <Text style={styles.menuItemDescription}>
            Check relationship compatibility
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickAccess}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Today's Transit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Current Dasha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Remedies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Text style={styles.quickAccessText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a237e',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e8eaf6',
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  quickAccess: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
}); 