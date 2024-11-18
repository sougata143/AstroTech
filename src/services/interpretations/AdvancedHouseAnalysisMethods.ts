import { CompleteHousePlanetInterpretations } from './CompleteHousePlanetInterpretations';

export class AdvancedHouseAnalysisMethods extends CompleteHousePlanetInterpretations {
  private static readonly STRENGTH_THRESHOLDS = {
    STRONG: 0.7,
    MODERATE: 0.4,
    WEAK: 0.2
  };

  private static readonly LORD_STRENGTH_EFFECTS = {
    strong: [
      'Natural expression of house significations',
      'Positive manifestation of house matters',
      'Beneficial results in related areas',
      'Enhanced ability to handle house affairs'
    ],
    moderate: [
      'Mixed results in house matters',
      'Periodic success in related areas',
      'Variable expression of house significations',
      'Need for conscious effort in house affairs'
    ],
    weak: [
      'Challenges in house matters',
      'Delayed or obstructed results',
      'Difficulty expressing house significations',
      'Need for remedial measures'
    ]
  };

  private static readonly LORD_RECOMMENDATIONS = {
    strong: [
      'Maintain current practices',
      'Capitalize on favorable periods',
      'Share benefits with others',
      'Plan long-term activities'
    ],
    moderate: [
      'Regular strengthening practices',
      'Balance different areas of life',
      'Moderate approach to activities',
      'Regular monitoring and adjustment'
    ],
    weak: [
      'Perform specific remedial measures',
      'Focus on foundational matters',
      'Seek guidance and support',
      'Gradual and systematic approach'
    ]
  };

  private static readonly DISPOSITOR_EFFECTS = {
    strong: [
      'Enhanced results through associated houses',
      'Support from authority figures',
      'Beneficial connections and networks',
      'Positive environmental factors'
    ],
    moderate: [
      'Variable support from environment',
      'Mixed results through connections',
      'Periodic assistance from others',
      'Fluctuating external factors'
    ],
    weak: [
      'Limited environmental support',
      'Challenges through associations',
      'Difficult relationship with authority',
      'Unfavorable external conditions'
    ]
  };

  private static readonly DISPOSITOR_RECOMMENDATIONS = {
    strong: [
      'Leverage beneficial connections',
      'Expand network and influence',
      'Take leadership roles',
      'Share knowledge and resources'
    ],
    moderate: [
      'Build stable relationships',
      'Maintain balanced approach',
      'Develop support systems',
      'Regular networking activities'
    ],
    weak: [
      'Focus on relationship building',
      'Improve communication skills',
      'Seek mentorship and guidance',
      'Develop self-reliance'
    ]
  };

  static getLordStrengthEffects(strength: number): string[] {
    const level = this.getStrengthLevel(strength);
    return this.LORD_STRENGTH_EFFECTS[level];
  }

  static getLordStrengthRecommendations(strength: number): string[] {
    const level = this.getStrengthLevel(strength);
    return this.LORD_RECOMMENDATIONS[level];
  }

  static getDispositorEffects(strength: number): string[] {
    const level = this.getStrengthLevel(strength);
    return this.DISPOSITOR_EFFECTS[level];
  }

  static getDispositorRecommendations(strength: number): string[] {
    const level = this.getStrengthLevel(strength);
    return this.DISPOSITOR_RECOMMENDATIONS[level];
  }

  static getTransitIntensity(planet: string): number {
    const transitFactors = {
      Jupiter: 0.9,
      Saturn: 0.85,
      Rahu: 0.8,
      Mars: 0.75,
      Sun: 0.7,
      Venus: 0.65,
      Mercury: 0.6,
      Moon: 0.55,
      Ketu: 0.5
    };
    return transitFactors[planet as keyof typeof transitFactors] || 0.5;
  }

  static getTransitRecommendations(
    transits: Array<{ planet: string; effect: string }>
  ): string[] {
    const recommendations: string[] = [];
    const beneficTransits = transits.filter(t => this.isBeneficEffect(t.effect));
    const maleficTransits = transits.filter(t => !this.isBeneficEffect(t.effect));

    if (beneficTransits.length > 0) {
      recommendations.push(
        'Capitalize on favorable planetary transits',
        'Initiate important activities during beneficial periods',
        'Strengthen positive influences through appropriate rituals'
      );
    }

    if (maleficTransits.length > 0) {
      recommendations.push(
        'Exercise caution during challenging transits',
        'Perform protective remedial measures',
        'Postpone major decisions during difficult periods'
      );
    }

    recommendations.push(...this.getSpecificTransitRecommendations(transits));
    return recommendations;
  }

  private static isBeneficEffect(effect: string): boolean {
    const beneficKeywords = [
      'positive', 'favorable', 'beneficial', 'success',
      'growth', 'opportunity', 'gain', 'improvement'
    ];
    return beneficKeywords.some(keyword => 
      effect.toLowerCase().includes(keyword)
    );
  }

  private static getSpecificTransitRecommendations(
    transits: Array<{ planet: string; effect: string }>
  ): string[] {
    const recommendations: string[] = [];
    
    transits.forEach(transit => {
      switch (transit.planet) {
        case 'Jupiter':
          recommendations.push(
            'Focus on expansion and growth opportunities',
            'Engage in spiritual and educational pursuits'
          );
          break;
        case 'Saturn':
          recommendations.push(
            'Focus on long-term planning and structure',
            'Practice patience and persistence'
          );
          break;
        case 'Mars':
          recommendations.push(
            'Channel energy into productive activities',
            'Exercise caution in conflicts and competitions'
          );
          break;
        case 'Venus':
          recommendations.push(
            'Focus on relationships and artistic pursuits',
            'Enhance harmony and beauty in environment'
          );
          break;
        case 'Mercury':
          recommendations.push(
            'Focus on communication and intellectual pursuits',
            'Enhance learning and analytical skills'
          );
          break;
        // Add cases for other planets
      }
    });

    return recommendations;
  }

  static analyzeHouseStrengthTrends(
    historicalStrengths: Array<{ date: Date; strength: number }>
  ): {
    trend: 'increasing' | 'decreasing' | 'stable';
    recommendations: string[];
  } {
    const recentStrengths = historicalStrengths
      .slice(-5)
      .map(h => h.strength);
    
    const trend = this.calculateTrend(recentStrengths);
    const recommendations = this.getTrendRecommendations(trend);

    return { trend, recommendations };
  }

  private static calculateTrend(
    strengths: number[]
  ): 'increasing' | 'decreasing' | 'stable' {
    if (strengths.length < 2) return 'stable';

    const changes = strengths
      .slice(1)
      .map((strength, index) => strength - strengths[index]);
    
    const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;

    if (averageChange > 0.1) return 'increasing';
    if (averageChange < -0.1) return 'decreasing';
    return 'stable';
  }

  private static getTrendRecommendations(
    trend: 'increasing' | 'decreasing' | 'stable'
  ): string[] {
    switch (trend) {
      case 'increasing':
        return [
          'Capitalize on growing strength',
          'Plan major initiatives',
          'Expand activities and influence',
          'Share benefits with others'
        ];
      case 'decreasing':
        return [
          'Implement protective measures',
          'Focus on stabilization',
          'Review and adjust practices',
          'Seek guidance and support'
        ];
      case 'stable':
        return [
          'Maintain current practices',
          'Fine-tune existing approaches',
          'Build on stable foundation',
          'Plan for long-term growth'
        ];
    }
  }
} 