import type { Article, Category } from './types';

export function validateKnowledge(articles: Article[], categories: Category[], { total = 40, perCategory = 5 } = {}): string[] {
  const errors: string[] = [];
  const categoryIds = new Set(categories.map(category => category.id));
  const ids = new Set<string>();
  const questions = { 'zh-CN': new Set<string>(), en: new Set<string>() };
  const textIsValid = (text: unknown): text is string => typeof text === 'string' && text.trim().length > 0 && !/\b(?:TODO|TBD)\b|待补充|待确认/.test(text);
  if (articles.length !== total) errors.push(`total: expected ${total} articles, got ${articles.length}`);
  if (categories.length !== total / perCategory || categoryIds.size !== categories.length) errors.push('categories: unexpected count or duplicate IDs');
  for (const category of categories) {
    if (articles.filter(article => article.category === category.id).length !== perCategory) errors.push(`${category.id}: expected ${perCategory} articles`);
    for (const locale of ['zh-CN', 'en'] as const) {
      if (!textIsValid(category.name[locale]) || !textIsValid(category.description[locale])) errors.push(`${category.id}/${locale}: incomplete category`);
    }
  }
  for (const article of articles) {
    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(article.id)) errors.push(`${article.id}: invalid stable id`);
    if (ids.has(article.id)) errors.push(`${article.id}: duplicate id`);
    ids.add(article.id);
    if (!categoryIds.has(article.category)) errors.push(`${article.id}: unknown category`);
    for (const locale of ['zh-CN', 'en'] as const) {
      const answer = article.answer?.[locale];
      if (!answer) { errors.push(`${article.id}/${locale}: missing answer`); continue; }
      for (const field of ['question', 'shortAnswer', 'reasons'] as const) {
        if (!textIsValid(answer[field])) errors.push(`${article.id}/${locale}: invalid ${field}`);
      }
      if (questions[locale].has(answer.question)) errors.push(`${article.id}/${locale}: duplicate question`);
      questions[locale].add(answer.question);
      if (!Array.isArray(answer.actions) || answer.actions.length < 2 || answer.actions.length > 4 || answer.actions.some(action => !textIsValid(action))) errors.push(`${article.id}/${locale}: expected 2–4 complete actions`);
      if (!Array.isArray(answer.keywords) || !answer.keywords.length || answer.keywords.some(keyword => !textIsValid(keyword))) errors.push(`${article.id}/${locale}: missing keywords`);
      if (answer.watch !== undefined && !textIsValid(answer.watch)) errors.push(`${article.id}/${locale}: invalid watch text`);
      if (article.urgent && !answer.watch) errors.push(`${article.id}/${locale}: urgent article needs guidance`);
    }
    if (!Array.isArray(article.sources) || !article.sources.length) errors.push(`${article.id}: missing sources`);
    const urls = new Set<string>();
    for (const source of article.sources ?? []) {
      let validUrl = false;
      try { validUrl = new URL(source.url).protocol === 'https:'; } catch { /* Report invalid URLs below. */ }
      if (!validUrl || !textIsValid(source.title)) errors.push(`${article.id}: invalid source`);
      if (urls.has(source.url)) errors.push(`${article.id}: duplicate source`);
      urls.add(source.url);
    }
    const date = new Date(article.reviewedAt);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.reviewedAt) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== article.reviewedAt) errors.push(`${article.id}: invalid review date`);
  }
  return errors;
}
