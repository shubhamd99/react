import { getCityWeather } from './weatherApi';

/**
 * Business logic that consumes the weather service to give suggestions
 */
export async function recommendActivity(city: string): Promise<string> {
  try {
    const weather = await getCityWeather(city);
    
    if (weather.temp < 10) {
      return 'Stay indoors and drink hot chocolate';
    } else if (weather.condition.toLowerCase().includes('rain')) {
      return 'Bring an umbrella for a light walk';
    } else if (weather.temp > 25) {
      return 'Perfect day for swimming!';
    } else {
      return 'Great day for a jog in the park';
    }
  } catch {
    return 'Weather forecast unavailable. Plan with caution.';
  }
}

/**
 * Analytics Service for Spying Demo
 */
export const analytics = {
  sendEvent(eventName: string, metadata?: Record<string, unknown>): boolean {
    console.log(`Event sent: ${eventName}`, metadata);
    return true; // Returns true if sent successfully
  }
};

/**
 * Function that logs page views and triggers events
 */
export function trackUserAction(action: string, userId: string) {
  analytics.sendEvent('user_action', { action, userId, timestamp: Date.now() });
}

/**
 * Delay executor for fake timers demo
 */
export function scheduleAlert(callback: () => void, delayMs: number) {
  return setTimeout(() => {
    callback();
  }, delayMs);
}
