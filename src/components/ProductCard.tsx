import Link from 'next/link';
import { actionLabel, productHref, type Product } from '@/data/products';
import { ActionButton } from './ActionButton';
import { AppIcon } from './AppIcon';

export function ProductCard({ product: p }: { product: Product }) {
  const shots = p.shots.slice(0, p.shots[0]?.landscape ? 1 : 2);
  return (
    <article className="card" style={{ ['--accent' as string]: p.accent }}>
      <div className={`card__media ${shots.length ? '' : 'card__media--icon'}`}>
        {shots.length ? (
          shots.map((s) => (
            <img key={s.src} src={s.src} alt="" loading="lazy" decoding="async" className={s.landscape ? 'wide' : ''} />
          ))
        ) : (
          <AppIcon src={p.logo} alt="" dark={p.logoDark} />
        )}
      </div>
      <div className="card__body">
        <div className="card__head">
          <AppIcon src={p.logo} alt="" dark={p.logoDark} />
          <div>
            <h3 className="card__name">
              <Link href={productHref(p)} className="stretched">
                {p.name}
              </Link>
            </h3>
            <div className="card__platform">{p.platform}</div>
          </div>
        </div>
        <p className="card__text">{p.summary}</p>
        <div className="card__foot">
          <span className={`price ${p.action.type === 'buy' ? '' : 'price--muted'}`}>{actionLabel(p.action)}</span>
          <ActionButton product={p} small />
        </div>
      </div>
    </article>
  );
}
