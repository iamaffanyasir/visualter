import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';

const SUPPORT_EMAIL = 'yasirmohammadaffan@gmail.com';

export const metadata: Metadata = {
  title: 'Prepvyu NEET Privacy Policy',
  description: 'How the Prepvyu NEET Android app handles your information. No account, no ads, no tracking, and your data stays on your phone.',
  alternates: { canonical: '/privacy/prepvyu' },
};

const toc = [
  ['glance', 'At a glance'],
  ['device', 'Stored on your device'],
  ['ai', 'Optional AI features'],
  ['report', 'Reporting AI content'],
  ['notifications', 'Notifications'],
  ['files', 'Import and export'],
  ['permissions', 'Permissions'],
  ['not', 'What we do not do'],
  ['delete', 'Deleting your data'],
  ['children', 'Children'],
  ['contact', 'Changes and contact'],
];

export default function PrepvyuPrivacyPage() {
  return (
    <div className="policy">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Legal · Prepvyu NEET</p>
          <h1 className="display">Prepvyu Privacy Policy.</h1>
          <p className="lede">
            Prepvyu is a NEET practice app. There is no account, no ads and no tracking, and your progress stays on your phone.
          </p>
          <p className="muted small mt-m">
            Effective 28 November 2026 · Android app version 1.0.0 · Package com.prepvyu.neet
          </p>
        </div>
      </section>

      <div className="container container--wide policy__layout">
        <nav className="policy__toc" aria-label="On this page">
          <p className="policy__toc-title">On this page</p>
          <ul>
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="policy__body">
          <section id="glance" className="policy__card">
            <h2>At a glance</h2>
            <div className="policy__glance">
              <div>
                <strong>No account, no server</strong>
                <span>We don&apos;t run a server for the app and never receive your data.</span>
              </div>
              <div>
                <strong>No ads or trackers</strong>
                <span>No advertising, analytics or crash-reporting SDKs.</span>
              </div>
              <div>
                <strong>AI is optional</strong>
                <span>AI features stay off until you add your own Google Gemini key.</span>
              </div>
              <div>
                <strong>You are in control</strong>
                <span>Reset your progress or delete everything at any time.</span>
              </div>
            </div>
            <p className="mt-m">
              Prepvyu NEET (&quot;the app&quot;, &quot;we&quot;) is developed by {site.developer.name} under Visualter. This policy
              explains what information the app handles and how. It applies only to the Prepvyu NEET Android app. For the
              visualter.in website, see the <Link href="/privacy">Visualter privacy policy</Link>.
            </p>
          </section>

          <section id="device" className="policy__card">
            <h2>Information stored on your device</h2>
            <p>To personalise your practice, the app stores the following <strong>only on your phone</strong>:</p>
            <ul>
              <li>
                Profile details you choose to enter: name, age, class, NEET target year and target score, city and coaching.
                Age, city and coaching are optional.
              </li>
              <li>Study preferences: daily goal, reminder time, theme and self-reported weak subjects.</li>
              <li>Practice history: questions attempted, your answers, time taken, test scores and analytics.</li>
              <li>Your Google Gemini API key, if you add one.</li>
            </ul>
            <p>
              This information is never sent to us. If Android backup is turned on for your Google account, Android may include
              the app&apos;s data in your personal device backup. That backup is handled by Google under your account, and we
              can&apos;t access it.
            </p>
          </section>

          <section id="ai" className="policy__card">
            <h2>Optional AI features (Google Gemini)</h2>
            <p>
              AI features (AI-personalised tests, &quot;Explain with AI&quot;, previous-year question recall and the AI Coach
              analysis and study plan) are off until you add your own Google Gemini API key in Settings. When you use one of
              them, the app sends a request <strong>directly from your phone to Google&apos;s Gemini API</strong> using your
              key. Depending on the feature, the request may include:
            </p>
            <ul>
              <li>your first name, class, NEET target year and target score;</li>
              <li>summaries of your performance, such as subject and chapter accuracy, speed and recent results;</li>
              <li>the subject, chapter or question you want generated or explained.</li>
            </ul>
            <p>
              Google processes this data under the{' '}
              <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Gemini API Terms</a> and
              the{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
              We never receive it. It travels over encrypted HTTPS. You can stop all AI requests at any time by removing your API
              key in Settings.
            </p>
            <p>
              AI-generated questions, explanations and reports can contain mistakes. Always check them against your NCERT
              textbooks and official sources.
            </p>
          </section>

          <section id="report" className="policy__card">
            <h2>Reporting AI content</h2>
            <p>
              Every AI-generated question, explanation and coach report has a <strong>Report</strong> button. Tapping it opens
              your own email app with a pre-filled message to {SUPPORT_EMAIL}. The message contains the reported content, the
              reason you pick, and the app and Android version.
            </p>
            <p>
              Nothing is sent unless you choose to send that email. If you do, we receive your email address and the message.
              We use them only to review and fix the reported content, and delete them once the report is resolved.
            </p>
          </section>

          <section id="notifications" className="policy__card">
            <h2>Notifications</h2>
            <p>
              If you allow notifications, the app schedules reminders on your phone: a daily test reminder and an optional evening
              streak reminder. They are created on the device itself. No push-notification service or server is involved.
            </p>
          </section>

          <section id="files" className="policy__card">
            <h2>Files you import or export</h2>
            <p>
              You can import a question bank file or export your progress as a JSON file. These files are read from, or saved to,
              a location you choose with Android&apos;s file picker. The app never uploads them.
            </p>
          </section>

          <section id="permissions" className="policy__card">
            <h2>Permissions</h2>
            <ul>
              <li>
                <strong>Internet and network state</strong>: used only for the optional AI features.
              </li>
              <li>
                <strong>Notifications</strong>: daily study reminders.
              </li>
              <li>
                <strong>Run at startup, wake lock and background work</strong>: added by Android&apos;s WorkManager library so
                your reminders still arrive after the phone restarts.
              </li>
            </ul>
            <p>The app does not request location, contacts, camera, microphone, photos, storage or phone access.</p>
          </section>

          <section id="not" className="policy__card">
            <h2>What we do not do</h2>
            <ul>
              <li>No advertising and no advertising ID.</li>
              <li>No third-party analytics or crash-reporting SDKs.</li>
              <li>No account creation or sign-in.</li>
              <li>No selling, renting or sharing of personal data.</li>
            </ul>
          </section>

          <section id="delete" className="policy__card">
            <h2>Deleting your data</h2>
            <p>
              Because your data lives only on your phone, you can delete it yourself at any time:
            </p>
            <ul>
              <li>Profile › Settings › Reset progress clears your practice history.</li>
              <li>
                Android Settings › Apps › Prepvyu - NEET › Storage › Clear data, or uninstalling the app, deletes everything,
                including your Gemini key.
              </li>
            </ul>
            <p>We hold no copy on any server, so there is nothing else to delete. Questions? Email {SUPPORT_EMAIL}.</p>
          </section>

          <section id="children" className="policy__card">
            <h2>Children</h2>
            <p>
              The app is meant for students preparing for NEET, generally aged 16 and over. It is not directed at children under
              13, and we do not knowingly collect personal information from them.
            </p>
          </section>

          <section id="contact" className="policy__card">
            <h2>Changes and contact</h2>
            <p>
              If this policy changes, the updated version will be posted at this same address with a new effective date.
            </p>
            <div className="policy__contact">
              <div>
                <span className="muted small">Support email</span>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </div>
              <div>
                <span className="muted small">Developer</span>
                <span>{site.developer.name} · Visualter, {site.developer.location}</span>
              </div>
              <div>
                <span className="muted small">Disclaimer</span>
                <span>Prepvyu is not affiliated with the National Testing Agency (NTA) or any government body.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
