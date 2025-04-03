'use client';

import Link from 'next/link';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link href="/" className="navbar__brand-link">
            <span className="navbar__brand-text">Visualter.</span>
          </Link>
        </div>

        <div className="navbar__menu">
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link href="/" className="navbar__link">Home</Link>
            </li>
            <li className="navbar__item">
              <Link href="/about" className="navbar__link">About</Link>
            </li>
            <li className="navbar__item">
              <Link href="/clientele" className="navbar__link">Clientele</Link>
            </li>
            {/* <li className="navbar__item">
              <Link href="/portfolio" className="navbar__link">Portfolio</Link>
            </li> */}
            {/* <li className="navbar__item">
              <Link href="/students" className="navbar__link">Students</Link>
            </li>
            <li className="navbar__item">
              <Link href="/careers" className="navbar__link">Careers</Link>
            </li> */}
            <li className="navbar__item">
              <Link href="/contact" className="navbar__link">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
