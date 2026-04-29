import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-md text-sm transition-colors ${
          isActive
            ? 'bg-surface-overlay font-medium text-primary'
            : 'text-muted hover:text-primary hover:bg-surface-raised'
        }`
      }
    >
      {children}
    </NavLink>
  );
};
