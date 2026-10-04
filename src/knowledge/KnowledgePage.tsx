import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, Link as LinkIcon, Search, X } from 'lucide-react';
import { copy } from '../content';
import { mediaUrl } from '../links';
import { SiteFooter, SiteHeader } from '../SiteChrome';
import { useLocale } from '../useLocale';
import { articles, categories, knowledgeCopy } from './content';
import { filterArticles } from './filter';
import { isKnowledgeHash, readKnowledgeHash } from './location';
import './knowledge.css';

const initialLocation = () => readKnowledgeHash(window.location.hash, articles, categories);

export default function KnowledgePage() {
  const [locale, setLocale] = useLocale(knowledgeCopy);
  const [category, setCategory] = useState(() => initialLocation().category);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<Set<string>>(() => {
    const id = initialLocation().articleId;
    return new Set(id ? [id] : []);
  });
  const searchInput = useRef<HTMLInputElement>(null);
  const c = knowledgeCopy[locale];
  const visible = filterArticles(articles, locale, category, query);

  useEffect(() => {
    let frame = 0;
    const followHash = () => {
      if (!isKnowledgeHash(window.location.hash)) return;
      const location = readKnowledgeHash(window.location.hash, articles, categories);
      setCategory(location.category);
      setQuery('');
      if (location.articleId) setOpened(previous => new Set([...previous, location.articleId!]));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = document.getElementById(location.articleId ? `qa-${location.articleId}` : 'qa-results');
        if (window.location.hash && element) {
          element.scrollIntoView({ block: 'start' });
          if (location.articleId) element.querySelector('summary')?.focus({ preventScroll: true });
        }
      });
    };
    if (window.location.hash) followHash();
    window.addEventListener('hashchange', followHash);
    return () => { window.removeEventListener('hashchange', followHash); cancelAnimationFrame(frame); };
  }, []);

  function reset() {
    setCategory('all');
    setQuery('');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function selectCategory(id: string) {
    setCategory(id);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${id === 'all' ? '' : `#topic-${id}`}`);
  }

  return <>
    <a className="skip-link" href="#main">{copy[locale].skip}</a>
    <SiteHeader locale={locale} setLocale={setLocale} knowledge/>
    <main id="main" className="knowledge-main">
      <a className="knowledge-back" href={mediaUrl('index.html')}><ArrowLeft size={17} aria-hidden="true"/>{c.back}</a>
      <section className="knowledge-intro" aria-labelledby="knowledge-title">
        <div><p className="knowledge-name">{c.name}</p><h1 id="knowledge-title">{c.heading}</h1><p className="knowledge-lede">{c.intro}</p></div>
        <aside className="knowledge-note"><p>{c.note}</p><span>{articles.length} {c.results} / {categories.length} {locale === 'en' ? 'topics' : '个主题'}</span></aside>
      </section>
      <div className="knowledge-browser">
        <aside className="knowledge-topics" aria-labelledby="topics-label">
          <h2 id="topics-label">{c.topics}</h2>
          <div className="topic-buttons"><button aria-pressed={category === 'all'} onClick={() => selectCategory('all')}>{c.all}<span>{articles.length}</span></button>
            {categories.map(topic => <button key={topic.id} aria-pressed={category === topic.id} onClick={() => selectCategory(topic.id)}>{topic.name[locale]}<span>{articles.filter(article => article.category === topic.id).length}</span></button>)}
          </div>
        </aside>
        <section className="knowledge-questions" aria-labelledby="qa-results">
          <div className="knowledge-search"><label htmlFor="qa-search">{c.search}</label><div className="search-field"><Search size={20} aria-hidden="true"/>
            <input id="qa-search" ref={searchInput} type="search" value={query} placeholder={c.placeholder} onChange={event => setQuery(event.target.value)}/>
            {query && <button aria-label={c.clear} onClick={() => { setQuery(''); searchInput.current?.focus(); }}><X size={19} aria-hidden="true"/></button>}
          </div></div>
          <div className="knowledge-result-line"><h2 id="qa-results" aria-live="polite" aria-atomic="true">{category === 'all' ? c.all : categories.find(topic => topic.id === category)?.name[locale]}<span>{visible.length} {c.results}</span></h2>
            {(query || category !== 'all') && <button className="text-button" onClick={reset}>{c.reset}</button>}
          </div>
          {visible.length === 0 ? <div className="knowledge-empty"><h3>{c.emptyTitle}</h3><p>{c.emptyText}</p><button className="button secondary" onClick={reset}>{c.reset}</button></div> : <div className="qa-list">{visible.map(article => {
            const answer = article.answer[locale];
            return <details className="qa-item" id={`qa-${article.id}`} key={article.id} open={opened.has(article.id)} onToggle={event => {
              if (!event.currentTarget.isConnected) return;
              const isOpen = event.currentTarget.open;
              setOpened(previous => {
                if (previous.has(article.id) === isOpen) return previous;
                const next = new Set(previous);
                if (isOpen) next.add(article.id); else next.delete(article.id);
                return next;
              });
            }}>
              <summary onClick={event => {
                // Capture activation before a language/filter change can unmount this disclosure.
                event.preventDefault();
                setOpened(previous => {
                  const next = new Set(previous);
                  if (next.has(article.id)) next.delete(article.id); else next.add(article.id);
                  return next;
                });
              }}><div className="qa-question-copy">{category === 'all' && <span className="qa-category">{categories.find(topic => topic.id === article.category)?.name[locale]}</span>}
                <h3>{answer.question}</h3>{article.urgent && <span className="qa-urgent">{c.urgent}</span>}<p>{answer.shortAnswer}</p></div><ChevronDown className="qa-chevron" size={20} aria-hidden="true"/></summary>
              <div className="qa-answer"><h4>{c.reasons}</h4><p>{answer.reasons}</p><h4>{c.actions}</h4><ul>{answer.actions.map(action => <li key={action}>{action}</li>)}</ul>
                {answer.watch && <aside className={`qa-watch${article.urgent ? ' qa-watch-urgent' : ''}`}><h4>{c.watch}</h4><p>{answer.watch}</p></aside>}
                <div className="qa-sources"><h4>{c.sources}</h4><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul>
                  <div className="qa-meta"><span>{c.reviewed}: <time dateTime={article.reviewedAt}>{article.reviewedAt}</time></span><a href={`#qa-${article.id}`}><LinkIcon size={14} aria-hidden="true"/>{c.share}</a></div>
                </div>
              </div>
            </details>;
          })}</div>}
        </section>
      </div>
    </main>
    <SiteFooter locale={locale} knowledge/>
  </>;
}
