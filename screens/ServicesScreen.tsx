import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { SOFTWARE_SERVICES, ACADEMIC_SERVICES, ServiceItem, formatPriceRange } from '../lib/services';
import { SUPPORT_CATEGORIES } from '../lib/support';
import { THEKHANDEV, whatsappChatUrl } from '../lib/contact';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { haptics } from '../lib/haptics';
import { openExternalLink } from '../lib/linking';
import { ProfileStackParamList } from '../navigation/types';

type Tab = 'software' | 'academic';

const QUICK_CATEGORIES = SUPPORT_CATEGORIES.slice(0, 4);

export default function ServicesScreen() {
  const { colors } = useTheme();
  const { isDesktop, isCompact } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [tab, setTab] = useState<Tab>('software');

  const items = tab === 'software' ? SOFTWARE_SERVICES : ACADEMIC_SERVICES;

  const requestQuote = (item: ServiceItem) => {
    haptics.light();
    const msg = `Assalam o Alaikum TheKhanDev! Mujhe "${item.name}" ke baare mein quote chahiye (Budget range: ${formatPriceRange(item)}).`;
    openExternalLink(whatsappChatUrl(THEKHANDEV.whatsappNumber, msg));
  };

  const sendQuickInquiry = (message: string) => {
    haptics.light();
    openExternalLink(whatsappChatUrl(THEKHANDEV.whatsappNumber, message));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl, alignItems: isDesktop ? 'center' : undefined }}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <View style={styles.header}>
            <Text style={styles.subtitle}>TheKhanDev ki professional services — koi bhi product/service free nahi hai, quality ka price hota hai.</Text>
          </View>

          {/* Help Desk — always-visible direct WhatsApp support entry point */}
          <View style={styles.helpDeskCard}>
            <View style={styles.helpDeskHeader}>
              <View style={styles.helpDeskIconWrap}>
                <Ionicons name="headset" size={20} color="#25D366" />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.helpDeskTitle}>Help Desk</Text>
                <Text style={styles.helpDeskSub}>Neeche apni zaroorat select karo, seedha WhatsApp par message chala jayega</Text>
              </View>
            </View>
            <View style={[styles.quickGrid, isCompact && styles.quickGridCompact]}>
              {QUICK_CATEGORIES.map((cat) => (
                <AnimatedPressable
                  key={cat.key}
                  style={styles.quickCard}
                  onPress={() => sendQuickInquiry(cat.message)}
                  scaleTo={0.96}
                  haptic="none"
                >
                  <Ionicons name={cat.icon as any} size={18} color="#25D366" />
                  <Text style={styles.quickCardText} numberOfLines={2}>{cat.label}</Text>
                </AnimatedPressable>
              ))}
            </View>
            <AnimatedPressable
              style={styles.supportCenterLink}
              onPress={() => {
                haptics.selection();
                navigation.navigate('Support');
              }}
              scaleTo={0.98}
              haptic="none"
            >
              <Ionicons name="headset-outline" size={16} color={colors.primary} />
              <Text style={styles.supportCenterLinkText}>FAQs aur pura Support Center dekho</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </AnimatedPressable>
          </View>

          <View style={styles.segmentWrap}>
            <AnimatedPressable
              style={[styles.segmentBtn, tab === 'software' && { backgroundColor: colors.python }]}
              onPress={() => { haptics.selection(); setTab('software'); }}
              haptic="none"
            >
              <Ionicons name="code-slash" size={16} color={tab === 'software' ? colors.bg : colors.textMuted} />
              <Text style={[styles.segmentText, tab === 'software' && { color: colors.bg }]}>Software Services</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={[styles.segmentBtn, tab === 'academic' && { backgroundColor: colors.python }]}
              onPress={() => { haptics.selection(); setTab('academic'); }}
              haptic="none"
            >
              <Ionicons name="school" size={16} color={tab === 'academic' ? colors.bg : colors.textMuted} />
              <Text style={[styles.segmentText, tab === 'academic' && { color: colors.bg }]}>Academic Support</Text>
            </AnimatedPressable>
          </View>

          <View style={styles.noticeBox}>
            <Ionicons name="information-circle" size={16} color={colors.warning} />
            <Text style={styles.noticeText}>
              {tab === 'software'
                ? 'Software products/services ki pricing Rs 29,000 se Rs 200,000 tak hoti hai, project ki complexity ke hisab se.'
                : 'Academic support (FYP, assignments, thesis, research) Rs 1,500 se Rs 10,000 tak available hai.'}
            </Text>
          </View>

          <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
            {items.map((item, idx) => (
              <FadeInView key={item.id} delay={idx * 50} style={isDesktop ? styles.cardColDesktop : styles.cardColMobile}>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={[styles.iconWrap, { backgroundColor: item.color + '1e', borderColor: item.color + '40' }]}>
                      <Ionicons name={item.icon as any} size={22} color={item.color} />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={styles.cardTitle} numberOfLines={2}>{item.nameHinglish}</Text>
                      <Text style={styles.cardTitleEn} numberOfLines={1}>{item.name}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                  <View style={styles.cardMetaRow}>
                    <View style={styles.metaChip}>
                      <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                      <Text style={styles.metaChipText}>{item.deliveryTime}</Text>
                    </View>
                  </View>
                  <View style={styles.priceRow}>
                    <View style={styles.priceInfo}>
                      <Text style={styles.priceLabel}>Price Range</Text>
                      <Text style={[styles.priceValue, { color: item.color }]} numberOfLines={1} adjustsFontSizeToFit>
                        {formatPriceRange(item)}
                      </Text>
                    </View>
                    <AnimatedPressable onPress={() => requestQuote(item)} scaleTo={0.96} haptic="none">
                      <LinearGradient colors={['#25D366', '#128C7E']} style={styles.quoteBtn}>
                        <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                        <Text style={styles.quoteBtnText}>Quote Lo</Text>
                      </LinearGradient>
                    </AnimatedPressable>
                  </View>
                </View>
              </FadeInView>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.textMuted} />
            <Text style={styles.footerNoteText}>
              Sab prices approximate hain, final quote requirements dekh kar diya jata hai. Free trial ya free service available nahi hai — TheKhanDev quality-first company hai.
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
    header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
    subtitle: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
    helpDeskCard: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: '#25D36640',
      ...shadow.soft,
    },
    helpDeskHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
    helpDeskIconWrap: {
      width: 40,
      height: 40,
      borderRadius: radius.md,
      backgroundColor: '#25D36622',
      alignItems: 'center',
      justifyContent: 'center',
    },
    helpDeskTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
    helpDeskSub: { color: colors.textMuted, fontSize: 11.5, marginTop: 2, lineHeight: 16 },
    quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    quickGridCompact: { gap: spacing.xs },
    quickCard: {
      flexBasis: '47%',
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: 12,
      paddingVertical: 12,
      minWidth: 140,
    },
    quickCardText: { color: colors.text, fontSize: 12.5, fontWeight: '700', flex: 1 },
    supportCenterLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    supportCenterLinkText: { color: colors.primary, fontSize: 12.5, fontWeight: '700', flex: 1 },
    segmentWrap: {
      flexDirection: 'row',
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: 4,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      gap: 4,
    },
    segmentBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      borderRadius: radius.sm,
    },
    segmentText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
    noticeBox: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      padding: spacing.md,
      backgroundColor: colors.warning + '14',
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.warning + '33',
      alignItems: 'flex-start',
    },
    noticeText: { color: colors.text, fontSize: 12, flex: 1, lineHeight: 18 },
    cardsGrid: { marginTop: spacing.md },
    cardsGridDesktop: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg - spacing.sm },
    cardColMobile: { width: '100%' },
    cardColDesktop: { width: '50%', paddingHorizontal: spacing.sm },
    card: {
      marginHorizontal: spacing.lg,
      marginTop: spacing.md,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
    iconWrap: { width: 44, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
    cardTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
    cardTitleEn: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
    cardDesc: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: spacing.sm },
    cardMetaRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
    metaChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.bgElevatedSolid,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
    },
    metaChipText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.md,
    },
    priceInfo: { flex: 1, minWidth: 0 },
    priceLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
    priceValue: { fontSize: 15, fontWeight: '800', marginTop: 2 },
    quoteBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: radius.md,
    },
    quoteBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
    footerNote: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'flex-start',
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
    footerNoteText: { color: colors.textMuted, fontSize: 11, flex: 1, lineHeight: 16 },
  });
}
