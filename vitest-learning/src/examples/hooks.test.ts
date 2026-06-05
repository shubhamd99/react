import { describe, it, expect, vi, afterEach } from 'vitest';
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
});
