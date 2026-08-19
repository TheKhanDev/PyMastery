import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing, radius, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { modules, totalLessonsCount } from '../lib/courseData';
import { getCompletedLessons } from '../lib/progress';
import ModuleCard from '../components/ModuleCard';
import ProgressBar from '../components/ProgressBar';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { CourseStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseMain'>;

export default function CourseScreen({ navigation }: Props) {
  const { colors, gradients } = useTheme();
  const { isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tabBarHeight = useBottomTabBarHeight();
  const [completed, setCompleted] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedLessons().then(setCompleted);
    }, [])
  );

  const total = totalLessonsCount();
  const overall = total > 0 ? completed.length / total : 0;
  const nextModuleId = modules.find((m) => m.lessons.some((l) => !completed.includes(l.id)))?.id;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: tabBarHeight + spacing.xl, alignItems: isDesktop ? 'center' : undefined }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ResponsiveContainer style={{ marginBottom: spacing.lg }}>
            <Text style={styles.title}>Full Curriculum</Text>
            <Text style={styles.subtitle}>10 modules · {total} lessons · Beginner to Advanced</Text>
            <LinearGradient colors={gradients.card} style={styles.progressCard}>
              <View style={styles.progressCardTop}>
                <Text style={styles.progressCardLabel}>Overall Progress</Text>
                <Text style={styles.progressCardPct}>{Math.round(overall * 100)}%</Text>
              </View>
              <ProgressBar progress={overall} gradientColors={gradients.python} height={10} />
              <Text style={styles.progressCardSub}>{completed.length} of {total} lessons completed</Text>
            </LinearGradient>
          </ResponsiveContainer>
        }
        renderItem={({ item, index }) => (
          <ResponsiveContainer>
            <FadeInView delay={index * 45}>
              <ModuleCard
                module={item}
                completedCount={item.lessons.filter((l) => completed.includes(l.id)).length}
                isNext={item.id === nextModuleId}
                onPress={() => navigation.navigate('ModuleDetail', { moduleId: item.id })}
              />
            </FadeInView>
          </ResponsiveContainer>
        )}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    title: { fontSize: 28, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.md },
    progressCard: {
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: spacing.sm,
      ...shadow.soft,
    },
    progressCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    progressCardLabel: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
    progressCardPct: { color: colors.python, fontSize: 18, fontWeight: '800' },
    progressCardSub: { color: colors.textMuted, fontSize: 12 },
  });
}
