import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import RootNavigator from './navigation/RootNavigator';
import { navigationRef } from './navigation/navigationRef';
import WebNavbar, { WEB_NAVBAR_HEIGHT } from './components/WebNavbar';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import { darkColors } from './lib/theme';

const IS_WEB = Platform.OS === 'web';

function AppInner() {
  const { colors, isDark } = useTheme();
  const [activeRouteName, setActiveRouteName] = useState<string | undefined>(undefined);

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.bgElevatedSolid,
      text: colors.text,
      border: colors.border,
      primary: colors.python,
    },
  };

  const handleReady = useCallback(() => {
    setActiveRouteName(navigationRef.getCurrentRoute()?.name);
  }, []);

  const handleStateChange = useCallback(() => {
    setActiveRouteName(navigationRef.getCurrentRoute()?.name);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={handleReady}
      onStateChange={handleStateChange}
    >
      {IS_WEB && <WebNavbar activeRouteName={activeRouteName} />}
      <View style={[styles.content, IS_WEB && { paddingTop: WEB_NAVBAR_HEIGHT }]}>
        <RootNavigator />
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: darkColors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={darkColors.python} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1 },
});
