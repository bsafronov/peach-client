import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "light",
        toggleTheme: () =>
          set({
            theme: get().theme === "light" ? "dark" : "light",
          }),
      }),
      { name: "app-theme" }
    ),
    {
      name: "theme",
    }
  )
);
