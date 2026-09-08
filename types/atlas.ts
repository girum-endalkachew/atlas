import { ErrorAnalysisResult } from './error';

export interface AtlasCategoryItem {
  id: string;
  name: string;
  count: number;
  subcategories: string[];
}

export interface AtlasCategoryGroup {
  id: string;
  title: string;
  iconName: string;
  color: string;
  items: AtlasCategoryItem[];
}

export interface UserHistoryItem {
  id: string;
  errorType: string;
  message: string;
  language: string;
  framework: string;
  timestamp: number;
  learnedConcept: string;
  fullResult: ErrorAnalysisResult;
}

export interface LearningTopic {
  id: string;
  title: string;
  completed: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  category: string;
  progress: number; // 0 to 100
  investigationsCount: number;
  topics: LearningTopic[];
}
