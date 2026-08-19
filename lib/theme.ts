export interface ColorPalette {
  bg: string;
  bgElevated: string;
  bgElevatedSolid: string;
  card: string;
  cardBorder: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  python: string;
  pythonBlue: string;
  accent: string;
  danger: string;
  warning: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  success: string;
  white: string;
  black: string;
}

export interface GradientPalette {
  hero: readonly [string, string];
  primary: readonly [string, string];
  python: readonly [string, string, string];
  success: readonly [string, string];
  card: readonly [string, string];
  streak: readonly [string, string];
  purple: readonly [string, string];
}

export const darkColors: ColorPalette = {
  bg: '#0a0e17',
  bgElevated: '#12172447',
  bgElevatedSolid: '#131826',
  card: '#161d2d',
  cardBorder: '#26304a',
  primary: '#5b8cff',
  primaryDark: '#3d6ae8',
  primaryLight: '#8fb0ff',
  python: '#ffd43b',
  pythonBlue: '#4b8bbe',
  accent: '#22d3ee',
  danger: '#f87171',
  warning: '#fbbf24',
  text: '#f1f5f9',
  textSecondary: '#a3b1c6',
  textMuted: '#6c7891',
  border: '#242e46',
  success: '#34d399',
  white: '#ffffff',
  black: '#000000',
};

export const lightColors: ColorPalette = {
  bg: '#f5f7fb',
  bgElevated: '#ffffffcc',
  bgElevatedSolid: '#ffffff',
  card: '#ffffff',
  cardBorder: '#e3e8f0',
  primary: '#3763e0',
  primaryDark: '#2547b8',
  primaryLight: '#7d9cf5',
  python: '#e8a917',
  pythonBlue: '#3a6f96',
  accent: '#0891b2',
  danger: '#dc2626',
  warning: '#c2790a',
  text: '#0f172a',
  textSecondary: '#4b5670',
  textMuted: '#8792a8',
  border: '#e3e8f0',
  success: '#0f9d63',
  white: '#ffffff',
  black: '#000000',
};

// Fixed colors for code blocks — always dark themed regardless of app theme,
// since syntax-highlight colors are calibrated for a dark terminal background.
export const CODE_COLORS = {
  codeBg: '#080b12',
  codeBorder: '#1e2740',
};

// Gradient presets used with expo-linear-gradient
export const darkGradients: GradientPalette = {
  hero: ['#1b2a4a', '#0d1424'],
  primary: ['#5b8cff', '#3d6ae8'],
  python: ['#ffe066', '#ffd43b', '#f7c624'],
  success: ['#34d399', '#0ea968'],
  card: ['#1b2338', '#141b2c'],
  streak: ['#fb923c', '#f59e0b'],
  purple: ['#a78bfa', '#7c5cf0'],
};

export const lightGradients: GradientPalette = {
  hero: ['#dbe7ff', '#eef3ff'],
  primary: ['#5f8dfa', '#3763e0'],
  python: ['#fde68a', '#f0b429', '#d97706'],
  success: ['#6ee7b7', '#0f9d63'],
  card: ['#ffffff', '#f1f5f9'],
  streak: ['#fdba74', '#ea580c'],
  purple: ['#c4b5fd', '#8b5cf6'],
};

export const moduleColors = [
  '#4b8bbe',
  '#ffd43b',
  '#34d399',
  '#f472b6',
  '#a78bfa',
  '#fb923c',
  '#38bdf8',
  '#f87171',
  '#2dd4bf',
  '#c084fc',
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 28,
  full: 999,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  }),
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
};

// Backward-compatible static exports (default = dark theme).
// Prefer `useTheme()` from lib/ThemeContext for reactive theme-aware colors.
export const colors = darkColors;
export const gradients = darkGradients;
