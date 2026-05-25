'use client';

import { createContext, useContext, useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: ResolvedTheme;
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
}>({ theme: 'light', mode: 'system', toggle: () => {}, setMode: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((nextMode: ThemeMode) => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = nextMode === 'system' ? (systemDark ? 'dark' : 'light') : nextMode;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    setTheme(resolved);
  }, []);

  useEffect(() => {
    setMounted(true);
    let saved: ThemeMode = 'system';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark' || stored === 'system') saved = stored;
    } catch { /* ignore */ }

    setModeState(saved);
    applyTheme(saved);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      setModeState((current) => {
        if (current === 'system') applyTheme('system');
        return current;
      });
    };

    media.addEventListener('change', onSystemChange);
    return () => media.removeEventListener('change', onSystemChange);
  }, [applyTheme]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* ignore */ }
  }, [applyTheme]);

  const toggle = useCallback(() => {
    setMode(theme === 'dark' ? 'light' : 'dark');
  }, [setMode, theme]);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', mode: 'system', toggle, setMode }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggle, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
