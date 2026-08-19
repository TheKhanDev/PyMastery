export interface CodeExample {
  code: string;
  output?: string;
  caption?: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  content: string[]; // paragraphs, written in Pakistani Hinglish (Roman Urdu + English)
  examples: CodeExample[];
  keyPoints: string[];
  commonMistakes: string[]; // typical beginner galtiyan / quirks + fix, Hinglish
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}
