import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_LESSONS_KEY = '@pymastery/completed_lessons';
const QUIZ_SCORES_KEY = '@pymastery/quiz_scores';
const BOOKMARKS_KEY = '@pymastery/bookmarks';
const STREAK_KEY = '@pymastery/streak';
const LAST_ACTIVE_KEY = '@pymastery/last_active';
const XP_KEY = '@pymastery/xp';

export async function getCompletedLessons(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function toggleLessonComplete(lessonId: string): Promise<string[]> {
  const current = await getCompletedLessons();
  let updated: string[];
  if (current.includes(lessonId)) {
    updated = current.filter((id) => id !== lessonId);
  } else {
    updated = [...current, lessonId];
    await addXp(10);
    await bumpStreak();
  }
  await AsyncStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated));
  return updated;
}

export async function isLessonComplete(lessonId: string): Promise<boolean> {
  const list = await getCompletedLessons();
  return list.includes(lessonId);
}

export async function getQuizScores(): Promise<Record<string, { score: number; total: number }>> {
  const raw = await AsyncStorage.getItem(QUIZ_SCORES_KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function saveQuizScore(moduleId: string, score: number, total: number) {
  const scores = await getQuizScores();
  scores[moduleId] = { score, total };
  await AsyncStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(scores));
  await addXp(score * 5);
  await bumpStreak();
}

export async function getBookmarks(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function toggleBookmark(lessonId: string): Promise<string[]> {
  const current = await getBookmarks();
  let updated: string[];
  if (current.includes(lessonId)) {
    updated = current.filter((id) => id !== lessonId);
  } else {
    updated = [...current, lessonId];
  }
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return updated;
}

export async function getXp(): Promise<number> {
  const raw = await AsyncStorage.getItem(XP_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

async function addXp(amount: number) {
  const xp = await getXp();
  await AsyncStorage.setItem(XP_KEY, String(xp + amount));
}

export async function getStreak(): Promise<number> {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

async function bumpStreak() {
  const today = new Date().toDateString();
  const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
  if (lastActive === today) return;
  const streak = await getStreak();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const newStreak = lastActive === yesterday.toDateString() ? streak + 1 : 1;
  await AsyncStorage.setItem(STREAK_KEY, String(newStreak));
  await AsyncStorage.setItem(LAST_ACTIVE_KEY, today);
}

export async function resetAllProgress() {
  const keys = [
    COMPLETED_LESSONS_KEY,
    QUIZ_SCORES_KEY,
    BOOKMARKS_KEY,
    STREAK_KEY,
    LAST_ACTIVE_KEY,
    XP_KEY,
  ];
  if (typeof (AsyncStorage as any).multiRemove === 'function') {
    await (AsyncStorage as any).multiRemove(keys);
  } else if (typeof (AsyncStorage as any).removeMany === 'function') {
    await (AsyncStorage as any).removeMany(keys);
  } else {
    await Promise.all(keys.map((k) => AsyncStorage.removeItem(k)));
  }
}

export function getLevel(xp: number): { level: number; title: string; progress: number; nextLevelXp: number } {
  const levels = [
    { title: 'Beginner', xp: 0 },
    { title: 'Novice Coder', xp: 100 },
    { title: 'Script Kiddie', xp: 250 },
    { title: 'Pythonista', xp: 500 },
    { title: 'Code Wrangler', xp: 850 },
    { title: 'Python Adept', xp: 1300 },
    { title: 'Master Pythonista', xp: 2000 },
  ];
  let idx = 0;
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xp) idx = i;
  }
  const current = levels[idx];
  const next = levels[idx + 1];
  const nextXp = next ? next.xp : current.xp + 1000;
  const progress = next ? (xp - current.xp) / (nextXp - current.xp) : 1;
  return { level: idx + 1, title: current.title, progress, nextLevelXp: nextXp };
}
