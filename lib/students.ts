import AsyncStorage from '@react-native-async-storage/async-storage';
import { moduleColors } from './theme';
import { totalLessonsCount } from './courseData';

export interface Student {
  id: string;
  name: string;
  gender: 'male' | 'female';
  lessonsCompleted: number;
  quizzesTaken: number;
  xp: number;
  streak: number;
  color: string;
  isTop: boolean;
  isCompleted: boolean;
}

export interface LocalStudent {
  id: string;
  name: string;
  course: string;
  joinedAt: string;
}

const LOCAL_STUDENTS_KEY = '@pymastery/local_students';
const LAST_SEEN_LESSON_KEY = '@pymastery/last_seen_lesson';
const LAST_SEEN_AT_KEY = '@pymastery/last_seen_at';

const TOTAL_LESSONS = totalLessonsCount();
// Consider a user "actively watching right now" if they touched a lesson within this window.
const ACTIVE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// ---------------------------------------------------------------------------
// Deterministic, date-seeded randomization (100% client-side, no backend).
// The whole roster — who's "Top", "Completed", "Active right now", their XP,
// streaks, progress — reshuffles once per calendar day. Seeding by the date
// (rather than true Math.random()) means everyone who opens the app on the
// same day sees the same "today's roster", but tomorrow it rotates again.
// ---------------------------------------------------------------------------

