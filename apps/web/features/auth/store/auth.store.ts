import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@/lib/auth/roles";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setMfaRequired: (mfaRequired: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      mfaRequired: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setMfaRequired: (mfaRequired) => set({ mfaRequired }),
      
      logout: () => set({ user: null, isAuthenticated: false, mfaRequired: false }),
    }),
    {
      name: "super-e-auth",
      // Only persist the necessary fields
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
