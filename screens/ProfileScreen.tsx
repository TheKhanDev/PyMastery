import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { modules, totalLessonsCount } from '../lib/courseData';
import { getCompletedLessons, getXp, getLevel, getStreak, getQuizScores, resetAllProgress, getBookmarks } from '../lib/progress';
import { downloadNotesPdf } from '../lib/notesPdf';
import ProgressBar from '../components/ProgressBar';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import BrandMark from '../components/BrandMark';
import { haptics } from '../lib/haptics';
import { THEKHANDEV, whatsappChatUrl, emailUrl } from '../lib/contact';
import { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen({ navigation }: Props) {
  const { colors, gradients, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tabBarHeight = useBottomTabBarHeight();
  const [completed, setCompleted] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, { score: number; total: number }>>({});
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [showAllModules, setShowAllModules] = useState(false);
  const [downloadingNotes, setDownloadingNotes] = useState(false);

  const load = async () => {
    const [c, x, s, q, b] = await Promise.all([getCompletedLessons(), getXp(), getStreak(), getQuizScores(), getBookmarks()]);
    setCompleted(c);
    setXp(x);
    setStreak(s);
    setQuizScores(q);
    setBookmarkCount(b.length);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const total = totalLessonsCount();
  const level = getLevel(xp);
  const quizzesTaken = Object.keys(quizScores).length;
  const totalQuizScore = Object.values(quizScores).reduce((sum, s) => sum + s.score, 0);
  const totalQuizPossible = Object.values(quizScores).reduce((sum, s) => sum + s.total, 0);

  const openLink = async (url: string) => {
    haptics.light();
    try {
      await Linking.openURL(url);
    } catch {
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      }
    }
  };

  const handleReset = () => {
    const doReset = async () => {
      haptics.warning();
      await resetAllProgress();
      load();
    };
    if (Platform.OS === 'web') {
      if (confirm('Reset all progress? This cannot be undone.')) doReset();
    } else {
      Alert.alert('Reset Progress', 'Are you sure you want to reset all progress? This cannot be undone.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: doReset },
      ]);
    }
  };

  const handleDownloadNotes = async () => {
    haptics.light();
    setDownloadingNotes(true);
    try {
      const result = await downloadNotesPdf();
      if (result.message) {
        if (Platform.OS === 'web') {
          // Non-blocking hint only if pop-ups were denied
          if (!result.ok) alert(result.message);
        } else {
          Alert.alert(result.ok ? 'Notes Ready' : 'Could not download notes', result.message);
        }
      }
      if (result.ok) haptics.success();
      else haptics.error();
    } finally {
      setDownloadingNotes(false);
    }
  };

  const handleToggleTheme = () => {
    haptics.selection();
    toggleTheme();
  };

  const visibleModules = showAllModules ? modules : modules.slice(0, 4);

  const contactRows = [
    { key: 'instagram', label: 'Instagram', value: '@thekhandev', icon: 'logo-instagram', color: '#E1306C', url: THEKHANDEV.instagram },
    { key: 'tiktok', label: 'TikTok', value: '@thekhandev', icon: 'logo-tiktok', color: colors.text, url: THEKHANDEV.tiktok },
    { key: 'youtube', label: 'YouTube', value: 'TheKhanDev Channel', icon: 'logo-youtube', color: '#FF0000', url: THEKHANDEV.youtube },
    { key: 'github', label: 'GitHub', value: 'github.com/thekhandev', icon: 'logo-github', color: colors.text, url: THEKHANDEV.github },
    { key: 'whatsappChannel', label: 'WhatsApp Channel', value: 'All updates & info', icon: 'logo-whatsapp', color: '#25D366', url: THEKHANDEV.whatsappChannel },
    { key: 'facebook', label: 'Facebook', value: 'TheKhanDev Page', icon: 'logo-facebook', color: '#1877F2', url: THEKHANDEV.facebook },
    { key: 'whatsappNumber', label: 'WhatsApp Number', value: THEKHANDEV.whatsappNumber, icon: 'call-outline', color: '#25D366', url: whatsappChatUrl(THEKHANDEV.whatsappNumber) },
    { key: 'email', label: 'Email', value: THEKHANDEV.email, icon: 'mail-outline', color: colors.primary, url: emailUrl(THEKHANDEV.email, 'TheKhanDev App Inquiry') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + spacing.xl }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.hero} style={styles.heroSection}>
          <ResponsiveContainer>
          <View style={styles.avatarSection}>
            <BrandMark size={80} style={{ marginBottom: spacing.sm, ...shadow.glow(colors.python) }} />
            <Text style={styles.levelTitle}>{level.title}</Text>
            <Text style={styles.levelSub}>Level {level.level} · {xp} XP</Text>
            <View style={{ width: '100%', marginTop: spacing.md }}>
              <ProgressBar progress={level.progress} gradientColors={gradients.python} height={8} />
              <Text style={styles.xpToNext}>{level.nextLevelXp - xp} XP to next level</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.warning + '1e' }]}>
                <Ionicons name="flame" size={20} color={colors.warning} />
              </View>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.primary + '1e' }]}>
                <Ionicons name="book" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{completed.length}/{total}</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.python + '1e' }]}>
                <Ionicons name="school" size={20} color={colors.python} />
              </View>
              <Text style={styles.statValue}>{quizzesTaken}/{modules.length}</Text>
              <Text style={styles.statLabel}>Quizzes Taken</Text>
            </View>
          </View>
          </ResponsiveContainer>
        </LinearGradient>

        <ResponsiveContainer style={styles.content}>
          {/* Appearance / Theme toggle */}
          <View style={styles.appearanceCard}>
            <View style={styles.appearanceLeft}>
              <View style={[styles.appearanceIcon, { backgroundColor: (isDark ? colors.primary : colors.python) + '1e' }]}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={18} color={isDark ? colors.primary : colors.python} />
              </View>
              <View>
                <Text style={styles.appearanceTitle}>Appearance</Text>
                <Text style={styles.appearanceSub}>{isDark ? 'Dark mode' : 'Light mode'}</Text>
              </View>
            </View>
            <AnimatedPressable
              onPress={handleToggleTheme}
              haptic="none"
              style={[styles.themeSwitch, isDark ? styles.themeSwitchDark : styles.themeSwitchLight]}
            >
              <View style={[styles.themeSwitchKnob, isDark && styles.themeSwitchKnobRight]}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={12} color={isDark ? colors.primary : colors.python} />
              </View>
            </AnimatedPressable>
          </View>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Module Progress</Text>
            {modules.length > 4 && (
              <AnimatedPressable haptic="selection" onPress={() => setShowAllModules((s) => !s)}>
                <Text style={styles.showAllText}>{showAllModules ? 'Show less' : 'Show all'}</Text>
              </AnimatedPressable>
            )}
          </View>
          {visibleModules.map((mod, idx) => {
            const doneCount = mod.lessons.filter((l) => completed.includes(l.id)).length;
            const q = quizScores[mod.id];
            return (
              <FadeInView key={mod.id} delay={idx * 40}>
                <View style={styles.moduleProgressRow}>
                  <View style={[styles.moduleIcon, { backgroundColor: mod.color + '1e', borderColor: mod.color + '40' }]}>
                    <Ionicons name={mod.icon as any} size={18} color={mod.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.moduleProgressTitle}>{mod.title}</Text>
                    <ProgressBar progress={doneCount / mod.lessons.length} color={mod.color} height={5} />
                  </View>
                  <View style={styles.moduleProgressRight}>
                    <Text style={styles.moduleProgressCount}>{doneCount}/{mod.lessons.length}</Text>
                    {q && <Text style={styles.moduleQuizScore}>Quiz: {q.score}/{q.total}</Text>}
                  </View>
                </View>
              </FadeInView>
            );
          })}

          {totalQuizPossible > 0 && (
            <View style={styles.quizSummaryCard}>
              <Ionicons name="ribbon" size={22} color={colors.python} />
              <Text style={styles.quizSummaryText}>
                Overall quiz accuracy: <Text style={{ fontWeight: '800' }}>{Math.round((totalQuizScore / totalQuizPossible) * 100)}%</Text> ({totalQuizScore}/{totalQuizPossible} correct)
              </Text>
            </View>
          )}

          {/* Download Notes (PDF) */}
          <AnimatedPressable scaleTo={0.98} onPress={handleDownloadNotes} haptic="none" style={{ marginTop: spacing.lg }}>
            <LinearGradient colors={gradients.primary} style={styles.downloadButton}>
              <Ionicons name="document-text-outline" size={18} color={colors.white} />
              <Text style={styles.downloadButtonText}>
                {downloadingNotes ? 'Preparing PDF…' : 'Download Notes (PDF)'}
              </Text>
            </LinearGradient>
          </AnimatedPressable>

          {/* Quick access: Bookmarks, Services & Support (kept off the main tab bar to keep it uncluttered) */}
          <View style={styles.quickLinksRow}>
            <AnimatedPressable
              scaleTo={0.97}
              style={styles.quickLinkCard}
              onPress={() => (navigation.getParent() as any)?.navigate('Bookmarks')}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: colors.python + '1c' }]}>
                <Ionicons name="bookmark" size={20} color={colors.python} />
              </View>
              <Text style={styles.quickLinkTitle}>Bookmarks</Text>
              <Text style={styles.quickLinkSub}>{bookmarkCount} saved</Text>
            </AnimatedPressable>
            <AnimatedPressable
              scaleTo={0.97}
              style={styles.quickLinkCard}
              onPress={() => navigation.navigate('Services')}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: colors.primary + '1c' }]}>
                <Ionicons name="briefcase" size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickLinkTitle}>Services</Text>
              <Text style={styles.quickLinkSub}>Rs 1,500 – 200k</Text>
            </AnimatedPressable>
            <AnimatedPressable
              scaleTo={0.97}
              style={styles.quickLinkCard}
              onPress={() => navigation.navigate('Support')}
            >
              <View style={[styles.quickLinkIcon, { backgroundColor: '#25D36622' }]}>
                <Ionicons name="headset" size={20} color="#25D366" />
              </View>
              <Text style={styles.quickLinkTitle}>Support</Text>
              <Text style={styles.quickLinkSub}>FAQs & help</Text>
            </AnimatedPressable>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <BrandMark size={44} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactBrand}>{THEKHANDEV.brand}</Text>
                <Text style={styles.contactTagline}>Creators of this Python course · Follow for more free courses & tech content</Text>
              </View>
            </View>

            <View style={styles.contactList}>
              {contactRows.map((row, idx) => (
                <AnimatedPressable
                  key={row.key}
                  style={[styles.contactRow, idx === contactRows.length - 1 && { borderBottomWidth: 0 }]}
                  onPress={() => openLink(row.url)}
                  scaleTo={0.98}
                  haptic="none"
                >
                  <View style={[styles.contactIcon, { backgroundColor: row.color + '22' }]}>
                    <Ionicons name={row.icon as any} size={18} color={row.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.contactLabel}>{row.label}</Text>
                    <Text style={styles.contactValue} numberOfLines={1}>{row.value}</Text>
                  </View>
                  <Ionicons name="open-outline" size={16} color={colors.textMuted} />
                </AnimatedPressable>
              ))}
            </View>
          </View>

          <AnimatedPressable
            scaleTo={0.98}
            style={styles.aboutDevCard}
            onPress={() => navigation.navigate('AboutDeveloper')}
          >
            <View style={styles.aboutDevIcon}>
              <Ionicons name="person-circle" size={26} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aboutDevTitle}>About the Developer</Text>
              <Text style={styles.aboutDevSub}>Waqas Khan se milo · bio, experience & links</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </AnimatedPressable>

          <AnimatedPressable scaleTo={0.98} style={styles.resetButton} onPress={handleReset} haptic="none">
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
            <Text style={styles.resetButtonText}>Reset All Progress</Text>
          </AnimatedPressable>

          <Text style={styles.footerText}>{THEKHANDEV.brand} · Complete Python Course{'\n'}Built with React Native & Expo</Text>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    heroSection: {
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      borderBottomLeftRadius: radius.xxl,
      borderBottomRightRadius: radius.xxl,
    },
    content: { padding: spacing.lg, paddingTop: spacing.lg },
    avatarSection: { alignItems: 'center', marginBottom: spacing.lg },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      ...shadow.glow(colors.python),
    },
    levelTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
    levelSub: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
    xpToNext: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' },
    statsGrid: { flexDirection: 'row', gap: spacing.sm },
    statCard: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: radius.md,
      padding: spacing.md,
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.08)',
    },
    statIconWrap: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
    statValue: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 2 },
    statLabel: { color: colors.textMuted, fontSize: 10, textAlign: 'center' },
    appearanceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    appearanceLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    appearanceIcon: { width: 38, height: 38, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
    appearanceTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
    appearanceSub: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
    themeSwitch: {
      width: 52,
      height: 30,
      borderRadius: 15,
      padding: 3,
      justifyContent: 'center',
    },
    themeSwitchDark: { backgroundColor: colors.bgElevatedSolid, borderWidth: 1, borderColor: colors.border },
    themeSwitchLight: { backgroundColor: colors.python + '30', borderWidth: 1, borderColor: colors.python + '55' },
    themeSwitchKnob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadow.soft,
    },
    themeSwitchKnobRight: { alignSelf: 'flex-end' },
    sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
    sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
    showAllText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
    moduleProgressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.sm,
      marginBottom: spacing.xs,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    moduleIcon: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
    moduleProgressTitle: { color: colors.text, fontSize: 13, fontWeight: '600', marginBottom: 4 },
    moduleProgressRight: { alignItems: 'flex-end' },
    moduleProgressCount: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
    moduleQuizScore: { color: colors.python, fontSize: 10, marginTop: 2 },
    quizSummaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.python + '14',
      borderRadius: radius.md,
      padding: spacing.md,
      marginTop: spacing.md,
      borderWidth: 1,
      borderColor: colors.python + '33',
    },
    quizSummaryText: { color: colors.text, fontSize: 13, flex: 1, lineHeight: 19 },
    contactCard: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginTop: spacing.xl,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    contactHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
    brandBadge: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactBrand: { color: colors.text, fontSize: 17, fontWeight: '800' },
    contactTagline: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
    contactList: { borderTopWidth: 1, borderTopColor: colors.border },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm + 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    contactIcon: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
    contactLabel: { color: colors.text, fontSize: 14, fontWeight: '600' },
    contactValue: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: spacing.xl,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.danger + '55',
    },
    resetButtonText: { color: colors.danger, fontWeight: '700', fontSize: 14 },
    aboutDevCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginTop: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    aboutDevIcon: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      backgroundColor: colors.primary + '1c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    aboutDevTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
    aboutDevSub: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
    downloadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: spacing.md,
      borderRadius: radius.md,
    },
    downloadButtonText: { color: colors.white, fontWeight: '700', fontSize: 14 },
    quickLinksRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    quickLinkCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: 4,
      ...shadow.soft,
    },
    quickLinkIcon: {
      width: 36,
      height: 36,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    quickLinkTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
    quickLinkSub: { color: colors.textMuted, fontSize: 11 },
    footerText: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.xl, lineHeight: 16 },
  });
}
