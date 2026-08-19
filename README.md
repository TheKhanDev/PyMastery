# PyMastery — Complete Python Course App

A cross-platform (iOS, Android, Web) Python learning app built with **React Native + Expo + TypeScript**.

10 modules · 42+ lessons · quizzes · XP/streaks · bookmarks · light/dark theme · video playlist · student community · downloadable PDF notes.

### Feature highlights
- **Light/Dark theme toggle** (Profile tab) — persisted on-device, respects system preference by default
- **Video Lessons** tab — embedded YouTube course playlist, browsable sequentially by module
- **Students** tab — Top Students leaderboard + 50+ student roster, with a "Join / Start Course" form so visitors can add themselves to the roster (stored locally on-device)
- **Download Notes (PDF)** — generates a full course notes document (all modules/lessons/key takeaways) and opens it for saving/sharing as a PDF
- **About the Developer** page — Waqas Khan's bio, experience, and a clean "Download Links" section listing every profile link in full

---

## 1. Run it on your PC (Web preview — fastest)

Requirements: [Node.js 18+](https://nodejs.org) installed.

```bash
# 1. Unzip this project, then open a terminal inside the folder
npm install
npx expo start --web
```

This opens the app in your browser at `http://localhost:8081` (or similar). Everything (lessons, quizzes, progress, About Developer page) works fully in the browser.

---

## 2. Run it on your phone (Expo Go — no build needed)

Requirements: [Expo Go](https://expo.dev/go) app installed on your Android/iOS phone (free, from Play Store / App Store).

```bash
npm install
npx expo start
```

A QR code will appear in your terminal. Scan it with:
- **Android**: the Expo Go app's built-in scanner
- **iOS**: your phone's Camera app (it will prompt to open in Expo Go)

Your phone and PC must be on the same Wi-Fi network.

---

## 3. Build a real installable `.apk` (Android)

This requires a **free Expo account** (sign up at https://expo.dev) since builds run on Expo's cloud servers (EAS Build) — you don't need Android Studio installed.

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

- This uploads your project to EAS Build and compiles a signed `.apk` in the cloud (~10-15 minutes).
- When it finishes, the terminal prints a download link — open it on your PC or phone to download the `.apk` directly.
- Install it on any Android phone by opening the downloaded file (you may need to allow "Install from unknown sources" once).

To build an iOS `.ipa` instead (requires a paid Apple Developer account to install on a real device):
```bash
eas build --platform ios --profile preview
```

---

## 4. Publish the website again (optional)

The web version is a **static export** — you can host it anywhere for free (Vercel, Netlify, GitHub Pages, etc.):

```bash
npx expo export --platform web
```

This creates a `dist/` folder — upload/deploy that folder to any static host.

---

## Project Structure

```
App.tsx                     — App entry, navigation container, font loading
navigation/
  RootNavigator.tsx          — Bottom tabs + stack navigators
  types.ts                   — TypeScript navigation param types
screens/
  HomeScreen.tsx              — Dashboard, continue learning, streak
  CourseScreen.tsx            — Full curriculum list (10 modules)
  ModuleDetailScreen.tsx      — Lessons list + quiz entry for a module
  LessonScreen.tsx            — Lesson content, code examples, mark complete
  QuizScreen.tsx               — Interactive multiple-choice quiz
  QuizResultScreen.tsx        — Quiz results with score & retry
  BookmarksScreen.tsx         — Saved lessons
  ProfileScreen.tsx           — XP/level/streak stats, TheKhanDev contact info
  AboutDeveloperScreen.tsx    — Editable developer profile (add your own info!)
components/
  CodeBlock.tsx               — Syntax-highlighted Python code snippets
  ProgressBar.tsx             — Animated progress bar
  ModuleCard.tsx              — Module list card with progress
lib/
  courseData.ts               — All course content (modules/lessons/quizzes)
  progress.ts                  — AsyncStorage-backed progress tracking (XP, streak, completion)
  developerProfile.ts          — AsyncStorage-backed "About the Developer" profile
  contact.ts                   — TheKhanDev brand contact info & link helpers
  theme.ts                     — Colors, spacing, radius design tokens
  types.ts                     — Shared TypeScript types
```

---

## Editing "About the Developer"

Open the app → **Profile tab** → **About the Developer** → tap **Edit My Info** and fill in your
name, title, bio, email, phone, website, and social links. Tap **Save Profile**. Your info is stored
locally on-device (AsyncStorage) and will persist between app restarts. Use **Clear My Info** to reset it.

---

## Credits

Course content & app created by **TheKhanDev**.
- Instagram: instagram.com/thekhandev
- TikTok: tiktok.com/@thekhandev
- YouTube: youtube.com/channel/UCnlq1zYUVz7uKjs9R_FROVA
- GitHub: github.com/thekhandev
- WhatsApp Channel: whatsapp.com/channel/0029VbCFMUzJENy0NDBIS63Q
- Facebook: web.facebook.com/people/thekhandev/61583414439195
- WhatsApp: +92 319 7742317
- Email: thekhandev.pk@gmail.com
