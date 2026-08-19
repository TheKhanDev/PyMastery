import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { radius, spacing, ColorPalette } from '../lib/theme';
import { navigationRef } from '../navigation/navigationRef';
import { RootTabParamList } from '../navigation/types';
import { THEKHANDEV, whatsappChatUrl } from '../lib/contact';
import { haptics } from '../lib/haptics';
import AnimatedPressable from './AnimatedPressable';
import BrandMark from './BrandMark';

export const WEB_NAVBAR_HEIGHT = 60;

interface NavLink {
  key: keyof RootTabParamList;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

const NAV_LINKS: NavLink[] = [
  { key: 'Home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { key: 'Course', label: 'Courses', icon: 'book-outline', iconActive: 'book' },
  { key: 'Videos', label: 'Videos', icon: 'play-circle-outline', iconActive: 'logo-youtube' },
  { key: 'Students', label: 'Students', icon: 'people-outline', iconActive: 'people' },
  { key: 'Bookmarks', label: 'Bookmarks', icon: 'bookmark-outline', iconActive: 'bookmark' },
  { key: 'Profile', label: 'More', icon: 'ellipsis-horizontal-circle-outline', iconActive: 'ellipsis-horizontal-circle' },
];

export default function WebNavbar({ activeRouteName }: { activeRouteName?: string }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { isCompact } = useBreakpoint();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (routeName: keyof RootTabParamList) => {
    haptics.selection();
    setMenuOpen(false);
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(routeName);
    }
  };

  // Navigate into a screen nested inside the Profile ("More") tab's stack (Services, Support, etc.)
  const goToProfileScreen = (screen: 'Services' | 'Support') => {
    haptics.selection();
    setMenuOpen(false);
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate('Profile', { screen });
    }
  };

  const openSupportChat = async () => {
    haptics.light();
    setMenuOpen(false);
    const msg = `Assalam o Alaikum ${THEKHANDEV.brand}! Mujhe app ke baare mein madad chahiye.`;
    const url = whatsappChatUrl(THEKHANDEV.whatsappNumber, msg);
    try {
      await Linking.openURL(url);
    } catch {
      if (Platform.OS === 'web') window.open(url, '_blank');
    }
  };

  const handleToggleTheme = () => {
    haptics.selection();
    toggleTheme();
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        {/* Brand / logo — always visible, tapping goes Home */}
        <Pressable
          style={styles.brandRow}
          onPress={() => goTo('Home')}
          accessibilityRole="link"
          accessibilityLabel={`${THEKHANDEV.brand} home`}
        >
          <BrandMark size={32} />
          <Text style={styles.brandText} numberOfLines={1}>{THEKHANDEV.brand}</Text>
        </Pressable>

        {/* Desktop: full inline link row */}
        {!isCompact && (
          <View style={styles.linksRow}>
            {NAV_LINKS.map((link) => {
              const isActive = activeRouteName === link.key;
              return (
                <Pressable
                  key={link.key}
                  style={[styles.linkItem, isActive && { backgroundColor: colors.python + '18' }]}
                  onPress={() => goTo(link.key)}
                  accessibilityRole="link"
                >
                  <Ionicons
                    name={isActive ? link.iconActive : link.icon}
                    size={16}
                    color={isActive ? colors.python : colors.textSecondary}
                  />
                  <Text style={[styles.linkText, isActive && { color: colors.python, fontWeight: '800' }]}>
                    {link.label}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable style={styles.linkItem} onPress={() => goToProfileScreen('Services')} accessibilityRole="link">
              <Ionicons name="briefcase-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.linkText}>Services</Text>
            </Pressable>
          </View>
        )}

        {/* Right side: support, theme toggle, hamburger (compact only) */}
        <View style={styles.rightRow}>
          {!isCompact && (
            <AnimatedPressable onPress={() => goToProfileScreen('Support')} haptic="none" scaleTo={0.95}>
              <LinearGradient colors={['#25D366', '#128C7E']} style={styles.supportBtn}>
                <Ionicons name="headset" size={15} color="#fff" />
                <Text style={styles.supportBtnText}>Support</Text>
              </LinearGradient>
            </AnimatedPressable>
          )}

          <Pressable onPress={handleToggleTheme} style={styles.iconBtn} accessibilityLabel="Toggle theme" accessibilityRole="button">
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={19} color={isDark ? colors.primary : colors.python} />
          </Pressable>

          {isCompact && (
            <Pressable
              onPress={() => {
                haptics.light();
                setMenuOpen((v) => !v);
              }}
              style={styles.iconBtn}
              accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
              accessibilityRole="button"
            >
              <Ionicons name={menuOpen ? 'close' : 'menu'} size={24} color={colors.text} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Mobile / tablet dropdown drawer */}
      {isCompact && menuOpen && (
        <View style={styles.drawer}>
          {NAV_LINKS.map((link) => {
            const isActive = activeRouteName === link.key;
            return (
              <Pressable
                key={link.key}
                style={[styles.drawerItem, isActive && { backgroundColor: colors.python + '14' }]}
                onPress={() => goTo(link.key)}
                accessibilityRole="link"
              >
                <Ionicons
                  name={isActive ? link.iconActive : link.icon}
                  size={19}
                  color={isActive ? colors.python : colors.textSecondary}
                />
                <Text style={[styles.drawerItemText, isActive && { color: colors.python, fontWeight: '800' }]}>
                  {link.label}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </Pressable>
            );
          })}
          <Pressable style={styles.drawerItem} onPress={() => goToProfileScreen('Services')} accessibilityRole="link">
            <Ionicons name="briefcase-outline" size={19} color={colors.textSecondary} />
            <Text style={styles.drawerItemText}>Services & Pricing</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>

          <Pressable style={styles.drawerItem} onPress={() => goToProfileScreen('Support')} accessibilityRole="link">
            <Ionicons name="headset-outline" size={19} color={colors.textSecondary} />
            <Text style={styles.drawerItemText}>Support Center</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>

          <Pressable style={styles.drawerSupportBtn} onPress={openSupportChat}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.drawerSupportText}>Chat with Support on WhatsApp</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: colors.bgElevatedSolid,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      // @ts-ignore — 'fixed' is a valid position value on react-native-web
      position: Platform.OS === 'web' ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
    },
    bar: {
      height: WEB_NAVBAR_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
      maxWidth: 1400,
      width: '100%',
      alignSelf: 'center',
    },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 },
    brandText: { color: colors.text, fontSize: 17, fontWeight: '800' },
    linksRow: { flexDirection: 'row', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center', flexWrap: 'nowrap' },
    linkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 9,
      paddingVertical: 8,
      borderRadius: radius.md,
    },
    linkText: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '700' },
    rightRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 },
    supportBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: radius.full,
    },
    supportBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    drawer: {
      backgroundColor: colors.bgElevatedSolid,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: 2,
      maxHeight: 480,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: spacing.sm,
      paddingVertical: 12,
      borderRadius: radius.md,
    },
    drawerItemText: { color: colors.text, fontSize: 15, fontWeight: '600', flex: 1 },
    drawerSupportBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#25D366',
      borderRadius: radius.md,
      paddingVertical: 12,
      marginTop: spacing.sm,
    },
    drawerSupportText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  });
}
