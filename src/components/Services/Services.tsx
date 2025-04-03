'use client';

import './Services.css';

const services = [
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive interfaces that users love to interact with'
  },
  {
    icon: '🚀',
    title: 'Web Development',
    description: 'Building fast, responsive websites using cutting-edge technologies'
  },
  {
    icon: '🤖',
    title: 'AI Solutions',
    description: 'Implementing intelligent systems that transform businesses'
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Turning complex data into actionable insights'
  }
];

export const Services = () => {
  return (
    <section className="services">
      <div className="services__container">
        <h2 className="services__title">Our Services</h2>
        <p className="services__subtitle">Transforming ideas into digital reality</p>
        
        <div className="services__grid">
          {services.map((service, index) => (
            <div key={index} className="services__card">
              <div className="services__card-icon">{service.icon}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
