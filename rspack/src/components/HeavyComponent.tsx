const HeavyComponent = () => {
  return (
    <div className="heavy-component">
      <h3>🎉 Heavy Component Loaded!</h3>
      <p>
        This component was loaded dynamically using React.lazy() and code
        splitting.
      </p>
      <div className="heavy-content">
        <p>In a real application, this could be:</p>
        <ul>
          <li>A large data visualization library</li>
          <li>A rich text editor</li>
          <li>A complex form with many fields</li>
          <li>A feature used by only some users</li>
        </ul>
      </div>
    </div>
  );
};

export default HeavyComponent;
