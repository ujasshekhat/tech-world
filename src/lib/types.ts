export interface MCQ {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  type: "interview" | "viva";
}

export interface PracticeExercise {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectDetail {
  title: string;
  description: string;
  steps: string[];
  code?: string;
  folderStructure?: string;
}

export interface TopicData {
  slug: string;
  title: string;
  category: string;
  icon: string;
  definition: string;
  beginnerExplanation: string;
  advancedExplanation: string;
  history: string;
  whyExists: string;
  coreConcepts: string[];
  terminology: { term: string; definition: string }[];
  internalWorking: string;
  architecture: string; // Markdown or ASCII diagram
  workflow: string[];
  components: string[];
  analogy: string;
  useCases: string[];
  setupGuide: string;
  folderStructure: string;
  codeExample: {
    language: string;
    code: string;
    explanation: string[];
  };
  security: string[];
  performance: string[];
  errorHandling: string[];
  bestPractices: string[];
  commonMistakes: string[];
  advantages: string[];
  disadvantages: string[];
  comparisonTable: {
    headers: string[];
    rows: string[][];
  };
  faqs: FAQ[];
  questions: InterviewQuestion[]; // combines interview & viva
  mcqs: MCQ[];
  exercises: PracticeExercise[];
  miniProject: ProjectDetail;
  majorProject: ProjectDetail;
  cheatSheet: string[];
  revisionNotes: string;
  summary: string;
  keyTakeaways: string[];
  resources: string[];
  relatedTopics: { title: string; slug: string }[];
  nextTopic: { title: string; slug: string };
}

export interface UserProgress {
  completedTopics: string[]; // slugs
  bookmarks: string[]; // slugs
  notes: Record<string, string>; // slug -> note markdown/text
  quizScores: Record<string, { score: number; total: number; date: string }>; // topicSlug -> score
  profile: {
    name: string;
    title: string;
    exp: number; // Experience points
    rank: string;
    badges: string[];
  };
}
