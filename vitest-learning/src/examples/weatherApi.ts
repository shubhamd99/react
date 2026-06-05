export interface WeatherResponse {
  temp: number;
  condition: string;
  humidity: number;
}

/**
 * A weather service that queries weather from an external source.
 * In a real application, this would fetch from an API endpoint.
 */
export async function getCityWeather(city: string): Promise<WeatherResponse> {
  const response = await fetch(`https://api.weather.local/v1/${city}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }
  return response.json();
}
