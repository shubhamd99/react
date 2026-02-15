/**
 * SessionStorage Utility
 * Type-safe wrapper for session-based storage
 */

// Set item
export const setItem = (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error("SessionStorage quota exceeded");
    }
    console.error("Error setting sessionStorage item:", error);
    return false;
  }
};

// Get item
export const getItem = (key) => {
  try {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    return item.value;
  } catch (error) {
    console.error("Error getting sessionStorage item:", error);
    return null;
  }
};

// Remove item
export const removeItem = (key) => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing sessionStorage item:", error);
    return false;
  }
};

// Clear all items
export const clear = () => {
  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
    return false;
  }
};

// Get all keys
export const getAllKeys = () => {
  try {
    return Object.keys(sessionStorage);
  } catch (error) {
    console.error("Error getting sessionStorage keys:", error);
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
    console.error("Error getting all sessionStorage items:", error);
    return {};
  }
};

// Check if key exists
export const hasItem = (key) => {
  return sessionStorage.getItem(key) !== null;
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
  const item = sessionStorage.getItem(key);
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

// Get session ID (unique per tab)
export const getSessionId = () => {
  const SESSION_ID_KEY = "__session_id__";
  let sessionId = getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
  getAllKeys,
  getAllItems,
  hasItem,
  updateItem,
  getItemSize,
  getTotalSize,
  getSessionId,
};
