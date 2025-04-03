'use client';

import './privacy.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy">
      <section className="privacy__hero">
        <div className="privacy__hero-content">
          <h1 className="privacy__hero-title">Privacy Policy</h1>
          <p className="privacy__hero-description">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <div className="privacy__container">
        <div className="privacy__content">
          <section className="privacy__section">
            <h2>Introduction</h2>
            <p>
              At Visualter, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out contact forms</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a quote</li>
              <li>Create an account</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Device information</li>
              <li>Log and usage data</li>
              <li>Location data</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Responding to your requests and inquiries</li>
              <li>Improving our website and services</li>
              <li>Sending newsletters and marketing communications</li>
              <li>Analyzing usage patterns</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2>Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: visualter4dev@gmail.com
              <br />
              Phone: +91 - 7011188053
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
