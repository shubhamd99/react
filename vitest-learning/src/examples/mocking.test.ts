import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCityWeather } from './weatherApi';
import { 
  recommendActivity, 
  analytics, 
  trackUserAction, 
  scheduleAlert 
} from './mocking';

// Mock the weatherApi module so we can control getCityWeather return values
vi.mock('./weatherApi', () => {
  return {
    getCityWeather: vi.fn(),
  };
});

describe('Module Mocking (getCityWeather)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should recommend swimming when weather is hot', async () => {
    // Typecast mock
    const getCityWeatherMock = vi.mocked(getCityWeather);
    
    // Set up mock return value
    getCityWeatherMock.mockResolvedValueOnce({
      temp: 30,
      condition: 'Sunny',
      humidity: 45
    });

    const recommendation = await recommendActivity('Miami');
    expect(recommendation).toBe('Perfect day for swimming!');
    expect(getCityWeatherMock).toHaveBeenCalledWith('Miami');
  });

  it('should recommend staying indoors when cold', async () => {
    const getCityWeatherMock = vi.mocked(getCityWeather);
    getCityWeatherMock.mockResolvedValueOnce({
      temp: 5,
      condition: 'Windy',
      humidity: 80
    });

    const recommendation = await recommendActivity('Oslo');
    expect(recommendation).toBe('Stay indoors and drink hot chocolate');
  });

  it('should handle API errors and return safe advice', async () => {
    const getCityWeatherMock = vi.mocked(getCityWeather);
    getCityWeatherMock.mockRejectedValueOnce(new Error('Network offline'));

    const recommendation = await recommendActivity('Unknown');
    expect(recommendation).toBe('Weather forecast unavailable. Plan with caution.');
  });
});

describe('Method Spying (analytics)', () => {
  it('should spy on analytics.sendEvent method call', () => {
    // Create a spy on analytics.sendEvent
    const sendEventSpy = vi.spyOn(analytics, 'sendEvent');
    
    // Call function that triggers analytics
    trackUserAction('click_signup', 'user_123');

    // Assert the spy was triggered
    expect(sendEventSpy).toHaveBeenCalledTimes(1);
    expect(sendEventSpy).toHaveBeenCalledWith('user_action', expect.objectContaining({
      action: 'click_signup',
      userId: 'user_123'
    }));

    // Restore original method behavior (cleanup)
    sendEventSpy.mockRestore();
  });
});

describe('Fake Timers (scheduleAlert)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should trigger the callback after the scheduled delay', () => {
    const callbackMock = vi.fn();
    
    scheduleAlert(callbackMock, 5000);

    // Callback shouldn't be called yet
    expect(callbackMock).not.toHaveBeenCalled();

    // Fast-forward time by 3 seconds
    vi.advanceTimersByTime(3000);
    expect(callbackMock).not.toHaveBeenCalled();

    // Fast-forward another 2 seconds (total 5s)
    vi.advanceTimersByTime(2000);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
