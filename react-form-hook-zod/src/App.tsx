import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import { MultiStepForm } from "./components/MultiStepForm";
import { Button } from "./components/ui/FormPrimitives";

function App() {
  const [view, setView] = useState<"standard" | "multistep">("standard");

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            React Hook Form + Zod
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-slate-500">
            A comprehensive example combining modern form management with robust
            schema validation.
          </p>
        </div>

        <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          <Button
            variant={view === "standard" ? "primary" : "ghost"}
            onClick={() => setView("standard")}
            className={view === "standard" ? "shadow-md" : ""}
          >
            Standard Form
          </Button>
          <Button
            variant={view === "multistep" ? "primary" : "ghost"}
            onClick={() => setView("multistep")}
            className={view === "multistep" ? "shadow-md" : ""}
          >
            Multi-Step Wizard
          </Button>
        </div>

        <div className="w-full">
          {view === "standard" ? <RegistrationForm /> : <MultiStepForm />}
        </div>
      </div>
    </div>
  );
}

export default App;
