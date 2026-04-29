// third-party
import { create } from 'zustand';

// feature
import {
  clearToken,
  getStoredToken,
  loginRequest,
  refreshRequest,
  storeToken,
} from '../api/auth.api';
import type { AuthState, LoginCredentials } from '../types/auth.types';

export interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const storedToken = getStoredToken();

export const useAuthStore = create<AuthStore>((set) => {
  if (storedToken) {
    refreshRequest(storedToken).then((user) => {
      if (user) {
        set({
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        clearToken();
        set({ isLoading: false });
      }
    });
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: !!storedToken,

    login: async (credentials: LoginCredentials) => {
      const { token, user } = await loginRequest(credentials);
      storeToken(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    },

    logout: () => {
      clearToken();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    },
  };
});
