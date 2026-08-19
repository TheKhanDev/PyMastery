import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { totalLessonsCount } from '../lib/courseData';
import { getStreak } from '../lib/progress';
import {
  TOP_STUDENTS,
  OTHER_STUDENTS,
  COMPLETED_STUDENTS,
  totalStudentCount,
  startedStudentCount,
  completedStudentCount,
  getActiveNowStudents,
  getUserActivity,
  getLocalStudents,
  addLocalStudent,
  getRosterDateLabel,
  LocalStudent,
  Student,
} from '../lib/students';
import { haptics } from '../lib/haptics';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { useBreakpoint } from '../lib/breakpoints';

const TOTAL_LESSONS = totalLessonsCount();
const MEDALS = ['🥇', '🥈', '🥉'];

type ListRow =
  | { kind: 'local'; student: LocalStudent }
  | { kind: 'seed'; student: Student };

export default function StudentsScreen() {
  const { colors, gradients } = useTheme();
  const { isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tabBarHeight = useBottomTabBarHeight();
  const [localStudents, setLocalStudents] = useState<LocalStudent[]>([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userActive, setUserActive] = useState<{ isActive: boolean; lessonTitle: string | null }>({ isActive: false, lessonTitle: null });
  const [userStreak, setUserStreak] = useState(0);
  const [activeNow] = useState(() => getActiveNowStudents(12));

  const load = useCallback(() => {
    getLocalStudents().then(setLocalStudents);
    getUserActivity().then(setUserActive);
    getStreak().then(setUserStreak);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleJoin = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      if (Platform.OS === 'web') {
        alert('Apna naam to likho, phir join karo!');
      } else {
        Alert.alert('Naam chahiye', 'Course join karne ke liye pehle apna naam likho.');
      }
      return;
    }
    setSubmitting(true);
    try {
      const updated = await addLocalStudent(trimmed, course || 'Full Python Course');
      setLocalStudents(updated);
      setName('');
      setCourse('');
      setShowForm(false);
      haptics.success();
    } finally {
      setSubmitting(false);
    }
  };

  const totalCount = totalStudentCount() + localStudents.length;
  const startedCount = startedStudentCount() + localStudents.length;
  const completedCount = completedStudentCount();

  const rows: ListRow[] = [
    ...localStudents.map((s) => ({ kind: 'local' as const, student: s })),
    ...OTHER_STUDENTS.map((s) => ({ kind: 'seed' as const, student: s })),
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.student.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + spacing.xl, alignItems: isDesktop ? 'center' : undefined }}
        initialNumToRender={20}
        maxToRenderPerBatch={30}
        windowSize={10}
        ListHeaderComponent={
          <ResponsiveContainer>
            <View style={styles.header}>
              <Text style={styles.title}>Students</Text>
              <Text style={styles.subtitle}>PyMastery seekhne wale, ek sath — 500+ students ka ghar</Text>
              <View style={styles.rosterBadge}>
                <Ionicons name="shuffle" size={12} color={colors.python} />
                <Text style={styles.rosterBadgeText}>Aaj ka roster · {getRosterDateLabel()} · rozana randomize hota hai</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="people" size={20} color={colors.primary} />
                <Text style={styles.statValue}>{totalCount}+</Text>
                <Text style={styles.statLabel}>Total Students</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="flash" size={20} color={colors.python} />
                <Text style={styles.statValue}>{startedCount}</Text>
                <Text style={styles.statLabel}>Started Course</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="ribbon" size={20} color={colors.success} />
                <Text style={styles.statValue}>{completedCount}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>

            {/* Join / Registration form */}
            <FadeInView>
              <View style={styles.joinCard}>
                {!showForm ? (
                  <AnimatedPressable onPress={() => setShowForm(true)} scaleTo={0.98} haptic="light">
                    <LinearGradient colors={gradients.python} style={styles.joinButton}>
                      <Ionicons name="person-add" size={18} color={colors.bg} />
                      <Text style={styles.joinButtonText}>Course Join Karo / Shuru Karo</Text>
                    </LinearGradient>
                  </AnimatedPressable>
                ) : (
                  <View>
                    <Text style={styles.formTitle}>Apna naam roster mein add karo</Text>
                    <Text style={styles.formHint}>Tumhara naam neeche Students list mein "Aap" ke tag ke sath show hoga.</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Apna naam likho"
                      placeholderTextColor={colors.textMuted}
                      value={name}
                      onChangeText={setName}
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Course (optional, jese Full Python Course)"
                      placeholderTextColor={colors.textMuted}
                      value={course}
                      onChangeText={setCourse}
                      returnKeyType="done"
                      onSubmitEditing={handleJoin}
                    />
                    <View style={styles.formButtonRow}>
                      <AnimatedPressable
                        style={styles.formCancelButton}
                        onPress={() => {
                          setShowForm(false);
                          setName('');
                          setCourse('');
                        }}
                        haptic="light"
                      >
                        <Text style={styles.formCancelText}>Cancel</Text>
                      </AnimatedPressable>
                      <AnimatedPressable style={{ flex: 1 }} onPress={handleJoin} disabled={submitting} haptic="none">
                        <LinearGradient colors={gradients.python} style={styles.formSubmitButton}>
                          <Ionicons name="checkmark" size={16} color={colors.bg} />
                          <Text style={styles.joinButtonText}>{submitting ? 'Join ho raha hai...' : 'Confirm'}</Text>
                        </LinearGradient>
                      </AnimatedPressable>
                    </View>
                  </View>
                )}
              </View>
            </FadeInView>

            {/* Active Members — currently watching */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.liveDot} />
              <Ionicons name="eye" size={16} color={colors.danger} />
              <Text style={styles.sectionHeader}>Active Members — Abhi Dekh Rahe Hain</Text>
            </View>

            {userActive.isActive && (
              <FadeInView>
                <View style={[styles.activeRow, styles.youActiveRow]}>
                  <View style={styles.liveDotSmallWrap}>
                    <View style={styles.liveDotSmall} />
                  </View>
                  <View style={[styles.avatarSmall, { backgroundColor: colors.python + '2a', borderColor: colors.python }]}>
                    <Text style={[styles.avatarTextSmall, { color: colors.python }]}>A</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                      <Text style={styles.studentName} numberOfLines={1}>Aap</Text>
                      <View style={styles.youBadge}>
                        <Text style={styles.youBadgeText}>YOU</Text>
                      </View>
                    </View>
                    <Text style={styles.studentMeta} numberOfLines={1}>
                      Abhi dekh rahe: {userActive.lessonTitle}
                    </Text>
                  </View>
                </View>
              </FadeInView>
            )}

            {activeNow.map((student, idx) => (
              <FadeInView key={`active-${student.id}`} delay={idx * 30}>
                <View style={styles.activeRow}>
                  <View style={styles.liveDotSmallWrap}>
                    <View style={styles.liveDotSmall} />
                  </View>
                  <View style={[styles.avatarSmall, { backgroundColor: student.color + '1e', borderColor: student.color + '40' }]}>
                    <Text style={[styles.avatarTextSmall, { color: student.color }]}>{student.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
                    <Text style={styles.studentMeta} numberOfLines={1}>{student.lessonsCompleted}/{TOTAL_LESSONS} lessons · {student.streak} din ka streak</Text>
                  </View>
                  <Ionicons name="play-circle" size={20} color={colors.danger} />
                </View>
              </FadeInView>
            ))}

            {/* Top students */}
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="trophy" size={16} color={colors.python} />
              <Text style={styles.sectionHeader}>Top Students</Text>
            </View>
            {TOP_STUDENTS.map((student, idx) => (
              <FadeInView key={student.id} delay={idx * 40}>
                <View style={styles.topRow}>
                  <View style={styles.rankWrap}>
                    <Text style={styles.rankText}>{MEDALS[idx] ?? `#${idx + 1}`}</Text>
                  </View>
                  <View style={[styles.avatar, { backgroundColor: student.color + '2a', borderColor: student.color + '55' }]}>
                    <Text style={[styles.avatarText, { color: student.color }]}>{student.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.topName} numberOfLines={1}>{student.name}</Text>
                    <Text style={styles.topMeta} numberOfLines={1}>
                      {student.lessonsCompleted}/{TOTAL_LESSONS} lessons · {student.xp} XP · 🔥{student.streak}
                    </Text>
                  </View>
                  <View style={styles.startedBadge}>
                    <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                    <Text style={styles.startedBadgeText}>Active</Text>
                  </View>
                </View>
              </FadeInView>
            ))}

            {/* Completed Students */}
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="checkmark-done-circle" size={16} color={colors.success} />
              <Text style={styles.sectionHeader}>Completed Students ({completedCount})</Text>
            </View>
            {COMPLETED_STUDENTS.slice(0, 12).map((student, idx) => (
              <FadeInView key={student.id} delay={idx * 25}>
                <View style={[styles.studentRow, styles.completedRow]}>
                  <View style={[styles.avatarSmall, { backgroundColor: colors.success + '22', borderColor: colors.success }]}>
                    <Text style={[styles.avatarTextSmall, { color: colors.success }]}>{student.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
                    <Text style={styles.studentMeta} numberOfLines={1}>Pura course khatam · 🔥{student.streak} din streak</Text>
                  </View>
                  <View style={styles.startedBadgeSmall}>
                    <Ionicons name="ribbon" size={12} color={colors.success} />
                    <Text style={styles.startedBadgeSmallText}>100%</Text>
                  </View>
                </View>
              </FadeInView>
            ))}

            <View style={styles.sectionHeaderRow}>
              <Ionicons name="people-outline" size={16} color={colors.primary} />
              <Text style={styles.sectionHeader}>Sab Students ({rows.length})</Text>
            </View>
          </ResponsiveContainer>
        }
        renderItem={({ item, index }) => {
          if (item.kind === 'local') {
            const s = item.student;
            return (
              <ResponsiveContainer>
                <FadeInView delay={Math.min(index, 10) * 30}>
                  <View style={[styles.studentRow, styles.localStudentRow]}>
                    <View style={[styles.avatarSmall, { backgroundColor: colors.python + '2a', borderColor: colors.python }]}>
                      <Text style={[styles.avatarTextSmall, { color: colors.python }]}>{s.name[0]?.toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <View style={styles.nameRow}>
                        <Text style={styles.studentName} numberOfLines={1}>{s.name}</Text>
                        <View style={styles.youBadge}>
                          <Text style={styles.youBadgeText}>YOU</Text>
                        </View>
                      </View>
                      <Text style={styles.studentMeta} numberOfLines={1}>{s.course}</Text>
                    </View>
                    <View style={styles.startedBadgeSmall}>
                      <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                      <Text style={styles.startedBadgeSmallText}>Shuru</Text>
                    </View>
                  </View>
                </FadeInView>
              </ResponsiveContainer>
            );
          }

          const s = item.student;
          const started = s.lessonsCompleted > 0;
          return (
            <ResponsiveContainer>
              <FadeInView delay={Math.min(index, 10) * 20}>
                <View style={styles.studentRow}>
                  <View style={[styles.avatarSmall, { backgroundColor: s.color + '1e', borderColor: s.color + '40' }]}>
                    <Text style={[styles.avatarTextSmall, { color: s.color }]}>{s.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.studentName} numberOfLines={1}>{s.name}</Text>
                    <Text style={styles.studentMeta} numberOfLines={1}>
                      {started ? `${s.lessonsCompleted}/${TOTAL_LESSONS} lessons · 🔥${s.streak}` : 'Abhi shuru nahi kiya'}
                    </Text>
                  </View>
                  {started ? (
                    <View style={styles.startedBadgeSmall}>
                      <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                      <Text style={styles.startedBadgeSmallText}>Shuru</Text>
                    </View>
                  ) : (
                    <View style={styles.notStartedBadge}>
                      <Text style={styles.notStartedBadgeText}>Naya</Text>
                    </View>
                  )}
                </View>
              </FadeInView>
            </ResponsiveContainer>
          );
        }}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    header: { padding: spacing.lg, paddingBottom: spacing.sm },
    title: { fontSize: 28, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    rosterBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
      backgroundColor: colors.python + '14',
      borderWidth: 1,
      borderColor: colors.python + '33',
      borderRadius: radius.full,
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginTop: spacing.sm,
      maxWidth: '100%',
    },
    rosterBadgeText: { color: colors.python, fontSize: 11, fontWeight: '700', flexShrink: 1 },
    statsRow: { flexDirection: 'row', gap: spacing.sm, marginHorizontal: spacing.lg, marginBottom: spacing.lg },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.md,
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    statValue: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 2 },
    statLabel: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
    joinCard: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.xl,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    joinButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: spacing.md,
      borderRadius: radius.md,
    },
    joinButtonText: { color: colors.bg, fontWeight: '800', fontSize: 14 },
    formTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginBottom: 4 },
    formHint: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.sm, lineHeight: 17 },
    input: {
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 12,
      color: colors.text,
      fontSize: 14,
      marginBottom: spacing.sm,
    },
    formButtonRow: { flexDirection: 'row', gap: spacing.sm, marginTop: 4 },
    formCancelButton: {
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    formCancelText: { color: colors.textSecondary, fontWeight: '600', fontSize: 13 },
    formSubmitButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: spacing.md,
      borderRadius: radius.md,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    sectionHeader: { color: colors.text, fontSize: 16, fontWeight: '800' },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger },
    liveDotSmallWrap: { width: 16, alignItems: 'center' },
    liveDotSmall: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.danger },
    activeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.sm + 2,
      marginBottom: spacing.xs,
      borderWidth: 1,
      borderColor: colors.danger + '2a',
    },
    youActiveRow: { borderColor: colors.python + '55', backgroundColor: colors.python + '0d' },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.sm + 2,
      marginBottom: spacing.xs,
      borderWidth: 1,
      borderColor: colors.python + '33',
      ...shadow.soft,
    },
    rankWrap: { width: 28, alignItems: 'center' },
    rankText: { fontSize: 18 },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    avatarText: { fontSize: 16, fontWeight: '800' },
    topName: { color: colors.text, fontSize: 14, fontWeight: '700' },
    topMeta: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
    startedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      backgroundColor: colors.success + '18',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: radius.full,
    },
    startedBadgeText: { color: colors.success, fontSize: 10, fontWeight: '700' },
    completedRow: {
      borderColor: colors.success + '40',
    },
    studentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.sm + 2,
      marginBottom: spacing.xs,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    localStudentRow: {
      borderColor: colors.python + '55',
      backgroundColor: colors.python + '0d',
    },
    avatarSmall: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    avatarTextSmall: { fontSize: 13, fontWeight: '800' },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    studentName: { color: colors.text, fontSize: 13, fontWeight: '700' },
    studentMeta: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
    youBadge: {
      backgroundColor: colors.python,
      paddingHorizontal: 6,
      paddingVertical: 1,
      borderRadius: radius.full,
    },
    youBadgeText: { color: colors.bg, fontSize: 9, fontWeight: '800' },
    startedBadgeSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      backgroundColor: colors.success + '18',
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: radius.full,
    },
    startedBadgeSmallText: { color: colors.success, fontSize: 9, fontWeight: '700' },
    notStartedBadge: {
      backgroundColor: colors.textMuted + '22',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radius.full,
    },
    notStartedBadgeText: { color: colors.textMuted, fontSize: 9, fontWeight: '700' },
  });
}
