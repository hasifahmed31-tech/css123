'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: 'light', toggle: () => {} });

export function useAdminTheme() {
  return useContext(ThemeContext);
}

export default function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('cms-theme') as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('cms-theme', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme === 'dark' ? 'cms-dark' : 'cms-light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
