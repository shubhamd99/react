# Background Workers & Browser APIs Demo

This React application acts as a playground and reference implementation for advanced browser capabilities: **Web Workers**, **Service Workers**, the **Cache Storage API**, and the **Broadcast Channel API**.

It demonstrates how to offload heavy tasks, enable offline capabilities, manage caching programmatically, and synchronize state across tabs.

---

## 📚 Technologies & Concepts

### 1. Web Workers

**Definition:**
Web Workers provide a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface.

**Use Cases:**

- Heavy mathematical computations
- Image/Video processing
- Complex data sorting or parsing
- High-frequency data polling

**Code Snippet (Worker Creation):**

```javascript
// main.js
const worker = new Worker(new URL("./worker.js", import.meta.url));

worker.onmessage = (e) => {
  console.log("Result from worker:", e.data);
};

worker.postMessage({ type: "START_HEAVY_TASK" });
```

```javascript
// worker.js
self.onmessage = (e) => {
  if (e.data.type === "START_HEAVY_TASK") {
    // Perform calculation...
    self.postMessage(result);
  }
};
```

---

### 2. Service Workers

**Definition:**
A Service Worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. It acts as a network proxy.

**Use Cases:**

- **Offline Support:** Caching assets and serving them when the network fails.
- **Performance:** Serving cached assets faster than the network.
- **Background Sync:** Deferring actions until the user has stable connectivity.
- **Push Notifications:** Handling push events from a server.

**Code Snippet (Intercepting Requests):**

```javascript
// sw.js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request);
    }),
  );
});
```

---

### 🆚 Web Workers vs. Service Workers

While both run in background threads, their purposes are distinct:

| Feature                  | Web Worker                           | Service Worker                                                |
| :----------------------- | :----------------------------------- | :------------------------------------------------------------ |
| **Primary Purpose**      | Heavy computation & data processing  | Network proxy, caching, offline capabilities                  |
| **Lifespan**             | Tied to the tab/page that created it | Independent of the page; persists even when browser is closed |
| **DOM Access**           | No                                   | No                                                            |
| **Network Interception** | No                                   | Yes (via `fetch` event)                                       |
| **Communication**        | `postMessage` with Main Thread       | `postMessage`, `BroadcastChannel`, `MessageChannel`           |
| **Use Case Example**     | Image filtering, big data sorting    | Offline mode, Push Notifications, Background Sync             |

---

### 3. Cache Storage API

**Definition:**
The Cache API is a system for storing and retrieving network requests and their corresponding responses. It works in both Service Workers and the main window scope. Unlike `localStorage`, it can store full `Response` objects, including headers and binary data.

**Key Difference from HTTP Cache:**

- **HTTP Cache**: Managed by the browser headers (`Cache-Control`), implicit.
- **Cache API**: Managed by JavaScript logic, explicit control over what creates, stays, or leaves the cache.

**Code Snippet (Main Thread):**

```javascript
// Open (or create) a cache
const cache = await caches.open("my-app-v1");

// Add a file to cache
await cache.add("/assets/logo.png");

// Retrieve from cache
const response = await cache.match("/assets/logo.png");
```

---

### 4. Broadcast Channel API

**Definition:**
The Broadcast Channel API allows communication between different browsing contexts (tabs, windows, frames, iframes) of the same origin (same protocol, domain, and port).

**Use Cases:**

- **Logout Sync:** User logs out in one tab; other tabs detect this and redirect to login.
- **State Sync:** User updates a theme preference; all open tabs switch theme instantly.
- **Data Refresh:** One tab saves new data; tells other tabs to refresh their lists.

**Code Snippet:**

```javascript
// Valid in all tabs of the same origin
const channel = new BroadcastChannel("app_channel");

// Sender (Tab A)
channel.postMessage("User logged out");

// Receiver (Tab B)
channel.onmessage = (event) => {
  if (event.data === "User logged out") {
    window.location.href = "/login";
  }
};
```

---

## 🛠 Project Structure

```bash
src/
├── components/     # Shared UI components (Layout, etc.)
├── pages/          # Interactive Demos
│   ├── WebWorkerDemo.jsx    # Compare Main Thread vs Worker Thread performance
│   ├── ServiceWorkerDemo.jsx # Register SW, intercept network, 2-way messaging
│   ├── CachingDemo.jsx      # UI Dashboard to CRUD the Cache Storage
│   └── BroadcastDemo.jsx    # Real-time multi-tab chat/sync demo
├── workers/        # Dedicated Worker scripts
│   └── heavyWorker.js       # The "heavy" logic running in background
├── App.jsx         # Main application routing
└── main.jsx        # Entry point

public/
└── sw.js           # The Service Worker script (served from root)
```

## 🚀 Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Navigate to `http://localhost:5173`.
    _Tip: Open the app in **two different tabs** to test the Broadcast Channel and Service Worker capabilities effectively._

## ⚠️ Important Notes

- **Service Workers in Dev:** Service workers behave differently in development (often bypassing cache or reloading frequently). In Chrome verify via `Application > Service Workers`.
- **HTTPS Restriction:** Service Workers only work on **HTTPS** or `localhost`.
