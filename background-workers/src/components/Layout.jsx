import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Database,
  MessagesSquare,
  Boxes,
} from "lucide-react";

const Layout = ({ children }) => {
  const routes = [
    { path: "/", label: "Overview", icon: LayoutDashboard },
    { path: "/workers", label: "Web Workers", icon: Boxes },
    { path: "/service-workers", label: "Service Workers", icon: ShieldCheck },
    { path: "/caching", label: "Caching API", icon: Database },
    { path: "/broadcast", label: "Broadcast Channel", icon: MessagesSquare },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            marginBottom: "2rem",
            paddingLeft: "1rem",
            color: "var(--accent)",
          }}
        >
          Background Workers
        </h1>
        <nav>
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <route.icon size={20} />
              {route.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
