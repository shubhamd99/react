/**
 * Encryption Utility
 * AES encryption/decryption for secure storage
 */

import CryptoJS from "crypto-js";

// Default encryption key (in production, use environment variable)
const DEFAULT_KEY = "your-secret-key-change-in-production";

// Encrypt data
export const encrypt = (data, key = DEFAULT_KEY) => {
  try {
    const dataString = typeof data === "string" ? data : JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataString, key).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// Decrypt data
export const decrypt = (encryptedData, key = DEFAULT_KEY) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    // Try to parse as JSON
    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Generate random key
export const generateKey = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
};

// Hash data (one-way)
export const hash = (data) => {
  try {
    const dataString = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.SHA256(dataString).toString();
  } catch (error) {
    console.error("Hashing error:", error);
    return null;
  }
};

// Secure localStorage
export const secureLocalStorage = {
  setItem: (key, value, encryptionKey = DEFAULT_KEY) => {
    try {
      const encrypted = encrypt(value, encryptionKey);
      if (encrypted) {
        localStorage.setItem(key, encrypted);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Secure localStorage set error:", error);
      return false;
    }
  },

  getItem: (key, encryptionKey = DEFAULT_KEY) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return decrypt(encrypted, encryptionKey);
    } catch (error) {
      console.error("Secure localStorage get error:", error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Secure localStorage remove error:", error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Secure localStorage clear error:", error);
      return false;
    }
  },
};

// Secure sessionStorage
export const secureSessionStorage = {
  setItem: (key, value, encryptionKey = DEFAULT_KEY) => {
    try {
      const encrypted = encrypt(value, encryptionKey);
      if (encrypted) {
        sessionStorage.setItem(key, encrypted);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Secure sessionStorage set error:", error);
      return false;
    }
  },

  getItem: (key, encryptionKey = DEFAULT_KEY) => {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      return decrypt(encrypted, encryptionKey);
    } catch (error) {
      console.error("Secure sessionStorage get error:", error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Secure sessionStorage remove error:", error);
      return false;
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Secure sessionStorage clear error:", error);
      return false;
    }
  },
};

// Token management
export const tokenManager = {
  // Store access token
  setAccessToken: (token, encryptionKey = DEFAULT_KEY) => {
    return secureLocalStorage.setItem("access_token", token, encryptionKey);
  },

  // Get access token
  getAccessToken: (encryptionKey = DEFAULT_KEY) => {
    return secureLocalStorage.getItem("access_token", encryptionKey);
  },

  // Store refresh token
  setRefreshToken: (token, encryptionKey = DEFAULT_KEY) => {
    return secureLocalStorage.setItem("refresh_token", token, encryptionKey);
  },

  // Get refresh token
  getRefreshToken: (encryptionKey = DEFAULT_KEY) => {
    return secureLocalStorage.getItem("refresh_token", encryptionKey);
  },

  // Clear all tokens
  clearTokens: () => {
    secureLocalStorage.removeItem("access_token");
    secureLocalStorage.removeItem("refresh_token");
    return true;
  },

  // Check if user is authenticated
  isAuthenticated: (encryptionKey = DEFAULT_KEY) => {
    const token = secureLocalStorage.getItem("access_token", encryptionKey);
    return token !== null;
  },
};

// XSS Prevention helpers
export const sanitizeInput = (input) => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

export const escapeHtml = (text) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

export default {
  encrypt,
  decrypt,
  generateKey,
  hash,
  secureLocalStorage,
  secureSessionStorage,
  tokenManager,
  sanitizeInput,
  escapeHtml,
};
