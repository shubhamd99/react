// Utility for logging to the UI
function log(message) {
  console.log(message);
  const logsDiv = document.getElementById("logs");
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = `> ${message}`;
  logsDiv.appendChild(entry);
  logsDiv.scrollTop = logsDiv.scrollHeight;
}

// Check for Service Worker support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        log("Service Worker registered with scope: " + registration.scope);
      })
      .catch(function (error) {
        log("Service Worker registration failed: " + error);
      });
  });
} else {
  log("Service Workers are not supported in this browser.");
}

// Network Status
function updateNetworkStatus() {
  const statusElem = document.getElementById("network-status");
  if (navigator.onLine) {
    statusElem.textContent = "Online";
    statusElem.className = "status-online";
    log("Network status: Online");
  } else {
    statusElem.textContent = "Offline";
    statusElem.className = "status-offline";
    log("Network status: Offline");
  }
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);
updateNetworkStatus();

// Install Prompt (A2HS)
let deferredPrompt;
const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  installBtn.style.display = "block";
  log("beforeinstallprompt event fired");
});

installBtn.addEventListener("click", () => {
  // Hide the app provided install promotion
  installBtn.style.display = "none";
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        log("User accepted the install prompt");
      } else {
        log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  }
});

window.addEventListener("appinstalled", () => {
  // Hide the app-provided install promotion
  installBtn.style.display = "none";
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  log("PWA was installed");
});

// Push Notifications
const notifyBtn = document.getElementById("notify-btn");
notifyBtn.addEventListener("click", () => {
  if (!("Notification" in window)) {
    log("This browser does not support desktop notification");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("Notifications already granted!");
    log("Notification permission already granted.");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification("Notifications granted!");
        log("Notification permission granted.");
      } else {
        log("Notification permission denied.");
      }
    });
  } else {
    log("Notification permission previously denied.");
  }
});

// Background Sync
const syncBtn = document.getElementById("sync-btn");
syncBtn.addEventListener("click", () => {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready
      .then(function (registration) {
        return registration.sync.register("my-sync-tag");
      })
      .then(function () {
        log("Background Sync registered with tag 'my-sync-tag'.");
        log(
          "Turn off wifi/network and wait a moment to test, or check console.",
        );
      })
      .catch(function (err) {
        log("Background Sync registration failed: " + err.message);
      });
  } else {
    log("Background Sync not supported in this browser.");
  }
});
