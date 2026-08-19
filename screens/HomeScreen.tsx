import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { modules, totalLessonsCount } from '../lib/courseData';
import { getCompletedLessons, getXp, getLevel, getStreak } from '../lib/progress';
import ProgressBar from '../components/ProgressBar';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { HomeStackParamList } from '../navigation/types';
import { THEKHANDEV } from '../lib/contact';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export default function HomeScreen({ navigation }: Props) {
  const { colors, gradients, isDark } = useTheme();
  const { columns, isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const tabBarHeight = useBottomTabBarHeight();
  const [completed, setCompleted] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const [c, x, s] = await Promise.all([getCompletedLessons(), getXp(), getStreak()]);
    setCompleted(c);
    setXp(x);
    setStreak(s);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const total = totalLessonsCount();
  const overallProgress = total > 0 ? completed.length / total : 0;
  const level = getLevel(xp);

  // find first incomplete lesson to "continue"
  let continueLesson: { lesson: any; module: any } | null = null;
  outer: for (const mod of modules) {
    for (const lesson of mod.lessons) {
      if (!completed.includes(lesson.id)) {
        continueLesson = { lesson, module: mod };
        break outer;
      }
    }
  }

  const nextModuleId = modules.find((m) => m.lessons.some((l) => !completed.includes(l.id)))?.id;
  const greetingHour = new Date().getHours();
  const greetingWord = greetingHour < 12 ? 'Subah Bakhair' : greetingHour < 18 ? 'Assalam o Alaikum' : 'Shaam Bakhair';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={[1]}
        keyExtractor={() => 'home'}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        contentContainerStyle={{ paddingBottom: tabBarHeight + spacing.xl, alignItems: isDesktop ? 'center' : undefined }}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <ResponsiveContainer>
            <LinearGradient colors={gradients.hero} style={styles.heroGradient}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.greetingSmall}>{greetingWord} 👋</Text>
                  <Text style={styles.greeting}>TheKhanDev 🐍</Text>
                </View>
                <View style={styles.streakBadge}>
                  <Ionicons name="flame" size={18} color={colors.warning} />
                  <Text style={styles.streakText}>{streak}</Text>
                </View>
              </View>

              <FadeInView delay={80}>
                <View style={styles.statsCard}>
                  <View style={styles.statsTopRow}>
                    <View>
                      <Text style={styles.levelTitle}>{level.title}</Text>
                      <Text style={styles.xpText}>{xp} XP · Level {level.level}</Text>
                    </View>
                    <View style={styles.progressCircleWrap}>
                      <Text style={styles.progressPct}>{Math.round(overallProgress * 100)}%</Text>
                    </View>
                  </View>
                  <ProgressBar progress={overallProgress} gradientColors={gradients.python} height={10} />
                  <Text style={styles.lessonCountText}>{completed.length} / {total} lessons mukammal</Text>
                </View>
              </FadeInView>
            </LinearGradient>

            {continueLesson && (
              <FadeInView delay={150}>
                <AnimatedPressable
                  scaleTo={0.97}
                  onPress={() => navigation.navigate('Lesson', { lessonId: continueLesson!.lesson.id })}
                >
                  <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.continueCard}
                  >
                    <View style={styles.continueLeft}>
                      <Text style={styles.continueLabel}>JAHAN CHHORA THA WAHIN SE</Text>
                      <Text style={styles.continueTitle}>{continueLesson.lesson.title}</Text>
                      <Text style={styles.continueModule}>{continueLesson.module.title}</Text>
                    </View>
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={20} color={colors.bg} />
                    </View>
                  </LinearGradient>
                </AnimatedPressable>
              </FadeInView>
            )}

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Course Modules</Text>
              <AnimatedPressable haptic="selection" onPress={() => navigation.getParent()?.navigate('Course' as never)}>
                <Text style={styles.seeAll}>Sab Dekho →</Text>
              </AnimatedPressable>
            </View>

            {/* Modernized 2-column module grid, with progress ring + Hinglish tags */}
            <View style={styles.moduleGrid}>
              {modules.map((mod, idx) => {
                const doneCount = mod.lessons.filter((l) => completed.includes(l.id)).length;
                const isDone = doneCount === mod.lessons.length;
                const isNext = mod.id === nextModuleId;
                const pct = mod.lessons.length > 0 ? doneCount / mod.lessons.length : 0;
                return (
                  <FadeInView key={mod.id} delay={200 + idx * 40} style={[styles.moduleGridItem, { width: `${100 / columns}%` }]}>
                    <AnimatedPressable
                      scaleTo={0.96}
                      style={[
                        styles.moduleCard,
                        isDone && { borderColor: colors.success + '55' },
                        isNext && !isDone && { borderColor: mod.color + '66' },
                      ]}
                      onPress={() => navigation.navigate('ModuleDetail', { moduleId: mod.id })}
                    >
                      {isNext && !isDone && (
                        <View style={[styles.nextTag, { backgroundColor: mod.color }]}>
                          <Text style={styles.nextTagText}>ABHI YE KARO</Text>
                        </View>
                      )}
                      <View style={styles.moduleCardTop}>
                        <View style={[styles.moduleIconCircle, { backgroundColor: mod.color + '1e', borderColor: mod.color + '44' }]}>
                          <Ionicons name={mod.icon as any} size={22} color={mod.color} />
                        </View>
                        {isDone && (
                          <View style={styles.doneCheckWrap}>
                            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                          </View>
                        )}
                      </View>
                      <Text style={styles.moduleCardOrder}>MODULE {mod.order}</Text>
                      <Text style={styles.moduleCardTitle} numberOfLines={3}>{mod.title}</Text>
                      <ProgressBar progress={pct} color={mod.color} height={5} />
                      <Text style={styles.moduleCardCount}>{doneCount}/{mod.lessons.length} lessons</Text>
                    </AnimatedPressable>
                  </FadeInView>
                );
              })}
            </View>

            <FadeInView delay={450}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeader}>Quick Access</Text>
              </View>
              <View style={styles.quickAccessRow}>
                <AnimatedPressable
                  style={styles.quickAccessCard}
                  onPress={() => navigation.getParent()?.navigate('Bookmarks' as never)}
                  scaleTo={0.96}
                >
                  <View style={[styles.quickAccessIcon, { backgroundColor: colors.python + '1c' }]}>
                    <Ionicons name="bookmark" size={19} color={colors.python} />
                  </View>
                  <Text style={styles.quickAccessTitle}>Bookmarks</Text>
                  <Text style={styles.quickAccessSub}>Saved lessons</Text>
                </AnimatedPressable>

                <AnimatedPressable
                  style={styles.quickAccessCard}
                  onPress={() => (navigation.getParent() as any)?.navigate('Profile', { screen: 'Services' })}
                  scaleTo={0.96}
                >
                  <View style={[styles.quickAccessIcon, { backgroundColor: colors.primary + '1c' }]}>
                    <Ionicons name="briefcase" size={19} color={colors.primary} />
                  </View>
                  <Text style={styles.quickAccessTitle}>Services</Text>
                  <Text style={styles.quickAccessSub}>Rs 1,500–200k</Text>
                </AnimatedPressable>

                <AnimatedPressable
                  style={styles.quickAccessCard}
                  onPress={() => (navigation.getParent() as any)?.navigate('Profile', { screen: 'Support' })}
                  scaleTo={0.96}
                >
                  <View style={[styles.quickAccessIcon, { backgroundColor: '#25D36622' }]}>
                    <Ionicons name="headset" size={19} color="#25D366" />
                  </View>
                  <Text style={styles.quickAccessTitle}>Support</Text>
                  <Text style={styles.quickAccessSub}>FAQs & help</Text>
                </AnimatedPressable>
              </View>
            </FadeInView>

            <FadeInView delay={500}>
              <View style={styles.tipCard}>
                <View style={styles.tipIconWrap}>
                  <Ionicons name="bulb" size={20} color={colors.python} />
                </View>
                <Text style={styles.tipText}>
                  <Text style={{ fontWeight: '800' }}>Tip: </Text>
                  Code khud type karo, sirf padho mat — practice se hi seekhna pakka hota hai, promise!
                </Text>
              </View>

              <AnimatedPressable
                style={styles.followCard}
                onPress={() => navigation.getParent()?.navigate('Profile' as never)}
              >
                <View style={styles.followIconWrap}>
                  <Ionicons name="logo-instagram" size={20} color="#E1306C" />
                </View>
                <Text style={styles.followText}>
                  <Text style={{ fontWeight: '800', color: colors.text }}>{THEKHANDEV.brand}</Text> ko follow karo aur free courses/tech content miss mat karo
                </Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </AnimatedPressable>
            </FadeInView>
          </ResponsiveContainer>
        )}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette, isDark: boolean) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    heroGradient: {
      paddingBottom: spacing.lg,
      borderBottomLeftRadius: radius.xxl,
      borderBottomRightRadius: radius.xxl,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
    },
    greetingSmall: { fontSize: 13, color: colors.textSecondary, fontWeight: '600' },
    greeting: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 2 },
    streakBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.warning + '1a',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.warning + '40',
    },
    streakText: { color: colors.text, fontWeight: '800', fontSize: 14 },
    statsCard: {
      marginHorizontal: spacing.lg,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.035)',
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)',
      gap: spacing.sm,
      ...shadow.card,
    },
    statsTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    levelTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
    xpText: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
    progressCircleWrap: {
      width: 52,
      height: 52,
      borderRadius: 26,
      borderWidth: 3,
      borderColor: colors.python,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressPct: { color: colors.text, fontWeight: '700', fontSize: 13 },
    lessonCountText: { color: colors.textMuted, fontSize: 12 },
    continueCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      borderRadius: radius.lg,
      padding: spacing.lg,
      justifyContent: 'space-between',
      ...shadow.glow(colors.primary),
    },
    continueLeft: { flex: 1, gap: 3 },
    continueLabel: { color: '#dbeafe', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    continueTitle: { color: colors.white, fontSize: 17, fontWeight: '800' },
    continueModule: { color: '#dbeafe', fontSize: 12 },
    playButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.python,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
    },
    sectionHeader: { color: colors.text, fontSize: 18, fontWeight: '800' },
    seeAll: { color: colors.primary, fontSize: 13, fontWeight: '700' },
    moduleGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.lg - spacing.xs,
      gap: 0,
    },
    moduleGridItem: {
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.sm,
    },
    moduleCard: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: spacing.md,
      gap: 6,
      minHeight: 172,
      ...shadow.soft,
    },
    nextTag: {
      position: 'absolute',
      top: -8,
      right: 10,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radius.full,
      zIndex: 2,
    },
    nextTagText: { color: '#0a0e17', fontSize: 8, fontWeight: '800', letterSpacing: 0.3 },
    moduleCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    moduleIconCircle: {
      width: 42,
      height: 42,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    doneCheckWrap: { paddingTop: 2 },
    moduleCardOrder: { color: colors.textMuted, fontSize: 9, fontWeight: '800', letterSpacing: 0.6, marginTop: 4 },
    moduleCardTitle: { color: colors.text, fontSize: 13, fontWeight: '700', lineHeight: 16.5, minHeight: 49, flex: 1 },
    moduleCardCount: { color: colors.textMuted, fontSize: 10, fontWeight: '600', marginTop: 2 },
    quickAccessRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
    },
    quickAccessCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: 4,
      ...shadow.soft,
    },
    quickAccessIcon: {
      width: 34,
      height: 34,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    quickAccessTitle: { color: colors.text, fontSize: 13, fontWeight: '700' },
    quickAccessSub: { color: colors.textMuted, fontSize: 10.5 },
    tipCard: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      backgroundColor: colors.python + '10',
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.python + '2a',
      alignItems: 'center',
    },
    tipIconWrap: {
      width: 36,
      height: 36,
      borderRadius: radius.sm,
      backgroundColor: colors.python + '20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tipText: { color: colors.text, fontSize: 13, flex: 1, lineHeight: 19 },
    followCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      marginTop: spacing.sm,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    followIconWrap: {
      width: 36,
      height: 36,
      borderRadius: radius.sm,
      backgroundColor: '#E1306C1a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    followText: { color: colors.textSecondary, fontSize: 13, flex: 1, lineHeight: 19 },
  });
}
