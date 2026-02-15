# 🌐 Web Storage Examples

A comprehensive, interactive guide to all web storage options in modern browsers. Learn localStorage, sessionStorage, cookies, IndexedDB, and secure storage patterns through hands-on examples.

## 🚀 Features

### 💾 LocalStorage

- Basic CRUD operations
- Type-safe JSON serialization
- TTL/expiration support
- Cross-tab synchronization
- Storage quota monitoring
- Automatic cleanup of expired items

### ⏱️ SessionStorage

- Session-specific storage (isolated per tab)
- Unique session ID generation
- Form state preservation
- Comparison with localStorage

### 🍪 Cookies

- All cookie attributes (expires, path, domain, secure, sameSite)
- CRUD operations
- Security patterns
- CSRF protection with SameSite

### 🗄️ IndexedDB

- Database initialization and versioning
- Object stores with auto-increment keys
- CRUD operations with promises
- Indexes for efficient queries
- Transaction management
- Bulk operations
- Cursor-based iteration

### 🔒 Secure Storage

- AES encryption/decryption
- Secure token management
- Custom encryption keys
- XSS prevention patterns
- Security best practices

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

1. Start the development server
2. Navigate to `http://localhost:5173`
3. Click on any storage type in the navigation
4. Try the interactive examples
5. Open DevTools (F12) → Application tab to inspect storage

## 📊 Storage Comparison

| Feature           | LocalStorage | SessionStorage | Cookies      | IndexedDB |
| ----------------- | ------------ | -------------- | ------------ | --------- |
| **Capacity**      | ~5-10 MB     | ~5-10 MB       | ~4 KB        | ~50+ MB   |
| **Persistence**   | Forever      | Tab session    | Configurable | Forever   |
| **Scope**         | Origin       | Tab            | Origin       | Origin    |
| **Server Access** | ❌ No        | ❌ No          | ✅ Yes       | ❌ No     |
| **API Type**      | Sync         | Sync           | Sync         | Async     |
| **Data Type**     | String       | String         | String       | Any       |

## 🎓 Learning Path

### Beginner

1. Start with **LocalStorage** - simplest key-value storage
2. Try **SessionStorage** - understand session scope
3. Explore **Cookies** - learn about HTTP cookies

### Intermediate

4. Dive into **IndexedDB** - powerful client-side database
5. Practice with indexes and transactions

### Advanced

6. Master **Secure Storage** - encryption and security
7. Implement token management
8. Learn XSS prevention

## 🔧 Utilities

All storage utilities are located in `src/utils/`:

- `localStorage.js` - Enhanced localStorage with TTL
- `sessionStorage.js` - Session storage wrapper
- `cookies.js` - Cookie management
- `indexedDB.js` - IndexedDB operations
- `encryption.js` - AES encryption and secure storage
- `storageQuota.js` - Storage quota monitoring

## 🎨 Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **crypto-js** - Encryption library

## 💡 Tips

- Open multiple tabs to see cross-tab synchronization
- Check DevTools → Application to inspect all storage types
- Try setting TTL to see automatic expiration
- Test encryption with different keys
- Use the comparison tables to choose the right storage

## 🔒 Security Considerations

### ✅ DO:

- Encrypt sensitive data before storing
- Use HTTPS for all requests
- Implement token expiration
- Sanitize user input
- Use secure cookie attributes

### ❌ DON'T:

- Store passwords in plain text
- Use weak encryption keys
- Store encryption keys in localStorage
- Trust client-side storage for critical security

## 📱 Browser Compatibility

All storage mechanisms work in modern browsers:

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge (all versions)
- Opera 10.5+

## 🎯 Use Cases

- **LocalStorage**: User preferences, theme settings, cached data
- **SessionStorage**: Form data, wizard steps, temporary state
- **Cookies**: Authentication tokens, tracking, server communication
- **IndexedDB**: Offline apps, large datasets, complex queries
- **Secure Storage**: Sensitive data, tokens, encrypted information

## 📚 Resources

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN - IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MDN - Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Web.dev - Storage for the web](https://web.dev/storage-for-the-web/)

## 📄 License

MIT

## 🤝 Contributing

Feel free to explore, learn, and modify the code. This is a learning resource!

---

**Happy Learning! 🎉**
