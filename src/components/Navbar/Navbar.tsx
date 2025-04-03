'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link href="/" className="navbar__brand-link">
            <span className="navbar__brand-text">Visualter.</span>
          </Link>
        </div>

        <button 
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
        </button>

        <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--active' : ''}`}>
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link href="/" className="navbar__link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="navbar__item">
              <Link href="/about" className="navbar__link" onClick={closeMenu}>About</Link>
            </li>
            <li className="navbar__item">
              <Link href="/clientele" className="navbar__link" onClick={closeMenu}>Clientele</Link>
            </li>
            <li className="navbar__item">
              <Link href="/contact" className="navbar__link" onClick={closeMenu}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
