import { Linking, Platform } from 'react-native';

export async function openExternalLink(url: string): Promise<void> {
  if (!url) return;
  try {
    await Linking.openURL(url);
  } catch {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    }
  }
}
