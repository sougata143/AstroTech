import { VedicRemedialMeasures, RemedialMeasure, PlanetaryRemedy } from './VedicRemedialMeasures';

export class ExtendedVedicRemedies extends VedicRemedialMeasures {
  private static readonly ADDITIONAL_REMEDIES: Record<string, PlanetaryRemedy> = {
    Mars: {
      planet: 'Mars',
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Red Coral (Moonga) therapy',
          procedure: [
            'Wear natural Red Coral of 6-8 carats',
            'Set in copper or gold ring',
            'Wear on right hand ring finger',
            'Energize on Tuesday morning'
          ],
          timing: {
            bestDays: ['Tuesday'],
            bestTime: 'Sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhances courage and confidence',
            'Improves leadership abilities',
            'Strengthens immune system',
            'Helps in competitive situations'
          ],
          precautions: [
            'Avoid if high blood pressure',
            'Remove while sleeping',
            'Should be free from cracks'
          ]
        },
        {
          type: 'mantra',
          description: 'Mangal Gayatri Mantra',
          procedure: [
            'Om Bhaum Bhaumaya Namah',
            'Recite 108 times daily',
            'Use red sandalwood mala',
            'Face South during practice'
          ],
          timing: {
            bestDays: ['Tuesday'],
            bestTime: 'Sunrise or sunset',
            duration: '21 days minimum'
          },
          benefits: [
            'Reduces Mars-related afflictions',
            'Improves courage and strength',
            'Helps overcome enemies',
            'Enhances professional success'
          ],
          precautions: [
            'Maintain celibacy during practice',
            'Avoid meat during practice period',
            'Practice with focused mind'
          ]
        },
        {
          type: 'yantra',
          description: 'Mangal Yantra meditation',
          procedure: [
            'Install yantra on copper plate',
            'Energize on Tuesday during Mars hora',
            'Place facing South',
            'Offer red flowers'
          ],
          timing: {
            bestDays: ['Tuesday'],
            bestTime: 'Mars hora',
            duration: 'Permanent installation'
          },
          benefits: [
            'Protection from accidents',
            'Success in competitions',
            'Improved physical strength',
            'Better property matters'
          ],
          precautions: [
            'Keep yantra clean',
            'Don\'t place on ground',
            'Regular worship required'
          ]
        }
      ],
      specificRemedies: {
        1: [
          {
            type: 'ritual',
            description: 'Hanuman Chalisa recitation',
            procedure: [
              'Recite daily in morning',
              'Offer red sindoor',
              'Light mustard oil lamp'
            ],
            timing: {
              bestDays: ['Tuesday', 'Saturday'],
              bestTime: 'Sunrise',
              duration: '48 days'
            },
            benefits: [
              'Protection from negative energies',
              'Enhanced courage',
              'Better decision-making ability'
            ],
            precautions: [
              'Maintain cleanliness',
              'Follow proper pronunciation',
              'Regular practice important'
            ]
          }
        ]
      },
      transitRemedies: {
        'challenging': [
          {
            type: 'charity',
            description: 'Feed monkeys and offer red lentils',
            procedure: [
              'Offer on Tuesday morning',
              'Give with pure intentions',
              'Recite Mars beej mantra'
            ],
            timing: {
              bestDays: ['Tuesday'],
              bestTime: 'Morning',
              duration: 'During transit period'
            },
            benefits: [
              'Reduces malefic effects',
              'Improves courage',
              'Better professional life'
            ],
            precautions: [
              'Maintain purity',
              'Give quality items',
              'Follow proper procedure'
            ]
          }
        ]
      }
    },
    Jupiter: {
      planet: 'Jupiter',
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Yellow Sapphire (Pukhraj) therapy',
          procedure: [
            'Wear natural Yellow Sapphire of 3-5 carats',
            'Set in gold ring',
            'Wear on index finger',
            'Energize on Thursday morning'
          ],
          timing: {
            bestDays: ['Thursday'],
            bestTime: 'Sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhances wisdom and knowledge',
            'Improves financial prosperity',
            'Brings spiritual growth',
            'Better educational success'
          ],
          precautions: [
            'Should be flawless',
            'Avoid wearing during eclipses',
            'Regular cleaning required'
          ]
        },
        {
          type: 'mantra',
          description: 'Guru Gayatri Mantra',
          procedure: [
            'Om Gum Gurave Namah',
            'Recite 108 times daily',
            'Use yellow sandalwood mala',
            'Face North during practice'
          ],
          timing: {
            bestDays: ['Thursday'],
            bestTime: 'Sunrise or sunset',
            duration: '40 days minimum'
          },
          benefits: [
            'Enhanced learning ability',
            'Better teaching skills',
            'Financial growth',
            'Spiritual progress'
          ],
          precautions: [
            'Practice with devotion',
            'Maintain mental purity',
            'Follow dietary restrictions'
          ]
        },
        {
          type: 'yantra',
          description: 'Brihaspati Yantra meditation',
          procedure: [
            'Install yantra on gold plate',
            'Energize on Thursday during Jupiter hora',
            'Place facing North',
            'Offer yellow flowers'
          ],
          timing: {
            bestDays: ['Thursday'],
            bestTime: 'Jupiter hora',
            duration: 'Permanent installation'
          },
          benefits: [
            'Academic success',
            'Financial prosperity',
            'Spiritual growth',
            'Better marriage prospects'
          ],
          precautions: [
            'Regular worship needed',
            'Maintain sanctity',
            'Keep in clean place'
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
  };

  static getExtendedRemedies(
    planet: string,
    house: number,
    transitCondition?: 'favorable' | 'challenging' | 'neutral'
  ): RemedialMeasure[] {
    const basicRemedies = super.getRemediesForPlanet(planet, house, transitCondition);
    const additionalRemedies = this.ADDITIONAL_REMEDIES[planet]?.generalRemedies || [];
    
    return [...basicRemedies, ...additionalRemedies];
  }
} 