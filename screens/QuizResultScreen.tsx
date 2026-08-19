import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { getModuleById } from '../lib/courseData';
import AnimatedPressable from '../components/AnimatedPressable';
import { haptics } from '../lib/haptics';
import { CourseStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CourseStackParamList, 'QuizResult'>;

function ConfettiPiece({ index, colorList }: { index: number; colorList: string[] }) {
  const translateY = useRef(new Animated.Value(-40)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const left = (index * 37) % 100;
  const delay = (index % 8) * 90;
  const color = colorList[index % colorList.length];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 500,
        duration: 2200 + (index % 5) * 200,
        delay,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: (index % 2 === 0 ? 1 : -1) * (20 + (index % 40)),
        duration: 2200,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 4,
        duration: 2200,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotateStr = rotate.interpolate({ inputRange: [0, 4], outputRange: ['0deg', '720deg'] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: `${left}%`,
        width: 8,
        height: 14,
        backgroundColor: color,
        borderRadius: 2,
        transform: [{ translateY }, { translateX }, { rotate: rotateStr }],
      }}
    />
  );
}

export default function QuizResultScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const confettiColors = useMemo(() => [colors.python, colors.primary, colors.success, '#f472b6', '#a78bfa'], [colors]);
  const { moduleId, score, total } = route.params;
  const mod = getModuleById(moduleId)!;
  const pct = total > 0 ? score / total : 0;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const isPerfect = pct === 1;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
    if (pct >= 0.7) haptics.success();
    else haptics.warning();
  }, []);

  let message = 'Keep practicing!';
  let color = colors.warning;
  let icon = 'sad-outline';
  if (isPerfect) {
    message = 'Perfect score! You nailed it! 🎉';
    color = colors.success;
    icon = 'trophy';
  } else if (pct >= 0.7) {
    message = 'Great job! Solid understanding.';
    color = colors.success;
    icon = 'happy-outline';
  } else if (pct >= 0.4) {
    message = 'Good effort — review and try again!';
    color = colors.warning;
    icon = 'school-outline';
  } else {
    message = "Don't worry — revisit the lessons and retry!";
    color = colors.danger;
    icon = 'refresh-outline';
  }

  return (
    // Header is shown (title "Results" + custom back button), so only the bottom
    // safe-area inset needs reserving here to avoid doubling up the top padding.
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {isPerfect && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} colorList={confettiColors} />
          ))}
        </View>
      )}
      <View style={styles.content}>
        <Animated.View style={[styles.iconCircle, { backgroundColor: color + '20', borderColor: color, transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name={icon as any} size={56} color={color} />
        </Animated.View>

        <Text style={styles.scoreText}>{score}/{total}</Text>
        <Text style={styles.pctText}>{Math.round(pct * 100)}% Correct</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.moduleTitle}>{mod.title} Quiz</Text>

        <View style={styles.buttonRow}>
          <AnimatedPressable
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => navigation.replace('Quiz', { moduleId })}
          >
            <Ionicons name="refresh" size={18} color={colors.text} />
            <Text style={styles.btnSecondaryText}>Retry Quiz</Text>
          </AnimatedPressable>
          <AnimatedPressable style={{ flex: 1 }} onPress={() => navigation.popToTop()} haptic="medium">
            <LinearGradient
              colors={[colors.python, '#f7c624']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.btn, styles.btnPrimary]}
            >
              <Text style={styles.btnPrimaryText}>Done</Text>
              <Ionicons name="checkmark" size={18} color={colors.bg} />
            </LinearGradient>
          </AnimatedPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
      ...shadow.card,
    },
    scoreText: { color: colors.text, fontSize: 42, fontWeight: '900' },
    pctText: { color: colors.textSecondary, fontSize: 16, marginTop: 4, marginBottom: spacing.md },
    message: { color: colors.text, fontSize: 17, fontWeight: '600', textAlign: 'center', marginBottom: 6 },
    moduleTitle: { color: colors.textMuted, fontSize: 13, marginBottom: spacing.xl },
    buttonRow: { flexDirection: 'row', gap: spacing.md, width: '100%' },
    btn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: radius.md,
      paddingVertical: 14,
    },
    btnSecondary: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder },
    btnSecondaryText: { color: colors.text, fontWeight: '700', fontSize: 15 },
    btnPrimary: { ...shadow.glow(colors.python) },
    btnPrimaryText: { color: colors.bg, fontWeight: '800', fontSize: 15 },
  });
}
