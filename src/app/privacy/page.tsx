'use client';

import './privacy.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy">
      <section className="privacy__hero">
        <div className="privacy__hero-content">
          <h1 className="privacy__hero-title">Privacy Policy</h1>
          <p className="privacy__hero-description">
            Last updated: 16 November 2026
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

          <section className="privacy__section" id="taqwa">
            <h2>Taqwa: Prayer Times &amp; Quran (Android app)</h2>
            <p>
              Effective 16 November 2026 (app version 1.1.0). Taqwa is an offline-first Islamic companion app
              for prayer times, Quran reading and recitation, reminders and home-screen widgets. It is designed
              so that your personal information stays on your device.
            </p>

            <h3>Summary</h3>
            <ul>
              <li>No account or sign-in.</li>
              <li>No analytics, advertising or tracking SDKs.</li>
              <li>
                The internet is used only to stream or download content you choose (Quran recitation, tafsir and
                extra hadith books). These requests download public files and include no personal data.
              </li>
              <li>We do not collect, store on servers, sell or share any personal data from the app.</li>
            </ul>

            <h3>Information processed on your device</h3>
            <ul>
              <li>
                <strong>Location (optional).</strong> If you allow location access, your coordinates are read to
                calculate prayer times and the Qibla direction and are stored only in the app&apos;s private storage.
                You can instead choose a city or enter coordinates manually; the app works fully without location
                permission.
              </li>
              <li>
                <strong>Your content and settings.</strong> Bookmarks, notes, reading progress and statistics, Khatm
                plans, memorisation (hifz) progress, prayer and fasting records, qaza counts, quiz scores, calculator
                entries, tasbeeh counts and preferences are stored only on your device.
              </li>
              <li>
                <strong>Sensors.</strong> The compass is used live on the Qibla screen; nothing is recorded.
              </li>
            </ul>

            <h3>Permissions</h3>
            <ul>
              <li><strong>Location</strong>: optional; used only as described above.</li>
              <li><strong>Notifications</strong>: prayer alerts and the reminders you turn on.</li>
              <li><strong>Alarms &amp; reminders (exact alarms)</strong>: so prayer alerts arrive on time.</li>
              <li><strong>Full-screen notifications</strong>: only if you enable a full-screen prayer alarm.</li>
              <li>
                <strong>Foreground service (media playback)</strong>: to play the adhan at prayer time and Quran
                recitation you start; both can be stopped from the notification.
              </li>
              <li><strong>Internet</strong>: only for recitation streaming and optional downloads you start.</li>
              <li>
                <strong>Promoted notifications</strong> (Android 16): only if you turn on the live countdown to
                the next prayer.
              </li>
              <li><strong>Run at startup</strong>: to restore your prayer alarms after the phone restarts.</li>
            </ul>

            <h3>Third-party content servers</h3>
            <p>
              When you play recitation or download content, the app requests public files from
              <strong> everyayah.com</strong> (audio) and <strong>cdn.jsdelivr.net</strong> (tafsir and hadith files).
              As with any web request, these servers receive your device&apos;s IP address and standard request
              headers. The app sends no identifiers, account, location or usage information. Your device&apos;s
              system location service and geocoder, if used, are governed by your device provider&apos;s policy.
            </p>

            <h3>Backups, export and deletion</h3>
            <p>
              If Android backup is turned on for your Google account, Android may include the app&apos;s settings and
              personal records in your device backup so they can be restored on a new phone. This backup is handled
              by Google under your account and is not accessible to us; downloaded content and audio are not
              included. You can export your data to a file, or erase all app data, in the app under
              Settings › Privacy &amp; data, or by uninstalling the app.
            </p>

            <h3>Children</h3>
            <p>The app does not knowingly collect personal information from anyone, including children.</p>

            <h3>Changes</h3>
            <p>
              If this policy changes, the updated version will be posted on this page with a new effective date.
              Questions about Taqwa&apos;s privacy: yasirmohammadaffan@gmail.com
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
