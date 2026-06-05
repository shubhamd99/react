export interface CodeExample {
  title: string;
  description: string;
  sourcePath: string;
  testPath: string;
  sourceCode: string;
  testCode: string;
  keyConcepts: { name: string; description: string }[];
}

export const codeExamples: Record<string, CodeExample> = {
  basic: {
    title: '1. Basic Unit Testing',
    description: 'Learn simple assertions, math helpers, string manipulations, object equality, and error matching using Vitest\'s base API.',
    sourcePath: 'src/examples/basic.ts',
    testPath: 'src/examples/basic.test.ts',
    sourceCode: `/**
 * Basic Math operations
 */
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Reverses a string
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * User interface for search demo
 */
export interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

/**
 * Searches for a user by ID and throws an error if not found
 */
export function findUserById(users: User[], id: number): User {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error(\`User with ID \${id} not found\`);
  }
  return user;
}

/**
 * Calculates a discounted price based on a code
 */
export function calculateDiscount(price: number, code: string): number {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  
  switch (code.toUpperCase()) {
    case 'SAVE10':
      return price * 0.9;
    case 'SAVE20':
      return price * 0.8;
    case 'WELCOME':
      return price - 5 > 0 ? price - 5 : 0;
    default:
      return price;
  }
}`,
    testCode: `import { describe, it, expect, beforeEach } from 'vitest';
import { add, subtract, reverseString, findUserById, calculateDiscount, User } from './basic';

describe('Basic Math Operations', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    // Floating point numbers should use toBeCloseTo
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  it('should subtract two numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 10)).toBe(-10);
  });
});

describe('String Operations', () => {
  it('should reverse a string', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('')).toBe('');
    expect(reverseString('a')).toBe('a');
  });
});

describe('User Searching (Objects & Arrays)', () => {
  let mockUsers: User[];

  // This runs before each test in this describe block
  beforeEach(() => {
    mockUsers = [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
    ];
  });

  it('should find a user by ID', () => {
    const user = findUserById(mockUsers, 1);
    
    // toBe is for referential equality, toEqual is for value equality
    expect(user).toEqual({ id: 1, name: 'Alice', role: 'admin' });
    expect(user.name).toBe('Alice');
  });

  it('should throw an error if user is not found', () => {
    expect(() => findUserById(mockUsers, 99)).toThrow('User with ID 99 not found');
  });
});

describe('Discount Calculations', () => {
  it('should apply percentage discounts correctly', () => {
    expect(calculateDiscount(100, 'SAVE10')).toBe(90);
    expect(calculateDiscount(100, 'SAVE20')).toBe(80);
  });

  it('should apply fixed discount correctly', () => {
    expect(calculateDiscount(100, 'WELCOME')).toBe(95);
    expect(calculateDiscount(3, 'WELCOME')).toBe(0); // Should not go negative
  });

  it('should return original price for invalid code', () => {
    expect(calculateDiscount(100, 'INVALID')).toBe(100);
  });

  it('should throw error for negative price', () => {
    expect(() => calculateDiscount(-50, 'SAVE10')).toThrow('Price cannot be negative');
  });
});`,
    keyConcepts: [
      { name: 'describe()', description: 'Creates a block that groups together several related tests in a suite.' },
      { name: 'it() or test()', description: 'Defines an individual test case. `it` is an alias of `test`.' },
      { name: 'expect()', description: 'Wraps the actual output to allow running assertion matchers against it.' },
      { name: 'toBe()', description: 'Checks referential/strict equality (like `===`). Best for primitives.' },
      { name: 'toEqual()', description: 'Recursively checks the values of object properties or arrays for equality.' },
      { name: 'toThrow()', description: 'Asserts that a function throws an error when executed.' },
      { name: 'toBeCloseTo()', description: 'Asserts floating point numbers are equal within a specified precision to avoid binary rounding issues.' },
      { name: 'beforeEach()', description: 'Runs a setup function before each test in the current block, resetting mock state.' }
    ]
  },
  components: {
    title: '2. React Components',
    description: 'Render UI elements, simulate button clicks, type text inside inputs, and perform form validations using React Testing Library.',
    sourcePath: 'src/examples/components.tsx',
    testPath: 'src/examples/components.test.tsx',
    sourceCode: `import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters long');
      return;
    }

    setError('');
    setSubmitted(true);
    onSubmit({ rating, comment });
  };

  if (submitted) {
    return (
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded border border-emerald-200" data-testid="success-container">
        <h3 className="font-bold text-lg">Thank you for your feedback!</h3>
        <p className="text-sm">We appreciate your support.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 max-w-md">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Submit Feedback</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-800 text-sm rounded border border-rose-200" role="alert">
          {error}
        </div>
      )}

      {/* Rating Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={\`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all \${
                rating === star
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }\`}
              aria-label={\`Rate \${star} star\${star > 1 ? 's' : ''}\`}
            >
              {star}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Field */}
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-semibold text-slate-700 mb-2">Comment</label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you think (minimum 10 characters)..."
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm shadow-sm"
      >
        Submit Feedback
      </button>
    </form>
  );
}`,
    testCode: `import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FeedbackForm } from './components'

describe('FeedbackForm Component', () => {
  it('should render the form with all fields', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    // Check elements
    expect(screen.getByRole('heading', { name: /submit feedback/i })).toBeInTheDocument()
    expect(screen.getByText('Rating')).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument()
  });

  it('should have the submit button disabled initially', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    const submitBtn = screen.getByRole('button', { name: /submit feedback/i })
    expect(submitBtn).toBeDisabled()
  });

  it('should enable the submit button when a rating is selected', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    const rating3Btn = screen.getByLabelText('Rate 3 stars')
    const submitBtn = screen.getByRole('button', { name: /submit feedback/i })
    
    // Click rating button
    fireEvent.click(rating3Btn)
    
    expect(submitBtn).toBeEnabled()
  });

  it('should show error when submitting empty comment or short comment (<10 chars)', () => {
    render(<FeedbackForm onSubmit={vi.fn()} />)
    
    // Select rating
    fireEvent.click(screen.getByLabelText('Rate 4 stars'))
    
    // Type a short comment
    const commentInput = screen.getByLabelText(/comment/i)
    fireEvent.change(commentInput, { target: { value: 'Good' } })
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))
    
    // Expect error to show
    expect(screen.getByRole('alert')).toHaveTextContent('Comment must be at least 10 characters long')
  });

  it('should successfully submit form and trigger callback', () => {
    const handleSubmitMock = vi.fn()
    render(<FeedbackForm onSubmit={handleSubmitMock} />)
    
    // Select rating
    fireEvent.click(screen.getByLabelText('Rate 5 stars'))
    
    // Type valid comment
    fireEvent.change(screen.getByLabelText(/comment/i), { 
      target: { value: 'This product is absolutely amazing!' } 
    })
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit feedback/i }))
    
    // Assert callback was called with correct data
    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith({
      rating: 5,
      comment: 'This product is absolutely amazing!'
    })
    
    // Assert success screen is shown
    expect(screen.getByTestId('success-container')).toBeInTheDocument()
    expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument()
  });
});`,
    keyConcepts: [
      { name: 'render()', description: 'Mounts a React component into a virtual DOM container (provided by jsdom) for testing.' },
      { name: 'screen', description: 'Provides access to all standard queries for finding elements in the rendered DOM.' },
      { name: 'getByRole()', description: 'Finds elements by their accessibility role (e.g. "button", "heading", "textbox"). Preferred query.' },
      { name: 'getByLabelText()', description: 'Finds an form input element by its associated label text.' },
      { name: 'fireEvent.click()', description: 'Simulates a mouse click on an element, triggering event handlers.' },
      { name: 'fireEvent.change()', description: 'Simulates input value changes (typing/editing fields).' },
      { name: 'vi.fn()', description: 'Creates a mock function to spy on execution parameters, triggers, and returns.' },
      { name: 'toBeInTheDocument()', description: 'From jest-dom. Asserts that the element exists in the DOM tree.' }
    ]
  },
  hooks: {
    title: '3. Custom Hooks',
    description: 'Test react hooks directly in isolation using `@testing-library/react`\'s `renderHook` and wrap state mutations inside `act()`.',
    sourcePath: 'src/examples/hooks.ts',
    testPath: 'src/examples/hooks.test.ts',
    sourceCode: `import { useState, useEffect } from 'react';

/**
 * useCounter Hook
 */
interface UseCounterOptions {
  step?: number;
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { step = 1, min = -Infinity, max = Infinity } = options;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
}

/**
 * useFetch Hook
 */
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(\`HTTP error! status: \${res.status}\`);
        }
        return res.json() as Promise<T>;
      })
      .then(data => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(err => {
        if (active) {
          setState({ data: null, loading: false, error: (err as Error).message });
        }
      });

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}`,
    testCode: `import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter, useFetch } from './hooks';

describe('useCounter Hook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter(0));
    
    // Updates must be wrapped in act()
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should respect max option limit', () => {
    const { result } = renderHook(() => useCounter(8, { max: 10, step: 3 }));
    
    act(() => {
      result.current.increment(); // 8 + 3 = 11, should limit to 10
    });
    
    expect(result.current.count).toBe(10);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});

describe('useFetch Hook', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    // Reset any global fetch overrides
    globalThis.fetch = originalFetch;
  });

  it('should show loading state and retrieve data on success', async () => {
    const mockData = { id: 1, title: 'Learn Vitest' };
    
    // Mock global fetch
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useFetch('https://api.example.com/todo'));

    // Check loading initially
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    // Wait for the async state updates to settle
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/todo');
  });

  it('should set error state on network fail', async () => {
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useFetch('https://api.example.com/notfound'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('HTTP error! status: 404');
  });
});`,
    keyConcepts: [
      { name: 'renderHook()', description: 'Wraps a hook inside a dummy component, rendering it so React hooks lifecycle methods work correctly.' },
      { name: 'result.current', description: 'An object property containing the current return value of the custom hook.' },
      { name: 'act()', description: 'Ensures all updates related to React state/rendering are processed and flushed before assertions run.' },
      { name: 'vi.stubGlobal()', description: 'Stub/mock a global variable (e.g. `fetch`, `localStorage`) inside testing environments.' },
      { name: 'afterEach()', description: 'Runs cleanup routines after each test case, here used to restore original global variables.' }
    ]
  },
  mocking: {
    title: '4. Mocking & Spies',
    description: 'Mock whole modules/files using `vi.mock()`, monitor object methods using `vi.spyOn()`, and control time using `vi.useFakeTimers()`.',
    sourcePath: 'src/examples/mocking.ts',
    testPath: 'src/examples/mocking.test.ts',
    sourceCode: `import { getCityWeather } from './weatherApi';

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
  } catch (error) {
    return 'Weather forecast unavailable. Plan with caution.';
  }
}

/**
 * Analytics Service for Spying Demo
 */
export const analytics = {
  sendEvent(eventName: string, metadata?: Record<string, unknown>): boolean {
    console.log(\`Event sent: \${eventName}\`, metadata);
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
}`,
    testCode: `import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
});`,
    keyConcepts: [
      { name: 'vi.mock()', description: 'Mocks a module (file/node_modules) and intercepts its imports within the test suite.' },
      { name: 'vi.mocked()', description: 'TypeScript helper that casts a mocked function to its mock type so methods like `.mockResolvedValueOnce` autocomplete.' },
      { name: 'vi.spyOn()', description: 'Creates a wrapper spy around an existing object method, allowing call tracking without overwriting its implementation.' },
      { name: 'vi.useFakeTimers()', description: 'Instructs Vitest to replace global clock APIs (like `setTimeout`, `setInterval`, `Date`) with control APIs.' },
      { name: 'vi.advanceTimersByTime()', description: 'Simulates the forward flow of time in milliseconds, executing pending timers instantly.' },
      { name: 'vi.useRealTimers()', description: 'Restores the original system clocks and timers after a timer test is complete.' }
    ]
  },
  asyncSnapshots: {
    title: '5. Async & Snapshots',
    description: 'Assert asynchronous promises with `resolves`/`rejects` and use Snapshot Testing to verify UI structural integrity.',
    sourcePath: 'src/examples/async-snapshots.tsx',
    testPath: 'src/examples/async-snapshots.test.tsx',
    sourceCode: `import React from 'react';

/**
 * Simulates an asynchronous data fetch that takes time
 */
export async function fetchDataWithDelay(value: string, delayMs = 100): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Value cannot be empty'));
      return;
    }
    setTimeout(() => {
      resolve(\`Data: \${value}\`);
    }, delayMs);
  });
}

/**
 * Simple user card details display for snapshot testing
 */
interface UserCardProps {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'subscriber';
  status: 'active' | 'suspended';
}

export function UserCard({ name, email, role, status }: UserCardProps) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm max-w-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-slate-800">{name}</h4>
        <span className={\`px-2 py-0.5 rounded text-xs font-semibold \${
          status === 'active' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-rose-100 text-rose-800'
        }\`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-2">\${email}</p>
      <div className="flex gap-2">
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium capitalize">
          Role: \${role}
        </span>
      </div>
    </div>
  );
}`,
    testCode: `import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { fetchDataWithDelay, UserCard } from './async-snapshots';

describe('Asynchronous Tests', () => {
  // Option 1: Using async/await
  it('should resolve data after a delay using async/await', async () => {
    const result = await fetchDataWithDelay('Hello');
    expect(result).toBe('Data: Hello');
  });

  // Option 2: Using resolves matcher
  it('should resolve data using resolves matcher', () => {
    return expect(fetchDataWithDelay('Vitest')).resolves.toBe('Data: Vitest');
  });

  // Option 3: Testing rejects for errors
  it('should reject when value is empty', () => {
    return expect(fetchDataWithDelay('')).rejects.toThrow('Value cannot be empty');
  });

  // Option 4: Testing rejects using try/catch
  it('should reject using try/catch', async () => {
    try {
      await fetchDataWithDelay('');
      // This line shouldn't be reached
      expect(true).toBe(false);
    } catch (error) {
      expect((error as Error).message).toBe('Value cannot be empty');
    }
  });
});

describe('Snapshot Testing (UserCard Component)', () => {
  it('should match standard snapshot for active admin', () => {
    const { container } = render(
      <UserCard 
        name="Sarah Connor" 
        email="sconnor@resistance.net" 
        role="admin" 
        status="active" 
      />
    );
    
    // Generates a separate folder __snapshots__ with the DOM structure
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match inline snapshot for suspended editor', () => {
    const { container } = render(
      <UserCard 
        name="John Doe" 
        email="jdoe@example.com" 
        role="editor" 
        status="suspended" 
      />
    );
    
    // Writes the snapshot structure directly into this file when run
    expect(container.firstChild).toMatchInlineSnapshot(\`
      <div
        class="p-4 rounded-lg border border-slate-200 bg-white shadow-sm max-w-sm"
      >
        <div
          class="flex justify-between items-start mb-2"
        >
          <h4
            class="font-bold text-slate-800"
          >
            John Doe
          </h4>
          <span
            class="px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800"
          >
            suspended
          </span>
        </div>
        <p
          class="text-sm text-slate-500 mb-2"
        >
          jdoe@example.com
        </p>
        <div
          class="flex gap-2"
        >
          <span
            class="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium capitalize"
          >
            Role: 
            editor
          </span>
        </div>
      </div>
    \`);
  });
});`,
    keyConcepts: [
      { name: 'async/await', description: 'Standard JavaScript syntax for resolving asynchronous operations inside test callbacks.' },
      { name: 'resolves', description: 'Vitest matcher that unwraps a Promise and allows chaining expected value assertions.' },
      { name: 'rejects', description: 'Vitest matcher that unwraps a rejected Promise and asserts the error thrown.' },
      { name: 'toMatchSnapshot()', description: 'Saves the serialized structure of the DOM element to a `.snap` file and compares it in future runs.' },
      { name: 'toMatchInlineSnapshot()', description: 'Writes the serialized DOM structure directly back into the test code file, avoiding extra snapshot files.' }
    ]
  }
};
