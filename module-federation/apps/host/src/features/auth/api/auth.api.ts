// feature
import type { LoginCredentials, User } from '../types/auth.types'

const TOKEN_KEY = 'auth_token'

const MOCK_USERS: Array<User & { password: string }> = [
  { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'viewer@example.com', password: 'password', name: 'Viewer User', role: 'viewer' },
]

export async function loginRequest(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
  await new Promise((res) => setTimeout(res, 600))

  const match = MOCK_USERS.find(
    (u) => u.email === credentials.email && u.password === credentials.password,
  )

  if (!match) throw new Error('Invalid email or password')

  const { password: _pwd, ...user } = match
  const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 86_400_000 }))

  return { token, user }
}

export async function refreshRequest(token: string): Promise<User | null> {
  try {
    const payload = JSON.parse(atob(token)) as { userId: string; exp: number }
    if (payload.exp < Date.now()) return null
    const user = MOCK_USERS.find((u) => u.id === payload.userId)
    if (!user) return null
    const { password: _pwd, ...safeUser } = user
    return safeUser
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function storeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}
