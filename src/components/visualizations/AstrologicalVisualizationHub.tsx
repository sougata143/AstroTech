import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useChartAnimations } from '../../hooks/useChartAnimations';
import LagnaChartVisualization from '../charts/LagnaChartVisualization';
import DetailedPlanetaryAnalysisChart from '../charts/DetailedPlanetaryAnalysisChart';
import HouseInterpretationVisualization from '../charts/HouseInterpretationVisualization';
import PlanetaryHarmonyChart from '../matching/PlanetaryHarmonyChart';
import RelationshipCompatibilityAnalysis from '../matching/RelationshipCompatibilityAnalysis';
import DashaTimeline from '../predictions/DashaTimeline';
import MuhurtaTimingChart from '../predictions/MuhurtaTimingChart';
import AnimatedTooltipOverlay from '../charts/AnimatedTooltipOverlay';
import { AppData } from '../../types';

interface Props {
  data: AppData;
}

export default function AstrologicalVisualizationHub({ data }: Props) {
  const [activeVisualization, setActiveVisualization] = useState<VisualizationType>('lagna');
  const [tooltipContent, setTooltipContent] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { animate, getAnimatedStyle } = useChartAnimations();

  const visualizationComponents = {
    lagna: {
      component: LagnaChartVisualization,
      title: 'Birth Chart Analysis',
      data: data.lagnaChart
    },
    planetary: {
      component: DetailedPlanetaryAnalysisChart,
      title: 'Planetary Analysis',
      data: data.planetaryAnalysis
    },
    house: {
      component: HouseInterpretationVisualization,
      title: 'House Analysis',
      data: data.houseAnalysis
    },
    harmony: {
      component: PlanetaryHarmonyChart,
      title: 'Planetary Harmony',
      data: data.planetaryHarmonies
    },
    relationship: {
      component: RelationshipCompatibilityAnalysis,
      title: 'Relationship Analysis',
      data: data.relationshipAnalysis
    },
    dasha: {
      component: DashaTimeline,
      title: 'Dasha Periods',
      data: data.dashaTimeline
    },
    muhurta: {
      component: MuhurtaTimingChart,
      title: 'Auspicious Timings',
      data: data.muhurtaTimings
    }
  };

  const handleVisualizationChange = (type: VisualizationType) => {
    animate(false, { duration: 200 });
    setTimeout(() => {
      setActiveVisualization(type);
      animate(true, { duration: 300 });
    }, 200);
  };

  const handleElementPress = (content: any, position: { x: number; y: number }) => {
    setTooltipContent(content);
    setTooltipPosition(position);
  };

  const renderNavigationTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
    >
      {Object.entries(visualizationComponents).map(([key, { title }]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.tab,
            activeVisualization === key && styles.activeTab
          ]}
          onPress={() => handleVisualizationChange(key as VisualizationType)}
        >
          <Text style={[
            styles.tabText,
            activeVisualization === key && styles.activeTabText
          ]}>
            {title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const ActiveComponent = visualizationComponents[activeVisualization].component;
  const activeData = visualizationComponents[activeVisualization].data;

  return (
    <View style={styles.container}>
      {renderNavigationTabs()}
      
      <View style={styles.visualizationContainer}>
        <ActiveComponent
          {...activeData}
          onElementPress={handleElementPress}
          style={getAnimatedStyle()}
        />
      </View>

      <AnimatedTooltipOverlay
        isVisible={!!tooltipContent}
        content={tooltipContent}
        position={tooltipPosition}
        onClose={() => setTooltipContent(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  visualizationContainer: {
    flex: 1,
    padding: 16,
  },
}); 