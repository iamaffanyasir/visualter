'use client';

import Link from 'next/link';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              Visualter
            </Link>
            <p className="footer__description">
              Transforming ideas into exceptional digital experiences.
              We craft innovative solutions for web, mobile, and
              software development.
            </p>
            <div className="footer__social">
              <a href="https://linkedin.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg className="footer__social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg className="footer__social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg className="footer__social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
                </svg>
              </a>
              <a href="https://github.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">
                <svg className="footer__social-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h3 className="footer__heading">Company</h3>
              <ul className="footer__list">
                <li><Link href="/about" className="footer__link">About Us</Link></li>
                <li><Link href="/work" className="footer__link">Our Work</Link></li>
                <li><Link href="/careers" className="footer__link">Careers</Link></li>
                <li><Link href="/contact" className="footer__link">Contact</Link></li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__heading">Services</h3>
              <ul className="footer__list">
                <li><Link href="/services/web" className="footer__link">Web Development</Link></li>
                <li><Link href="/services/mobile" className="footer__link">Mobile Apps</Link></li>
                <li><Link href="/services/software" className="footer__link">Software Development</Link></li>
                <li><Link href="/services/ui-ux" className="footer__link">UI/UX Design</Link></li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__heading">Resources</h3>
              <ul className="footer__list">
                <li><Link href="/blog" className="footer__link">Blog</Link></li>
                <li><Link href="/case-studies" className="footer__link">Case Studies</Link></li>
                <li><Link href="/docs" className="footer__link">Documentation</Link></li>
                <li><Link href="/support" className="footer__link">Support</Link></li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__heading">Get in Touch</h3>
              <ul className="footer__list">
                <li className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/>
                  </svg>
                  New Friends Colony<br />New Delhi, India
                </li>
                <li className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  +91 - 7011188053<br />Mon - Fri, 9:00 AM - 6:00 PM
                </li>
                <li className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
                  </svg>
                  visualter4dev@gmail.com<br />yasirmohammadulfan@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <p className="footer__copyright">© 2019 Visualter. All rights reserved.</p>
            <div className="footer__legal-links">
              <Link href="/privacy" className="footer__legal-link">Privacy Policy</Link>
              <Link href="/terms" className="footer__legal-link">Terms of Service</Link>
              <Link href="/sitemap" className="footer__legal-link">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};