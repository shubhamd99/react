import React, { useRef, createContext, use } from "react";

// ==========================================
// REACT 19 FEATURE: REF AS PROP & SIMPLIFIED CONTEXT & use()
// ==========================================
// What is Ref as Prop?
// Historically, you could NOT pass a 'ref' to a custom component. If you wanted
// a parent to focus an input nestled deep inside a child component, you were forced
// to wrap the child in `forwardRef()`, which was messy and confusing.
// React 19 fixes this: custom components can now accept `ref` strictly as a standard prop!
//
// What is Simplified Context?
// Rather than wrapping your app in <ThemeContext.Provider value="...">, you can
// now remove the `.Provider` completely and just write <ThemeContext value="...">!
//
// What is the use() hook?
// It replaces `useContext()` to read context variables.
// The main superpower of `use()` is that unlike ANY other hook in React,
// you CAN safely place it inside loops or if-statements!
// ==========================================

const ThemeContext = createContext("light");

const MyInput = ({
  ref,
}: {
  ref: React.RefObject<HTMLInputElement | null>;
}) => {
  return <input ref={ref} placeholder="Ref works directly!" />;
};

const ThemeConsumer = () => {
  const theme = use(ThemeContext);
  return (
    <div>
      Current Theme Context Value: <strong>{theme}</strong>
    </div>
  );
};

export default function RefAndContextExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="example-box">
      <h3>React 19: Ref as Prop & Simplified Context</h3>

      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>Ref passed without forwardRef:</strong>
        </p>

        <MyInput ref={inputRef} />

        <button onClick={handleFocus} style={{ marginLeft: "5px" }}>
          Trigger Focus
        </button>
      </div>

      <div>
        <p>
          <strong>Direct Context provider & use() hook:</strong>
        </p>

        <ThemeContext value="dark-mode">
          <ThemeConsumer />
        </ThemeContext>
      </div>
    </div>
  );
}
