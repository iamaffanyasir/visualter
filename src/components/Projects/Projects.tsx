'use client';

import './Projects.css';

const projects = [
  {
    title: 'VisitIndia Global',
    category: 'Web Development',
    image: '/images/projects/visitindiaglobal.png'
  },
  {
    title: 'CManager',
    category: 'CRM Software',
    image: '/images/projects/cmanager.png'
  },
  {
    title: 'Travel App',
    category: 'UI/UX Design',
    image: '/images/projects/travel.png'
  }
];

export const Projects = () => {
  return (
    <section className="projects">
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__title">Recent Projects</h2>
          <p className="projects__subtitle">Showcasing our recent work</p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="projects__card">
              <div className="projects__card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="projects__card-content">
                <span className="projects__card-category">{project.category}</span>
                <h3 className="projects__card-title">{project.title}</h3>
                <button className="projects__card-button">
                  View Project
                  <span className="projects__card-button-icon">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
