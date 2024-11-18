interface MantraDetails {
  name: string;
  type: 'beej' | 'stotram' | 'kavach' | 'sukta' | 'gayatri';
  sanskrit: string;
  transliteration: string;
  meaning: string;
  deity: string;
  effects: string[];
  procedure: {
    time: string;
    direction: string;
    materials: string[];
    steps: string[];
    duration: string;
    count: number;
  };
  restrictions: string[];
  benefits: string[];
}

interface YantraDetails {
  name: string;
  type: 'planetary' | 'deity' | 'purpose' | 'protection';
  geometry: {
    base: string;
    layers: number;
    mainSymbol: string;
    surroundingSymbols: string[];
  };
  material: string[];
  energization: {
    time: string;
    mantras: string[];
    procedure: string[];
    duration: string;
  };
  placement: {
    direction: string;
    location: string;
    height: string;
  };
  benefits: string[];
  precautions: string[];
}

export class AdvancedMantrasAndYantras {
  private static readonly SPECIALIZED_MANTRAS: Record<string, MantraDetails[]> = {
    Saturn: [
      {
        name: 'Shani Maha Mantra',
        type: 'beej',
        sanskrit: 'ॐ शं शनैश्चराय नमः',
        transliteration: 'Om Sham Shanaishcharaya Namaha',
        meaning: 'Salutations to Saturn, the slow-moving one',
        deity: 'Shani Dev',
        effects: [
          'Removes obstacles caused by Saturn',
          'Provides protection during Sade Sati',
          'Brings stability in career',
          'Helps overcome chronic ailments'
        ],
        procedure: {
          time: 'Saturday before sunrise',
          direction: 'West',
          materials: [
            'Black sesame seeds',
            'Iron ring',
            'Black cloth',
            'Oil lamp'
          ],
          steps: [
            'Face west direction',
            'Light oil lamp with mustard oil',
            'Use black sesame seed mala',
            'Maintain silence during practice',
            'Offer black flowers after completion'
          ],
          duration: '40 days',
          count: 23000
        },
        restrictions: [
          'Avoid meat during practice period',
          'Maintain celibacy',
          'Avoid alcohol',
          'Don\'t practice during Amavasya'
        ],
        benefits: [
          'Protection from accidents',
          'Career stability',
          'Relief from chronic diseases',
          'Mental peace'
        ]
      },
      {
        name: 'Dasharatha Shani Stotra',
        type: 'stotram',
        sanskrit: 'कोणस्थ: पिंगलो बभ्रु: कृष्णो रौद्रोऽन्तको यम:',
        transliteration: 'Konastha Pingalo Babhru Krishna Raudro Antako Yamaha',
        meaning: 'Saturn who is angular, tawny, brown, dark, terrible, death-like',
        deity: 'Shani Dev',
        effects: [
          'Powerful protection during Saturn transit',
          'Removes fear of Saturn',
          'Brings success in legal matters',
          'Helps overcome depression'
        ],
        procedure: {
          time: 'Saturday evening',
          direction: 'West',
          materials: [
            'Black cloth',
            'Iron vessel',
            'Sesame oil lamp'
          ],
          steps: [
            'Recite on Saturday evening',
            'Offer black flowers',
            'Light sesame oil lamp',
            'Maintain complete focus'
          ],
          duration: '48 days',
          count: 108
        },
        restrictions: [
          'Don\'t recite after sunset',
          'Avoid sleeping during daytime',
          'Maintain purity of mind'
        ],
        benefits: [
          'Protection from evil eye',
          'Success in business',
          'Relief from debts',
          'Peace of mind'
        ]
      }
    ],
    Jupiter: [
      {
        name: 'Brihaspati Beej Mantra',
        type: 'beej',
        sanskrit: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
        transliteration: 'Om Graam Greem Graum Sah Gurave Namaha',
        meaning: 'Salutations to Jupiter, the divine teacher',
        deity: 'Brihaspati',
        effects: [
          'Enhances wisdom and intelligence',
          'Improves academic performance',
          'Brings success in education',
          'Develops spiritual knowledge'
        ],
        procedure: {
          time: 'Thursday morning during Brahma Muhurta',
          direction: 'North',
          materials: [
            'Yellow cloth',
            'Gold ring',
            'Yellow flowers',
            'Ghee lamp'
          ],
          steps: [
            'Face north direction',
            'Light ghee lamp',
            'Use yellow sandalwood mala',
            'Offer yellow flowers',
            'Maintain brahmacharya'
          ],
          duration: '45 days',
          count: 19000
        },
        restrictions: [
          'Avoid non-vegetarian food',
          'Maintain celibacy',
          'Don\'t practice during Rahu Kaal'
        ],
        benefits: [
          'Academic success',
          'Spiritual growth',
          'Better decision-making ability',
          'Enhanced teaching skills'
        ]
      }
    ]
  };

