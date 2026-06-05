import { describe, it, expect, beforeEach } from 'vitest';
import { add, subtract, reverseString, findUserById, calculateDiscount } from './basic';
import type { User } from './basic';

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
});
