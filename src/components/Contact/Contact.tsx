'use client';

import { useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/{your-form-id}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact">
      <section className="contact__hero">
        <div className="contact__hero-content">
          <h1 className="contact__hero-title">Get in Touch</h1>
          <p className="contact__hero-description">
            Have a question or project in mind? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="contact__container">
        <section className="contact__info">
          <div className="contact__info-card">
            <div className="contact__info-item">
              <i className="contact__info-icon fas fa-map-marker-alt"></i>
              <h3 className="contact__info-title">Address</h3>
              <p className="contact__info-text">New Friends Colony</p>
              <p className="contact__info-text">New Delhi, India</p>
            </div>
            <div className="contact__info-item">
              <i className="contact__info-icon fas fa-envelope"></i>
              <h3 className="contact__info-title">Email</h3>
              <p className="contact__info-text">visualter4dev@gmail.com</p>
              <p className="contact__info-text">yasirmohammadaffan@gmail.com</p>
            </div>
            <div className="contact__info-item">
              <i className="contact__info-icon fas fa-phone-alt"></i>
              <h3 className="contact__info-title">Phone</h3>
              <p className="contact__info-text">+91 - 7011188053</p>
              <p className="contact__info-text">+91 - 8595654498</p>
            </div>
          </div>
        </section>

        <section className="contact__form-section">
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input
                type="text"
                name="name"
                className="contact__form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                className="contact__form-input"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__form-group">
              <input
                type="text"
                name="subject"
                className="contact__form-input"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__form-group">
              <textarea
                name="message"
                className="contact__form-input contact__form-textarea"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={`contact__form-button ${formStatus === 'loading' ? 'contact__form-button--loading' : ''}`}
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
              <div className="contact__form-message contact__form-message--success">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {formStatus === 'error' && (
              <div className="contact__form-message contact__form-message--error">
                Oops! Something went wrong. Please try again.
              </div>
            )}
          </form>
        </section>

        <section className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5725507569483!2d77.26421931508001!3d28.56843798244407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c59a771f75%3A0x348153a7dcc2c2d1!2sNew%20Friends%20Colony%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
            className="contact__map-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </div>
  );
};
