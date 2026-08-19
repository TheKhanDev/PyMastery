import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { Module } from '../lib/types';
import ProgressBar from './ProgressBar';
import AnimatedPressable from './AnimatedPressable';

export default function ModuleCard({
  module,
  completedCount,
  onPress,
  isNext,
}: {
  module: Module;
  completedCount: number;
  onPress: () => void;
  isNext?: boolean;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const total = module.lessons.length;
  const progress = total > 0 ? completedCount / total : 0;
  const done = completedCount === total && total > 0;
  const started = completedCount > 0;

  return (
    <AnimatedPressable
      onPress={onPress}
      scaleTo={0.98}
      style={[
        styles.card,
        done && styles.cardDone,
        isNext && !done && styles.cardNext,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: module.color + '1e', borderColor: module.color + '4a' },
        ]}
      >
        <Ionicons name={module.icon as any} size={26} color={module.color} />
      </View>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={[styles.orderTag, { color: module.color }]}>MODULE {module.order}</Text>
          {done && (
            <View style={styles.doneBadge}>
              <Ionicons name="checkmark" size={11} color={colors.bg} />
            </View>
          )}
          {isNext && !done && !started && (
            <View style={styles.nextBadge}>
              <Text style={styles.nextBadgeText}>START HERE</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{module.subtitle}</Text>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={module.color} height={6} />
          <Text style={styles.progressLabel}>{completedCount}/{total}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </AnimatedPressable>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: spacing.md,
      ...shadow.soft,
    },
    cardDone: {
      borderColor: colors.success + '40',
    },
    cardNext: {
      borderColor: colors.python + '55',
    },
    iconWrap: {
      width: 52,
      height: 52,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    info: { flex: 1, gap: 4 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    orderTag: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    doneBadge: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.success,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextBadge: {
      backgroundColor: colors.python + '22',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radius.full,
    },
    nextBadgeText: { color: colors.python, fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
    title: { color: colors.text, fontSize: 16, fontWeight: '700' },
    subtitle: { color: colors.textSecondary, fontSize: 13 },
    progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
    progressLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600', width: 32 },
  });
}
