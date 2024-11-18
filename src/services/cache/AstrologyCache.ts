import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

export class AstrologyCache {
  private static readonly CACHE_KEYS = {
    PLANETARY_POSITIONS: 'PLANETARY_POSITIONS',
    TRANSIT_CALCULATIONS: 'TRANSIT_CALCULATIONS',
    DASHA_PERIODS: 'DASHA_PERIODS',
    YOGA_CALCULATIONS: 'YOGA_CALCULATIONS'
  };

  private static readonly DEFAULT_EXPIRY = {
    PLANETARY_POSITIONS: 3600, // 1 hour
    TRANSIT_CALCULATIONS: 7200, // 2 hours
    DASHA_PERIODS: 86400, // 24 hours
    YOGA_CALCULATIONS: 86400 // 24 hours
  };

  static async set<T>(key: string, data: T, expiresIn: number = 3600): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: expiresIn * 1000 // Convert to milliseconds
    };

    try {
      await AsyncStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write failed:', error);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const stored = await AsyncStorage.getItem(key);
      if (!stored) return null;

      const entry: CacheEntry<T> = JSON.parse(stored);
      const isExpired = Date.now() - entry.timestamp > entry.expiresIn;

      if (isExpired) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Cache read failed:', error);
      return null;
    }
  }

  static async cachePlanetaryPositions(date: Date, positions: any): Promise<void> {
    const key = `${this.CACHE_KEYS.PLANETARY_POSITIONS}_${date.toISOString()}`;
    await this.set(key, positions, this.DEFAULT_EXPIRY.PLANETARY_POSITIONS);
  }

  static async getCachedPlanetaryPositions(date: Date): Promise<any | null> {
    const key = `${this.CACHE_KEYS.PLANETARY_POSITIONS}_${date.toISOString()}`;
    return await this.get(key);
  }

  static async cacheTransitCalculations(
    startDate: Date,
    endDate: Date,
    calculations: any
  ): Promise<void> {
    const key = `${this.CACHE_KEYS.TRANSIT_CALCULATIONS}_${startDate.toISOString()}_${endDate.toISOString()}`;
    await this.set(key, calculations, this.DEFAULT_EXPIRY.TRANSIT_CALCULATIONS);
  }

  static async getCachedTransitCalculations(
    startDate: Date,
    endDate: Date
  ): Promise<any | null> {
    const key = `${this.CACHE_KEYS.TRANSIT_CALCULATIONS}_${startDate.toISOString()}_${endDate.toISOString()}`;
    return await this.get(key);
  }

  static async clearExpiredCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const entry: CacheEntry<any> = JSON.parse(stored);
          if (Date.now() - entry.timestamp > entry.expiresIn) {
            await AsyncStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('Cache cleanup failed:', error);
    }
  }

  static async clearAllCache(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Cache clear failed:', error);
    }
  }
} 