'use client';

import { useState } from 'react';
import './Portfolio.css';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Websites',
    description: 'A modern e-commerce solution with advanced features and seamless user experience',
    image: '/portfolio/ecommerce.jpg',
    technologies: ['Next.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://demo.com',
    githubUrl: 'https://github.com'
  },
  {
    id: '2',
    title: 'Healthcare App',
    category: 'Android Apps',
    description: 'Mobile healthcare solution for patient management and telemedicine',
    image: '/portfolio/healthcare.jpg',
    technologies: ['React Native', 'Firebase', 'WebRTC'],
  },
  {
    id: '3',
    title: 'Desktop Analytics',
    category: 'Software',
    description: 'Cross-platform desktop analytics tool for business intelligence',
    image: '/portfolio/analytics.jpg',
    technologies: ['Electron', 'React', 'Python'],
  },
  {
    id: '4',
    title: 'AI Image Generator',
    category: 'AI Tools',
    description: 'Web-based tool for generating images using artificial intelligence',
    image: '/portfolio/ai-image.jpg',
    technologies: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: '5',
    title: 'Sentiment Analyzer',
    category: 'AI Models',
    description: 'Deep learning model for advanced sentiment analysis',
    image: '/portfolio/sentiment.jpg',
    technologies: ['PyTorch', 'Transformers', 'FastAPI'],
  }
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="portfolio-page">
      <section className="portfolio-page__hero">
        <div className="portfolio-page__hero-content">
          <h1 className="portfolio-page__title">Our Portfolio</h1>
          <p className="portfolio-page__subtitle">
            Exploring Our Creative Universe: A Collection of Digital Excellence
          </p>
        </div>
      </section>

      <section className="portfolio-page__categories">
        <div className="portfolio-page__container">
          <div className="portfolio-page__category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`portfolio-page__category-button ${
                  activeCategory === category ? 'portfolio-page__category-button--active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-page__grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="portfolio-page__card">
                <div className="portfolio-page__card-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-page__card-overlay">
                    <div className="portfolio-page__card-links">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
                           className="portfolio-page__card-link">
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                           className="portfolio-page__card-link">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="portfolio-page__card-content">
                  <span className="portfolio-page__card-category">{project.category}</span>
                  <h3 className="portfolio-page__card-title">{project.title}</h3>
                  <p className="portfolio-page__card-description">{project.description}</p>
                  <div className="portfolio-page__card-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="portfolio-page__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
