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
      resolve(`Data: ${value}`);
    }, delayMs);
  });
}
