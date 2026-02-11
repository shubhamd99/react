const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// VAPID keys should be generated once.
// In a real app, store these securely (e.g. environment variables).
// You can generate them with: webpush.generateVAPIDKeys()
const vapidKeys = webpush.generateVAPIDKeys();
const publicVapidKey = vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey,
);

console.log("VAPID Public Key:", publicVapidKey);
console.log("VAPID Private Key:", privateVapidKey);

// Store subscription (in memory for demo purposes)
let subscription = null;

// Endpoint to get the VAPID Public Key
app.get("/api/vapidPublicKey", (req, res) => {
  res.json({ publicKey: publicVapidKey });
});

// Endpoint to store the subscription
app.post("/api/subscribe", (req, res) => {
  subscription = req.body;
  console.log("Got subscription:", subscription);
  res.status(201).json({});
});

// Endpoint to trigger a push notification
app.post("/api/send-notification", (req, res) => {
  const payload = JSON.stringify({
    title: "Push Test",
    body: "This is a test notification from the server!",
  });

  if (!subscription) {
    return res
      .status(400)
      .json({ error: "No subscription found. Enable notifications first." });
  }

  webpush
    .sendNotification(subscription, payload)
    .then((result) => {
      console.log("Push sent successfully");
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error("Error sending push", err);
      res.status(500).json({ error: "Error sending push notification" });
    });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
