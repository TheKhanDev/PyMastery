export interface DeveloperProfile {
  name: string;
  title: string;
  bio: string;
  experience: string; // newline-separated entries, e.g. "Role at Company"
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  location: string;
  photoUrl: string;
}

export const emptyDeveloperProfile: DeveloperProfile = {
  name: '',
  title: '',
  bio: '',
  experience: '',
  email: '',
  phone: '',
  whatsapp: '',
  website: '',
  github: '',
  linkedin: '',
  twitter: '',
  instagram: '',
  tiktok: '',
  facebook: '',
  location: '',
  photoUrl: '',
};

// The developer's profile shown on the "About the Developer" page — written in first
// person so it reads like Waqas actually wrote this himself, in his own voice.
export const defaultDeveloperProfile: DeveloperProfile = {
  ...emptyDeveloperProfile,
  name: 'Waqas Khan',
  title: 'Full Stack Developer · AI Developer · Mobile App Developer',
  bio: 'Assalam o Alaikum! Main Waqas Khan hun — Full Stack, AI aur Mobile App Developer, aur pichle 5+ saal se software banane mein busy hun 💻. Ye PyMastery app maine khud design aur code kiya hai, taake Python seekhna Pakistani students ke liye easy aur apna-sa lage — isi liye lessons Hinglish mein likhe hain, jaisay hum aapas mein baat karte hain. Agar koi project, app, ya website banwani ho, ya FYP/assignment mein help chahiye ho, neeche diye links pe mujhse rabta karein — main khud reply karta hun!',
  experience: 'Full Stack Developer at TheKhanDev\nMobile App Developer at Zentic Solution\nDeveloper at InferStack',
  website: 'https://thekhandev.github.io/portfolio/',
  linkedin: 'https://www.linkedin.com/in/128-waqas-khan',
  instagram: 'https://instagram.com/waqas__755',
  tiktok: 'https://tiktok.com/@waqas__755',
  whatsapp: 'https://wa.me/923441092910',
  facebook: 'https://www.facebook.com/profile.php?id=61582277145690&mibextid=ZbWKwL',
  photoUrl: 'https://www.facebook.com/profile.php?id=61582277145690&mibextid=ZbWKwL',
};

export function getExperienceList(experience: string): string[] {
  return experience
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
