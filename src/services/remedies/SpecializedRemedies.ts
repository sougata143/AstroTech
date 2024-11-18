import { MantraDetails, YantraDetails } from './AdvancedMantrasAndYantras';

interface SpecializedMantra extends MantraDetails {
  purpose: string[];
  combinations: string[];
  planetaryCombinations: string[];
  powerTiming: {
    muhurta: string[];
    weekDay: string[];
    tithi: string[];
    nakshatra: string[];
  };
}

interface CombinationRemedy {
  name: string;
  planets: string[];
  mantras: SpecializedMantra[];
  yantras: YantraDetails[];
  ritual: {
    preparation: string[];
    mainProcedure: string[];
    conclusion: string[];
    duration: string;
    frequency: string;
  };
  materials: string[];
  benefits: string[];
  contraindications: string[];
}

export class SpecializedRemedies {
  private static readonly PURPOSE_SPECIFIC_MANTRAS: Record<string, SpecializedMantra[]> = {
    career: [
      {
        name: 'Career Success Mantra',
        type: 'stotram',
        sanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
        transliteration: 'Om Shreem Hreem Kleem Mahalakshmyai Namaha',
        meaning: 'Salutations to Mahalakshmi, the goddess of prosperity',
        deity: 'Mahalakshmi',
        purpose: ['Career growth', 'Professional success', 'Leadership'],
        combinations: ['Jupiter mantras', 'Sun mantras'],
        planetaryCombinations: ['Jupiter-Sun', 'Jupiter-Mercury'],
        effects: [
          'Enhanced professional opportunities',
          'Leadership development',
          'Career advancement',
          'Workplace harmony'
        ],
        procedure: {
          time: 'Thursday morning during Jupiter hora',
          direction: 'North',
          materials: [
            'Yellow flowers',
            'Gold ring',
            'Yellow cloth',
            'Ghee lamp'
          ],
          steps: [
            'Face North',
            'Light ghee lamp',
            'Offer yellow flowers',
            'Use gold ring',
            'Maintain focus on career goals'
          ],
          duration: '48 days',
          count: 108
        },
        powerTiming: {
          muhurta: ['Abhijit', 'Brahma'],
          weekDay: ['Thursday', 'Sunday'],
          tithi: ['Purnima', 'Dwadashi'],
          nakshatra: ['Pushya', 'Uttara Phalguni']
        },
        restrictions: [
          'Maintain work ethics',
          'Avoid negative thoughts about colleagues',
          'Practice regularly'
        ],
        benefits: [
          'Professional growth',
          'Better job opportunities',
          'Workplace recognition',
          'Leadership qualities'
        ]
      }
    ],
    relationships: [
      {
        name: 'Relationship Harmony Mantra',
        type: 'kavach',
        sanskrit: 'ॐ क्लीं विद्महे कामदेवाय धीमहि तन्नोऽनङ्गः प्रचोदयात्',
        transliteration: 'Om Kleem Vidmahe Kamadevaya Dhimahi Tanno Anangah Prachodayat',
        meaning: 'We meditate on Kamadeva, may Ananga inspire us',
        deity: 'Kamadeva',
        purpose: ['Relationship harmony', 'Marriage', 'Love'],
        combinations: ['Venus mantras', 'Moon mantras'],
        planetaryCombinations: ['Venus-Moon', 'Venus-Jupiter'],
        effects: [
          'Relationship improvement',
          'Emotional harmony',
          'Better understanding',
          'Love and romance'
        ],
        procedure: {
          time: 'Friday sunrise',
          direction: 'Southeast',
          materials: [
            'Red flowers',
            'Rose water',
            'White cloth',
            'Copper vessel'
          ],
          steps: [
            'Bathe before sunrise',
            'Wear clean white clothes',
            'Offer red flowers',
            'Use copper vessel',
            'Maintain pure thoughts'
          ],
          duration: '21 days',
          count: 108
        },
        powerTiming: {
          muhurta: ['Brahma', 'Vinda'],
          weekDay: ['Friday', 'Monday'],
          tithi: ['Panchami', 'Purnima'],
          nakshatra: ['Rohini', 'Swati']
        },
        restrictions: [
          'Maintain celibacy during practice',
          'Avoid negative relationships',
          'Practice with pure intentions'
        ],
        benefits: [
          'Improved relationships',
          'Better understanding',
          'Emotional balance',
          'Harmonious partnerships'
        ]
      }
    ]
  };

  private static readonly PLANETARY_COMBINATIONS: Record<string, CombinationRemedy> = {
    'Jupiter-Sun': {
      name: 'Leadership Enhancement Remedy',
      planets: ['Jupiter', 'Sun'],
      mantras: [
        // Include specialized mantras for this combination
      ],
      yantras: [
        // Include specific yantras
      ],
      ritual: {
        preparation: [
          'Fast on Thursday',
          'Wake up before sunrise',
          'Take ritual bath'
        ],
        mainProcedure: [
          'Install both yantras',
          'Perform abhishekam',
          'Recite combined mantras'
        ],
        conclusion: [
          'Offer yellow flowers',
          'Perform aarti',
          'Distribute prasad'
        ],
        duration: '48 days',
        frequency: 'Daily during sunrise'
      },
      materials: [
        'Gold yantra',
        'Yellow sapphire',
        'Ruby',
        'Yellow cloth'
      ],
      benefits: [
        'Enhanced leadership qualities',
        'Professional growth',
        'Authority',
        'Recognition'
      ],
      contraindications: [
        'Not during solar eclipse',
        'Avoid if mentally unstable',
        'Not during severe illness'
      ]
    }
  };

  static getRemedyForPurpose(
    purpose: string,
    planetaryPositions?: { planet: string; strength: number }[]
  ): SpecializedMantra[] {
    const mantras = this.PURPOSE_SPECIFIC_MANTRAS[purpose] || [];
    
    if (!planetaryPositions) return mantras;

    // Prioritize mantras based on planetary positions
    return mantras.sort((a, b) => {
      const aStrength = this.calculateMantraStrength(a, planetaryPositions);
      const bStrength = this.calculateMantraStrength(b, planetaryPositions);
      return bStrength - aStrength;
    });
  }

  static getCombinationRemedy(
    planets: string[],
    purpose?: string
  ): CombinationRemedy | null {
    const combinationKey = planets.sort().join('-');
    const remedy = this.PLANETARY_COMBINATIONS[combinationKey];

    if (!remedy || (purpose && !remedy.benefits.some(b => b.toLowerCase().includes(purpose.toLowerCase())))) {
      return null;
    }

    return remedy;
  }

  private static calculateMantraStrength(
    mantra: SpecializedMantra,
    planetaryPositions: { planet: string; strength: number }[]
  ): number {
    let strength = 1;

    // Check planetary combinations
    mantra.planetaryCombinations.forEach(combo => {
      const planets = combo.split('-');
      const positions = planets.map(p => 
        planetaryPositions.find(pos => pos.planet === p)?.strength || 0
      );
      strength *= positions.reduce((acc, curr) => acc * curr, 1);
    });

    return strength;
  }
} 