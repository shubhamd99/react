/**
 * Storage Quota Utility
 * Monitor and estimate storage usage
 */

// Estimate storage quota (if available)
export const estimateQuota = async () => {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage,
        quota: estimate.quota,
        usagePercent: ((estimate.usage / estimate.quota) * 100).toFixed(2),
        available: estimate.quota - estimate.usage,
        usageInMB: (estimate.usage / (1024 * 1024)).toFixed(2),
        quotaInMB: (estimate.quota / (1024 * 1024)).toFixed(2),
        availableInMB: (
          (estimate.quota - estimate.usage) /
          (1024 * 1024)
        ).toFixed(2),
      };
    } catch (error) {
      console.error("Error estimating quota:", error);
      return null;
    }
  }
  return null;
};

// Check if persistent storage is available
export const checkPersistentStorage = async () => {
  if ("storage" in navigator && "persist" in navigator.storage) {
    try {
      const isPersisted = await navigator.storage.persisted();
      return isPersisted;
    } catch (error) {
      console.error("Error checking persistent storage:", error);
      return false;
    }
  }
  return false;
};

// Request persistent storage
export const requestPersistentStorage = async () => {
  if ("storage" in navigator && "persist" in navigator.storage) {
    try {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    } catch (error) {
      console.error("Error requesting persistent storage:", error);
      return false;
    }
  }
  return false;
};

// Get localStorage size
export const getLocalStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return {
    bytes: total,
    kb: (total / 1024).toFixed(2),
    mb: (total / (1024 * 1024)).toFixed(2),
  };
};

// Get sessionStorage size
export const getSessionStorageSize = () => {
  let total = 0;
  for (let key in sessionStorage) {
    if (sessionStorage.hasOwnProperty(key)) {
      total += sessionStorage[key].length + key.length;
    }
  }
  return {
    bytes: total,
    kb: (total / 1024).toFixed(2),
    mb: (total / (1024 * 1024)).toFixed(2),
  };
};

// Get cookies size
export const getCookiesSize = () => {
  const total = document.cookie.length;
  return {
    bytes: total,
    kb: (total / 1024).toFixed(2),
    mb: (total / (1024 * 1024)).toFixed(2),
  };
};

// Get IndexedDB size estimate
export const getIndexedDBSize = async () => {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      // This is an approximation as we can't get exact IndexedDB size
      const localStorageSize = getLocalStorageSize().bytes;
      const sessionStorageSize = getSessionStorageSize().bytes;
      const cookiesSize = getCookiesSize().bytes;

      const indexedDBSize =
        estimate.usage - localStorageSize - sessionStorageSize - cookiesSize;

      return {
        bytes: Math.max(0, indexedDBSize),
        kb: Math.max(0, indexedDBSize / 1024).toFixed(2),
        mb: Math.max(0, indexedDBSize / (1024 * 1024)).toFixed(2),
      };
    } catch (error) {
      console.error("Error estimating IndexedDB size:", error);
      return null;
    }
  }
  return null;
};

// Get all storage sizes
export const getAllStorageSizes = async () => {
  const quota = await estimateQuota();
  const localStorage = getLocalStorageSize();
  const sessionStorage = getSessionStorageSize();
  const cookies = getCookiesSize();
  const indexedDB = await getIndexedDBSize();
  const isPersisted = await checkPersistentStorage();

  return {
    quota,
    localStorage,
    sessionStorage,
    cookies,
    indexedDB,
    isPersisted,
  };
};

// Format bytes to human readable
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Check if storage is available
export const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const test = "__storage_test__";
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  estimateQuota,
  checkPersistentStorage,
  requestPersistentStorage,
  getLocalStorageSize,
  getSessionStorageSize,
  getCookiesSize,
  getIndexedDBSize,
  getAllStorageSizes,
  formatBytes,
  isStorageAvailable,
};
