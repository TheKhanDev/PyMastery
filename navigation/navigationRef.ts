import { createNavigationContainerRef } from '@react-navigation/native';
import { RootTabParamList } from './types';

// Lets components outside the Navigator tree (e.g. the web top navbar) trigger
// navigation without needing the `navigation` prop — see:
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
export const navigationRef = createNavigationContainerRef<RootTabParamList>();

export function navigateToTab(name: keyof RootTabParamList) {
  if (navigationRef.isReady()) {
    // @ts-ignore — tab names don't require nested params here
    navigationRef.navigate(name);
  }
}

export function getActiveRootRouteName(): string | undefined {
  if (!navigationRef.isReady()) return undefined;
  return navigationRef.getCurrentRoute()?.name;
}
