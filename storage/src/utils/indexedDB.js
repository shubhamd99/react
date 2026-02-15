/**
 * IndexedDB Utility
 * Comprehensive wrapper for IndexedDB operations
 */

const DB_NAME = "StorageExamplesDB";
const DB_VERSION = 1;
const STORE_NAME = "items";

// Initialize database
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });

        // Create indexes
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("category", "category", { unique: false });
        objectStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
};

// Add item
export const addItem = async (data) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);

      const item = {
        ...data,
        timestamp: Date.now(),
      };

      const request = objectStore.add(item);

      request.onsuccess = () => {
        resolve(request.result); // Returns the key
      };

      request.onerror = () => {
        reject(new Error("Failed to add item"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Get item by ID
export const getItem = async (id) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get item"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

// Get all items
export const getAllItems = async () => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get all items"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};

// Update item
export const updateItem = async (id, updates) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);

      // First get the existing item
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = () => {
        const item = getRequest.result;
        if (!item) {
          reject(new Error("Item not found"));
          return;
        }

        // Update the item
        const updatedItem = {
          ...item,
          ...updates,
          id, // Preserve the ID
          timestamp: Date.now(),
        };

        const updateRequest = objectStore.put(updatedItem);

        updateRequest.onsuccess = () => {
          resolve(updatedItem);
        };

        updateRequest.onerror = () => {
          reject(new Error("Failed to update item"));
        };
      };

      getRequest.onerror = () => {
        reject(new Error("Failed to get item for update"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(new Error("Failed to delete item"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

// Clear all items
export const clearAll = async () => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(new Error("Failed to clear all items"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error clearing all items:", error);
    throw error;
  }
};

// Get items by index
export const getItemsByIndex = async (indexName, value) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const index = objectStore.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get items by index: ${indexName}`));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error getting items by index:", error);
    throw error;
  }
};

// Bulk add items
export const bulkAddItems = async (items) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const keys = [];

      items.forEach((item) => {
        const request = objectStore.add({
          ...item,
          timestamp: Date.now(),
        });

        request.onsuccess = () => {
          keys.push(request.result);
        };
      });

      transaction.oncomplete = () => {
        db.close();
        resolve(keys);
      };

      transaction.onerror = () => {
        reject(new Error("Failed to bulk add items"));
      };
    });
  } catch (error) {
    console.error("Error bulk adding items:", error);
    throw error;
  }
};

// Count items
export const countItems = async () => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to count items"));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error counting items:", error);
    throw error;
  }
};

// Cursor iteration
export const iterateItems = async (callback) => {
  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.openCursor();
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const result = callback(cursor.value);
          if (result !== false) {
            results.push(cursor.value);
          }
          cursor.continue();
        }
      };

      transaction.oncomplete = () => {
        db.close();
        resolve(results);
      };

      transaction.onerror = () => {
        reject(new Error("Failed to iterate items"));
      };
    });
  } catch (error) {
    console.error("Error iterating items:", error);
    throw error;
  }
};

export default {
  initDB,
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
  clearAll,
  getItemsByIndex,
  bulkAddItems,
  countItems,
  iterateItems,
};
