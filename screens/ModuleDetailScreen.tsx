import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { getModuleById } from '../lib/courseData';
import { getCompletedLessons, getQuizScores } from '../lib/progress';
import ProgressBar from '../components/ProgressBar';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import { CourseStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CourseStackParamList, 'ModuleDetail'>;

export default function ModuleDetailScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { moduleId } = route.params;
  const mod = getModuleById(moduleId)!;
  const [completed, setCompleted] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessons().then(setCompleted);
      getQuizScores().then((scores) => setQuizScore(scores[moduleId] ?? null));
    }, [moduleId])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: mod.title });
  }, [navigation, mod.title]);

  const doneCount = mod.lessons.filter((l) => completed.includes(l.id)).length;
  const progress = doneCount / mod.lessons.length;

  return (
    // This screen already has a native header (shows a back arrow + title), so we
    // only reserve the *bottom* safe-area inset here — using edges={['top']} as well
    // would double up the top padding underneath the header.
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <LinearGradient
        colors={[mod.color + '2e', colors.bg]}
        style={styles.hero}
      >
        <View style={[styles.heroIcon, { backgroundColor: mod.color + '2a', borderColor: mod.color + '55' }]}>
          <Ionicons name={mod.icon as any} size={32} color={mod.color} />
        </View>
        <Text style={[styles.heroTag, { color: mod.color }]}>MODULE {mod.order}</Text>
        <Text style={styles.heroTitle}>{mod.title}</Text>
        <Text style={styles.heroSubtitle}>{mod.subtitle}</Text>
        <View style={styles.heroProgressRow}>
          <ProgressBar progress={progress} color={mod.color} height={8} />
          <Text style={styles.heroProgressLabel}>{doneCount}/{mod.lessons.length}</Text>
        </View>
      </LinearGradient>

      <FlatList
        data={mod.lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const done = completed.includes(item.id);
          return (
            <FadeInView delay={index * 50}>
              <AnimatedPressable
                scaleTo={0.98}
                style={styles.lessonRow}
                onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
              >
                <View style={[styles.numBadge, done && { backgroundColor: colors.success + '22', borderColor: colors.success }]}>
                  {done ? (
                    <Ionicons name="checkmark" size={16} color={colors.success} />
                  ) : (
                    <Text style={styles.numText}>{index + 1}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lessonTitle}>{item.title}</Text>
                  <View style={styles.lessonMetaRow}>
                    <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                    <Text style={styles.lessonMeta}>{item.minutes} min</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </AnimatedPressable>
            </FadeInView>
          );
        }}
        ListFooterComponent={
          <FadeInView delay={mod.lessons.length * 50 + 100}>
            <AnimatedPressable
              scaleTo={0.97}
              onPress={() => navigation.navigate('Quiz', { moduleId: mod.id })}
            >
              <LinearGradient
                colors={[colors.python, '#f7c624']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quizCard}
              >
                <View style={styles.quizIconWrap}>
                  <Ionicons name="school-outline" size={24} color={colors.bg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.quizTitle}>Module Quiz</Text>
                  <Text style={styles.quizSub}>
                    {quizScore ? `Best score: ${quizScore.score}/${quizScore.total}` : `${mod.quiz.length} questions · Test your knowledge`}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.bg} />
              </LinearGradient>
            </AnimatedPressable>
          </FadeInView>
        }
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    hero: {
      margin: spacing.lg,
      marginBottom: 0,
      padding: spacing.lg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: 4,
    },
    heroIcon: { width: 56, height: 56, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm, borderWidth: 1 },
    heroTag: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
    heroTitle: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 2 },
    heroSubtitle: { color: colors.textSecondary, fontSize: 14, marginBottom: spacing.sm },
    heroProgressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 4 },
    heroProgressLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', width: 36 },
    lessonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    numBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    numText: { color: colors.textSecondary, fontSize: 13, fontWeight: '700' },
    lessonTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
    lessonMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
    lessonMeta: { color: colors.textMuted, fontSize: 12 },
    quizCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginTop: spacing.sm,
      ...shadow.glow(colors.python),
    },
    quizIconWrap: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: '#00000022', alignItems: 'center', justifyContent: 'center' },
    quizTitle: { color: colors.bg, fontSize: 16, fontWeight: '800' },
    quizSub: { color: '#3a3418', fontSize: 12, marginTop: 2, fontWeight: '600' },
  });
}
