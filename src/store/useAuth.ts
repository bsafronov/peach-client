import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUser {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface ILogin {
  accessToken: string;
  user: IUser;
}

interface AuthState {
  isAuth: boolean | null;
  token: string | null;
  user: IUser | null;
  toggleAuth: () => void;
  setUser: (data: ILogin) => void;
  deleteUser: () => void;
  checkToken: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuth: null,
        user: null,
        token: null,
        toggleAuth: () => set({ isAuth: !get().isAuth }),
        setUser: (data) => {
          set({ user: data.user, token: data.accessToken, isAuth: true });
        },
        deleteUser: () => {
          set({ user: null, token: null, isAuth: false });
        },
        checkToken: async () => {
          const user = get().user;
          const token = get().token;

          if (!user || !token) {
            return set({ isAuth: false });
          }

          const response = await fetch(
            `http//localhost:3000/600/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            set({ isAuth: true });
          } else {
            set({ isAuth: false });
          }
        },
      }),
      {
        name: "app-auth",
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    ),
    {
      name: "auth",
    }
  )
);
