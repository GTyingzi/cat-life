import type { Locale, Localized } from '../content';

export type CategoryId = 'sleep' | 'communication' | 'feeding' | 'litter' | 'play' | 'grooming' | 'environment' | 'relationships';
export interface Category { id: CategoryId; name: Localized; description: Localized }
export interface Source { title: string; url: string }
export interface Answer {
  question: string;
  shortAnswer: string;
  reasons: string;
  actions: string[];
  watch?: string;
  keywords: string[];
}
export interface Article {
  id: string;
  category: CategoryId;
  answer: Record<Locale, Answer>;
  sources: Source[];
  reviewedAt: string;
  urgent?: boolean;
}
