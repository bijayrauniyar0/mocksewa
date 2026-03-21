import { create } from "zustand";
// Auth
export type User = {
  id: number;
  name: string;
  email: string;
  number: string;
  avatar: string;
  bio: string;
};

type AuthStoreType = {
  userProfile: Partial<User>;
  isAuthenticated: boolean | null;
  setUserProfile: (user: Partial<User>) => void;
  setIsAuthenticated: (status: boolean) => void;
};

const useAuthStore = create<AuthStoreType>((set) => ({
  userProfile: {},
  isAuthenticated: null,
  setUserProfile: (user) => set({ userProfile: user }),
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}));

export default useAuthStore;
