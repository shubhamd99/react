import React from "react";

const ExampleSection = ({ title, children }) => {
  return (
    <div
      className="example-section"
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default ExampleSection;
