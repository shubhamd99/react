import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { User, Send, Bell } from "lucide-react";

// Shared state using a BehaviorSubject
const notificationStore$ = new BehaviorSubject<string[]>([]);

const SubjectSync: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Component A: Syncing with the store
    const sub = notificationStore$.subscribe(setNotifications);
    return () => sub.unsubscribe();
  }, []);

  const addNotification = () => {
    if (!inputText) return;
    const current = notificationStore$.getValue();
    notificationStore$.next([...current, inputText]);
    setInputText("");
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">BehaviorSubject State</h3>
        <p className="text-slate-400 mb-6">
          A <code>BehaviorSubject</code> stores the current value and emits it
          to new subscribers immediately. This is often used for creating simple
          global state management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dispatcher Side */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="flex items-center gap-2 text-sm font-bold text-fuchsia-500 uppercase mb-4">
              <User size={16} /> Notification Dispatcher
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
              <button onClick={addNotification} className="btn btn-primary p-2">
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Observer Side */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="flex items-center gap-2 text-sm font-bold text-cyan-400 uppercase mb-4">
              <Bell size={16} /> Subscription View
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {notifications.length === 0 ? (
                <div className="text-slate-600 italic text-sm text-center py-4">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/80 p-2 rounded border border-slate-700 text-xs text-slate-300"
                  >
                    {n}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Implementation Idea
        </h4>
        <pre className="text-sm">
          {`// 1. Create a shared subject
const store$ = new BehaviorSubject([]);

// 2. Components subscribe to it
useEffect(() => {
  const sub = store$.subscribe(val => setState(val));
  return () => sub.unsubscribe();
}, []);

// 3. Update state from anywhere
store$.next([...oldVal, newVal]);`}
        </pre>
      </div>
    </div>
  );
};

export default SubjectSync;
