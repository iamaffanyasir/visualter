'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

const carouselData = [
  {
    title: 'WEBSITE DEVELOPMENT',
    description: 'Creating intuitive and engaging user experiences through modern design principles and innovative interfaces',
    buttonText: 'View Projects',
    // secondaryButtonText: '',
    image: '/images/carousel/website-dev.webp',
    stats: {
      main: '100+',
      sub: 'Projects Completed'
    }
  },
  {
    title: 'AI & MACHINE LEARNING',
    description: 'Leveraging artificial intelligence and machine learning to build intelligent solutions for complex problems',
    buttonText: 'View Projects',
    // secondaryButtonText: 'Our Solutions',
    image: '/images/carousel/ai-ml.webp',
    stats: {
      main: '99.7%',
      sub: 'Accuracy Rate'
    }
  },
  {
    title: 'UI & UX DESIGNS',
    description: 'Crafting beautiful and intuitive user interfaces that deliver exceptional user experiences',
    buttonText: 'View Projects',
    // secondaryButtonText: 'See Designs',
    image: '/images/carousel/ui-ux.webp',
    stats: {
      main: '30+',
      sub: 'Happy Clients'
    }
  },
  {
    title: 'SEO & ANALYTICS',
    description: 'Optimizing digital presence and driving growth through data-driven insights and strategic marketing',
    buttonText: 'View Projects',
    // secondaryButtonText: 'Case Studies',
    image: '/images/carousel/seo.webp',
    stats: {
      main: '89%',
      sub: 'Avg. Growth Rate'
    }
  }
];

export const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(autoSlideTimer);
  }, []);

  return (
    <header className="header">
      <div 
        className={`header__background ${slideDirection === 'next' ? 'slide-next' : 'slide-prev'}`}
        style={{ 
          backgroundImage: `url(${carouselData[currentSlide].image})`,
          opacity: 0.6
        }}
      />
      <div className="header__overlay"></div>
      
      <div className="header__bottom-content">
        <div className="header__text-content">
          <span className="header__label">Featured Service</span>
          <h1 className="header__title">{carouselData[currentSlide].title}</h1>
          <p className="header__description">{carouselData[currentSlide].description}</p>
          <div className="header__buttons">
            <Link href="/portfolio" className="header__button header__button--primary">
              {carouselData[currentSlide].buttonText}
              <span className="header__button-icon">→</span>
            </Link>
          </div>
          <div className="header__stats">
            <div className="header__stat">
              <span className="header__stat-number">{carouselData[currentSlide].stats.main}</span>
              <span className="header__stat-label">{carouselData[currentSlide].stats.sub}</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="header__scroll-indicator"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="header__scroll-arrow" />
        <span className="header__scroll-text">Scroll Down</span>
      </button>
    </header>
  );
};