function getDailySeedNumber(): number {
  const now = new Date();
  // YYYYMMDD as an integer, e.g. 2026-08-03 -> 20260803
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

// mulberry32 — small, fast, deterministic PRNG (public domain algorithm).
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(array: T[], rng: () => number): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const DAILY_SEED = getDailySeedNumber();
const dailyRng = mulberry32(DAILY_SEED);

export function getRosterDateLabel(): string {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// --- Name pools: explicitly requested names + a rich pool of 200+ authentic South Asian names ---
const MALE_FIRST_NAMES: string[] = [
  'Faizan', 'Salman', 'Ahmad Ali', 'Jawad', 'Maaz', 'Fahad', 'Jalal', 'Zain', 'Musaweer', 'Asif',
  'Abbas', 'Umar', 'Yousaf', 'Wahid', 'Bilal', 'Hamza', 'Usman', 'Hassan', 'Ali Raza', 'Waleed',
  'Owais', 'Danish', 'Rayyan', 'Talha', 'Zeeshan', 'Umair', 'Kashif', 'Adeel', 'Shahzaib', 'Arslan',
  'Junaid', 'Noman', 'Asad', 'Huzaifa', 'Ibrahim', 'Zaid', 'Abdullah', 'Rehan', 'Ahsan', 'Farhan',
  'Imran', 'Kamran', 'Shoaib', 'Waqas', 'Naveed', 'Tariq', 'Shahid', 'Sohail', 'Yasir', 'Nauman',
  'Sami', 'Haris', 'Moiz', 'Ovais', 'Sarmad', 'Taimoor', 'Rizwan', 'Aamir', 'Adnan', 'Faraz',
  'Haider', 'Mustafa', 'Qasim', 'Sarfraz', 'Zohaib', 'Ammar', 'Anas', 'Daniyal', 'Ehsan', 'Fawad',
  'Ghazi', 'Hanzala', 'Ikram', 'Jibran', 'Kaleem', 'Luqman', 'Mudassar', 'Nasir', 'Obaid', 'Parvaiz',
  'Qadeer', 'Raheel', 'Sikandar', 'Tayyab', 'Uzair', 'Vaqar', 'Wasay', 'Yaseen', 'Zarrar', 'Aftab',
  'Bakhtawar Ali', 'Chaudhry Amir', 'Dawood', 'Ejaz', 'Faheem', 'Ghulam', 'Hamdan', 'Irfan', 'Jamshed', 'Khalid',
  'Liaquat', 'Majid', 'Nadeem', 'Osama', 'Pervez', 'Qaiser', 'Rashid', 'Saad', 'Toqeer', 'Usman Ghani',
];

const FEMALE_FIRST_NAMES: string[] = [
  'Ayesha', 'Iman', 'Aiman', 'Haseena', 'Khadija', 'Alishba', 'Asia', 'Fariha', 'Sidra', 'Habiba',
  'Javeria', 'Amna', 'Hafeeza', 'Riya', 'Sajila', 'Laiba', 'Ujala', 'Zainab', 'Mehak', 'Mahnoor',
  'Rimsha', 'Sana', 'Mariam', 'Areeba', 'Eman', 'Komal', 'Sundas', 'Rabia', 'Naila', 'Farah',
  'Nida', 'Saba', 'Mehwish', 'Aliza', 'Wardah', 'Hira', 'Noor Fatima', 'Rida', 'Kainat', 'Tayyaba',
  'Sumbal', 'Anum', 'Sara', 'Zoya', 'Mahira', 'Sameen', 'Shazia', 'Uzma', 'Yusra', 'Bushra',
  'Sadia', 'Fatima', 'Sehrish', 'Iqra', 'Mahjabeen', 'Nimra', 'Palwasha', 'Qurat', 'Rukhsar', 'Sabahat',
  'Tehreem', 'Urooj', 'Vania', 'Warda', 'Yumna', 'Zara', 'Amina', 'Bareera', 'Ceema', 'Dua',
  'Esha', 'Falak', 'Ghazala', 'Hina', 'Ifra', 'Jannat', 'Kiran', 'Lubna', 'Mehreen', 'Nayab',
  'Ozma', 'Pakeeza', 'Quratulain', 'Rabail', 'Shanzay', 'Tania', 'Umaima', 'Vaneeza', 'Wajeeha', 'Xara',
  'Anaya', 'Bisma', 'Chahat', 'Duaa', 'Erum', 'Faryal', 'Gulnaz', 'Hoorain', 'Izna', 'Jaweria',
  'Kinza', 'Laraib', 'Mishal', 'Noreen', 'Ovza', 'Parisa', 'Rania', 'Sabrina', 'Tuba', 'Zunaira',
];

const SURNAMES: string[] = [
  'Khan', 'Ali', 'Ahmed', 'Malik', 'Butt', 'Sheikh', 'Chaudhry', 'Raza', 'Iqbal', 'Hussain',
  'Farooq', 'Abbasi', 'Qureshi', 'Baig', 'Awan', 'Bhatti', 'Cheema', 'Dar', 'Gill', 'Hashmi',
  'Javed', 'Kiani', 'Lodhi', 'Mirza', 'Niazi', 'Piracha', 'Rana', 'Satti', 'Tarar', 'Warraich',
];

function buildFullNameList(target: number): { name: string; gender: 'male' | 'female' }[] {
  const seedNames: { name: string; gender: 'male' | 'female' }[] = [];
  // First, the original single-name roster (kept exactly as-is for continuity).
  MALE_FIRST_NAMES.forEach((n) => seedNames.push({ name: n, gender: 'male' }));
  FEMALE_FIRST_NAMES.forEach((n) => seedNames.push({ name: n, gender: 'female' }));

  // Now generate "First Surname" combinations to comfortably exceed the target count,
  // cycling through both name pools and all surnames deterministically (no repeats).
  const combos: { name: string; gender: 'male' | 'female' }[] = [];
  const seen = new Set(seedNames.map((s) => s.name));
  let si = 0;
  while (seedNames.length + combos.length < target) {
    const surname = SURNAMES[si % SURNAMES.length];
    const useMale = si % 2 === 0;
    const pool = useMale ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
    const first = pool[Math.floor(si / 2) % pool.length];
    const full = `${first} ${surname}`;
    if (!seen.has(full)) {
      seen.add(full);
      combos.push({ name: full, gender: useMale ? 'male' : 'female' });
    }
    si++;
    if (si > target * 4) break; // safety valve
  }

  return [...seedNames, ...combos];
}

const TARGET_STUDENT_COUNT = 520;
const BASE_NAME_LIST = buildFullNameList(TARGET_STUDENT_COUNT);
// Reshuffle the whole pool using today's seed — this is what makes "who is Top",
// "who Completed", and "who's Active right now" rotate to different people daily.
const ALL_NAMES = seededShuffle(BASE_NAME_LIST, mulberry32(DAILY_SEED + 7));

function seededFraction(seed: number): number {
  const x = Math.sin(seed * 12.9898 + DAILY_SEED * 0.0001) * 43758.5453;
  return x - Math.floor(x);
}

function buildStudents(): Student[] {
  return ALL_NAMES.map((entry, i) => {
    const seed = i + 1;
    const r1 = seededFraction(seed);
    const r2 = seededFraction(seed * 2.13);
    const r3 = seededFraction(seed * 3.7);

    // First 10 names (after today's shuffle) are curated as "top" high performers.
    const isTop = i < 10;
    // A further batch (10-40) are fully completed students, separate from "top" leaderboard.
    const isCompleted = !isTop && i >= 10 && i < 40 && r1 > 0.3;

    let lessonsCompleted: number;
    if (isTop) {
      lessonsCompleted = TOTAL_LESSONS - Math.floor(r1 * 3); // near-complete
    } else if (isCompleted) {
      lessonsCompleted = TOTAL_LESSONS; // fully done
    } else {
      lessonsCompleted = Math.floor(r1 * (TOTAL_LESSONS + 1) * (r2 > 0.2 ? 1 : 0.15));
    }
    lessonsCompleted = Math.max(0, Math.min(TOTAL_LESSONS, lessonsCompleted));

    const quizzesTaken = Math.min(10, Math.floor((lessonsCompleted / TOTAL_LESSONS) * 10 + r2 * 2));
    const xp = lessonsCompleted * 10 + quizzesTaken * 8 + Math.floor(r2 * 30);
    const streak = lessonsCompleted === 0 ? 0 : Math.max(1, Math.floor(r3 * 45) + (isTop ? 20 : 0));

    return {
      id: `student-${i}`,
      name: entry.name,
      gender: entry.gender,
      lessonsCompleted,
      quizzesTaken: Math.max(0, quizzesTaken),
      xp: Math.max(0, xp),
      streak,
      color: moduleColors[i % moduleColors.length],
      isTop,
      isCompleted,
    };
  });
}

export const STUDENTS: Student[] = buildStudents();

export const TOP_STUDENTS: Student[] = STUDENTS
  .filter((s) => s.isTop)
  .sort((a, b) => b.xp - a.xp);

export const COMPLETED_STUDENTS: Student[] = STUDENTS
  .filter((s) => s.isCompleted)
  .sort((a, b) => b.streak - a.streak);

export const OTHER_STUDENTS: Student[] = STUDENTS
  .filter((s) => !s.isTop && !s.isCompleted)
  .sort((a, b) => b.lessonsCompleted - a.lessonsCompleted);

export function totalStudentCount(): number {
  return STUDENTS.length;
}

export function startedStudentCount(): number {
  return STUDENTS.filter((s) => s.lessonsCompleted > 0).length;
}

export function completedStudentCount(): number {
  return STUDENTS.filter((s) => s.isCompleted).length;
}

// "Currently watching" simulation: rotate a subset of non-top, non-completed
// students. The candidate pool is fixed for the day (via DAILY_SEED, above),
// while a 30-minute time bucket gently rotates *which* of today's candidates
// appear "live" right now — giving a sense of real activity without a backend.
export function getActiveNowStudents(count = 12): Student[] {
  const pool = OTHER_STUDENTS.filter((s) => s.lessonsCompleted > 0 && s.lessonsCompleted < TOTAL_LESSONS);
  const timeBucket = Math.floor(Date.now() / (1000 * 60 * 30)); // changes every 30 minutes
  const startIdx = (timeBucket + DAILY_SEED) % Math.max(1, pool.length);
  const result: Student[] = [];
  for (let i = 0; i < count && i < pool.length; i++) {
    result.push(pool[(startIdx + i) % pool.length]);
  }
  return result;
}

// --- Local student registration (client-side only, persisted via AsyncStorage) ---

export async function getLocalStudents(): Promise<LocalStudent[]> {
  const raw = await AsyncStorage.getItem(LOCAL_STUDENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addLocalStudent(name: string, course: string): Promise<LocalStudent[]> {
  const current = await getLocalStudents();
  const entry: LocalStudent = {
    id: `local-${Date.now()}`,
    name: name.trim(),
    course: course.trim() || 'Full Python Course',
    joinedAt: new Date().toISOString(),
  };
  const updated = [entry, ...current];
  await AsyncStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(updated));
  return updated;
}

export async function removeLocalStudent(id: string): Promise<LocalStudent[]> {
  const current = await getLocalStudents();
  const updated = current.filter((s) => s.id !== id);
  await AsyncStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(updated));
  return updated;
}

// --- Track the real (local) user's activity so they can show up as "Active Now" ---

export async function markUserWatching(lessonTitle: string): Promise<void> {
  await AsyncStorage.setItem(LAST_SEEN_LESSON_KEY, lessonTitle);
  await AsyncStorage.setItem(LAST_SEEN_AT_KEY, String(Date.now()));
}

export async function getUserActivity(): Promise<{ isActive: boolean; lessonTitle: string | null }> {
  const [lessonTitle, atRaw] = await Promise.all([
    AsyncStorage.getItem(LAST_SEEN_LESSON_KEY),
    AsyncStorage.getItem(LAST_SEEN_AT_KEY),
  ]);
  const at = atRaw ? parseInt(atRaw, 10) : 0;
  const isActive = !!lessonTitle && Date.now() - at < ACTIVE_WINDOW_MS;
  return { isActive, lessonTitle: isActive ? lessonTitle : null };
}

export function getTotalLessonsConstant(): number {
  return TOTAL_LESSONS;
}
