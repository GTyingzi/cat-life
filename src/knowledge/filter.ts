import type { Locale } from '../content';
import type { Article } from './types';

const normalize = (text: string) => text.normalize('NFKC').toLocaleLowerCase().trim();

export function filterArticles(articles: Article[], locale: Locale, category: string, query: string): Article[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return articles.filter(article => {
    if (category !== 'all' && article.category !== category) return false;
    const answer = article.answer[locale];
    const text = normalize([answer.question, answer.shortAnswer, answer.reasons, ...answer.actions, answer.watch ?? '', ...answer.keywords].join(' '));
    return terms.every(term => text.includes(term));
  });
}