  private static readonly SPECIALIZED_YANTRAS: Record<string, YantraDetails[]> = {
    Saturn: [
      {
        name: 'Shani Yantra',
        type: 'planetary',
        geometry: {
          base: 'Square',
          layers: 9,
          mainSymbol: 'Eight-pointed star',
          surroundingSymbols: [
            'Crescent moon',
            'Saturn beej mantras',
            'Protective symbols'
          ]
        },
        material: [
          'Iron plate',
          'Black ink',
          'Saffron paste'
        ],
        energization: {
          time: 'Saturday during Saturn hora',
          mantras: [
            'Om Sham Shanaishcharaya Namaha',
            'Neelanjana Samabhasam'
          ],
          procedure: [
            'Clean yantra with Ganga water',
            'Apply saffron tilak',
            'Recite mantras 108 times',
            'Offer black flowers'
          ],
          duration: '48 minutes'
        },
        placement: {
          direction: 'West',
          location: 'Study room or office',
          height: '2 feet from ground'
        },
        benefits: [
          'Protection from Saturn\'s malefic effects',
          'Career stability',
          'Relief from chronic ailments',
          'Mental peace'
        ],
        precautions: [
          'Don\'t place on ground',
          'Keep away from impure places',
          'Regular worship needed',
          'Don\'t touch with impure hands'
        ]
      }
    ],
    Jupiter: [
      {
        name: 'Guru Yantra',
        type: 'planetary',
        geometry: {
          base: 'Triangle',
          layers: 12,
          mainSymbol: 'Hexagram',
          surroundingSymbols: [
            'Om symbol',
            'Jupiter beej mantras',
            'Wisdom symbols'
          ]
        },
        material: [
          'Gold plate',
          'Yellow sandalwood paste',
          'Saffron'
        ],
        energization: {
          time: 'Thursday during Jupiter hora',
          mantras: [
            'Om Graam Greem Graum Sah Gurave Namaha',
            'Devanam Cha Risheenam Cha'
          ],
          procedure: [
            'Purify with panchamrit',
            'Apply saffron paste',
            'Chant mantras 108 times',
            'Offer yellow flowers'
          ],
          duration: '48 minutes'
        },
        placement: {
          direction: 'North',
          location: 'Temple or study room',
          height: '3 feet from ground'
        },
        benefits: [
          'Enhanced wisdom',
          'Academic success',
          'Spiritual growth',
          'Financial prosperity'
        ],
        precautions: [
          'Keep in clean place',
          'Regular worship needed',
          'Don\'t place near feet',
          'Maintain sanctity'
        ]
      }
    ]
  };

  static getMantrasForPlanet(
    planet: string,
    purpose?: 'protection' | 'enhancement' | 'remedial'
  ): MantraDetails[] {
    const planetaryMantras = this.SPECIALIZED_MANTRAS[planet] || [];
    if (!purpose) return planetaryMantras;
    
    return planetaryMantras.filter(mantra => 
      mantra.effects.some(effect => 
        effect.toLowerCase().includes(purpose.toLowerCase())
      )
    );
  }

  static getYantrasForPlanet(
    planet: string,
    purpose?: 'protection' | 'enhancement' | 'remedial'
  ): YantraDetails[] {
    const planetaryYantras = this.SPECIALIZED_YANTRAS[planet] || [];
    if (!purpose) return planetaryYantras;
    
    return planetaryYantras.filter(yantra => 
      yantra.benefits.some(benefit => 
        benefit.toLowerCase().includes(purpose.toLowerCase())
      )
    );
  }

  static getRemedialPractices(
    planet: string,
    intensity: 'mild' | 'moderate' | 'severe'
  ): Array<MantraDetails | YantraDetails> {
    const mantras = this.getMantrasForPlanet(planet, 'remedial');
    const yantras = this.getYantrasForPlanet(planet, 'remedial');
    
    switch (intensity) {
      case 'mild':
        return [...mantras.slice(0, 1), ...yantras.slice(0, 1)];
      case 'moderate':
        return [...mantras.slice(0, 2), ...yantras.slice(0, 1)];
      case 'severe':
        return [...mantras, ...yantras];
    }
  }
} 