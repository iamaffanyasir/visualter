'use client';

import './About.css';

export const About = () => {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-content">
          <h1 className="about__hero-title">About Visualter</h1>
          <p className="about__hero-description">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>
      </section>

      <section className="about__vision">
        <div className="about__container">
          <div className="about__vision-content">
            <h2 className="about__section-title">Our Vision</h2>
            <p className="about__section-text">
              At Visualter, we envision a world where technology and creativity converge to create meaningful digital solutions that inspire and empower.
            </p>
          </div>
        </div>
      </section>

      <section className="about__values">
        <div className="about__container">
          <h2 className="about__section-title">Our Values</h2>
          <div className="about__values-grid">
            <div className="about__value-card">
              <i className="about__value-icon fas fa-lightbulb"></i>
              <h3 className="about__value-title">Innovation</h3>
              <p className="about__value-text">
                Pushing boundaries and exploring new possibilities in digital technology
              </p>
            </div>
            <div className="about__value-card">
              <i className="about__value-icon fas fa-users"></i>
              <h3 className="about__value-title">Collaboration</h3>
              <p className="about__value-text">
                Working together to achieve exceptional results
              </p>
            </div>
            <div className="about__value-card">
              <i className="about__value-icon fas fa-star"></i>
              <h3 className="about__value-title">Excellence</h3>
              <p className="about__value-text">
                Delivering outstanding quality in everything we do
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about__team">
        <div className="about__container">
          <h2 className="about__section-title">Our Team</h2>
          <div className="about__team-grid">
            <div className="about__team-member">
              <div className="about__team-image-wrapper">
                <img 
                  src="/images/team/affan.jpg" 
                  alt="Mohammad Affan Yasir"
                  className="about__team-image"
                />
              </div>
              <h3 className="about__team-name">Mohammad Affan Yasir</h3>
              <p className="about__team-position">Founder & CEO</p>
              <p className="about__team-bio">
                Visionary leader with over 5 years of experience in software development
              </p>
            </div>
            <div className="about__team-member">
              <div className="about__team-image-wrapper">
                <img 
                  src="/images/team/kabeer.jpg" 
                  alt="Kabeer Rana"
                  className="about__team-image"
                />
              </div>
              <h3 className="about__team-name">Kabeer Rana</h3>
              <p className="about__team-position">Creative Director</p>
              <p className="about__team-bio">
                Award-winning designer with a passion for creating impactful experiences
              </p>
            </div>
            <div className="about__team-member">
              <div className="about__team-image-wrapper">
                <img 
                  src="/images/team/saheb.jpg" 
                  alt="Saheb Alam"
                  className="about__team-image"
                />
              </div>
              <h3 className="about__team-name">Saheb Alam</h3>
              <p className="about__team-position">Technical Lead</p>
              <p className="about__team-bio">
                Expert in cutting-edge technologies and innovative solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about__journey">
        <div className="about__container">
          <h2 className="about__section-title">Our Process</h2>
          <div className="about__timeline">
            <div className="about__timeline-item">
              <div className="about__timeline-year">001</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Discovery</h3>
                <p className="about__timeline-text">
                Understanding your vision and requirements
                Initial consultation,
                Requirements gathering,
                Project scope definition,
                Technology stack selection
                </p>
              </div>
            </div>
            <div className="about__timeline-item">
              <div className="about__timeline-year">002</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Planning</h3>
                <p className="about__timeline-text">
                Creating detailed project roadmap
                Project timeline creation,
                Resource allocation,
                Milestone definition,
                Risk assessment
                </p>
              </div>
            </div>
            <div className="about__timeline-item">
              <div className="about__timeline-year">003</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Design</h3>
                <p className="about__timeline-text">
                Crafting the perfect user experience
                UI/UX wireframing,
                Design prototyping,
                User flow mapping,
                Visual design
                </p>
              </div>
            </div>
            <div className="about__timeline-item">
              <div className="about__timeline-year">004</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Development</h3>
                <p className="about__timeline-text">
                Building with cutting-edge technology
                Agile development,
                Code reviews,
                Quality assurance,
                Progress tracking
                </p>
              </div>
            </div>
            <div className="about__timeline-item">
              <div className="about__timeline-year">005</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Testing</h3>
                <p className="about__timeline-text">
                Ensuring quality and performance
                Functionality testing,
                Performance testing,
                Security testing,
                User acceptance testing
                </p>
              </div>
            </div>
            <div className="about__timeline-item">
              <div className="about__timeline-year">006</div>
              <div className="about__timeline-content">
                <h3 className="about__timeline-title">Launch</h3>
                <p className="about__timeline-text">
                Deploying your solution
                Deployment preparation,
                Go-live execution,
                Performance monitoring,
                Post-launch support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__cta">
        <div className="about__container">
          <div className="about__cta-content">
            <h2 className="about__cta-title">Ready to Work Together?</h2>
            <p className="about__cta-text">
              Let's create something amazing together
            </p>
            <a href="/contact" className="about__cta-button">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
