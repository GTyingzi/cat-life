import { useEffect, useRef, useState } from 'react';
import { Heart, PawPrint, ShoppingBag, Users, X } from 'lucide-react';
import { copy, siteContent, type Entrance } from './content';
import Products from './Products';
import { mediaUrl, safeLink } from './links';
import { useLocale } from './useLocale';
import { SiteHeader, SiteFooter } from './SiteChrome';
import KnowledgeEntry from './knowledge/KnowledgeEntry';

export default function App() {
  const [locale, setLocale] = useLocale(copy);
  const [qr, setQr] = useState<string>();
  const dialog = useRef<HTMLDialogElement>(null);
  const c = copy[locale];
  useEffect(() => { if (qr) dialog.current?.showModal(); else dialog.current?.close(); }, [qr]);

  const renderEntrance = (entry: Entrance, community: boolean) => {
    const url = safeLink(entry.url);
    return <article className={`entrance ${community ? 'community-card' : 'shop-card'}`} key={entry.id}>
      <div className="entrance-top"><span className="entrance-icon">{community ? <Users size={25} strokeWidth={1.5}/> : <ShoppingBag size={25} strokeWidth={1.5}/>}</span><span className="entrance-label">{community ? c.communityLabel : c.shopLabel}</span></div>
      <h3>{entry.name[locale]}</h3><p>{entry.description[locale]}</p>
      <div className="entrance-action">{url ? <a className="button" href={url} target="_blank" rel="noopener noreferrer">{community ? c.enterCommunity : c.enterShop}</a> : !entry.qr ? <span className="coming-soon">{c.soon}</span> : null}
      {entry.qr && <button className="button" onClick={() => setQr(mediaUrl(entry.qr!))}>{c.viewQr}</button>}</div>
    </article>;
  };
  return <>
    <a className="skip-link" href="#main">{c.skip}</a>
    <SiteHeader locale={locale} setLocale={setLocale}/>
    <main id="main">
      <section className="hero">
        <div className="hero-copy"><h1>{c.heroTitle}</h1><p>{c.heroDescription}</p><div className="hero-actions"><a className="button primary" href="#connect">{c.join}</a><a className="button secondary" href="#shops">{c.shop}</a></div><div className="hero-note"><Heart size={16} strokeWidth={1.6}/><span>{c.heroNote}</span></div></div>
        <div className="hero-photo"><img src={mediaUrl(siteContent.heroImage)} alt={siteContent.heroAlt[locale]} fetchPriority="high" width="1600" height="1200"/><span className="photo-stamp" aria-hidden="true"><PawPrint size={21}/> everyday cats</span></div>
      </section>
      <section id="daily" className="daily section"><div className="section-heading"><h2>{c.dailyTitle}</h2><p>{c.dailyDescription}</p></div>
        <div className="gallery">{siteContent.gallery.map((photo, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={photo.src}><div className="gallery-photo"><img src={mediaUrl(photo.src)} alt={photo.alt[locale]} loading="lazy" width="900" height="1000"/></div><figcaption>{photo.caption[locale]}</figcaption></figure>)}</div>
      </section>
      <section id="moment" className="moment section"><div className="moment-copy"><PawPrint className="moment-paw" size={32} strokeWidth={1.3}/><h2>{c.momentTitle}</h2><p>{c.momentDescription}</p><span className="moment-title">{siteContent.video.title[locale]}</span></div>
        <div className="video-frame"><video controls playsInline preload="none" poster={mediaUrl(siteContent.video.poster)} aria-label={c.playLabel}><source src={mediaUrl(siteContent.video.src)} type="video/mp4"/>{c.videoFallback}</video></div>
      </section>
      <KnowledgeEntry locale={locale}/>
      <Products locale={locale}/>
      <section id="connect" className="connect section"><div className="section-heading"><h2>{c.connectTitle}</h2><p>{c.connectDescription}</p></div><div className="entrances">{renderEntrance(siteContent.community, true)}<div id="shops" className="shop-list">{siteContent.shops.map(entry => renderEntrance(entry, false))}</div></div></section>
    </main>
    <SiteFooter locale={locale}/>
    <dialog ref={dialog} className="qr-dialog" onCancel={() => setQr(undefined)} onClose={() => setQr(undefined)} onClick={event => { if (event.target === event.currentTarget) setQr(undefined); }} aria-labelledby="qr-title"><button className="dialog-close" onClick={() => setQr(undefined)} aria-label={c.close}><X size={23}/></button><h2 id="qr-title">{c.viewQr}</h2>{qr && <img src={qr} alt={c.qrAlt}/>}</dialog>
  </>;
}
