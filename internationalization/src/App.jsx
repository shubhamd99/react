import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ExampleSection from "./components/ExampleSection";
import BasicUsage from "./examples/BasicUsage";
import Interpolation from "./examples/Interpolation";
import Plurals from "./examples/Plurals";
import Context from "./examples/Context";
import Formatting from "./examples/Formatting";

function App() {
  const { t } = useTranslation();

  return (
    <div
      className="App"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h1>{t("title")}</h1>
      <LanguageSwitcher />

      <ExampleSection title="1. Basic Usage">
        <BasicUsage />
      </ExampleSection>

      <ExampleSection title="2. Interpolation">
        <Interpolation />
      </ExampleSection>

      <ExampleSection title="3. Plurals">
        <Plurals />
      </ExampleSection>

      <ExampleSection title="4. Context">
        <Context />
      </ExampleSection>

      <ExampleSection title="5. Formatting">
        <Formatting />
      </ExampleSection>
    </div>
  );
}

export default App;
