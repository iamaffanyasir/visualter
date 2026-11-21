import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Visualter, visualter.com and our apps collect, use and protect your information.',
};

const toc = [
  ['glance', 'At a glance'],
  ['collect', 'What we collect'],
  ['use', 'How we use it'],
  ['share', 'Who we share it with'],
  ['keep', 'How long we keep it'],
  ['rights', 'Your choices'],
  ['security', 'Security'],
  ['apps', 'Our apps and software'],
  ['taqwa', 'Taqwa (Android app)'],
  ['contact', 'Changes and contact'],
];

export default function PrivacyPolicyPage() {
  const d = site.developer;
  return (
    <div className="policy">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1 className="display">Privacy Policy.</h1>
          <p className="lede">Your information stays yours. Here is exactly what we collect, why, and the choices you have.</p>
          <p className="muted small mt-m">Last updated 21 November 2026</p>
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
                <strong>We never sell your data</strong>
                <span>Not to advertisers, not to anyone.</span>
              </div>
              <div>
                <strong>No ads or third party trackers</strong>
                <span>Our visit statistics are our own and anonymous.</span>
              </div>
              <div>
                <strong>Payments stay with Razorpay</strong>
                <span>We never see or store your card or UPI details.</span>
              </div>
              <div>
                <strong>You are in control</strong>
                <span>Ask us any time to see, correct or delete your data.</span>
              </div>
            </div>
          </section>

          <section id="collect" className="policy__card">
            <h2>What we collect</h2>
            <p>
              This policy covers visualter.com and the store, accounts and downloads on it, run by {d.name} as Visualter,
              {` ${d.location}`}. We collect only what we need to run the site and deliver what you buy.
            </p>
            <h3>Your account</h3>
            <p>
              When you create an account we keep your name, email address and phone number. Your password is handled by our
              sign in provider and stored only in protected, hashed form. We can never see it.
            </p>
            <h3>Orders and invoices</h3>
            <p>
              For each purchase we keep the product, price, order status, date, and the payment reference Razorpay gives us.
              Invoices are generated from this information whenever you open them. No invoice files are stored.
            </p>
            <h3>Payments</h3>
            <p>
              Payments are processed by Razorpay. You enter your card, UPI or bank details on Razorpay, not on our site. We
              receive only whether the payment succeeded and its reference number.
            </p>
            <h3>Messages and enquiries</h3>
            <p>When you use the contact form or ask about a product, we keep your name, email, phone (if given) and message so we can reply.</p>
            <h3>Visit statistics</h3>
            <p>To understand which pages, apps and links are useful, we record:</p>
            <ul>
              <li>the pages you view, the apps you download and the outside links you open, such as Google Play;</li>
              <li>the website that sent you here, your device type (mobile, tablet or desktop) and your country;</li>
              <li>
                an anonymous random identifier kept in your browser&apos;s local storage, so one device counts as one visitor.
                It is not a cookie and contains nothing about you.
              </li>
            </ul>
            <p>
              We do not store your IP address for statistics, we do not use advertising or analytics companies, and page view
              statistics are skipped when your browser sends a Do Not Track signal.
            </p>
            <h3>Cookies</h3>
            <p>We use only essential cookies that keep you signed in. There are no advertising or tracking cookies.</p>
          </section>

          <section id="use" className="policy__card">
            <h2>How we use it</h2>
            <ul>
              <li>To create your account, deliver your purchases and let you download them again at any time.</li>
              <li>To produce invoices and keep the records the law requires for sales.</li>
              <li>To reply to your messages and give support.</li>
              <li>To understand, in aggregate, how the site is used and make it better.</li>
              <li>To keep the site secure and prevent fraud and misuse.</li>
            </ul>
            <p>We do not use your information for advertising, and we do not make automated decisions about you.</p>
          </section>

          <section id="share" className="policy__card">
            <h2>Who we share it with</h2>
            <p>We never sell or rent your information. It is processed only by the services that run the site for us:</p>
            <div className="policy__providers">
              <div>
                <strong>Supabase</strong>
                <span>Accounts, sign in and our database</span>
              </div>
              <div>
                <strong>Razorpay</strong>
                <span>Payments</span>
              </div>
              <div>
                <strong>Vercel</strong>
                <span>Website hosting</span>
              </div>
              <div>
                <strong>GitHub</strong>
                <span>Secure storage of app files, delivered through short lived download links</span>
              </div>
            </div>
            <p>
              Each provider handles data under its own privacy policy and only to provide its service to us. We may also
              disclose information if the law requires it.
            </p>
          </section>

          <section id="keep" className="policy__card">
            <h2>How long we keep it</h2>
            <ul>
              <li>Account details: for as long as your account exists.</li>
              <li>Orders and invoices: as long as needed for your downloads and for tax and accounting records.</li>
              <li>Messages: until they are resolved, and then only as long as reasonably needed.</li>
              <li>Visit statistics: kept in anonymous form and used only as totals.</li>
            </ul>
          </section>

          <section id="rights" className="policy__card">
            <h2>Your choices</h2>
            <ul>
              <li>See and update your name and phone number any time in your account.</li>
              <li>Ask us for a copy of the information we hold about you, or ask us to correct it.</li>
              <li>
                Ask us to delete your account. We will remove your personal details, keeping only the order records the law
                requires us to keep.
              </li>
              <li>Turn on Do Not Track in your browser, or clear its site data, to stop or reset visit statistics.</li>
            </ul>
            <p>
              To make a request, email <a href={`mailto:${d.email}`}>{d.email}</a> from the address on your account. We reply
              within 30 days, usually much sooner.
            </p>
          </section>

          <section id="security" className="policy__card">
            <h2>Security</h2>
            <p>
              The site runs only over encrypted HTTPS. Database access rules ensure customers can see only their own orders,
              and messages and statistics are visible only to us. Download links expire within minutes. No system is perfectly
              secure, but we work hard to protect your information and will tell you promptly if something goes wrong.
            </p>
            <p>Accounts are intended for people aged 13 and over.</p>
          </section>

          <section id="apps" className="policy__card">
            <h2>Our apps and software</h2>
            <p>
              Our Android apps and Windows programs are built to work on your device. Unless an app&apos;s own policy below
              says otherwise, they contain no advertising or analytics SDKs, and what you create in them stays on your device
              or on computers you control.
            </p>
          </section>

          <section className="policy__card privacy__section" id="taqwa">
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

          <section id="contact" className="policy__card">
            <h2>Changes and contact</h2>
            <p>
              If this policy changes, the new version will appear on this page with a new date. For important changes we will
              also let account holders know by email.
            </p>
            <div className="policy__contact">
              <div>
                <span className="muted small">Email</span>
                <a href={`mailto:${d.email}`}>{d.email}</a>
              </div>
              <div>
                <span className="muted small">Phone</span>
                <a href={d.phoneHref}>{d.phone}</a>
              </div>
              <div>
                <span className="muted small">Address</span>
                <span>Visualter, {d.location}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
