import Config from 'react-native-config';

export interface LocationResult {
  locationName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export class LocationService {
  private static readonly GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api';
  private static readonly TIMEZONE_API_URL = 'https://maps.googleapis.com/maps/api/timezone/json';

  static async searchLocations(query: string): Promise<LocationResult[]> {
    try {
      const response = await fetch(
        `${this.GOOGLE_API_URL}/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${Config.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (!data.predictions) {
        return [];
      }

      return Promise.all(
        data.predictions.map(async (prediction: any) => {
          const details = await this.getPlaceDetails(prediction.place_id);
          const timezone = await this.getTimezone(
            details.latitude,
            details.longitude
          );
          
          return {
            locationName: prediction.description,
            latitude: details.latitude,
            longitude: details.longitude,
            timezone: timezone
          };
        })
      );
    } catch (error) {
      console.error('Location search failed:', error);
      return [];
    }
  }

  private static async getPlaceDetails(placeId: string) {
    const response = await fetch(
      `${this.GOOGLE_API_URL}/place/details/json?place_id=${placeId}&fields=geometry&key=${Config.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    return {
      latitude: data.result.geometry.location.lat,
      longitude: data.result.geometry.location.lng
    };
  }

  private static async getTimezone(latitude: number, longitude: number): Promise<string> {
    const timestamp = Math.floor(Date.now() / 1000);
    const response = await fetch(
      `${this.TIMEZONE_API_URL}?location=${latitude},${longitude}&timestamp=${timestamp}&key=${Config.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    return data.timeZoneId;
  }
} 