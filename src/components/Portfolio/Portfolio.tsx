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
    title: 'VisitIndia Global',
    category: 'Websites',
    description: 'A modern travel website with advanced features and seamless user experience',
    image: 'images//portfolio/visitindiaglobal.png',
    technologies: ['React.js', 'Node.js', 'Google Sheets'],
    demoUrl: 'https://visitindiaglobal.com',
  },
  {
    id: '2',
    title: 'Delhi Health Labs',
    category: 'Websites',
    description: 'A modern healthcare website with advanced features and seamless user experience',
    image: 'images/portfolio/dhl.png',
    technologies: ['React.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://dhlbeta.vercel.app',
  },
  {
    id: '3',
    title: 'Delhi Health Labs App',
    category: 'App',
    description: 'Healthcare Android View App',
    image: 'images/portfolio/dhlapp.png',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    demoUrl: 'https://dhlbeta.vercel.app',
  },
  {
    id: '4',
    title: 'Yasir Codes Portfolio',
    category: 'Websites',
    description: 'Portfolio Website for Yasir Codes',
    image: 'images/portfolio/yasircodes.png',
    technologies: ['React.js', 'Node.js', 'Google Cloud Console', 'Formspree'],
    demoUrl: 'https://yasircodes.visualter.com',
  },
  {
    id: '5',
    title: 'Visualter CManager',
    category: 'Software',
    description: 'A CRM Software for freelancers to manage clients, employees and projects',
    image: 'images/portfolio/cmanager.png',
    technologies: ['Next.js', 'Node.js', 'Google Sheets'],
    demoUrl: 'https://cmanager.visualter.com',
  },
  {
    id: '6',
    title: 'SocialPulse',
    category: 'Websites',
    description: 'A Social Media Platform',
    image: 'images/portfolio/socialpulse.png',
    technologies: ['Next.js', 'Node.js', 'Appwrite'],
    demoUrl: 'https://socialpulse3.vercel.app',
  },
  {
    id: '7',
    title: 'AutoChef',
    category: 'E-Commerce',
    description: 'An E-Commerce Website',
    image: 'images/portfolio/autochef.png',
    technologies: ['Next.js', 'Node.js', 'Razorpay'],
    demoUrl: 'https://autochefv1.vercel.app',
  },
  {
    id: '8',
    title: 'Form Builder',
    category: 'Software',
    description: 'A software to build and design Forms for your website projects',
    image: 'images/portfolio/formbuilder.png',
    technologies: ['Next.js', 'Node.js', 'Electron'],
    demoUrl: 'https://formbuilderv2.vercel.app',
  },
  {
    id: '9',
    title: 'RideAlert',
    category: 'IoT',
    description: 'An app designed for Smart Helmet IoT Project',
    image: 'images/portfolio/ridealert.png',
    technologies: ['Next.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://ridealert-v2.vercel.app',
  },
  {
    id: '10',
    title: 'NF Infratech',
    category: 'Websites',
    description: 'A website for NF Infratech',
    image: 'images/portfolio/nf.png',
    technologies: ['JavaScript', 'HTML & CSS', 'Formspree'],
    demoUrl: 'http://nf-infratech-t1.vercel.app',
  },
  {
    id: '11',
    title: 'BizQuantum',
    category: 'E-Learning',
    description: 'An E-Learning Platform',
    image: 'images/portfolio/biz.png',
    technologies: ['JavaScript', 'HTML & CSS', 'Formspree'],
    demoUrl: 'https://biz-quantum.vercel.app',
  }
  
  // {
  //   id: '12',
  //   title: 'JS ChatBot',
  //   category: 'Ai Models',
  //   description: 'A Js Chatbot for Searching on the internet',
  //   image: 'images/portfolio/jschatbot.png',
  //   technologies: ['JavaScript', 'HTML & CSS', 'Formspree'],
  //   demoUrl: 'https://jschatbot.vercel.app',
  // }
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
