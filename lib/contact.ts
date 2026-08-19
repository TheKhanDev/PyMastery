export const THEKHANDEV = {
  brand: 'TheKhanDev',
  instagram: 'https://www.instagram.com/thekhandev/?hl=en',
  tiktok: 'https://www.tiktok.com/@thekhandev',
  youtube: 'https://www.youtube.com/channel/UCnlq1zYUVz7uKjs9R_FROVA',
  github: 'https://github.com/thekhandev',
  whatsappChannel: 'https://whatsapp.com/channel/0029VbCFMUzJENy0NDBIS63Q',
  facebook: 'https://web.facebook.com/people/thekhandev/61583414439195/?_rdc=1&_rdr#',
  whatsappNumber: '+92 319 7742317',
  whatsappNumberIntl: '+923197742317',
  email: 'thekhandev.pk@gmail.com',
};

export function whatsappChatUrl(number: string, message?: string) {
  const digits = number.replace(/[^\d]/g, '');
  // Convert local Pakistani format (0XXXXXXXXXX) to international (92XXXXXXXXXX)
  const intl = digits.startsWith('0') ? '92' + digits.slice(1) : digits;
  const base = `https://wa.me/${intl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function emailUrl(address: string, subject?: string) {
  return `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
