# Progressive Web App (PWA) Example

This project demonstrates a basic Progressive Web App (PWA) with core and advanced features, including offline support, installability, push notifications, and background sync.

## 🚀 Features

### 1. **Offline Support**

- **Technology**: Service Workers & Cache API.
- **Behavior**: The app caches essential assets (`index.html`, `styles.css`, `app.js`) on first load. If you go offline, the app continues to work by serving these files from the cache.
- **File**: `service-worker.js` (Install & Fetch events).

### 2. **Installability (Add to Home Screen)**

- **Technology**: Web App Manifest (`manifest.json`).
- **Behavior**: The app provides metadata (name, icons, theme color) allowing browsers to prompt users to "Install" the app. It looks and feels like a native app (standalone mode).
- **File**: `manifest.json`.

### 3. **Push Notifications**

- **Technology**: Notification API & Service Worker Push Event.
- **Behavior**: The app requests permission to send notifications. The Service Worker listens for `push` events and displays a system notification.
- **File**: `app.js` (Request Permission), `service-worker.js` (Handle Push).

### 4. **Background Sync**

- **Technology**: Background Sync API.
- **Behavior**: Allows the app to defer actions (like sending data) until the user has a stable internet connection.
- **File**: `app.js` (Register Sync), `service-worker.js` (Handle Sync Event).

---

## 📂 Project Structure

```text
pwa/
├── public/
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Styles including offline/online status
│   ├── app.js            # Main application logic (SW registration, UI)
│   ├── service-worker.js # background script for caching & offline logic
│   └── manifest.json     # App metadata for installation
├── package.json          # Project dependencies (serve)
└── README.md             # This file
```

---

## 🛠️ How to Run

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Start the Server**:

    ```bash
    npm start
    ```

    This runs `serve public` which serves the `public` folder on port 3000 (usually).

3.  **Open in Browser**:
    Go to [http://localhost:3000](http://localhost:3000).

---

## 🧪 How to Test PWA Level Features

### 1. Test Offline Capability

1.  Open Chrome DevTools (`F12` or Right Click -> Inspect).
2.  Go to the **Network** tab.
3.  Look for the dropdown that says "No throttling" and select **"Offline"**.
4.  Reload the page.
5.  **Result**: The page should still load! The Network tab will show resources coming from `(ServiceWorker)`.

### 2. Test Installation

1.  In Chrome, look at the right side of the address bar. You might see an icon that looks like a monitor with a down arrow (Install).
2.  Click it to install the app to your desktop.
3.  **Result**: The app opens in its own standalone window, without browser UI (address bar, bookmarks, etc.).

### 3. Test Push Notifications

1.  Click the **"Enable Notifications"** button in the app.
2.  Click **"Allow"** when the browser prompts you.
3.  Check the "Logs" section in the app to see "Notification permission granted."
    - _Note: To receive an actual push from a server, you'd need a backend. This demo shows the permission flow and service worker handler._

### 4. Test Background Sync

1.  Click **"Register Background Sync"**.
2.  The logs will show "Background Sync registered".
3.  This simulates a scenario where you might submit a form offline. The Service Worker listens for the `sync` event (tag: `my-sync-tag`) and will execute the task when conditions are met.
    - _Note: Triggering the actual sync event in DevTools: Application -> Service Workers -> Sync input box -> enter `my-sync-tag` -> click Sync._

---

## 📚 Core Concepts Explained

- **Manifest (`manifest.json`)**: A JSON file that tells the browser about your web application and how it should behave when 'installed' on the user's mobile device or desktop.
- **Service Worker (`service-worker.js`)**: A script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.
- **Cache API**: A storage mechanism for `Response` objects (HTTP responses), managed by the Service Worker to enable offline experiences.
- **Progressive Enhancement**: The idea that the app works for everyone (basic HTML/CSS), but users with modern browsers get extra features (PWA capabilities).
