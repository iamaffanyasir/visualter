'use client';

import './terms.css';

export default function TermsPage() {
  return (
    <div className="terms">
      <section className="terms__hero">
        <div className="terms__hero-content">
          <h1 className="terms__hero-title">Terms of Service</h1>
          <p className="terms__hero-description">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <div className="terms__container">
        <div className="terms__content">
          <section className="terms__section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Visualter's services, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section className="terms__section">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access our services for personal,
              non-commercial transitory viewing only.
            </p>
            <p>This license shall automatically terminate if you violate any of these restrictions:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>3. Disclaimer</h2>
            <p>
              The materials on Visualter's services are provided on an 'as is' basis.
              Visualter makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation:
            </p>
            <ul>
              <li>Implied warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>4. Limitations</h2>
            <p>
              In no event shall Visualter be liable for any damages arising out of the use
              or inability to use our services, even if we have been notified of the
              possibility of such damages.
            </p>
          </section>

          <section className="terms__section">
            <h2>5. Service Updates</h2>
            <p>
              Visualter may revise these terms of service at any time without notice.
              By using our services, you are agreeing to be bound by the current version
              of these terms of service.
            </p>
          </section>

          <section className="terms__section">
            <h2>6. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
