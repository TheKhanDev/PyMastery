import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert, LayoutAnimation, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { radius, spacing, shadow, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { useBreakpoint } from '../lib/breakpoints';
import { SUPPORT_CATEGORIES, FAQ_ITEMS, SupportCategory } from '../lib/support';
import { getSupportTickets, addSupportTicket, SupportTicket } from '../lib/supportTickets';
import { THEKHANDEV, whatsappChatUrl, emailUrl } from '../lib/contact';
import { openExternalLink } from '../lib/linking';
import { haptics } from '../lib/haptics';
import AnimatedPressable from '../components/AnimatedPressable';
import FadeInView from '../components/FadeInView';
import ResponsiveContainer from '../components/ResponsiveContainer';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CONTACT_CHANNELS: { key: string; label: string; value: string; icon: keyof typeof Ionicons.glyphMap; color: string; url: string }[] = [
  { key: 'whatsapp', label: 'WhatsApp Chat', value: THEKHANDEV.whatsappNumber, icon: 'logo-whatsapp', color: '#25D366', url: whatsappChatUrl(THEKHANDEV.whatsappNumber) },
  { key: 'whatsappChannel', label: 'WhatsApp Channel', value: 'Updates & announcements', icon: 'megaphone-outline', color: '#25D366', url: THEKHANDEV.whatsappChannel },
  { key: 'email', label: 'Email', value: THEKHANDEV.email, icon: 'mail-outline', color: '#5b8cff', url: emailUrl(THEKHANDEV.email, 'PyMastery Support Request') },
  { key: 'facebook', label: 'Facebook', value: 'TheKhanDev Page', icon: 'logo-facebook', color: '#1877F2', url: THEKHANDEV.facebook },
  { key: 'instagram', label: 'Instagram', value: '@thekhandev', icon: 'logo-instagram', color: '#E1306C', url: THEKHANDEV.instagram },
];

export default function SupportScreen() {
  const { colors, gradients } = useTheme();
  const { isDesktop, isCompact } = useBreakpoint();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(() => {
    getSupportTickets().then(setTickets);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const toggleFaq = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    haptics.selection();
    setOpenFaqId((cur) => (cur === id ? null : id));
  };

  const selectCategory = (cat: SupportCategory) => {
    haptics.selection();
    setSelectedCategory(cat);
    setMessage(cat.message);
  };

  const openChannel = (url: string) => {
    haptics.light();
    openExternalLink(url);
  };

  const handleSubmitTicket = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      const errMsg = 'Pehle apna message likho ya category select karo.';
      if (Platform.OS === 'web') alert(errMsg);
      else Alert.alert('Message chahiye', errMsg);
      return;
    }
    setSubmitting(true);
    try {
      const categoryLabel = selectedCategory?.label ?? 'General Inquiry';
      const updated = await addSupportTicket(name, categoryLabel, trimmedMessage);
      setTickets(updated);
      haptics.success();
      const finalMessage = `Assalam o Alaikum TheKhanDev! ${name.trim() ? `Mera naam ${name.trim()} hai. ` : ''}[${categoryLabel}] ${trimmedMessage}`;
      openExternalLink(whatsappChatUrl(THEKHANDEV.whatsappNumber, finalMessage));
      setMessage('');
      setSelectedCategory(null);
    } finally {
      setSubmitting(false);
    }
  };

  const resendTicket = (ticket: SupportTicket) => {
    haptics.light();
    const finalMessage = `Assalam o Alaikum TheKhanDev! ${ticket.name !== 'Aap' ? `Mera naam ${ticket.name} hai. ` : ''}[${ticket.categoryLabel}] ${ticket.message}`;
    openExternalLink(whatsappChatUrl(THEKHANDEV.whatsappNumber, finalMessage));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl, alignItems: isDesktop ? 'center' : undefined }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          <View style={styles.header}>
            <Text style={styles.title}>Support Center</Text>
            <Text style={styles.subtitle}>Hum yahan hain madad ke liye — koi bhi sawal ho, seedha rabta karo.</Text>
          </View>

          {/* Contact channels grid */}
          <FadeInView>
            <View style={[styles.channelsGrid, isCompact && styles.channelsGridCompact]}>
              {CONTACT_CHANNELS.map((ch) => (
                <AnimatedPressable
                  key={ch.key}
                  style={styles.channelCard}
                  onPress={() => openChannel(ch.url)}
                  scaleTo={0.96}
                  haptic="none"
                >
                  <View style={[styles.channelIcon, { backgroundColor: ch.color + '22' }]}>
                    <Ionicons name={ch.icon} size={18} color={ch.color} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.channelLabel} numberOfLines={1}>{ch.label}</Text>
                    <Text style={styles.channelValue} numberOfLines={1}>{ch.value}</Text>
                  </View>
                  <Ionicons name="open-outline" size={14} color={colors.textMuted} />
                </AnimatedPressable>
              ))}
            </View>
          </FadeInView>

          {/* Quick category buttons -> instant WhatsApp */}
          <FadeInView delay={60}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="flash" size={16} color={colors.python} />
              <Text style={styles.sectionHeader}>Jaldi Madad Chahiye?</Text>
            </View>
            <Text style={styles.sectionSub}>Category select karo, seedha WhatsApp message pre-filled ho kar khulega.</Text>
            <View style={[styles.categoryGrid, isCompact && styles.categoryGridCompact]}>
              {SUPPORT_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory?.key === cat.key;
                return (
                  <AnimatedPressable
                    key={cat.key}
                    style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                    onPress={() => selectCategory(cat)}
                    scaleTo={0.96}
                    haptic="none"
                  >
                    <Ionicons name={cat.icon as any} size={17} color={isSelected ? colors.python : '#25D366'} />
                    <Text style={[styles.categoryCardText, isSelected && { color: colors.python }]} numberOfLines={2}>
                      {cat.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </FadeInView>

          {/* Ticket-style inquiry form */}
          <FadeInView delay={100}>
            <View style={styles.formCard}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="chatbubble-ellipses" size={16} color={colors.primary} />
                <Text style={styles.sectionHeader}>Apna Message Likho</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Apna naam (optional)"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder={selectedCategory ? selectedCategory.message : 'Apna sawal ya zaroorat yahan likho...'}
                placeholderTextColor={colors.textMuted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <AnimatedPressable onPress={handleSubmitTicket} disabled={submitting} scaleTo={0.98} haptic="none">
                <LinearGradient colors={['#25D366', '#128C7E']} style={styles.submitBtn}>
                  <Ionicons name="send" size={16} color="#fff" />
                  <Text style={styles.submitBtnText}>{submitting ? 'Bhej rahe hain...' : 'WhatsApp Par Bhejo'}</Text>
                </LinearGradient>
              </AnimatedPressable>
              <Text style={styles.formNote}>
                Ye message seedha WhatsApp (+{THEKHANDEV.whatsappNumberIntl.replace('+', '')}) par redirect ho ga — koi backend/server involve nahi hai.
              </Text>
            </View>
          </FadeInView>

          {/* Recent local inquiry history */}
          {tickets.length > 0 && (
            <FadeInView delay={130}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="time" size={16} color={colors.textSecondary} />
                <Text style={styles.sectionHeader}>Aapki Recent Inquiries</Text>
              </View>
              <Text style={styles.sectionSub}>Sirf is device par mahfooz hain, kisi server par nahi.</Text>
              {tickets.slice(0, 5).map((ticket) => (
                <AnimatedPressable
                  key={ticket.id}
                  style={styles.ticketRow}
                  onPress={() => resendTicket(ticket)}
                  scaleTo={0.98}
                  haptic="none"
                >
                  <View style={styles.ticketIconWrap}>
                    <Ionicons name="chatbox-outline" size={16} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.ticketCategory} numberOfLines={1}>{ticket.categoryLabel}</Text>
                    <Text style={styles.ticketMessage} numberOfLines={2}>{ticket.message}</Text>
                  </View>
                  <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
                </AnimatedPressable>
              ))}
            </FadeInView>
          )}

          {/* FAQ accordion */}
          <FadeInView delay={160}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="help-buoy" size={16} color={colors.warning} />
              <Text style={styles.sectionHeader}>Frequently Asked Questions</Text>
            </View>
            <View style={styles.faqCard}>
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <View key={faq.id} style={[styles.faqItem, idx === FAQ_ITEMS.length - 1 && { borderBottomWidth: 0 }]}>
                    <AnimatedPressable onPress={() => toggleFaq(faq.id)} scaleTo={0.99} haptic="none" style={styles.faqQuestionRow}>
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
                    </AnimatedPressable>
                    {isOpen && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
                  </View>
                );
              })}
            </View>
          </FadeInView>

          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.textMuted} />
            <Text style={styles.footerNoteText}>
              Support 100% client-side handle hota hai — sab kuch is device par store hota hai, aur real replies WhatsApp par milte hain.
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
    title: { fontSize: 26, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 6, lineHeight: 19 },
    channelsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: spacing.sm },
    channelsGridCompact: { gap: spacing.xs },
    channelCard: {
      flexBasis: '47%',
      flexGrow: 1,
      minWidth: 150,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: radius.md,
      padding: spacing.md,
      ...shadow.soft,
    },
    channelIcon: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
    channelLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
    channelValue: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      marginBottom: 4,
    },
    sectionHeader: { color: colors.text, fontSize: 16, fontWeight: '800' },
    sectionSub: { color: colors.textMuted, fontSize: 11.5, marginHorizontal: spacing.lg, marginBottom: spacing.sm, lineHeight: 16 },
    categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: spacing.sm },
    categoryGridCompact: { gap: spacing.xs },
    categoryCard: {
      flexBasis: '30%',
      flexGrow: 1,
      minWidth: 100,
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    categoryCardSelected: { borderColor: colors.python, backgroundColor: colors.python + '14' },
    categoryCardText: { color: colors.text, fontSize: 11.5, fontWeight: '700', textAlign: 'center' },
    formCard: {
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...shadow.soft,
    },
    input: {
      backgroundColor: colors.bgElevatedSolid,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 12,
      color: colors.text,
      fontSize: 14,
      marginTop: spacing.sm,
    },
    inputMultiline: { minHeight: 100, textAlignVertical: 'top' },
    submitBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: radius.md,
      paddingVertical: 14,
      marginTop: spacing.md,
    },
    submitBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
    formNote: { color: colors.textMuted, fontSize: 10.5, marginTop: spacing.sm, lineHeight: 15, textAlign: 'center' },
    ticketRow: {
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
    ticketIconWrap: {
      width: 32,
      height: 32,
      borderRadius: radius.sm,
      backgroundColor: colors.primary + '1c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ticketCategory: { color: colors.text, fontSize: 12.5, fontWeight: '700' },
    ticketMessage: { color: colors.textMuted, fontSize: 11, marginTop: 1, lineHeight: 15 },
    faqCard: {
      marginHorizontal: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      paddingHorizontal: spacing.md,
      ...shadow.soft,
    },
    faqItem: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm },
    faqQuestionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, paddingVertical: 4 },
    faqQuestion: { color: colors.text, fontSize: 13.5, fontWeight: '700', flex: 1, lineHeight: 19 },
    faqAnswer: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: spacing.xs, paddingRight: spacing.lg },
    footerNote: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'flex-start',
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
    },
    footerNoteText: { color: colors.textMuted, fontSize: 11, flex: 1, lineHeight: 16 },
  });
}
