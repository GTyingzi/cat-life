import { copy, siteContent, type Locale, type ProductItem } from './content';
import { mediaUrl, safeLink } from './links';

export default function Products({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const renderCard = (item: ProductItem) => {
    const url = safeLink(item.url);
    return (
      <article className="product-card" key={item.id} data-product={item.id}>
        <div className="product-photo">
          <img
            src={mediaUrl(item.image)}
            alt={item.alt[locale]}
            loading="lazy"
            width="1000"
            height="750"
            style={{ objectPosition: item.objectPosition ?? 'center', objectFit: item.imageFit ?? 'cover' }}
          />
        </div>
        <div className="product-info">
          <h4>{item.name[locale]}</h4>
          {url ? (
            <a className="product-link" href={url} target="_blank" rel="noopener noreferrer">
              {item.action === 'download' ? c.download : c.purchase}
            </a>
          ) : (
            <p className="product-pending">
              {item.action === 'download' ? c.downloadPending : c.purchasePending}
            </p>
          )}
        </div>
      </article>
    );
  };

  return (
    <section id="products" className="products section" aria-labelledby="products-heading">
      <div className="section-heading">
        <h2 id="products-heading">{c.productsTitle}</h2>
        <p>{c.productsNote}</p>
      </div>
      <div className="product-group" aria-labelledby="physical-heading">
        <h3 id="physical-heading">{c.physicalTitle}</h3>
        <div className="product-grid physical-grid">{siteContent.physicalProducts.map(renderCard)}</div>
      </div>
      <div className="product-group" aria-labelledby="services-heading">
        <h3 id="services-heading">{c.servicesTitle}</h3>
        <div className="product-grid services-grid">{siteContent.softwareAndDevices.map(renderCard)}</div>
      </div>
    </section>
  );
}
