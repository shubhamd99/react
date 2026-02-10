import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const BroadcastDemo = () => {
  const channelRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channelName, setChannelName] = useState("demo_channel");

  useEffect(() => {
    // Initialize Broadcast Channel
    const bc = new BroadcastChannel(channelName);
    channelRef.current = bc;

    bc.onmessage = (event) => {
      setMessages((prev) => [
        ...prev,
        {
          text: event.data,
          source: "Remote",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    };

    return () => {
      bc.close();
    };
  }, [channelName]);

  const sendMessage = () => {
    if (channelRef.current && newMessage) {
      channelRef.current.postMessage(newMessage);
      setMessages((prev) => [
        ...prev,
        {
          text: newMessage,
          source: "Me",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="container">
      <h1>Broadcast Channel API</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Allows communication between different browsing contexts (tabs, windows,
        iframes) on the same origin.
        <strong style={{ color: "var(--accent)" }}>
          {" "}
          Open this page in a new tab to test!
        </strong>
      </p>

      <div className="card">
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <label>Channel Name:</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div
          style={{
            height: "300px",
            background: "var(--bg-primary)",
            borderRadius: "0.5rem",
            padding: "1rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                marginTop: "2rem",
              }}
            >
              No messages yet. Send one or open another tab!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.source === "Me" ? "flex-end" : "flex-start",
                maxWidth: "70%",
                background:
                  msg.source === "Me" ? "var(--accent)" : "var(--bg-secondary)",
                color: msg.source === "Me" ? "#0f172a" : "var(--text-primary)",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                borderBottomRightRadius:
                  msg.source === "Me" ? "0.25rem" : "1rem",
                borderBottomLeftRadius:
                  msg.source === "Me" ? "1rem" : "0.25rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  opacity: 0.7,
                  marginBottom: "0.25rem",
                }}
              >
                {msg.source} • {msg.time}
              </div>
              {msg.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
          <button onClick={sendMessage} className="btn btn-primary">
            <Send size={18} /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BroadcastDemo;
