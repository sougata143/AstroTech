import { MantraDetails, YantraDetails } from './AdvancedMantrasAndYantras';

interface SpecializedPurpose {
  type: 'career' | 'relationship' | 'health' | 'spirituality' | 'wealth' | 'education';
  mantras: MantraDetails[];
  yantras: YantraDetails[];
  combinations: {
    planets: string[];
    effects: string[];
    timing: {
      muhurta: string[];
      weekDay: string[];
      nakshatra: string[];
    };
  }[];
  practices: {
    daily: string[];
    weekly: string[];
    monthly: string[];
    special: string[];
  };
}

export class SpecializedPurposeRemedies {
  private static readonly PURPOSE_REMEDIES: Record<string, SpecializedPurpose> = {
    career: {
      type: 'career',
      mantras: [
        {
          name: 'Career Success Mantra',
          type: 'beej',
          sanskrit: 'ॐ ह्रीं श्रीं क्लीं महालक्ष्म्यै नमः',
          transliteration: 'Om Hreem Shreem Kleem Mahalakshmyai Namaha',
          effects: [
            'Professional growth',
            'Leadership opportunities',
            'Career advancement',
            'Workplace harmony'
          ],
          timing: {
            muhurta: ['Abhijit', 'Brahma'],
            weekDay: ['Thursday', 'Sunday'],
            nakshatra: ['Pushya', 'Uttara Phalguni']
          }
        }
      ],
      yantras: [
        {
          name: 'Career Success Yantra',
          type: 'purpose',
          materials: ['Gold plate', 'Yellow cloth'],
          energization: {
            time: 'Thursday sunrise',
            duration: '48 minutes',
            mantras: ['Om Hreem Shreem Kleem']
          }
        }
      ],
      combinations: [
        {
          planets: ['Sun', 'Jupiter', 'Saturn'],
          effects: [
            'Professional authority',
            'Career stability',
            'Leadership success'
          ],
          timing: {
            muhurta: ['Abhijit'],
            weekDay: ['Thursday'],
            nakshatra: ['Pushya']
          }
        }
      ],
      practices: {
        daily: [
          'Morning Sun meditation',
          'Professional affirmations',
          'Yellow color visualization'
        ],
        weekly: [
          'Thursday special puja',
          'Career goal meditation'
        ],
        monthly: [
          'Full moon career ritual',
          'Monthly goal setting ceremony'
        ],
        special: [
          'Career transition ritual',
          'Promotion ceremony'
        ]
      }
    },
    relationship: {
      type: 'relationship',
      mantras: [
        {
          name: 'Relationship Harmony Mantra',
          type: 'stotram',
          sanskrit: 'ॐ श्रीं क्लीं सौः शुक्राय नमः',
          transliteration: 'Om Shreem Kleem Sauh Shukraya Namaha',
          effects: [
            'Relationship harmony',
            'Emotional balance',
            'Partnership success',
            'Love and understanding'
          ],
          timing: {
            muhurta: ['Vinda', 'Vijaya'],
            weekDay: ['Friday', 'Monday'],
            nakshatra: ['Rohini', 'Swati']
          }
        }
      ],
      yantras: [
        {
          name: 'Venus Harmony Yantra',
          type: 'purpose',
          materials: ['Silver plate', 'Pink cloth'],
          energization: {
            time: 'Friday sunrise',
            duration: '48 minutes',
            mantras: ['Om Shreem Kleem Sauh']
          }
        }
      ],
      combinations: [
        {
          planets: ['Venus', 'Moon', 'Jupiter'],
          effects: [
            'Emotional harmony',
            'Relationship success',
            'Partnership growth'
          ],
          timing: {
            muhurta: ['Vinda'],
            weekDay: ['Friday'],
            nakshatra: ['Rohini']
          }
        }
      ],
      practices: {
        daily: [
          'Love meditation',
          'Relationship affirmations',
          'Pink color visualization'
        ],
        weekly: [
          'Friday Venus puja',
          'Relationship healing ritual'
        ],
        monthly: [
          'Full moon love ritual',
          'Monthly relationship renewal'
        ],
        special: [
          'Partnership blessing ceremony',
          'Relationship healing ritual'
        ]
      }
    }
    // Add more specialized purposes...
  };

  static getRemediesForPurpose(
    purpose: string,
    planetaryPositions?: Array<{ planet: string; strength: number }>
  ): SpecializedPurpose | null {
    const remedies = this.PURPOSE_REMEDIES[purpose];
    if (!remedies) return null;

    if (!planetaryPositions) return remedies;

    // Customize remedies based on planetary positions
    return this.customizeRemedies(remedies, planetaryPositions);
  }

  private static customizeRemedies(
    remedies: SpecializedPurpose,
    planetaryPositions: Array<{ planet: string; strength: number }>
  ): SpecializedPurpose {
    // Prioritize mantras and practices based on planetary strengths
    const customizedRemedies = { ...remedies };
    
    // Sort combinations by planetary strength
    customizedRemedies.combinations.sort((a, b) => {
      const aStrength = this.calculateCombinationStrength(a.planets, planetaryPositions);
      const bStrength = this.calculateCombinationStrength(b.planets, planetaryPositions);
      return bStrength - aStrength;
    });

    return customizedRemedies;
  }

  private static calculateCombinationStrength(
    planets: string[],
    positions: Array<{ planet: string; strength: number }>
  ): number {
    return planets.reduce((total, planet) => {
      const position = positions.find(p => p.planet === planet);
      return total + (position?.strength || 0);
    }, 0) / planets.length;
  }

  static getCombinedRemedies(
    purposes: string[],
    planetaryPositions?: Array<{ planet: string; strength: number }>
  ): SpecializedPurpose[] {
    return purposes
      .map(purpose => this.getRemediesForPurpose(purpose, planetaryPositions))
      .filter((remedy): remedy is SpecializedPurpose => remedy !== null);
  }
} 