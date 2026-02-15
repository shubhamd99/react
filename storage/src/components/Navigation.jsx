import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/localstorage", label: "LocalStorage", icon: "💾" },
    { path: "/sessionstorage", label: "SessionStorage", icon: "⏱️" },
    { path: "/cookies", label: "Cookies", icon: "🍪" },
    { path: "/indexeddb", label: "IndexedDB", icon: "🗄️" },
    { path: "/secure", label: "Secure Storage", icon: "🔒" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>🌐 Web Storage Examples</h1>
        <p>Learn all storage options from basic to advanced</p>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
