import { AdvancedMantrasAndYantras, MantraDetails, YantraDetails } from './AdvancedMantrasAndYantras';

export class ExtendedMantrasAndYantras extends AdvancedMantrasAndYantras {
  private static readonly ADDITIONAL_MANTRAS: Record<string, MantraDetails[]> = {
    Rahu: [
      {
        name: 'Rahu Beej Mantra',
        type: 'beej',
        sanskrit: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
        transliteration: 'Om Bhraam Bhreem Bhraum Sah Rahave Namaha',
        meaning: 'Salutations to Rahu, the shadow planet',
        deity: 'Rahu',
        effects: [
          'Protection from negative influences',
          'Removal of obstacles',
          'Success in hidden endeavors',
          'Breaking through limitations'
        ],
        procedure: {
          time: 'Saturday or during Rahu Kaal',
          direction: 'South-West',
          materials: [
            'Black cloth',
            'Mustard oil lamp',
            'Black sesame seeds',
            'Iron vessel'
          ],
          steps: [
            'Face South-West',
            'Light mustard oil lamp',
            'Offer black flowers',
            'Use black mala',
            'Maintain silence'
          ],
          duration: '48 days',
          count: 18000
        },
        restrictions: [
          'Avoid meat and alcohol',
          'Practice during Rahu Kaal',
          'Maintain celibacy',
          'Avoid speaking during practice'
        ],
        benefits: [
          'Protection from black magic',
          'Career advancement',
          'Breaking through obstacles',
          'Success in competitive exams'
        ]
      }
    ],
    Ketu: [
      {
        name: 'Ketu Gayatri Mantra',
        type: 'gayatri',
        sanskrit: 'ॐ केतवे विद्महे शिखिध्वजाय धीमहि तन्नो केतुः प्रचोदयात्',
        transliteration: 'Om Ketave Vidmahe Shikhidhwajaya Dhimahi Tanno Ketuh Prachodayat',
        meaning: 'We meditate upon Ketu, who holds the flag of enlightenment',
        deity: 'Ketu',
        effects: [
          'Spiritual enlightenment',
          'Liberation from past karma',
          'Psychic abilities',
          'Moksha attainment'
        ],
        procedure: {
          time: 'Before sunrise or during Ketu hora',
          direction: 'South',
          materials: [
            'Darbha grass',
            'Copper vessel',
            'Frankincense',
            'Brown cloth'
          ],
          steps: [
            'Sit on darbha grass',
            'Light frankincense',
            'Use rudraksha mala',
            'Maintain spiritual focus'
          ],
          duration: '27 days',
          count: 108
        },
        restrictions: [
          'Avoid worldly thoughts',
          'Practice in solitude',
          'Maintain brahmacharya',
          'Follow sattvic diet'
        ],
        benefits: [
          'Enhanced spirituality',
          'Freedom from past karma',
          'Psychic development',
          'Spiritual wisdom'
        ]
      }
    ],
    Venus: [
      {
        name: 'Shukra Kavach',
        type: 'kavach',
        sanskrit: 'ॐ शुं शुक्राय नमः',
        transliteration: 'Om Shum Shukraya Namaha',
        meaning: 'Salutations to Venus, the bestower of beauty and prosperity',
        deity: 'Shukracharya',
        effects: [
          'Enhanced beauty and charm',
          'Success in arts',
          'Marital harmony',
          'Financial prosperity'
        ],
        procedure: {
          time: 'Friday morning during Venus hora',
          direction: 'South-East',
          materials: [
            'White flowers',
            'Silver items',
            'White cloth',
            'Rice grains'
          ],
          steps: [
            'Wear clean white clothes',
            'Offer white flowers',
            'Use silver utensils',
            'Recite with devotion'
          ],
          duration: '21 days',
          count: 16000
        },
        restrictions: [
          'Avoid non-vegetarian food',
          'Maintain purity',
          'Avoid arguments',
          'Practice cleanliness'
        ],
        benefits: [
          'Improved relationships',
          'Artistic success',
          'Financial gains',
          'Enhanced beauty'
        ]
      }
    ],
    Mars: [
      {
        name: 'Mangal Stotram',
        type: 'stotram',
        sanskrit: 'धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्',
        transliteration: 'Dharani Garbha Sambhutam Vidyutkanti Samaprabham',
        meaning: 'Born from Earth\'s womb, brilliant as lightning',
        deity: 'Mangal',
        effects: [
          'Enhanced courage',
          'Victory over enemies',
          'Protection from accidents',
          'Professional success'
        ],
        procedure: {
          time: 'Tuesday morning during Mars hora',
          direction: 'South',
          materials: [
            'Red flowers',
            'Copper vessel',
            'Red sandal',
            'Kumkum'
          ],
          steps: [
            'Face South direction',
            'Offer red flowers',
            'Apply kumkum tilak',
            'Use coral mala'
          ],
          duration: '21 days',
          count: 10000
        },
        restrictions: [
          'Avoid anger',
          'Control aggressive tendencies',
          'Maintain discipline',
          'Follow proper timing'
        ],
        benefits: [
          'Protection from accidents',
          'Success in competitions',
          'Enhanced leadership',
          'Physical strength'
        ]
      }
    ]
  };

