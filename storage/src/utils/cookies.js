/**
 * Cookie Utility
 * Comprehensive cookie management with all attributes
 */

// Set cookie with options
export const setCookie = (name, value, options = {}) => {
  try {
    const {
      expires = null, // Date object or days (number)
      maxAge = null, // seconds
      path = "/",
      domain = null,
      secure = false,
      _httpOnly = false, // Note: Cannot be set via JavaScript
      sameSite = "Lax", // 'Strict', 'Lax', or 'None'
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(JSON.stringify(value))}`;

    // Handle expires
    if (expires) {
      if (typeof expires === "number") {
        // Convert days to date
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else if (expires instanceof Date) {
        cookieString += `; expires=${expires.toUTCString()}`;
      }
    }

    // Handle max-age
    if (maxAge !== null) {
      cookieString += `; max-age=${maxAge}`;
    }

    // Path
    if (path) {
      cookieString += `; path=${path}`;
    }

    // Domain
    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    // Secure
    if (secure) {
      cookieString += "; secure";
    }

    // SameSite
    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return false;
  }
};

// Get cookie
export const getCookie = (name) => {
  try {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        const value = cookie.substring(nameEQ.length);
        return JSON.parse(decodeURIComponent(value));
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

// Remove cookie
export const removeCookie = (name, options = {}) => {
  const { path = "/", domain = null } = options;

  setCookie(name, "", {
    expires: new Date(0),
    path,
    domain,
  });
  return true;
};

// Get all cookies
export const getAllCookies = () => {
  try {
    const cookies = {};
    const cookieArray = document.cookie.split(";");

    cookieArray.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        try {
          cookies[decodeURIComponent(name)] = JSON.parse(
            decodeURIComponent(value),
          );
        } catch {
          cookies[decodeURIComponent(name)] = decodeURIComponent(value);
        }
      }
    });

    return cookies;
  } catch (error) {
    console.error("Error getting all cookies:", error);
    return {};
  }
};

// Check if cookie exists
export const hasCookie = (name) => {
  return getCookie(name) !== null;
};

// Update cookie (preserves existing options)
export const updateCookie = (name, value, options = {}) => {
  return setCookie(name, value, options);
};

// Clear all cookies
export const clearAllCookies = () => {
  try {
    const cookies = getAllCookies();
    Object.keys(cookies).forEach((name) => {
      removeCookie(name);
      // Also try with different path
      removeCookie(name, { path: "/" });
    });
    return true;
  } catch (error) {
    console.error("Error clearing all cookies:", error);
    return false;
  }
};

// Get cookie size
export const getCookieSize = (name) => {
  const cookie = getCookie(name);
  return cookie ? new Blob([JSON.stringify(cookie)]).size : 0;
};

// Get total cookies size
export const getTotalCookiesSize = () => {
  return new Blob([document.cookie]).size;
};

// Parse cookie string
export const parseCookieString = (cookieString) => {
  const cookies = {};
  const pairs = cookieString.split(";");

  pairs.forEach((pair) => {
    const [name, value] = pair.trim().split("=");
    if (name && value) {
      try {
        cookies[decodeURIComponent(name)] = JSON.parse(
          decodeURIComponent(value),
        );
      } catch {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }
  });

  return cookies;
};

export default {
  setCookie,
  getCookie,
  removeCookie,
  getAllCookies,
  hasCookie,
  updateCookie,
  clearAllCookies,
  getCookieSize,
  getTotalCookiesSize,
  parseCookieString,
};
