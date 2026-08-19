import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { getModuleById } from '../lib/courseData';
import { saveQuizScore } from '../lib/progress';
import AnimatedPressable from '../components/AnimatedPressable';
import { haptics } from '../lib/haptics';
import { CourseStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<CourseStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { moduleId } = route.params;
  const mod = getModuleById(moduleId)!;
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  const question = mod.quiz[qIndex];
  const isLast = qIndex === mod.quiz.length - 1;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, [qIndex]);

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    if (idx === question.correctIndex) {
      haptics.success();
      setScore((s) => s + 1);
    } else {
      haptics.error();
      Animated.sequence([
        Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleNext = async () => {
    haptics.selection();
    if (isLast) {
      const finalScore = score;
      await saveQuizScore(moduleId, finalScore, mod.quiz.length);
      navigation.replace('QuizResult', { moduleId, score: finalScore, total: mod.quiz.length });
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.dotsRow}>
          {mod.quiz.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < qIndex && { backgroundColor: colors.success },
                i === qIndex && { backgroundColor: mod.color, width: 22 },
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressLabel}>Question {qIndex + 1} of {mod.quiz.length}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        <Animated.View style={{ opacity: fade }}>
          <Text style={styles.question}>{question.question}</Text>

          {question.options.map((opt, idx) => {
            const isCorrect = idx === question.correctIndex;
            const isSelected = idx === selected;
            let optionStyle = styles.option;
            let textStyle = styles.optionText;
            let icon: any = null;

            if (showAnswer) {
              if (isCorrect) {
                optionStyle = { ...styles.option, ...styles.optionCorrect };
                icon = <Ionicons name="checkmark-circle" size={20} color={colors.success} />;
              } else if (isSelected && !isCorrect) {
                optionStyle = { ...styles.option, ...styles.optionWrong };
                icon = <Ionicons name="close-circle" size={20} color={colors.danger} />;
              }
            }

            const animStyle = isSelected && !isCorrect ? { transform: [{ translateX: shake }] } : undefined;

            return (
              <Animated.View key={idx} style={animStyle}>
                <AnimatedPressable
                  style={optionStyle}
                  onPress={() => handleSelect(idx)}
                  disabled={showAnswer}
                  haptic="none"
                  scaleTo={0.98}
                >
                  <Text style={textStyle}>{opt}</Text>
                  {icon}
                </AnimatedPressable>
              </Animated.View>
            );
          })}

          {showAnswer && (
            <View style={[styles.explanationCard, selected === question.correctIndex ? styles.explanationCorrect : styles.explanationWrong]}>
              <Ionicons
                name={selected === question.correctIndex ? 'sparkles' : 'information-circle'}
                size={18}
                color={selected === question.correctIndex ? colors.success : colors.primary}
              />
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {showAnswer && (
        <View style={styles.footer}>
          <AnimatedPressable style={styles.nextBtn} onPress={handleNext} haptic="none">
            <Text style={styles.nextBtnText}>{isLast ? 'See Results' : 'Next Question'}</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.bg} />
          </AnimatedPressable>
        </View>
      )}
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: 10 },
    dotsRow: { flexDirection: 'row', gap: 6 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
    progressLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
    question: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: spacing.lg, lineHeight: 28 },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      ...shadow.soft,
    },
    optionCorrect: { borderColor: colors.success, backgroundColor: colors.success + '15' },
    optionWrong: { borderColor: colors.danger, backgroundColor: colors.danger + '15' },
    optionText: { color: colors.text, fontSize: 15, flex: 1, marginRight: spacing.sm },
    explanationCard: {
      flexDirection: 'row',
      gap: spacing.sm,
      borderRadius: radius.md,
      padding: spacing.md,
      marginTop: spacing.sm,
      borderWidth: 1,
    },
    explanationCorrect: { backgroundColor: colors.success + '15', borderColor: colors.success + '33' },
    explanationWrong: { backgroundColor: colors.primary + '15', borderColor: colors.primary + '33' },
    explanationText: { color: colors.text, fontSize: 13, flex: 1, lineHeight: 20 },
    footer: {
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    nextBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.python,
      borderRadius: radius.md,
      paddingVertical: 14,
      ...shadow.glow(colors.python),
    },
    nextBtnText: { color: colors.bg, fontSize: 15, fontWeight: '800' },
  });
}
