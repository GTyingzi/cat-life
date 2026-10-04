import type { Article, Category } from './types';

export function readKnowledgeHash(hash: string, articles: Article[], categories: Category[]): { category: string; articleId?: string } {
  let fragment: string;
  try { fragment = decodeURIComponent(hash.replace(/^#/, '')); } catch { return { category: 'all' }; }
  if (fragment.startsWith('qa-')) {
    const article = articles.find(item => item.id === fragment.slice(3));
    if (article) return { category: article.category, articleId: article.id };
  }
  if (fragment.startsWith('topic-')) {
    const category = categories.find(item => item.id === fragment.slice(6));
    if (category) return { category: category.id };
  }
  return { category: 'all' };
}

export function isKnowledgeHash(hash: string): boolean {
  if (!hash) return true;
  try { return /^#(?:qa-|topic-)/.test(decodeURIComponent(hash)); } catch { return false; }
}
