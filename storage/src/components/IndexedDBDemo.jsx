import { useState, useEffect } from "react";
import * as db from "../utils/indexedDB";
import "./Demo.css";

const IndexedDBDemo = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    loadItems();
    loadCount();
  }, []);

  const loadItems = async () => {
    try {
      const allItems = await db.getAllItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  const loadCount = async () => {
    try {
      const count = await db.countItems();
      setItemCount(count);
    } catch (error) {
      console.error("Error counting items:", error);
    }
  };

  const handleAdd = async () => {
    if (!name || !category) {
      alert("Please enter name and category");
      return;
    }

    try {
      await db.addItem({
        name,
        category,
        description,
      });

      setName("");
      setCategory("");
      setDescription("");
      loadItems();
      loadCount();
    } catch (error) {
      alert("Error adding item: " + error.message);
    }
  };

  const handleUpdate = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    try {
      await db.updateItem(id, {
        name: item.name,
        category: item.category,
        description: item.description,
      });

      setEditingId(null);
      loadItems();
    } catch (error) {
      alert("Error updating item: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;

    try {
      await db.deleteItem(id);
      loadItems();
      loadCount();
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Clear all items?")) return;

    try {
      await db.clearAll();
      loadItems();
      loadCount();
    } catch (error) {
      alert("Error clearing items: " + error.message);
    }
  };

  const handleFilterByCategory = async () => {
    if (!filterCategory) {
      loadItems();
      return;
    }

    try {
      const filtered = await db.getItemsByIndex("category", filterCategory);
      setItems(filtered);
    } catch (error) {
      alert("Error filtering items: " + error.message);
    }
  };

  const handleBulkAdd = async () => {
    const sampleData = [
      {
        name: "Sample Item 1",
        category: "Electronics",
        description: "A sample electronic item",
      },
      {
        name: "Sample Item 2",
        category: "Books",
        description: "A sample book",
      },
      {
        name: "Sample Item 3",
        category: "Electronics",
        description: "Another electronic item",
      },
      {
        name: "Sample Item 4",
        category: "Clothing",
        description: "A sample clothing item",
      },
      { name: "Sample Item 5", category: "Books", description: "Another book" },
    ];

    try {
      await db.bulkAddItems(sampleData);
      loadItems();
      loadCount();
      alert("Added 5 sample items!");
    } catch (error) {
      alert("Error bulk adding items: " + error.message);
    }
  };

  const updateItemField = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🗄️ IndexedDB Demo</h2>
        <p>Powerful client-side database with indexes and transactions</p>
      </div>

      {/* Database Info */}
      <div className="info-card">
        <h3>📊 Database Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Total Items:</span>
            <span className="info-value">{itemCount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Categories:</span>
            <span className="info-value">{categories.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database:</span>
            <span className="info-value">StorageExamplesDB</span>
          </div>
        </div>
      </div>

      {/* Add Item Form */}
      <div className="form-card">
        <h3>➕ Add Item</h3>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Laptop"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Electronics"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            rows="3"
          />
        </div>
        <div className="button-group">
          <button onClick={handleAdd} className="btn btn-primary">
            Add Item
          </button>
          <button onClick={handleBulkAdd} className="btn btn-secondary">
            Add 5 Sample Items
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-card">
        <h3>🔍 Filter by Category</h3>
        <div className="filter-group">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleFilterByCategory}
            className="btn btn-secondary"
          >
            Apply Filter
          </button>
          <button onClick={loadItems} className="btn btn-secondary">
            Clear Filter
          </button>
        </div>
      </div>

      {/* Stored Items */}
      <div className="items-card">
        <div className="items-header">
          <h3>📦 Stored Items ({items.length})</h3>
          <button onClick={handleClearAll} className="btn btn-danger">
            Clear All
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-message">No items in database</p>
        ) : (
          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="item indexeddb-item">
                {editingId === item.id ? (
                  <div className="item-edit">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateItemField(item.id, "name", e.target.value)
                      }
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) =>
                        updateItemField(item.id, "category", e.target.value)
                      }
                      placeholder="Category"
                    />
                    <textarea
                      value={item.description || ""}
                      onChange={(e) =>
                        updateItemField(item.id, "description", e.target.value)
                      }
                      placeholder="Description"
                      rows="2"
                    />
                    <div className="button-group">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="btn btn-small btn-primary"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-small btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="item-content">
                      <div className="item-header">
                        <div className="item-key">{item.name}</div>
                        <span className="item-badge">{item.category}</span>
                      </div>
                      {item.description && (
                        <div className="item-description">
                          {item.description}
                        </div>
                      )}
                      <div className="item-meta">
                        ID: {item.id} | Added:{" "}
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="button-group">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="btn btn-small btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="features-card">
        <h3>✨ Features Demonstrated</h3>
        <ul>
          <li>✅ Database initialization and versioning</li>
          <li>✅ Object stores with auto-increment keys</li>
          <li>✅ CRUD operations with promises</li>
          <li>✅ Indexes for efficient queries (category, name, timestamp)</li>
          <li>✅ Transaction management</li>
          <li>✅ Bulk operations</li>
          <li>✅ Filtering by index</li>
          <li>✅ Complex data structures</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>
            IndexedDB can store much larger amounts of data than localStorage
          </li>
          <li>All operations are asynchronous (promise-based)</li>
          <li>Supports indexes for fast queries</li>
          <li>Can store complex objects, files, and blobs</li>
          <li>
            Check DevTools → Application → IndexedDB to inspect the database
          </li>
          <li>Perfect for offline-first applications</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexedDBDemo;
