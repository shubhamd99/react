import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { UserCard } from './async-snapshots';
import { fetchDataWithDelay } from './asyncHelpers';

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
    expect(container.firstChild).toMatchInlineSnapshot(`
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
    `);
  });
});
