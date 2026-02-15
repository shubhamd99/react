import type React from 'react';

const Demo: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        border: '2px dashed #646cff',
        borderRadius: '8px',
        marginTop: '20px',
      }}
    >
      <h3>🚀 Absolute Import Verified!</h3>
      <p>
        This component was imported using <code>@/components/Demo</code>
      </p>
    </div>
  );
};

export default Demo;
