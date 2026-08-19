import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { getLessonById } from '../lib/courseData';
import { getBookmarks, isLessonComplete, toggleBookmark } from '../lib/progress';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { haptics } from '../lib/haptics';
import { BookmarksStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<BookmarksStackParamList, 'BookmarksMain'>;

export default function BookmarksScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tabBarHeight = useBottomTabBarHeight();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    const list = await getBookmarks();
    setBookmarks(list);
    const map: Record<string, boolean> = {};
    for (const id of list) {
      map[id] = await isLessonComplete(id);
    }
    setCompletedMap(map);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleRemove = async (id: string) => {
    haptics.warning();
    const updated = await toggleBookmark(id);
    setBookmarks(updated);
  };

  const items = bookmarks
    .map((id) => getLessonById(id))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {items.length === 0 ? (
        <ResponsiveContainer style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Bookmarks</Text>
            <Text style={styles.subtitle}>Saved lessons for quick access, anytime</Text>
          </View>
          <FadeInView style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="bookmark-outline" size={48} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Koi bookmark nahi hai abhi</Text>
            <Text style={styles.emptyText}>
              Kisi bhi lesson par bookmark icon tap karo, wo yahan save ho jayega dobara padhne ke liye.
            </Text>
          </FadeInView>
        </ResponsiveContainer>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.lesson.id}
          contentContainerStyle={{
            padding: spacing.lg,
            paddingBottom: tabBarHeight + spacing.xl,
            alignItems: isDesktop ? 'center' : undefined,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <ResponsiveContainer>
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Bookmarks</Text>
                  <Text style={styles.subtitle}>Saved lessons for quick access, anytime</Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{items.length}</Text>
                </View>
              </View>
            </ResponsiveContainer>
          }
          renderItem={({ item, index }) => (
            <ResponsiveContainer>
              <FadeInView delay={index * 50}>
                <AnimatedPressable
                  scaleTo={0.98}
                  style={styles.card}
                  onPress={() => navigation.navigate('Lesson', { lessonId: item.lesson.id })}
                >
                  <View style={[styles.iconWrap, { backgroundColor: item.module.color + '1e', borderColor: item.module.color + '40' }]}>
                    <Ionicons name={item.module.icon as any} size={20} color={item.module.color} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.lesson.title}</Text>
                    <Text style={styles.cardModule} numberOfLines={1}>{item.module.title}</Text>
                  </View>
                  {completedMap[item.lesson.id] && (
                    <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                  )}
                  <AnimatedPressable
                    hitSlop={10}
                    onPress={() => handleRemove(item.lesson.id)}
                    haptic="none"
                    scaleTo={0.85}
                  >
                    <Ionicons name="bookmark" size={20} color={colors.python} />
                  </AnimatedPressable>
                </AnimatedPressable>
              </FadeInView>
            </ResponsiveContainer>
          )}
        />
      )}
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    header: { padding: spacing.lg, paddingBottom: spacing.md },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.lg,
    },
    title: { fontSize: 28, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    countBadge: {
      backgroundColor: colors.python + '22',
      borderRadius: radius.full,
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.python + '44',
      marginLeft: spacing.sm,
    },
    countText: { color: colors.python, fontWeight: '800', fontSize: 14 },
    emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
    emptyIconWrap: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: spacing.sm,
    },
    emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: spacing.sm },
    emptyText: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 20 },
    card: {
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
    iconWrap: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
    cardTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
    cardModule: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  });
}
