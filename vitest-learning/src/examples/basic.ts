/**
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
    throw new Error(`User with ID ${id} not found`);
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
}
