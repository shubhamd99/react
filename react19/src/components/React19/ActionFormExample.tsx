import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

// ==========================================
// REACT 19 FEATURE: ACTIONS & USEACTIONSTATE & USEFORMSTATUS
// ==========================================
// What are Actions?
// In React 19, the <form> element has native support. You no longer need to write boilerplate like:
// const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); await apiCall(); setLoading(false); }
// Instead, you can just pass an async function directly to the form's `action` attribute!
//
// What is useActionState?
// It's a new hook designed exclusively to track the state of a Server Action attached to a form.
// It gives you the current result (e.g. error/success message) AND automatically gives you the action
// to bind to the form.
//
// What is useFormStatus?
// Deeply nested components (like a custom Submit button inside complicated form wrappers) need to know
// if the form is currently submitting. Instead of passing `isPending` props down 5 levels,
// useFormStatus magically looks up the tree to tell you if the parent <form> is busy!
//
// Note on useFormStatus: This hook MUST be used in a child component inside the <form>.
// It will NOT work if called directly in the same component rendering the <form>.
//
// Note on useActionState: It takes our action, and an initial state (null).
// It returns: state (the last thing action returned) and formAction (function to attach to <form>).
// ==========================================

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving to Server..." : "Save Data"}
    </button>
  );
}

export default function ActionFormExample() {
  const saveAction = async (previousState: any, formData: FormData) => {
    const name = formData.get("name");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!name) return { error: "Name is required!" };
    return { success: `Successfully registered: ${name}` };
  };

  const [state, formAction] = useActionState(saveAction, null);

  return (
    <div className="example-box">
      <h3>React 19: Actions, useActionState, useFormStatus</h3>
      <p>Submit the form to see automatic async handling and loading states.</p>

      <form action={formAction}>
        <div style={{ marginBottom: "10px" }}>
          <input type="text" name="name" placeholder="Enter your name" />
        </div>

        <SubmitButton />

        {state?.error && (
          <p style={{ color: "red", marginTop: "10px" }}>❌ {state.error}</p>
        )}
        {state?.success && (
          <p style={{ color: "green", marginTop: "10px" }}>
            ✅ {state.success}
          </p>
        )}
      </form>
    </div>
  );
}
