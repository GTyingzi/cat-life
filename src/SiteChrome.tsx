import { PawPrint } from 'lucide-react';
import { copy, siteContent, type Locale } from './content';
import { mediaUrl } from './links';

export function SiteHeader({ locale, setLocale, knowledge = false }: { locale: Locale; setLocale: (locale: Locale) => void; knowledge?: boolean }) {
  const c = copy[locale];
  const home = knowledge ? mediaUrl('index.html') : '';
  return <header className={`header${knowledge ? ' knowledge-header' : ''}`}>
    <a className="brand" href={`${home}#`}><PawPrint size={25} strokeWidth={1.8}/><span>{siteContent.brand[locale]}</span></a>
    <nav aria-label={locale === 'en' ? 'Main navigation' : '主导航'}>
      <a href={`${home}#daily`}>{c.navDaily}</a><a href={`${home}#moment`}>{c.navMoment}</a>
      <a href={mediaUrl('knowledge.html')} aria-current={knowledge ? 'page' : undefined}>{c.navKnowledge}</a>
      <a href={`${home}#products`}>{c.navProducts}</a><a href={`${home}#shops`}>{c.navShops}</a>
    </nav>
    <div className="language-switch" role="group" aria-label={c.language}>
      <button aria-pressed={locale === 'zh-CN'} onClick={() => setLocale('zh-CN')}>中文</button><span aria-hidden="true">/</span>
      <button aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
    </div>
  </header>;
}

export function SiteFooter({ locale, knowledge = false }: { locale: Locale; knowledge?: boolean }) {
  const c = copy[locale];
  return <footer className="footer">
    <div><a className="brand" href={`${knowledge ? mediaUrl('index.html') : ''}#`}><PawPrint size={23}/><span>{siteContent.brand[locale]}</span></a><p>{c.footerLine}</p></div>
    <div className="footer-meta"><span>© {new Date().getFullYear()} {c.copyright}</span><a href={mediaUrl('credits.html')} target="_blank" rel="noopener noreferrer">{c.credits}</a>{!knowledge && <small>{c.sampleNote}</small>}</div>
  </footer>;
}
