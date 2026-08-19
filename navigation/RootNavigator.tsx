import React from 'react';
import { Platform, View, StyleSheet, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { CommonActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { haptics } from '../lib/haptics';

import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import ModuleDetailScreen from '../screens/ModuleDetailScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import VideosScreen from '../screens/VideosScreen';
import StudentsScreen from '../screens/StudentsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import SupportScreen from '../screens/SupportScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutDeveloperScreen from '../screens/AboutDeveloperScreen';
import {
  HomeStackParamList,
  CourseStackParamList,
  VideosStackParamList,
  StudentsStackParamList,
  BookmarksStackParamList,
  ProfileStackParamList,
} from './types';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CourseStack = createNativeStackNavigator<CourseStackParamList>();
const VideosStack = createNativeStackNavigator<VideosStackParamList>();
const StudentsStack = createNativeStackNavigator<StudentsStackParamList>();
const BookmarksStack = createNativeStackNavigator<BookmarksStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Routes (nested inside a tab's stack) that should hide the bottom tab bar so the
// detail/focused screen gets full vertical space and nothing ever renders underneath
// or gets clipped by the tab bar.
const TAB_BAR_HIDDEN_ROUTES: Record<string, string[]> = {
  Home: ['ModuleDetail', 'Lesson', 'Quiz', 'QuizResult'],
  Course: ['ModuleDetail', 'Lesson', 'Quiz', 'QuizResult'],
  Bookmarks: ['Lesson'],
  Profile: ['AboutDeveloper', 'Services', 'Support', 'Lesson'],
};

function useStackScreenOptions() {
  const { colors } = useTheme();
  return {
    headerStyle: { backgroundColor: colors.bg },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: '700' as const, fontSize: 17 as const },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.bg },
    animation: 'slide_from_right' as const,
  };
}

// Custom back arrow used where default back behavior needs overriding (QuizResult,
// where a normal "go back" would re-enter a mid-quiz state) — everywhere else the
// native header's default back button (already themed) is sufficient and used.
function BackButton({ onPress, tintColor }: { onPress: () => void; tintColor?: string }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} hitSlop={12} style={{ paddingRight: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="chevron-back" size={26} color={tintColor ?? colors.text} />
    </Pressable>
  );
}

function safeGoBack(navigation: any) {
  haptics.selection();
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.dispatch(CommonActions.navigate({ name: navigation.getState().routeNames[0] }));
  }
}

function HomeStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ModuleDetail" component={ModuleDetailScreen} options={{ title: 'Module' }} />
      <HomeStack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
      <HomeStack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={({ navigation }) => ({
          title: 'Results',
          headerLeft: () => <BackButton onPress={() => navigation.popToTop()} />,
        })}
      />
    </HomeStack.Navigator>
  );
}

function CourseStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <CourseStack.Navigator screenOptions={stackScreenOptions}>
      <CourseStack.Screen name="CourseMain" component={CourseScreen} options={{ headerShown: false }} />
      <CourseStack.Screen name="ModuleDetail" component={ModuleDetailScreen} options={{ title: 'Module' }} />
      <CourseStack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
      <CourseStack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
      <CourseStack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={({ navigation }) => ({
          title: 'Results',
          headerLeft: () => <BackButton onPress={() => navigation.popToTop()} />,
        })}
      />
    </CourseStack.Navigator>
  );
}

function VideosStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <VideosStack.Navigator screenOptions={stackScreenOptions}>
      <VideosStack.Screen name="VideosMain" component={VideosScreen} options={{ headerShown: false }} />
    </VideosStack.Navigator>
  );
}

function StudentsStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <StudentsStack.Navigator screenOptions={stackScreenOptions}>
      <StudentsStack.Screen name="StudentsMain" component={StudentsScreen} options={{ headerShown: false }} />
    </StudentsStack.Navigator>
  );
}

function BookmarksStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <BookmarksStack.Navigator screenOptions={stackScreenOptions}>
      <BookmarksStack.Screen name="BookmarksMain" component={BookmarksScreen} options={{ headerShown: false }} />
      <BookmarksStack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
    </BookmarksStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const stackScreenOptions = useStackScreenOptions();
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen
        name="AboutDeveloper"
        component={AboutDeveloperScreen}
        options={({ navigation }) => ({
          title: 'About the Developer',
          headerLeft: () => <BackButton onPress={() => safeGoBack(navigation)} />,
        })}
      />
      <ProfileStack.Screen name="Services" component={ServicesScreen} options={{ title: 'Services & Pricing' }} />
      <ProfileStack.Screen name="Support" component={SupportScreen} options={{ title: 'Support Center' }} />
      <ProfileStack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
    </ProfileStack.Navigator>
  );
}

function TabBarBackground() {
  const { colors, isDark } = useTheme();
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={70}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
    );
  }
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.bgElevatedSolid }]} />;
}

export default function RootNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const tabBarBottomPadding = Math.max(insets.bottom, 8);
  const tabBarHeight = 52 + tabBarBottomPadding;

  const baseTabBarStyle = {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.bgElevatedSolid,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: tabBarHeight,
    paddingBottom: tabBarBottomPadding,
    paddingTop: 8,
  };

  return (
    <Tab.Navigator
      screenListeners={{
        tabPress: () => haptics.selection(),
      }}
      screenOptions={({ route }) => {
        const hiddenRoutes = TAB_BAR_HIDDEN_ROUTES[route.name] ?? [];
        const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? '';
        // The bottom tab bar is a mobile-app-only affordance — on the web build,
        // the top WebNavbar (App.tsx) is the primary navigation, so we hide this
        // entirely there to avoid duplicate/competing navigation chrome.
        const hideTabBar = Platform.OS === 'web' || hiddenRoutes.includes(focusedRouteName);

        return {
          headerShown: false,
          tabBarActiveTintColor: colors.python,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarBackground: () => <TabBarBackground />,
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarStyle: hideTabBar ? { display: 'none' as const, height: 0 } : baseTabBarStyle,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
            let iconName: any = 'home';
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Course') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Videos') iconName = focused ? 'logo-youtube' : 'play-circle-outline';
            else if (route.name === 'Students') iconName = focused ? 'people' : 'people-outline';
            else if (route.name === 'Bookmarks') iconName = focused ? 'bookmark' : 'bookmark-outline';
            else if (route.name === 'Profile') iconName = focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline';
            return (
              <View style={styles.iconWrap}>
                <Ionicons name={iconName} size={22} color={color} />
              </View>
            );
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Course" component={CourseStackNavigator} options={{ title: 'Curriculum' }} />
      <Tab.Screen name="Videos" component={VideosStackNavigator} options={{ title: 'Videos' }} />
      <Tab.Screen name="Students" component={StudentsStackNavigator} options={{ title: 'Students' }} />
      <Tab.Screen name="Bookmarks" component={BookmarksStackNavigator} options={{ title: 'Bookmarks' }} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{ title: 'More' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
  tabItem: {
    paddingTop: 2,
  },
});
