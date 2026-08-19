import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { YOUTUBE_PLAYLIST_URL, PLAYLIST_VIDEO_SLOTS, playlistEmbedUrl } from '../lib/youtube';
import YouTubeEmbed from '../components/YouTubeEmbed';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { haptics } from '../lib/haptics';

export default function VideosScreen() {
  const { colors, gradients } = useTheme();
  const { isDesktop } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openInYouTube = async () => {
    haptics.light();
    try {
      await Linking.openURL(YOUTUBE_PLAYLIST_URL);
    } catch {
      if (Platform.OS === 'web') window.open(YOUTUBE_PLAYLIST_URL, '_blank');
    }
  };

  const selectSlot = (index: number) => {
    haptics.selection();
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: tabBarHeight + spacing.xl, alignItems: isDesktop ? 'center' : undefined }}
        showsVerticalScrollIndicator={false}
      >
      <ResponsiveContainer>
        <View style={styles.header}>
          <Text style={styles.title}>Video Lessons</Text>
          <Text style={styles.subtitle}>Watch the full course playlist, one video at a time</Text>
        </View>

        <FadeInView>
          <View style={styles.playerWrap}>
            <YouTubeEmbed url={playlistEmbedUrl(selectedIndex)} style={styles.player} />
          </View>
        </FadeInView>

        <FadeInView delay={60}>
          <AnimatedPressable onPress={openInYouTube} scaleTo={0.98}>
            <LinearGradient colors={['#FF0000', '#cc0000']} style={styles.youtubeButton}>
              <Ionicons name="logo-youtube" size={20} color="#fff" />
              <Text style={styles.youtubeButtonText}>Open Full Playlist on YouTube</Text>
              <Ionicons name="open-outline" size={16} color="#fff" />
            </LinearGradient>
          </AnimatedPressable>
        </FadeInView>

        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeader}>Watch In Order</Text>
          <Text style={styles.listHeaderCount}>{PLAYLIST_VIDEO_SLOTS.length} videos</Text>
        </View>

        {PLAYLIST_VIDEO_SLOTS.map((slot, i) => {
          const isActive = slot.index === selectedIndex;
          return (
            <FadeInView key={slot.index} delay={100 + i * 40}>
              <AnimatedPressable
                scaleTo={0.98}
                style={[styles.slotRow, isActive && styles.slotRowActive]}
                onPress={() => selectSlot(slot.index)}
                haptic="none"
              >
                <View
                  style={[
                    styles.slotNumBadge,
                    isActive && { backgroundColor: slot.color, borderColor: slot.color },
                  ]}
                >
                  {isActive ? (
                    <Ionicons name="play" size={14} color={colors.bg} />
                  ) : (
                    <Text style={styles.slotNumText}>{i + 1}</Text>
                  )}
                </View>
                <View style={[styles.slotIcon, { backgroundColor: slot.color + '1e' }]}>
                  <Ionicons name={slot.icon as any} size={18} color={slot.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.slotTitle, isActive && { color: slot.color }]} numberOfLines={1}>
                    {slot.title}
                  </Text>
                  <Text style={styles.slotSubtitle} numberOfLines={1}>{slot.subtitle}</Text>
                </View>
                {isActive && (
                  <View style={[styles.nowPlayingBadge, { backgroundColor: slot.color + '22' }]}>
                    <Text style={[styles.nowPlayingText, { color: slot.color }]}>PLAYING</Text>
                  </View>
                )}
              </AnimatedPressable>
            </FadeInView>
          );
        })}

        <View style={styles.noteBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
          <Text style={styles.noteText}>
            Videos play sequentially within the embedded YouTube playlist. Tap any item above to jump straight to that point in the playlist.
          </Text>
        </View>
      </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    header: { padding: spacing.lg, paddingBottom: spacing.md },
    title: { fontSize: 28, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    playerWrap: {
      marginHorizontal: spacing.lg,
      borderRadius: radius.lg,
      overflow: 'hidden',
      backgroundColor: '#000',
      aspectRatio: 16 / 9,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.card,
    },
    player: { flex: 1 },
    youtubeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      padding: spacing.md,
      borderRadius: radius.md,
      ...shadow.glow('#FF0000'),
    },
    youtubeButtonText: { color: '#fff', fontWeight: '800', fontSize: 14 },
    listHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
    },
    listHeader: { color: colors.text, fontSize: 17, fontWeight: '800' },
    listHeaderCount: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
    slotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.sm,
      marginBottom: spacing.xs,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    slotRowActive: {
      borderColor: colors.python + '55',
    },
    slotNumBadge: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slotNumText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
    slotIcon: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
    slotTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
    slotSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
    nowPlayingBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.full },
    nowPlayingText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
    noteBox: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      padding: spacing.md,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      alignItems: 'flex-start',
    },
    noteText: { color: colors.textMuted, fontSize: 12, flex: 1, lineHeight: 17 },
  });
}
