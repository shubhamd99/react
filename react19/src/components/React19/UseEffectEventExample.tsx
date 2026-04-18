import React, { useState, useEffect, useRef, useMemo } from "react";

// Polyfill for useEffectEvent since it's experimental and might not be exposed natively
// in this React 19 build. (As seen in Jack Herrington's React 19.2 Explainer)
function useEffectEventMyVersion<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return function (...args: Parameters<T>): ReturnType<T> {
    return fnRef.current(...args);
  } as T;
}

// Use native if available, fallback to polyfill (for standard effects)
const useEffectEvent =
  (React as any).useEffectEvent ||
  (React as any).experimental_useEffectEvent ||
  useEffectEventMyVersion;

const NAMES = [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Jane", lastName: "Smith" },
  { firstName: "Jim", lastName: "Beam" },
  { firstName: "Jill", lastName: "Johnson" },
];

function SortableTable({
  data,
  sortFunction,
}: {
  data: any[];
  sortFunction: (a: any, b: any) => number;
}) {
  console.log("SortableTable rendered", Date.now());
  const sortedData = useMemo(() => {
    return [...data].sort(sortFunction);
  }, [data, sortFunction]);

  return (
    <table className="example-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, i) => (
          <tr key={i}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const MemoizedSortableTable = React.memo(SortableTable);

export default function UseEffectEventExample() {
  const [user, setUser] = useState("Foo");
  const [loginMessage, setLoginMessage] = useState("");
  const [text, setText] = useState<string>("foo");
  const [sortField, setSortField] = useState<"firstName" | "lastName">(
    "firstName",
  );

  // Chat interval example - isolate reactive value 'user'
  const evtCallback = useEffectEvent((time: number) => {
    setLoginMessage(`${user} logged in ${time} seconds ago`);
  });

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      evtCallback(count++);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 'user' is NOT in the dependency array

  // Sort function example using the POLYFILL to bypass React's strict render-phase crash.
  // Jack Herrington uses this to demonstrate that if you try to use useEffectEvent
  // for derived state (like sorting), the component WON'T re-render when sortField changes!
  const sortFunction = useEffectEventMyVersion(
    (a: (typeof NAMES)[0], b: (typeof NAMES)[0]) => {
      if (sortField === "firstName") {
        return a.firstName.localeCompare(b.firstName);
      }
      return a.lastName.localeCompare(b.lastName);
    },
  );

  return (
    <div className="example-box">
      <h3>useEffectEvent (React 19.2)</h3>
      <p>
        Isolate reactive values without triggering re-renders or breaking
        memoization.
      </p>

      <div style={{ marginTop: "15px" }}>
        <strong>1. Interval & Latest State</strong>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Reads 'user' state via useEffectEvent without putting it in useEffect
          dependencies.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Username"
            style={{ maxWidth: "150px" }}
          />
          <span>{loginMessage}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid #eee",
        }}
      >
        <strong>
          2. Demonstrating useEffectEvent for Derived State (Gimmick)
        </strong>
        <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>
          Notice what happens when you click the buttons below. The table{" "}
          <strong>won't</strong> update! The polyfill isolates the{" "}
          <code>sortField</code> state, meaning{" "}
          <code>MemoizedSortableTable</code> never receives a new function
          reference to trigger a re-render. Native React 19 actively blocks this
          by throwing an error if <code>useEffectEvent</code> is called during
          render.
        </p>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to test render isolation"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button onClick={() => setSortField("firstName")}>
            Sort by First Name
          </button>
          <button onClick={() => setSortField("lastName")}>
            Sort by Last Name
          </button>
        </div>
        <MemoizedSortableTable data={NAMES} sortFunction={sortFunction} />
      </div>
    </div>
  );
}
