/**
 * LocalStorage Utility
 * Type-safe wrapper with TTL support, cross-tab sync, and error handling
 */

// Storage with expiration
export const setItem = (key, value, ttl = null) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
      ttl: ttl ? Date.now() + ttl : null,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error("LocalStorage quota exceeded");
    }
    console.error("Error setting localStorage item:", error);
    return false;
  }
};

// Get item with expiration check
export const getItem = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

    // Check if item has expired
    if (item.ttl && Date.now() > item.ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
};

// Remove item
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing localStorage item:", error);
    return false;
  }
};

// Clear all items
export const clear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

// Get all keys
export const getAllKeys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
};

// Get all items
export const getAllItems = () => {
  try {
    const items = {};
    const keys = getAllKeys();
    keys.forEach((key) => {
      items[key] = getItem(key);
    });
    return items;
  } catch (error) {
    console.error("Error getting all localStorage items:", error);
    return {};
  }
};

// Storage event listener for cross-tab sync
export const onStorageChange = (callback) => {
  const handler = (e) => {
    if (e.storageArea === localStorage) {
      callback({
        key: e.key,
        oldValue: e.oldValue ? JSON.parse(e.oldValue).value : null,
        newValue: e.newValue ? JSON.parse(e.newValue).value : null,
        url: e.url,
      });
    }
  };

  window.addEventListener("storage", handler);

  // Return cleanup function
  return () => window.removeEventListener("storage", handler);
};

// Check if key exists
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

// Update item (merge with existing)
export const updateItem = (key, updates) => {
  const current = getItem(key);
  if (current && typeof current === "object") {
    return setItem(key, { ...current, ...updates });
  }
  return false;
};

// Get item size in bytes
export const getItemSize = (key) => {
  const item = localStorage.getItem(key);
  return item ? new Blob([item]).size : 0;
};

// Get total storage size
export const getTotalSize = () => {
  let total = 0;
  const keys = getAllKeys();
  keys.forEach((key) => {
    total += getItemSize(key);
  });
  return total;
};

// Clean expired items
export const cleanExpired = () => {
  const keys = getAllKeys();
  let cleaned = 0;

  keys.forEach((key) => {
    const itemStr = localStorage.getItem(key);
    if (itemStr) {
      try {
        const item = JSON.parse(itemStr);
        if (item.ttl && Date.now() > item.ttl) {
          localStorage.removeItem(key);
          cleaned++;
        }
      } catch {
        // Skip invalid items
      }
    }
  });

  return cleaned;
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
  getAllKeys,
  getAllItems,
  onStorageChange,
  hasItem,
  updateItem,
  getItemSize,
  getTotalSize,
  cleanExpired,
};
