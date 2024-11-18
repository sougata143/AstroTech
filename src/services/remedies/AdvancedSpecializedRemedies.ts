import { SpecializedMantra, CombinationRemedy } from './SpecializedRemedies';

export class AdvancedSpecializedRemedies {
  private static readonly HEALTH_MANTRAS: Record<string, SpecializedMantra[]> = {
    general: [
      {
        name: 'Dhanvantari Mantra',
        type: 'stotram',
        sanskrit: 'ॐ नमो भगवते वासुदेवाय धन्वन्तरये अमृतकलश हस्ताय सर्वामयविनाशनाय त्रैलोक्यनाथाय श्री महाविष्णवे नमः',
        transliteration: 'Om Namo Bhagavate Vasudevaya Dhanvantraye Amritkalasha Hastaya Sarvamaya Vinashanaya Trailokyanathaya Sri Maha Vishnave Namaha',
        meaning: 'Salutations to Lord Dhanvantari, who holds the pot of nectar and removes all diseases',
        deity: 'Dhanvantari',
        purpose: ['Health', 'Healing', 'Longevity'],
        combinations: ['Sun mantras', 'Moon mantras'],
        planetaryCombinations: ['Sun-Jupiter', 'Moon-Jupiter'],
        effects: [
          'Overall health improvement',
          'Disease prevention',
          'Quick recovery',
          'Enhanced vitality'
        ],
        procedure: {
          time: 'Sunrise or during Abhijit muhurta',
          direction: 'East',
          materials: [
            'Copper vessel with water',
            'Tulsi leaves',
            'White flowers',
            'Ghee lamp'
          ],
          steps: [
            'Take ritual bath',
            'Face east',
            'Light ghee lamp',
            'Offer water with Tulsi',
            'Maintain pure thoughts'
          ],
          duration: '48 days',
          count: 108
        },
        powerTiming: {
          muhurta: ['Abhijit', 'Brahma'],
          weekDay: ['Sunday', 'Thursday'],
          tithi: ['Purnima', 'Ekadashi'],
          nakshatra: ['Pushya', 'Hasta']
        },
        restrictions: [
          'Follow sattvic diet',
          'Avoid negative thoughts',
          'Maintain cleanliness',
          'Practice regularly'
        ],
        benefits: [
          'Improved immunity',
          'Better digestion',
          'Enhanced energy levels',
          'Quick healing'
        ]
      }
    ],
    chronic: [
      {
        name: 'Mrityunjaya Mantra',
        type: 'beej',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
        transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityormukshiya Mamritat',
        meaning: 'We worship the three-eyed One (Lord Shiva) who is fragrant and who nourishes all beings',
        deity: 'Shiva',
        purpose: ['Chronic illness', 'Life-threatening conditions', 'Recovery'],
        combinations: ['Saturn mantras', 'Ketu mantras'],
        planetaryCombinations: ['Saturn-Mars', 'Ketu-Moon'],
        effects: [
          'Protection from serious illness',
          'Recovery from chronic conditions',
          'Life extension',
          'Healing energy'
        ],
        procedure: {
          time: 'Before sunrise or during Pradosh Kaal',
          direction: 'North',
          materials: [
            'Rudraksha mala',
            'Bilva leaves',
            'Vibhuti',
            'Copper vessel'
          ],
          steps: [
            'Apply vibhuti',
            'Use rudraksha mala',
            'Offer bilva leaves',
            'Maintain focus on healing'
          ],
          duration: '40 days',
          count: 108
        },
        powerTiming: {
          muhurta: ['Brahma', 'Rudra'],
          weekDay: ['Monday', 'Saturday'],
          tithi: ['Trayodashi', 'Amavasya'],
          nakshatra: ['Ardra', 'Mrigashira']
        },
        restrictions: [
          'Strict dietary regulations',
          'Complete celibacy',
          'Avoid tamasic foods',
          'Mental purity'
        ],
        benefits: [
          'Relief from chronic pain',
          'System purification',
          'Enhanced recovery',
          'Life force strengthening'
        ]
      }
    ]
  };

