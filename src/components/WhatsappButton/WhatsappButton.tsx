'use client';

import './WhatsappButton.css';

export const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/918595654498"
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="whatsapp-button__tooltip">Chat with us</span>
    </a>
  );
};