  private static readonly ADDITIONAL_YANTRAS: Record<string, YantraDetails[]> = {
    Rahu: [
      {
        name: 'Rahu Yantra',
        type: 'planetary',
        geometry: {
          base: 'Square',
          layers: 9,
          mainSymbol: 'Snake symbol',
          surroundingSymbols: [
            'Rahu beej mantras',
            'Protective symbols',
            'Snake patterns'
          ]
        },
        material: [
          'Lead plate',
          'Black ink',
          'Mustard oil'
        ],
        energization: {
          time: 'Saturday during Rahu Kaal',
          mantras: [
            'Om Bhraam Bhreem Bhraum Sah Rahave Namaha',
            'Rahu Gayatri Mantra'
          ],
          procedure: [
            'Purify with smoke',
            'Apply special oils',
            'Chant mantras 108 times',
            'Offer black flowers'
          ],
          duration: '48 minutes'
        },
        placement: {
          direction: 'South-West',
          location: 'Prayer room or office',
          height: '3 feet from ground'
        },
        benefits: [
          'Protection from negative energies',
          'Success in hidden ventures',
          'Breaking through obstacles',
          'Career advancement'
        ],
        precautions: [
          'Keep away from sleeping area',
          'Regular energization needed',
          'Don\'t touch with impure hands',
          'Maintain secrecy'
        ]
      }
    ],
    Ketu: [
      {
        name: 'Ketu Yantra',
        type: 'planetary',
        geometry: {
          base: 'Triangle',
          layers: 9,
          mainSymbol: 'Comet tail',
          surroundingSymbols: [
            'Ketu beej mantras',
            'Liberation symbols',
            'Spiritual patterns'
          ]
        },
        material: [
          'Mixed metals plate',
          'Special inks',
          'Darbha grass'
        ],
        energization: {
          time: 'During Ketu hora',
          mantras: [
            'Om Kram Kreem Kraum Sah Ketave Namaha',
            'Ketu Gayatri'
          ],
          procedure: [
            'Purify with sacred herbs',
            'Use special mantras',
            'Energize with crystals',
            'Offer specific flowers'
          ],
          duration: '27 minutes'
        },
        placement: {
          direction: 'South',
          location: 'Meditation room',
          height: '9 inches from ground'
        },
        benefits: [
          'Spiritual progress',
          'Liberation from past karma',
          'Enhanced intuition',
          'Moksha attainment'
        ],
        precautions: [
          'Keep in pure space',
          'Regular meditation needed',
          'Handle with reverence',
          'Maintain spiritual atmosphere'
        ]
      }
    ]
  };

  static getAllMantras(
    planet: string,
    purpose?: 'protection' | 'enhancement' | 'remedial'
  ): MantraDetails[] {
    const basicMantras = super.getMantrasForPlanet(planet, purpose);
    const additionalMantras = this.ADDITIONAL_MANTRAS[planet] || [];
    
    if (!purpose) return [...basicMantras, ...additionalMantras];
    
    return [
      ...basicMantras,
      ...additionalMantras.filter(mantra =>
        mantra.effects.some(effect =>
          effect.toLowerCase().includes(purpose.toLowerCase())
        )
      )
    ];
  }

  static getAllYantras(
    planet: string,
    purpose?: 'protection' | 'enhancement' | 'remedial'
  ): YantraDetails[] {
    const basicYantras = super.getYantrasForPlanet(planet, purpose);
    const additionalYantras = this.ADDITIONAL_YANTRAS[planet] || [];
    
    if (!purpose) return [...basicYantras, ...additionalYantras];
    
    return [
      ...basicYantras,
      ...additionalYantras.filter(yantra =>
        yantra.benefits.some(benefit =>
          benefit.toLowerCase().includes(purpose.toLowerCase())
        )
      )
    ];
  }
} 