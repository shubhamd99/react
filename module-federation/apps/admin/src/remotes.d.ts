declare module 'host/AppHeader' {
  import type { ReactNode } from 'react'
  interface AppHeaderProps {
    brand: ReactNode
    nav?: ReactNode
    actions?: ReactNode
  }
  const AppHeader: (props: AppHeaderProps) => JSX.Element
  export default AppHeader
}

declare module 'host/AuthProvider' {
  export function useAuthStore<T>(selector: (state: unknown) => T): T
}
