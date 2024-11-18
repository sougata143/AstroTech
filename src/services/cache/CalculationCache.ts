import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

export class CalculationCache {
  private static readonly CACHE_KEYS = {
    PLANETARY_POSITIONS: 'PLANETARY_POSITIONS',
    TRANSIT_CALCULATIONS: 'TRANSIT_CALCULATIONS',
    MUHURTA_CALCULATIONS: 'MUHURTA_CALCULATIONS',
    RITUAL_PROCEDURES: 'RITUAL_PROCEDURES'
  };

  private static readonly CACHE_EXPIRY = {
    PLANETARY_POSITIONS: 3600, // 1 hour
    TRANSIT_CALCULATIONS: 7200, // 2 hours
    MUHURTA_CALCULATIONS: 1800, // 30 minutes
    RITUAL_PROCEDURES: 86400 // 24 hours
  };

  static async set<T>(key: string, data: T, expiresIn?: number): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: (expiresIn || 3600) * 1000 // Convert to milliseconds
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
} 