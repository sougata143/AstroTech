import { ExtendedVedicRemedies, RemedialMeasure, PlanetaryRemedy } from './ExtendedVedicRemedies';

export class CompleteVedicRemedies extends ExtendedVedicRemedies {
  private static readonly COMPLETE_REMEDIES: Record<string, PlanetaryRemedy> = {
    Saturn: {
      planet: 'Saturn',
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Blue Sapphire (Neelam) therapy',
          procedure: [
            'Wear natural Blue Sapphire of 4-5 carats',
            'Set in iron or platinum ring',
            'Wear on middle finger',
            'Energize on Saturday morning'
          ],
          timing: {
            bestDays: ['Saturday'],
            bestTime: 'Before sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Protection from delays and obstacles',
            'Career stability',
            'Long-term success',
            'Discipline and focus'
          ],
          precautions: [
            'Test stone for compatibility',
            'Start wearing during Shukla Paksha',
            'Avoid if mentally unstable'
          ]
        },
        {
          type: 'mantra',
          description: 'Shani Beej Mantra',
          procedure: [
            'Om Praam Preem Praum Sah Shanaye Namah',
            'Recite 23,000 times total',
            'Use black sesame seed mala',
            'Face west during practice'
          ],
          timing: {
            bestDays: ['Saturday'],
            bestTime: 'Before sunrise or sunset',
            duration: '40 days'
          },
          benefits: [
            'Reduces Saturn\'s malefic effects',
            'Brings stability in life',
            'Improves career prospects',
            'Helps overcome obstacles'
          ],
          precautions: [
            'Maintain strict discipline',
            'Follow sattvic diet',
            'Avoid alcohol during practice'
          ]
        }
      ],
      specificRemedies: {
        8: [ // 8th house transit remedies
          {
            type: 'ritual',
            description: 'Hanuman Chalisa with Oil Offering',
            procedure: [
              'Offer mustard oil to Hanuman',
              'Recite Hanuman Chalisa',
              'Feed black dogs and crows',
              'Wear black clothes on Saturday'
            ],
            timing: {
              bestDays: ['Saturday'],
              bestTime: 'Before sunset',
              duration: 'During Sade Sati period'
            },
            benefits: [
              'Protection during difficult times',
              'Reduced impact of Sade Sati',
              'Mental strength'
            ],
            precautions: [
              'Use pure mustard oil',
              'Maintain cleanliness',
              'Follow proper ritual procedure'
            ]
          }
        ]
      },
      transitRemedies: {
        'challenging': [
          {
            type: 'charity',
            description: 'Iron and Black Items Donation',
            procedure: [
              'Donate black items on Saturday',
              'Give iron items to laborers',
              'Feed black sesame to birds',
              'Offer oil in Shani temple'
            ],
            timing: {
              bestDays: ['Saturday'],
              bestTime: 'Before sunset',
              duration: 'During transit period'
            },
            benefits: [
              'Reduces malefic effects',
              'Brings stability',
              'Improves fortune'
            ],
            precautions: [
              'Give with pure intentions',
              'Maintain regularity',
              'Follow proper timing'
            ]
          }
        ]
      }
    },
    Mercury: {
      planet: 'Mercury',
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Emerald (Panna) therapy',
          procedure: [
            'Wear natural Emerald of 3-4 carats',
            'Set in gold or silver ring',
            'Wear on little finger',
            'Energize on Wednesday morning'
          ],
          timing: {
            bestDays: ['Wednesday'],
            bestTime: 'Sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhanced intelligence',
            'Better communication skills',
            'Business success',
            'Academic excellence'
          ],
          precautions: [
            'Avoid if mentally overactive',
            'Remove during sleep',
            'Keep away from chemicals'
          ]
        },
        {
          type: 'yantra',
          description: 'Mercury Yantra Meditation',
          procedure: [
            'Install yantra on copper or silver plate',
            'Energize on Wednesday',
            'Meditate using green colors',
            'Chant Mercury mantras'
          ],
          timing: {
            bestDays: ['Wednesday'],
            bestTime: 'Morning hours',
            duration: 'Ongoing practice'
          },
          benefits: [
            'Improved memory',
            'Better analytical skills',
            'Enhanced learning ability',
            'Business growth'
          ],
          precautions: [
            'Keep yantra clean',
            'Regular worship needed',
            'Maintain sacred space'
          ]
        }
      ],
      transitRemedies: {
        'challenging': [
          {
            type: 'ritual',
            description: 'Green Moong Offering',
            procedure: [
              'Offer green moong to Ganesha',
              'Feed green items to children',
              'Plant green herbs',
              'Write mantras with green ink'
            ],
            timing: {
              bestDays: ['Wednesday'],
              bestTime: 'Morning',
              duration: 'Transit period'
            },
            benefits: [
              'Improves communication',
              'Enhances intelligence',
              'Reduces confusion'
            ],
            precautions: [
              'Use pure ingredients',
              'Maintain mental clarity',
              'Follow proper procedure'
            ]
          }
        ]
      }
    },
    Venus: {
      planet: 'Venus',
      generalRemedies: [
        {
          type: 'gemstone',
          description: 'Diamond (Heera) therapy',
          procedure: [
            'Wear natural Diamond of 1-2 carats',
            'Set in platinum or white gold',
            'Wear on ring finger',
            'Energize on Friday morning'
          ],
          timing: {
            bestDays: ['Friday'],
            bestTime: 'Sunrise',
            duration: 'Continuous wearing recommended'
          },
          benefits: [
            'Enhanced relationships',
            'Artistic abilities',
            'Financial prosperity',
            'Physical beauty'
          ],
          precautions: [
            'Verify diamond purity',
            'Maintain cleanliness',
            'Follow proper rituals'
          ]
        },
        {
          type: 'mantra',
          description: 'Shukra Gayatri Mantra',
          procedure: [
            'Om Bhargavaya Vidmahe',
            'Recite 108 times daily',
            'Use white flowers',
            'Face southeast'
          ],
          timing: {
            bestDays: ['Friday'],
            bestTime: 'Sunrise or sunset',
            duration: '21 days minimum'
          },
          benefits: [
            'Relationship harmony',
            'Artistic success',
            'Financial growth',
            'Beauty enhancement'
          ],
          precautions: [
            'Maintain purity',
            'Follow dietary restrictions',
            'Practice with devotion'
          ]
        }
      ],
      transitRemedies: {
        'challenging': [
          {
            type: 'ritual',
            description: 'White Flower Offering',
            procedure: [
              'Offer white flowers to Goddess',
              'Use sandalwood paste',
              'Light white candles',
              'Wear white clothes'
            ],
            timing: {
              bestDays: ['Friday'],
              bestTime: 'Morning',
              duration: 'Transit period'
            },
            benefits: [
              'Improves relationships',
              'Enhances creativity',
              'Brings harmony'
            ],
            precautions: [
              'Use fresh flowers',
              'Maintain purity',
              'Follow proper timing'
            ]
          }
        ]
      }
    }
  };

  static getCompleteRemedies(
    planet: string,
    house: number,
    transitCondition?: 'favorable' | 'challenging' | 'neutral'
  ): RemedialMeasure[] {
    const basicRemedies = super.getExtendedRemedies(planet, house, transitCondition);
    const completeRemedies = this.COMPLETE_REMEDIES[planet]?.generalRemedies || [];
    const transitRemedies = transitCondition ? 
      this.COMPLETE_REMEDIES[planet]?.transitRemedies[transitCondition] || [] : [];
    
    return [...basicRemedies, ...completeRemedies, ...transitRemedies];
  }
} 