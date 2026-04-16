import React, { useState } from "react";

// ==========================================
// REACT 19 FEATURE: DOCUMENT METADATA
// ==========================================
// What is Document Metadata Handling?
// Historically, if a deeply nested component needed to change the browser tab title
// or add an SEO <meta> description tag to the document <head>, you had to install
// third-party libraries like `react-helmet`.
//
// What changed in React 19?
// React 19 natively supports managing the <head>! You can literally just drop a
// <title> or <meta> tag ANYWHERE inside your JSX tree (like inside a tiny nested
// button component), and React will smartly transport it straight up into the
// actual HTML <head> of the document during rendering!
// This solves SO many SEO and social-sharing problems securely.
// ==========================================

export default function MetadataExample() {
  const [pageTitle, setPageTitle] = useState("React 19 Playground!");

  return (
    <div className="example-box">
      <h3>React 19: Document Metadata & Asset Handling</h3>
      <p>React 19 natively hoists title and meta tags to the document head!</p>

      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Dynamically updated metadata from a component"
      />

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="Type to change page title..."
        />
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
          Notice how typing in this input changes the actual tab name in your
          browser window!
        </p>
      </div>
    </div>
  );
}
