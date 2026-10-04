import { BookOpen } from 'lucide-react';
import type { Locale } from '../content';
import { mediaUrl } from '../links';
import { categories, knowledgeCopy } from './content';

export default function KnowledgeEntry({ locale }: { locale: Locale }) {
  const c = knowledgeCopy[locale];
  return <section id="knowledge" className="knowledge-entry section" aria-labelledby="knowledge-entry-heading">
    <div className="knowledge-entry-copy"><BookOpen size={30} strokeWidth={1.4} aria-hidden="true"/><h2 id="knowledge-entry-heading">{c.entryTitle}</h2><p>{c.entryText}</p><a className="button secondary" href={mediaUrl('knowledge.html')}>{c.entryAction}</a></div>
    <div className="knowledge-topic-links">{categories.map(category => <a key={category.id} href={`${mediaUrl('knowledge.html')}#topic-${category.id}`}><span>{category.name[locale]}</span><span>{category.description[locale]}</span></a>)}</div>
  </section>;
}
