import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ padding: '160px 0' }}>
      <div className="container">
        <h1 className="display">Lost in orbit.</h1>
        <p className="lede">The page you are looking for has moved or never existed.</p>
        <div className="cta-row mt-m" style={{ justifyContent: 'center' }}>
          <Link className="btn btn--primary" href="/">
            Go home
          </Link>
          <Link className="link" href="/store">
            Visit the Store
          </Link>
        </div>
      </div>
    </section>
  );
}
