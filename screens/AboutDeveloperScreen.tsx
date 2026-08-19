import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { defaultDeveloperProfile, getExperienceList } from '../lib/developerProfile';
import { emailUrl } from '../lib/contact';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import { haptics } from '../lib/haptics';

// Heuristic: only treat as a renderable image if it looks like a direct image URL,
// since links like Facebook profile pages are HTML, not images.
function looksLikeImageUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().split('?')[0];
  if (/\.(jpg|jpeg|png|gif|webp|bmp)$/.test(lower)) return true;
  if (/(googleusercontent|cloudinary|imgur|gravatar|unsplash|cdn)/.test(lower)) return true;
  return false;
}

interface DownloadLinkRow {
  key: string;
  label: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function AboutDeveloperScreen() {
  const { colors, gradients } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [imageError, setImageError] = useState(false);
  const profile = defaultDeveloperProfile;

  const openLink = async (url: string) => {
    if (!url) return;
    const finalUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    haptics.light();
    try {
      await Linking.openURL(finalUrl);
    } catch {
      if (Platform.OS === 'web') window.open(finalUrl, '_blank');
    }
  };

  const experienceItems = getExperienceList(profile.experience);
  const showPhoto = looksLikeImageUrl(profile.photoUrl) && !imageError;

  const downloadLinks: DownloadLinkRow[] = [
    profile.website && { key: 'website', label: 'Portfolio', url: profile.website, icon: 'globe-outline', color: colors.accent },
    profile.linkedin && { key: 'linkedin', label: 'LinkedIn', url: profile.linkedin, icon: 'logo-linkedin', color: '#0A66C2' },
    profile.github && { key: 'github', label: 'GitHub', url: profile.github, icon: 'logo-github', color: colors.text },
    profile.instagram && { key: 'instagram', label: 'Instagram', url: profile.instagram, icon: 'logo-instagram', color: '#E1306C' },
    profile.tiktok && { key: 'tiktok', label: 'TikTok', url: profile.tiktok, icon: 'logo-tiktok', color: colors.text },
    profile.facebook && { key: 'facebook', label: 'Facebook', url: profile.facebook, icon: 'logo-facebook', color: '#1877F2' },
    profile.whatsapp && { key: 'whatsapp', label: 'WhatsApp', url: profile.whatsapp, icon: 'logo-whatsapp', color: '#25D366' },
    profile.twitter && { key: 'twitter', label: 'Twitter / X', url: profile.twitter, icon: 'logo-twitter', color: '#1DA1F2' },
    profile.email && { key: 'email', label: 'Email', url: emailUrl(profile.email), icon: 'mail-outline', color: colors.primary },
  ].filter((r): r is DownloadLinkRow => !!r);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        <FadeInView>
          <View style={styles.profileHeader}>
            {showPhoto ? (
              <Image
                source={{ uri: profile.photoUrl }}
                style={styles.avatarImage}
                onError={() => setImageError(true)}
                contentFit="cover"
              />
            ) : (
              <LinearGradient colors={gradients.python} style={styles.avatarWrap}>
                <Text style={styles.avatarInitials}>
                  {(profile.name || 'D').trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')}
                </Text>
              </LinearGradient>
            )}
            <Text style={styles.devName}>{profile.name || 'Developer Name'}</Text>
            {!!profile.title && <Text style={styles.devTitle}>{profile.title}</Text>}
            {!!profile.location && (
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                <Text style={styles.locationText}>{profile.location}</Text>
              </View>
            )}
          </View>

          {!!profile.bio && (
            <View style={styles.bioCard}>
              <View style={styles.quoteMarkRow}>
                <Ionicons name="chatbox-ellipses" size={16} color={colors.python} />
                <Text style={styles.quoteMarkLabel}>Meri Taraf Se</Text>
              </View>
              <Text style={styles.bioText}>{profile.bio}</Text>
              <Text style={styles.bioSignature}>— Waqas Khan, Founder @ TheKhanDev</Text>
            </View>
          )}

          {experienceItems.length > 0 && (
            <View style={styles.experienceCard}>
              <View style={styles.experienceHeader}>
                <Ionicons name="ribbon" size={18} color={colors.python} />
                <Text style={styles.experienceTitle}>Experience</Text>
              </View>
              {experienceItems.map((item, idx) => {
                const [role, ...rest] = item.split(' at ');
                const company = rest.join(' at ');
                return (
                  <View key={idx} style={styles.experienceRow}>
                    <View style={styles.experienceDot} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.experienceRole}>{role}</Text>
                      {!!company && <Text style={styles.experienceCompany}>at {company}</Text>}
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Download Links — full, accurate, visible name + URL pairs */}
          <View style={styles.linksHeaderRow}>
            <Ionicons name="link" size={16} color={colors.primary} />
            <Text style={styles.linksHeaderText}>Download Links</Text>
          </View>
          <View style={styles.linksCard}>
            {downloadLinks.map((row, idx) => (
              <AnimatedPressable
                key={row.key}
                style={[styles.linkRow, idx === downloadLinks.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => openLink(row.url)}
                scaleTo={0.98}
                haptic="none"
              >
                <View style={[styles.linkIcon, { backgroundColor: row.color + '22' }]}>
                  <Ionicons name={row.icon} size={18} color={row.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.linkLabel}>{row.label}</Text>
                  <Text style={styles.linkUrl}>{row.url}</Text>
                </View>
                <Ionicons name="open-outline" size={16} color={colors.textMuted} />
              </AnimatedPressable>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.textMuted} />
            <Text style={styles.footerNoteText}>All links above are provided directly by the developer and open in your browser or app.</Text>
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    profileHeader: { alignItems: 'center', marginBottom: spacing.lg },
    avatarWrap: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      ...shadow.glow(colors.python),
    },
    avatarImage: {
      width: 96,
      height: 96,
      borderRadius: 48,
      marginBottom: spacing.sm,
      borderWidth: 2,
      borderColor: colors.python,
      ...shadow.glow(colors.python),
    },
    avatarInitials: { color: colors.bg, fontSize: 32, fontWeight: '800' },
    devName: { color: colors.text, fontSize: 22, fontWeight: '800' },
    devTitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, textAlign: 'center', paddingHorizontal: spacing.lg },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
    locationText: { color: colors.textMuted, fontSize: 12 },
    bioCard: {
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: spacing.lg,
      ...shadow.soft,
    },
    quoteMarkRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
    quoteMarkLabel: { color: colors.python, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
    bioText: { color: colors.text, fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
    bioSignature: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginTop: spacing.sm, textAlign: 'right' },
    experienceCard: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: spacing.lg,
      gap: spacing.sm,
      ...shadow.soft,
    },
    experienceHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
    experienceTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
    experienceRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    experienceDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.python, marginTop: 7 },
    experienceRole: { color: colors.text, fontSize: 14, fontWeight: '700' },
    experienceCompany: { color: colors.textSecondary, fontSize: 13, marginTop: 1 },
    linksHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
    linksHeaderText: { color: colors.text, fontSize: 16, fontWeight: '800' },
    linksCard: {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      paddingHorizontal: spacing.md,
      ...shadow.soft,
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm + 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    linkIcon: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
    linkLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
    linkUrl: { color: colors.textMuted, fontSize: 11.5, marginTop: 2 },
    footerNote: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'flex-start',
      marginTop: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    footerNoteText: { color: colors.textMuted, fontSize: 11, flex: 1, lineHeight: 16 },
  });
}
