export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  summary: string;
  imageUrl?: string;
  authorImage?: string;
  keyPoints: string[];
  danielaTip?: string;
  warningAlert?: string;
  checklistItems?: string[];
  sections: {
    heading: string;
    content: string;
    imageUrl?: string;
    imageCaption?: string;
    bulletPoints?: string[];
    tableData?: Record<string, string>[];
  }[];
}

export interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  region?: 'América' | 'Europa' | 'Asia' | 'Oceanía' | 'África';
  languages: string[];
  monthlyCostEstimate: string;
  costValueUSD: number;
  visaEase: 'Alta' | 'Media' | 'Baja' | 'Exigente con Opciones' | 'Exigente';
  visaDetails: string;
  safetyAndStability: string;
  demandedProfessions: string[];
  keyPros: string[];
  keyCons?: string[];
}

export interface BudgetItem {
  id: string;
  category: 'Trámites y Documentos' | 'Viaje y Traslado' | 'Alojamiento Inicial' | 'Depósito y Alquiler' | 'Alimentación e Higiene' | 'Transporte' | 'Seguro Médico' | 'Fondo de Emergencia';
  name: string;
  estimatedCost: number;
  notes?: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  items: {
    id: string;
    text: string;
    required: boolean;
    isDigitalBackupRecommend?: boolean;
    tooltip?: string;
  }[];
}

export interface QuizQuestionItem {
  id: number;
  question: string;
}

export interface QuizBlock {
  id: number;
  title: string;
  questionRange: string;
  questions: QuizQuestionItem[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    score: number;
    feedback: string;
  }[];
}

export interface ActionPlanMonth {
  monthNumber: number;
  title: string;
  tasks: {
    id: string;
    text: string;
    category: string;
    tip?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface OfficialResource {
  category: string;
  title: string;
  organization: string;
  description: string;
  url: string;
  badge: string;
}
