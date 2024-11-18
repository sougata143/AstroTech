interface RemedialMeasure {
  type: 'gemstone' | 'mantra' | 'ritual' | 'charity' | 'fasting' | 'yantra';
  description: string;
  procedure: string[];
  timing: {
    bestDays: string[];
    bestTime: string;
    duration: string;
  };
  benefits: string[];
  precautions: string[];
}

interface PlanetaryRemedy {
  planet: string;
  generalRemedies: RemedialMeasure[];
  specificRemedies: Record<number, RemedialMeasure[]>; // House-specific remedies
  transitRemedies: Record<string, RemedialMeasure[]>; // Transit-specific remedies
}

export class VedicRemedialMeasures {
  private static readonly PLANETARY_REMEDIES: Record<string, PlanetaryRemedy> = {
    Sun: {
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Ruby (Manik) gemstone therapy',
          procedure: [
            'Get a natural Ruby of at least 2-3 carats',
            'Energize during sunrise on a Sunday',
            'Wear in gold ring on right hand ring finger',
          ],
          timing: {
            bestDays: ['Sunday'],
            bestTime: 'Sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhances self-confidence and authority',
            'Improves physical vitality',
            'Strengthens immune system',
            'Attracts success in career'
          ],
          precautions: [
            'Avoid wearing during solar eclipse',
            'Remove while sleeping',
            'Should be flawless and natural'
          ]
        },
        {
          type: 'mantra',
          description: 'Aditya Hridayam Stotra',
          procedure: [
            'Learn proper Sanskrit pronunciation',
            'Recite 108 times daily',
            'Practice during sunrise facing east'
          ],
          timing: {
            bestDays: ['Sunday', 'Tuesday'],
            bestTime: 'Sunrise (Brahma Muhurta)',
            duration: '48 days minimum'
          },
          benefits: [
            'Removes negativity',
            'Enhances leadership qualities',
            'Improves health and vitality',
            'Brings success in endeavors'
          ],
          precautions: [
            'Maintain celibacy during practice period',
            'Avoid non-vegetarian food',
            'Practice with pure intentions'
          ]
        }
      ],
      specificRemedies: {
        1: [
          {
            type: 'ritual',
            description: 'Surya Arghya (Water offering to Sun)',
            procedure: [
              'Use copper vessel',
              'Offer water mixed with red flowers',
              'Face east during sunrise',
              'Recite Surya mantras'
            ],
            timing: {
              bestDays: ['Sunday'],
              bestTime: 'Sunrise',
              duration: '43 days'
            },
            benefits: [
              'Improves physical health',
              'Enhances personality',
              'Removes obstacles'
            ],
            precautions: [
              'Use only copper or brass vessel',
              'Maintain cleanliness',
              'Practice regularly'
            ]
          }
        ]
      },
      transitRemedies: {
        'challenging': [
          {
            type: 'charity',
            description: 'Donate wheat and jaggery',
            procedure: [
              'Donate to temples or needy people',
              'Give on Sunday morning',
              'Offer with pure intentions'
            ],
            timing: {
              bestDays: ['Sunday'],
              bestTime: 'Morning',
              duration: 'During transit period'
            },
            benefits: [
              'Reduces malefic effects',
              'Brings peace and prosperity',
              'Improves relationships with authority'
            ],
            precautions: [
              'Donate with respect',
              'Avoid expecting returns',
              'Give quality items only'
            ]
          }
        ]
      }
    },
    Moon: {
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Natural Pearl (Moti) therapy',
          procedure: [
            'Wear natural pearl of 3-4 carats',
            'Set in silver ring',
            'Wear on right hand little finger'
          ],
          timing: {
            bestDays: ['Monday'],
            bestTime: 'During moonrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhances emotional balance',
            'Improves mental peace',
            'Strengthens intuition',
            'Benefits mother and family life'
          ],
          precautions: [
            'Avoid wearing during lunar eclipse',
            'Clean regularly with milk',
            'Should be natural and lustrous'
          ]
        },
        {
          type: 'yantra',
          description: 'Chandra Yantra meditation',
          procedure: [
            'Install yantra on silver plate',
            'Energize on Monday during moonrise',
            'Meditate daily for 15 minutes'
          ],
          timing: {
            bestDays: ['Monday', 'Friday'],
            bestTime: 'Moonrise or night time',
            duration: 'Ongoing practice'
          },
          benefits: [
            'Calms mental anxiety',
            'Improves sleep quality',
            'Enhances emotional intelligence',
            'Strengthens psychic abilities'
          ],
          precautions: [
            'Keep yantra clean and respected',
            'Avoid negative emotions during practice',
            'Maintain purity of mind'
          ]
        }
      ],
      specificRemedies: {
        // Add house-specific remedies
      },
      transitRemedies: {
        // Add transit-specific remedies
      }
    }
    // Add other planets...
  };

  static getRemediesForPlanet(
    planet: string,
    house: number,
    transitCondition?: 'favorable' | 'challenging' | 'neutral'
  ): RemedialMeasure[] {
    const planetaryRemedy = this.PLANETARY_REMEDIES[planet];
    if (!planetaryRemedy) return [];

    const remedies: RemedialMeasure[] = [
      ...planetaryRemedy.generalRemedies,
      ...(planetaryRemedy.specificRemedies[house] || []),
      ...(transitCondition ? planetaryRemedy.transitRemedies[transitCondition] || [] : [])
    ];

    return remedies;
  }

  static getPrioritizedRemedies(
    planetaryPositions: Array<{
      planet: string;
      house: number;
      strength: number;
      transitCondition?: 'favorable' | 'challenging' | 'neutral';
    }>
  ): Record<string, RemedialMeasure[]> {
    const remedies: Record<string, RemedialMeasure[]> = {};

    // Sort planets by strength (ascending) to prioritize remedies for weak planets
    const sortedPlanets = [...planetaryPositions].sort((a, b) => a.strength - b.strength);

    sortedPlanets.forEach(position => {
      remedies[position.planet] = this.getRemediesForPlanet(
        position.planet,
        position.house,
        position.transitCondition
      );
    });

    return remedies;
  }
} 