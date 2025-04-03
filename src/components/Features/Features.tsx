'use client';

import './Features.css';

const features = [
  {
    number: '01',
    title: 'Modern Technology Stack',
    description: 'Using cutting-edge technologies to build scalable solutions'
  },
  {
    number: '02',
    title: 'Responsive Design',
    description: 'Perfectly adapted for all devices and screen sizes'
  },
  {
    number: '03',
    title: 'Performance Optimized',
    description: 'Lightning-fast load times and smooth interactions'
  }
];

export const Features = () => {
  return (
    <section className="features">
      <div className="features__container">
        <div className="features__content">
          <div className="features__text">
            <h2 className="features__title">Why Choose Us</h2>
            <p className="features__description">
              We combine innovation with proven methodologies to deliver exceptional results
            </p>
          </div>
          
          <div className="features__list">
            {features.map((feature, index) => (
              <div key={index} className="features__item">
                <span className="features__item-number">{feature.number}</span>
                <div className="features__item-content">
                  <h3 className="features__item-title">{feature.title}</h3>
                  <p className="features__item-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
