import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>⚡ Rspack Learning</h1>
        <p className="nav-subtitle">From Basic to Advanced</p>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🏠 Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/loaders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📦 Loaders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/code-splitting"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ✂️ Code Splitting
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hmr"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🔥 HMR
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/environment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🌍 Environment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/optimization"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ⚡ Optimization
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/module-federation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🔗 Module Federation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
