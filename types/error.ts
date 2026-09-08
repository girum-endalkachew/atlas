export type SupportedLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Go' | 'Rust' | 'Java' | 'General';
export type SupportedFramework = 'React' | 'Next.js' | 'Node.js' | 'Vue' | 'Express' | 'Django' | 'None';

export type AnatomyStepType = 'ERROR' | 'TRIGGER' | 'BAD_ASSUMPTION' | 'ROOT_CAUSE' | 'FAILURE' | 'FIX' | 'PREVENTION';

export interface ErrorAnatomyStep {
  step: AnatomyStepType;
  label: string;
  detail: string;
  codeSnippet?: string;
  color: string; // Tailwind hex or class name
}

export interface ErrorFixOption {
  title: string;
  code: string;
  explanation: string;
  isRecommended?: boolean;
}

export interface ErrorAnalysisResult {
  id: string;
  timestamp: number;
  errorType: string;
  title: string;
  message: string;
  language: SupportedLanguage;
  framework: SupportedFramework;
  rawErrorText?: string;
  codeContext?: {
    code: string;
    lineHighlight?: number;
  };

  // Anatomy breakdown for the visual node graph
  anatomy: ErrorAnatomyStep[];

  // The ?? "WHY?" Framework
  whatHappened: string;
  whyItHappened: string;
  likelyCause: string;
  fixes: ErrorFixOption[];
  howToPrevent: string[];

  // Connected learning concept
  learningConcept: {
    title: string;
    description: string;
    relatedTopics: string[];
  };
}
