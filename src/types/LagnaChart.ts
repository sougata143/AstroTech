export interface LagnaChart {
  houses: Array<{
    house: number;
    longitude: number;
    sign: string;
    signLord: string;
  }>;
  planets: Array<{
    planet: string;
    longitude: number;
    house: number;
    sign: string;
    nakshatra: string;
    pada: number;
    isRetrograde: boolean;
    aspects: Array<{
      planet: string;
      type: string;
      angle: number;
      strength: number;
    }>;
  }>;
  ascendant: {
    longitude: number;
    sign: string;
    nakshatra: string;
    pada: number;
  };
} 