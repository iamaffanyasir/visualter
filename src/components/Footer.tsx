import Link from 'next/link';
import { site } from '@/data/site';
import { byCategory, productHref } from '@/data/products';

export function Footer() {
  const d = site.developer;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/brand/mark.svg" alt="Visualter" width={36} height={36} />
            <p>Apps, software, hardware and websites, designed and built by {d.name} in New Delhi.</p>
          </div>
          <div>
            <h4>Apps</h4>
            <ul>
              {byCategory('apps').slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link href={productHref(p)}>{p.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/apps">All apps</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/store">Store</Link></li>
              <li><Link href="/software">Software</Link></li>
              <li><Link href="/hardware">Hardware</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/downloads">Downloads</Link></li>
            </ul>
          </div>
          <div>
            <h4>Developer</h4>
            <ul>
              <li><Link href="/developer">{d.name}</Link></li>
              <li><a href={d.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={d.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={`mailto:${d.email}`}>{d.email}</a></li>
              <li><a href={d.phoneHref}>{d.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>Copyright © {new Date().getFullYear()} Visualter. All rights reserved.</span>
          <div className="footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/refunds">Refunds and Delivery</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
