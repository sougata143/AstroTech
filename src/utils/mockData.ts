import { AppData } from '../types';

export const mockData: AppData = {
  lagnaChart: {
    ascendant: {
      longitude: 45,
      sign: 'Taurus',
      nakshatra: 'Rohini',
      pada: 2
    },
    houses: [
      { house: 1, longitude: 45, sign: 'Taurus', signLord: 'Venus' },
      { house: 2, longitude: 75, sign: 'Gemini', signLord: 'Mercury' },
      // ... other houses
    ],
    planets: [
      {
        planet: 'Sun',
        longitude: 120,
        house: 4,
        sign: 'Leo',
        nakshatra: 'Magha',
        pada: 1,
        isRetrograde: false,
        aspects: [
          { planet: 'Moon', aspect: 'Trine', angle: 120, strength: 0.8 },
          { planet: 'Mars', aspect: 'Square', angle: 90, strength: 0.4 }
        ]
      },
      // ... other planets
    ]
  },
  planetaryAnalysis: {
    // Add mock data
  },
  houseAnalysis: {
    // Add mock data
  },
  planetaryHarmonies: {
    // Add mock data
  },
  relationshipAnalysis: {
    // Add mock data
  },
  dashaTimeline: {
    // Add mock data
  },
  muhurtaTimings: {
    // Add mock data
  }
}; 