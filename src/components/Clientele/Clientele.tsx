'use client';

import { useState } from 'react';
import './Clientele.css';

const clientsData = [
  { name: 'VisitIndia Global', logo: '/images/clients/visit.png', industry: 'Travel Website' },
  { name: 'MarvelMind Technology', logo: '/images/clients/mmt.png', industry: 'Software' },
  { name: 'Delhi Health Labs', logo: '/images/clients/dhl.png', industry: 'Healthcare' },
  { name: 'BizQuantum', logo: '/images/clients/biz.png', industry: 'Education' },
  { name: 'IERPS INC', logo: '/images/clients/ierps.png', industry: 'ERP Provider' },
  { name: 'AutoChef', logo: '/images/clients/autochef.webp', industry: 'Robotics' },
  { name: 'Visualter', logo: '/images/clients/visualter.png', industry: 'Software' },
  { name: 'Hashmi Law Associates', logo: '/images/clients/hlapl.png', industry: 'Law Firm' },
];

const testimonialsData = [
  {
    id: 1,
    name: 'Adnan Qureshi',
    position: 'CEO, MarvelMind Technology',
    image: '/images/testimonials/profile.svg',
    quote: 'Visualter transformed our digital presence with their innovative solutions. Their team\'s expertise and dedication are unmatched.',
    rating: 5
  },
  {
    id: 2,
    name: 'VisitIndia Global',
    position: 'Owner, VisitIndia Global',
    image: '/images/testimonials/profile.svg',
    quote: 'Working with Visualter was a game-changer for our company. They delivered beyond our expectations.',
    rating: 5
  },
  {
    id: 3,
    name: 'Saheb Alam',
    position: 'Marketing Manager, DHL',
    image: '/images/testimonials/profile.svg',
    quote: 'The attention to detail and technical expertise of the Visualter team is exceptional. Highly recommended!',
    rating: 5
  }
];

const statsData = [
  { number: '150+', label: 'Active Clients' },
  { number: '98%', label: 'Client Retention' },
  { number: '10+', label: 'Years Experience' },
  { number: '500+', label: 'Projects Delivered' }
];

export const Clientele = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="clientele">
      {/* Hero Section */}
      <section className="clientele__hero">
        <div className="clientele__hero-content">
          <h1 className="clientele__hero-title">Our Trusted Partners</h1>
          <p className="clientele__hero-description">
            Empowering businesses worldwide with innovative digital solutions
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="clientele__stats">
        <div className="clientele__stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="clientele__stat">
              <span className="clientele__stat-number">{stat.number}</span>
              <span className="clientele__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Grid Section */}
      <section className="clientele__clients">
        <h2 className="clientele__section-title">Our Clients</h2>
        <div className="clientele__clients-grid">
          {clientsData.map((client, index) => (
            <div key={index} className="clientele__client">
              <div className="clientele__client-logo">
                <img src={client.logo} alt={client.name} />
              </div>
              <div className="clientele__client-info">
                <h3 className="clientele__client-name">{client.name}</h3>
                <span className="clientele__client-industry">{client.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="clientele__testimonials">
        <h2 className="clientele__section-title">Client Testimonials</h2>
        <div className="clientele__testimonials-slider">
          <div className="clientele__testimonials-track" 
               style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonialsData.map((testimonial, index) => (
              <div key={testimonial.id} className="clientele__testimonial">
                <div className="clientele__testimonial-content">
                  <div className="clientele__testimonial-quote">{testimonial.quote}</div>
                  <div className="clientele__testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="clientele__testimonial-star">★</span>
                    ))}
                  </div>
                </div>
                <div className="clientele__testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="clientele__testimonial-image"
                  />
                  <div className="clientele__testimonial-info">
                    <h3 className="clientele__testimonial-name">{testimonial.name}</h3>
                    <span className="clientele__testimonial-position">{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="clientele__testimonials-nav">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                className={`clientele__testimonials-dot ${
                  index === activeTestimonial ? 'clientele__testimonials-dot--active' : ''
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="clientele__cta">
        <div className="clientele__cta-content">
          <h2 className="clientele__cta-title">Ready to Join Our Success Stories?</h2>
          <p className="clientele__cta-description">
            Let's transform your business with cutting-edge digital solutions
          </p>
          <button className="clientele__cta-button">Get Started Today</button>
        </div>
      </section>
    </div>
  );
};
