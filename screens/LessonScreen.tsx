import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { getLessonById, getNextLesson } from '../lib/courseData';
import { isLessonComplete, toggleLessonComplete, getBookmarks, toggleBookmark } from '../lib/progress';
import { markUserWatching } from '../lib/students';
import CodeBlock from '../components/CodeBlock';
import AnimatedPressable from '../components/AnimatedPressable';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { haptics } from '../lib/haptics';
import { CourseStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CourseStackParamList, 'Lesson'>;

export default function LessonScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { lessonId } = route.params;
  const found = getLessonById(lessonId);
  const [complete, setComplete] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const scrollProgress = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      isLessonComplete(lessonId).then(setComplete);
      getBookmarks().then((list) => setBookmarked(list.includes(lessonId)));
      scrollProgress.setValue(0);
      const found = getLessonById(lessonId);
      if (found) {
        markUserWatching(found.lesson.title).catch(() => {});
      }
    }, [lessonId])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: found?.module.title ?? 'Lesson',
      headerRight: () => (
        <Pressable onPress={handleBookmark} hitSlop={10} style={{ marginRight: 4 }}>
          <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color={bookmarked ? colors.python : colors.text} />
        </Pressable>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, bookmarked, found, colors]);

  if (!found) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Text style={styles.notFound}>Lesson not found.</Text>
      </SafeAreaView>
    );
  }

  const { lesson, module } = found;
  const next = getNextLesson(lessonId);
  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);

  const handleToggleComplete = async () => {
    haptics.success();
    const updated = await toggleLessonComplete(lessonId);
    setComplete(updated.includes(lessonId));
  };

  const handleBookmark = async () => {
    haptics.light();
    const updated = await toggleBookmark(lessonId);
    setBookmarked(updated.includes(lessonId));
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const maxScroll = Math.max(contentSize.height - layoutMeasurement.height, 1);
    const pct = Math.min(1, Math.max(0, contentOffset.y / maxScroll));
    scrollProgress.setValue(pct);
  };

  const barWidth = scrollProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: barWidth, backgroundColor: module.color }]} />
      </View>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl, alignItems: isDesktop ? 'center' : undefined }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
      <ResponsiveContainer>
        <View style={styles.metaRow}>
          <View style={[styles.moduleTag, { backgroundColor: module.color + '22' }]}>
            <Text style={[styles.moduleTagText, { color: module.color }]}>{module.title}</Text>
          </View>
          {lessonIndex >= 0 && (
            <Text style={styles.lessonPosition}>Lesson {lessonIndex + 1} of {module.lessons.length}</Text>
          )}
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={styles.timeText}>{lesson.minutes} min read</Text>
          </View>
        </View>

        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.summary}>{lesson.summary}</Text>

        {lesson.content.map((para, idx) => (
          <Text key={idx} style={styles.paragraph}>{para}</Text>
        ))}

        {lesson.examples.length > 0 && (
          <View style={{ marginTop: spacing.md }}>
            <View style={styles.tryItRow}>
              <Ionicons name="terminal" size={14} color={colors.accent} />
              <Text style={styles.sectionLabel}>TRY IT OUT</Text>
            </View>
            {lesson.examples.map((ex, idx) => (
              <CodeBlock key={idx} example={ex} />
            ))}
          </View>
        )}

        <View style={styles.keyPointsCard}>
          <View style={styles.keyPointsHeader}>
            <Ionicons name="key" size={18} color={colors.python} />
            <Text style={styles.keyPointsTitle}>Key Takeaways</Text>
          </View>
          {lesson.keyPoints.map((kp, idx) => (
            <View key={idx} style={styles.keyPointRow}>
              <View style={styles.keyPointBullet} />
              <Text style={styles.keyPointText}>{kp}</Text>
            </View>
          ))}
        </View>

        <AnimatedPressable
          scaleTo={0.97}
          style={{ marginTop: spacing.lg }}
          onPress={handleToggleComplete}
          haptic="none"
        >
          {complete ? (
            <LinearGradient
              colors={['#34d399', '#0ea968']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.completeButton}
            >
              <Ionicons name="checkmark-circle" size={22} color={colors.bg} />
              <Text style={[styles.completeButtonText, { color: colors.bg }]}>Completed</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.completeButton, styles.completeButtonIncomplete]}>
              <Ionicons name="checkmark-circle-outline" size={22} color={colors.text} />
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </View>
          )}
        </AnimatedPressable>

        {next && (
          <AnimatedPressable
            scaleTo={0.98}
            style={styles.nextButton}
            onPress={() => navigation.push('Lesson', { lessonId: next.lesson.id })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.nextLabel}>NEXT LESSON</Text>
              <Text style={styles.nextTitle}>{next.lesson.title}</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={28} color={colors.primary} />
          </AnimatedPressable>
        )}
      </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    progressTrack: { height: 3, backgroundColor: colors.border, width: '100%' },
    progressFill: { height: 3 },
    notFound: { color: colors.text, padding: spacing.lg },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md, flexWrap: 'wrap' },
    moduleTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full },
    moduleTagText: { fontSize: 11, fontWeight: '700' },
    lessonPosition: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
    timeTag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto' },
    timeText: { color: colors.textMuted, fontSize: 12 },
    title: { color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: spacing.sm },
    summary: { color: colors.textSecondary, fontSize: 15, marginBottom: spacing.md, lineHeight: 22 },
    paragraph: { color: colors.text, fontSize: 15, lineHeight: 24, marginBottom: spacing.md },
    tryItRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
    sectionLabel: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
    keyPointsCard: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginTop: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: spacing.sm,
      ...shadow.soft,
    },
    keyPointsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    keyPointsTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
    keyPointRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    keyPointBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.python, marginTop: 8 },
    keyPointText: { color: colors.textSecondary, fontSize: 14, flex: 1, lineHeight: 21 },
    completeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: radius.md,
      paddingVertical: 14,
    },
    completeButtonIncomplete: {
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.border,
    },
    completeButtonText: { color: colors.text, fontSize: 15, fontWeight: '700' },
    nextButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: spacing.md,
      marginTop: spacing.md,
    },
    nextLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
    nextTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 2 },
  });
}
