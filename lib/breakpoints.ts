import { useWindowDimensions, Platform } from 'react-native';

// Tailwind-style breakpoints (px) so the same mental model applies across
// the web build and any native screens that want to adapt to wider viewports
// (e.g. tablets, split-screen, foldables).
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export interface BreakpointInfo {
  width: number;
  height: number;
  isMobile: boolean; // < md (768)
  isTablet: boolean; // md - lg (768-1023)
  isDesktop: boolean; // >= lg (1024)
  isCompact: boolean; // isMobile || isTablet — used to decide when nav collapses
  isWeb: boolean;
  columns: number; // suggested grid column count for card/module grids
  contentMaxWidth: number | undefined; // suggested max content width for centered layouts
}

export function useBreakpoint(): BreakpointInfo {
  const { width, height } = useWindowDimensions();

  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  let columns = 2;
  if (width >= breakpoints.xl) columns = 4;
  else if (width >= breakpoints.lg) columns = 3;
  else if (width >= breakpoints.sm) columns = 2;
  else columns = 2;

  let contentMaxWidth: number | undefined;
  if (width >= breakpoints.xl) contentMaxWidth = 1180;
  else if (width >= breakpoints.lg) contentMaxWidth = 980;
  else if (width >= breakpoints.md) contentMaxWidth = 760;
  else contentMaxWidth = undefined;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isCompact: isMobile || isTablet,
    isWeb: Platform.OS === 'web',
    columns,
    contentMaxWidth,
  };
}
