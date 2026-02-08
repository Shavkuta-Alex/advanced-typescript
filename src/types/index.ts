export interface Resource {
  url: string;
  title: string;
  description: string;
}

export interface Exercise {
  url: string;
  title: string;
  difficulty: string;
  diffClass: string;
  source: string;
}

export interface Topic {
  id: number;
  anchor: string;
  title: string;
  difficulty: string;
  diffClass: string;
  prerequisites: string;
  overview: string;
  keyConcepts: string[];
  code: string;
  resources: Resource[];
  exercises: Exercise[];
  hints: string[];
}

export interface QuickRefResource {
  icon: string;
  title: string;
  url: string;
  description: string;
}

export interface IntroContent {
  text: string;
  howToUseTitle: string;
  steps: string[];
}