  private static readonly SPIRITUAL_MANTRAS: Record<string, SpecializedMantra[]> = {
    meditation: [
      {
        name: 'Gayatri Mantra',
        type: 'gayatri',
        sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
        transliteration: 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
        meaning: 'We meditate on the glory of the Creator who has created the Universe',
        deity: 'Savita',
        purpose: ['Spiritual enlightenment', 'Higher consciousness', 'Divine wisdom'],
        combinations: ['Sun mantras', 'Jupiter mantras'],
        planetaryCombinations: ['Sun-Jupiter', 'Jupiter-Venus'],
        effects: [
          'Enhanced consciousness',
          'Spiritual awakening',
          'Divine protection',
          'Mental purification'
        ],
        procedure: {
          time: 'Brahma muhurta (before sunrise)',
          direction: 'East',
          materials: [
            'Copper/brass vessel',
            'Pure water',
            'Sacred thread',
            'White flowers'
          ],
          steps: [
            'Early morning bath',
            'Wear clean clothes',
            'Face east',
            'Perform achamana',
            'Begin with pranayama'
          ],
          duration: '41 days',
          count: 108
        },
        powerTiming: {
          muhurta: ['Brahma', 'Abhijit'],
          weekDay: ['Sunday', 'Thursday'],
          tithi: ['Purnima', 'Ekadashi'],
          nakshatra: ['Pushya', 'Hasta']
        },
        restrictions: [
          'Complete celibacy',
          'Pure vegetarian diet',
          'No intoxicants',
          'Mental and physical purity'
        ],
        benefits: [
          'Higher consciousness',
          'Divine protection',
          'Enhanced intuition',
          'Spiritual progress'
        ]
      }
    ]
  };

  private static readonly ADVANCED_COMBINATIONS: Record<string, CombinationRemedy> = {
    'Sun-Jupiter-Venus': {
      name: 'Triple Power Success Remedy',
      planets: ['Sun', 'Jupiter', 'Venus'],
      mantras: [
        // Include specialized mantras
      ],
      yantras: [
        // Include specific yantras
      ],
      ritual: {
        preparation: [
          'Three-day fast',
          'Wake before sunrise',
          'Complete silence',
          'Pure thoughts'
        ],
        mainProcedure: [
          'Install all three yantras',
          'Perform trikaal sandhya',
          'Recite combined mantras',
          'Offer specific items'
        ],
        conclusion: [
          'Perform final oblations',
          'Distribute prasad',
          'Meditate on results'
        ],
        duration: '48 days',
        frequency: 'Three times daily'
      },
      materials: [
        'Gold, silver, and copper yantras',
        'Nine gemstones',
        'Specific herbs',
        'Sacred threads'
      ],
      benefits: [
        'Complete life transformation',
        'Extraordinary success',
        'Divine protection',
        'Wealth and prosperity'
      ],
      contraindications: [
        'Not during eclipses',
        'Avoid if mentally unstable',
        'Not during major illness',
        'Avoid during inauspicious times'
      ]
    }
  };

  static getHealthMantras(
    condition: string,
    planetaryPositions?: { planet: string; strength: number }[]
  ): SpecializedMantra[] {
    const mantras = this.HEALTH_MANTRAS[condition] || this.HEALTH_MANTRAS.general;
    if (!planetaryPositions) return mantras;

    return this.prioritizeMantras(mantras, planetaryPositions);
  }

  static getSpiritualMantras(
    purpose: string,
    planetaryPositions?: { planet: string; strength: number }[]
  ): SpecializedMantra[] {
    const mantras = this.SPIRITUAL_MANTRAS[purpose] || [];
    if (!planetaryPositions) return mantras;

    return this.prioritizeMantras(mantras, planetaryPositions);
  }

  static getAdvancedCombination(
    planets: string[],
    purpose?: string
  ): CombinationRemedy | null {
    const combinationKey = planets.sort().join('-');
    const remedy = this.ADVANCED_COMBINATIONS[combinationKey];

    if (!remedy || (purpose && !remedy.benefits.some(b => b.toLowerCase().includes(purpose.toLowerCase())))) {
      return null;
    }

    return remedy;
  }

  private static prioritizeMantras(
    mantras: SpecializedMantra[],
    planetaryPositions: { planet: string; strength: number }[]
  ): SpecializedMantra[] {
    return mantras.sort((a, b) => {
      const aStrength = this.calculateMantraStrength(a, planetaryPositions);
      const bStrength = this.calculateMantraStrength(b, planetaryPositions);
      return bStrength - aStrength;
    });
  }

  private static calculateMantraStrength(
    mantra: SpecializedMantra,
    planetaryPositions: { planet: string; strength: number }[]
  ): number {
    let strength = 1;

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