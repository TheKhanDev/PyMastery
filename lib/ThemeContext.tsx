import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  darkColors,
  lightColors,
  darkGradients,
  lightGradients,
  ColorPalette,
  GradientPalette,
} from './theme';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = '@pymastery/theme_mode';

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: ColorPalette;
  gradients: GradientPalette;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') {
        setModeState(saved);
      } else if (systemScheme === 'light') {
        setModeState('light');
      }
    });
    // Only run once on mount — subsequent changes come from the user via setMode/toggleTheme.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === 'dark',
      colors: mode === 'dark' ? darkColors : lightColors,
      gradients: mode === 'dark' ? darkGradients : lightGradients,
      toggleTheme,
      setMode,
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
