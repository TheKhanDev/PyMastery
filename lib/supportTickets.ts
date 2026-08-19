import AsyncStorage from '@react-native-async-storage/async-storage';

// Fully client-side "support ticket" log. There is no backend — submitting a
// ticket simply (a) records it locally on-device for the user's own reference,
// and (b) opens a pre-filled WhatsApp chat so the message is actually delivered
// to TheKhanDev's real WhatsApp number.

export interface SupportTicket {
  id: string;
  name: string;
  categoryLabel: string;
  message: string;
  createdAt: string;
}

const SUPPORT_TICKETS_KEY = '@pymastery/support_tickets';

export async function getSupportTickets(): Promise<SupportTicket[]> {
  const raw = await AsyncStorage.getItem(SUPPORT_TICKETS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addSupportTicket(name: string, categoryLabel: string, message: string): Promise<SupportTicket[]> {
  const current = await getSupportTickets();
  const ticket: SupportTicket = {
    id: `ticket-${Date.now()}`,
    name: name.trim() || 'Aap',
    categoryLabel,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  const updated = [ticket, ...current].slice(0, 30); // keep last 30 locally
  await AsyncStorage.setItem(SUPPORT_TICKETS_KEY, JSON.stringify(updated));
  return updated;
}

export async function clearSupportTickets(): Promise<void> {
  await AsyncStorage.removeItem(SUPPORT_TICKETS_KEY);
}
