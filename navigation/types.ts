import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMain: undefined;
  ModuleDetail: { moduleId: string };
  Lesson: { lessonId: string };
  Quiz: { moduleId: string };
  QuizResult: { moduleId: string; score: number; total: number };
};

export type CourseStackParamList = {
  CourseMain: undefined;
  ModuleDetail: { moduleId: string };
  Lesson: { lessonId: string };
  Quiz: { moduleId: string };
  QuizResult: { moduleId: string; score: number; total: number };
};

export type VideosStackParamList = {
  VideosMain: undefined;
};

export type StudentsStackParamList = {
  StudentsMain: undefined;
};

// Bookmarks is a full top-level tab (its own stack) so saved lessons are one tap
// away from anywhere in the app, just like Home/Course/Videos/Students.
export type BookmarksStackParamList = {
  BookmarksMain: undefined;
  Lesson: { lessonId: string };
};

// Services & Support live as secondary screens inside the Profile ("More") stack
// — reached via quick-link cards on the Profile screen, the Home screen banners,
// and directly from the web navbar — rather than as their own top-level tabs, to
// keep the bottom tab bar to a clean, uncrowded set of primary sections.
export type ProfileStackParamList = {
  ProfileMain: undefined;
  AboutDeveloper: undefined;
  Services: undefined;
  Support: undefined;
  Lesson: { lessonId: string };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Course: NavigatorScreenParams<CourseStackParamList>;
  Videos: NavigatorScreenParams<VideosStackParamList>;
  Students: NavigatorScreenParams<StudentsStackParamList>;
  Bookmarks: NavigatorScreenParams<BookmarksStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};
