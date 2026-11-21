export type Category = 'apps' | 'software' | 'hardware';

export type Shot = { src: string; landscape?: boolean };

export type Action =
  | { type: 'buy'; price: number }
  | { type: 'download'; href: string; size: string }
  | { type: 'play'; href: string }
  | { type: 'soon' }
  | { type: 'enquire' }
  | { type: 'subscribe'; href: string }
  | { type: 'bundled'; with: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  platform: string;
  tagline: string;
  summary: string;
  intro: string;
  features: { title: string; text: string }[];
  action: Action;
  version?: string;
  live?: { href: string; label: string };
  /** Extra link shown next to the main button, for example an enquiry about an offline edition. */
  secondary?: { href: string; label: string };
  logo: string;
  logoDark?: boolean;
  shots: Shot[];
  accent: string;
  /** Products shown again under another category, for example the OrbitX companion under Software. */
  alsoIn?: Category;
};

export type ProductFile = { label: string; path: string };

const s = (slug: string, n: number, landscape = false): Shot[] =>
  Array.from({ length: n }, (_, i) => ({ src: `/shots/${slug}/${i + 1}.webp`, landscape }));

/**
 * Files delivered to buyers of paid products. Paths are inside the private Supabase Storage
 * bucket (SUPABASE_APPS_BUCKET, default "apps"). Upload them with `npm run upload:apps`.
 */
export const productFiles: Record<string, ProductFile[]> = {
  museflow: [{ label: 'Android app (APK)', path: 'museflow/MuseFlow.apk' }],
  orbitx: [
    { label: 'Android app (APK)', path: 'orbitx/OrbitX.apk' },
    { label: 'Windows companion (installer)', path: 'orbitx/OrbitXSetup.exe' },
  ],
  rideos: [{ label: 'Android app (APK)', path: 'rideos/RideOS.apk' }],
  inkio: [{ label: 'Android app (APK)', path: 'inkio/Inkio.apk' }],
  prepvyu: [{ label: 'Android app (APK)', path: 'prepvyu/PrepvyuNEET.apk' }],
  nexora: [{ label: 'Windows installer', path: 'nexora/NexoraSetup.exe' }],
  visivault: [{ label: 'Windows installer', path: 'visivault/VisiVaultSetup.exe' }],
  verstack: [{ label: 'Windows installer', path: 'verstack/VerstackSetup.exe' }],
};

export const products: Product[] = [
  {
    slug: 'taqwa',
    name: 'Taqwa',
    category: 'apps',
    platform: 'Android',
    tagline: 'Prayer times and Quran, beautifully calm.',
    summary: 'An offline Islamic companion with accurate prayer times, adhan alarms, Qibla and home screen widgets.',
    intro:
      'Taqwa keeps your day in rhythm. Precise prayer times for your location, a gentle adhan right on time, the full Quran with recitation, and widgets that put the next prayer on your home screen. Everything stays on your device.',
    features: [
      { title: 'Prayer times that are right', text: 'Calculated on device for your city or coordinates, with alarms that arrive exactly on time.' },
      { title: 'The Quran, read and heard', text: 'A clean reader with bookmarks, notes, Khatm plans, hifz progress and streamed recitation.' },
      { title: 'Widgets and live countdown', text: 'A gallery of home screen widgets and a live countdown to the next prayer.' },
      { title: 'Private by design', text: 'No account, no analytics, no ads. Your records never leave your phone.' },
    ],
    action: { type: 'play', href: 'https://play.google.com/store/apps/details?id=com.taqwa.companion' },
    version: '1.1.0',
    logo: '/logos/taqwa.webp',
    shots: s('taqwa', 6),
    accent: '#b8893b',
  },
  {
    slug: 'museflow',
    name: 'Muse Flow',
    category: 'apps',
    platform: 'Android',
    tagline: 'Your music. Everywhere it lives.',
    summary: 'A beautiful music player that also searches, streams and downloads any song, in the format you choose.',
    intro:
      'Muse Flow brings your own library and the whole world of music into one quiet, gorgeous player. Search any song, stream it instantly, build playlists, and download in MP3, M4A or Opus with cover art already in place.',
    features: [
      { title: 'Search and stream', text: 'Fast search with real titles, artists and square covers. Songs play instantly, the next one is ready before you need it.' },
      { title: 'Downloads your way', text: 'Pick MP3, M4A or Opus once. Every download follows it, with title, artist, album and artwork embedded.' },
      { title: 'Paste any link', text: 'Share a link from YouTube, SoundCloud, Bandcamp and many more straight into the app.' },
      { title: 'Eight Now Playing styles', text: 'Equalizer, AMOLED mode, artwork coloured animations and themes you will actually want to look at.' },
    ],
    action: { type: 'buy', price: 99 },
    version: '1.1',
    logo: '/logos/museflow.webp',
    shots: s('museflow', 3),
    accent: '#fa2d48',
  },
  {
    slug: 'orbitx',
    name: 'OrbitX',
    category: 'apps',
    alsoIn: 'software',
    platform: 'Android and Windows',
    tagline: 'Your old phone, now a deck for your PC.',
    summary: 'Turn any Android phone into a wireless control deck, live PC monitor and desk clock. The Windows companion is included.',
    intro:
      'OrbitX turns a spare phone or tablet into a touch control surface for your Windows PC. Launch apps, fire shortcuts, control media and watch live system stats, all over your own WiFi. No cloud, no account.',
    features: [
      { title: 'A real control deck', text: 'Buttons, toggles and macros for apps, keys, volume, OBS and flight simulators. Edit everything on the phone.' },
      { title: 'Live PC dashboard', text: 'CPU, GPU, RAM, network, every drive and the app in focus, with animated gauges.' },
      { title: 'Desk clock in many styles', text: 'Flip, HUD, Neon, Analog, Matrix and more. Tap to switch.' },
      { title: 'Companion for Windows', text: 'A tray app that owns every action and checks each one against an allowlist. Bundled free with the app.' },
    ],
    action: { type: 'buy', price: 79 },
    version: '1.0.1',
    logo: '/logos/orbitx.webp',
    logoDark: true,
    shots: s('orbitx', 3, true),
    accent: '#3d7bff',
  },
  {
    slug: 'nexdate',
    name: 'Nexdate',
    category: 'apps',
    platform: 'Android',
    tagline: 'Snap it. Forget it.',
    summary: 'A private document wallet that reads expiry dates for you and reminds you well before anything runs out.',
    intro:
      'Scan your licence, insurance, passport, PUC or warranty. Nexdate reads the document on your phone, finds the expiry date and quietly reminds you in time. Your documents stay locked behind your fingerprint.',
    features: [
      { title: 'Reads documents on device', text: 'Text recognition, card detection and face detection run entirely on your phone.' },
      { title: 'Built for Indian documents', text: 'Understands the layouts of common Indian IDs and certificates.' },
      { title: 'Reminders that matter', text: 'Gentle alerts weeks before a renewal is due, never after.' },
      { title: 'Locked and private', text: 'Biometric lock and no cloud. Nothing is uploaded anywhere.' },
    ],
    action: { type: 'soon' },
    logo: '/logos/nexdate.webp',
    shots: s('nexdate', 1),
    accent: '#18b47b',
  },
  {
    slug: 'rideos',
    name: 'RideOS',
    category: 'apps',
    platform: 'Android',
    tagline: 'A dashboard for your bike.',
    summary: 'A CarPlay inspired home screen for a phone mounted on your motorcycle, with navigation, music, calls and trip data.',
    intro:
      'RideOS turns a spare Android phone into a proper motorcycle dashboard. It boots straight into a dark, glanceable home with speed, navigation, music and calls, and locks itself full screen so nothing gets in the way of the ride.',
    features: [
      { title: 'Glanceable home', text: 'Clock, GPS speed, battery and weather in large tiles you can read at a glance.' },
      { title: 'Navigate', text: 'Built in turn by turn routing with voice guidance and saved trips.' },
      { title: 'Music and calls', text: 'Control whatever is playing and answer calls through your helmet headset.' },
      { title: 'Kiosk mode', text: 'Starts on boot and stays full screen, no setup or factory reset needed.' },
    ],
    action: { type: 'buy', price: 499 },
    logo: '/logos/rideos.webp',
    logoDark: true,
    shots: s('rideos', 5, true),
    accent: '#2f8cff',
  },
  {
    slug: 'weatherly',
    name: 'Weatherly',
    category: 'apps',
    platform: 'Android',
    tagline: 'Weather you can poke.',
    summary: 'A playful, cartoonish weather app with living scenes and a set of lovely home screen widgets.',
    intro:
      'Weatherly makes checking the weather something you look forward to. Choose a cartoon, clean or glass style, pick a palette, and add widgets that flip between now, later and tomorrow. No account, no API key, no clutter.',
    features: [
      { title: 'Living scenes', text: 'Skies, clouds, rain and moon phases drawn live, in three distinct styles.' },
      { title: 'Widgets for every home screen', text: 'Compact, Classic, Forecast and Clock widgets that update on their own.' },
      { title: 'Palettes and themes', text: 'Pop, Mono, Ocean, Sunset, Forest and Lavender, in light, dark or AMOLED.' },
      { title: 'Honest data', text: 'Forecasts and air quality from Open Meteo.' },
    ],
    action: { type: 'download', href: '/downloads/weatherly.apk', size: '2.3 MB' },
    version: '1.0',
    logo: '/logos/weatherly.webp',
    shots: [],
    accent: '#f5b82e',
  },
  {
    slug: 'wowhealth',
    name: 'Wow Health Labs',
    category: 'apps',
    platform: 'Android',
    tagline: 'Health tests, made simpler.',
    summary: 'Book diagnostic tests and health packages with free sample collection at home, in a few taps.',
    intro:
      'The Wow Health Labs app lets patients browse tests and packages, see exactly what is included, and book a home collection in a few taps. Bookings arrive on WhatsApp already written out.',
    features: [
      { title: 'Tests and packages', text: 'Clear pricing, parameters and report times for every test.' },
      { title: 'Home collection', text: 'A phlebotomist comes to you with a sealed, single use kit.' },
      { title: 'Upload a prescription', text: 'Send a photo and the lab adds the right tests for you.' },
      { title: 'Cart and checkout', text: 'Add several tests, review and confirm in seconds.' },
    ],
    action: { type: 'download', href: '/downloads/wowhealth.apk', size: '5.6 MB' },
    version: '1.1',
    live: { href: 'https://wowhealth.co.in', label: 'wowhealth.co.in' },
    logo: '/logos/wowhealthapp.webp',
    shots: s('wowhealthapp', 5),
    accent: '#e8344e',
  },
  {
    slug: 'calvio',
    name: 'Calvio',
    category: 'apps',
    platform: 'Android',
    tagline: 'Mindful eating, made for Indian plates.',
    summary: 'Type what you ate in plain words. Calvio counts it, tracks what you burn and keeps you gently on goal.',
    intro:
      'Calvio understands roti, dal and chai. Type "2 roti and dal" and it works out the calories for you, syncs what you burn from Health Connect, and shows your day, your month and a little push when you need it.',
    features: [
      { title: 'Log in plain words', text: 'A food database built around Indian meals, portions and snacks.' },
      { title: 'Burned calories, live', text: 'Syncs activity from Health Connect and Google Fit.' },
      { title: 'BMI and a goal that fits', text: 'Lose, gain or stay fit with a daily target worked out for you.' },
      { title: 'Calendar and motivation', text: 'See every day at a glance, plus a fresh thought each morning.' },
    ],
    action: { type: 'download', href: '/downloads/calvio.apk', size: '4.3 MB' },
    version: '1.0',
    logo: '/logos/calvio.webp',
    shots: s('calvio', 5),
    accent: '#e8344e',
  },
  {
    slug: 'inkio',
    name: 'Inkio',
    category: 'apps',
    platform: 'Android',
    tagline: 'Your paper like reading room.',
    summary: 'A calm PDF library and reader, tuned for E Ink and AMOLED screens, with progress, recaps and reminders.',
    intro:
      'Inkio gathers the PDFs on your phone into a quiet library and opens them on a page that feels like paper. Pick E Ink grey or true black, pick up exactly where you left off, and get a short recap before you dive back in.',
    features: [
      { title: 'A real library', text: 'Covers, progress and filters for reading, unread and finished.' },
      { title: 'Made for E Ink', text: 'Grey, calm and glare free, with page turns that suit E Ink panels.' },
      { title: 'Recaps', text: 'A quick summary of where you are so every session starts easy.' },
      { title: 'Reading reminders', text: 'A gentle nudge at the time you choose.' },
    ],
    action: { type: 'buy', price: 49 },
    version: '1.0',
    logo: '/logos/inkio.webp',
    logoDark: true,
    shots: s('inkio', 3),
    accent: '#c08a3e',
  },
  {
    slug: 'later',
    name: 'Later',
    category: 'apps',
    platform: 'Android',
    tagline: 'Put it down. It will come back.',
    summary: 'A place for things you keep meaning to remember. No dates, no lists, no red badges.',
    intro:
      'Later takes a line of text and nothing else. It puts the thought away and brings it back on its own, gently, until you are done with it. At most one quiet notification a day, and only when something is waiting.',
    features: [
      { title: 'One line, nothing else', text: 'No due dates, no priorities, no folders to manage.' },
      { title: 'It comes back on its own', text: 'Things resurface at a natural pace, and ask less often the longer you wait.' },
      { title: 'Never interrupts', text: 'Silent by design. Never more than one notification a day.' },
      { title: 'Share into Later', text: 'Send text from any app straight into Later, or use the home screen widget.' },
    ],
    action: { type: 'download', href: '/downloads/later.apk', size: '2.3 MB' },
    version: '0.1',
    logo: '/logos/later.webp',
    shots: s('later', 1),
    accent: '#7d9a6f',
  },
  {
    slug: 'prepvyu',
    name: 'Prepvyu NEET',
    category: 'apps',
    platform: 'Android',
    tagline: 'NEET practice that explains itself.',
    summary: 'Fresh NEET questions across the syllabus, instant explanations and analytics that show what to study next.',
    intro:
      'Prepvyu gives NEET aspirants an endless stream of fresh, syllabus mapped questions, with a clear explanation after every answer. Practice papers, timed tests and a profile that shows exactly where you are strong and where you are not.',
    features: [
      { title: 'Always fresh questions', text: 'AI generated questions mapped to the NEET syllabus, never the same paper twice.' },
      { title: 'Explained instantly', text: 'Every answer comes with a clear, step by step explanation.' },
      { title: 'Tests and practice papers', text: 'Timed tests and paper style practice for real exam conditions.' },
      { title: 'Know what to study', text: 'Analytics by subject and chapter, plus daily study reminders.' },
    ],
    action: { type: 'buy', price: 49 },
    version: '1.0.0',
    logo: '/logos/prepvyu.webp',
    logoDark: true,
    shots: s('prepvyu', 6),
    accent: '#e2363c',
  },
  {
    slug: 'labos',
    name: 'LabOS',
    category: 'software',
    platform: 'Web, Android and Windows',
    tagline: 'The operating system for your diagnostic lab.',
    summary: 'Bookings, samples, results, reports and payments in one fast workspace. Subscribe in minutes and run your lab from any device.',
    intro:
      'LabOS is a cloud platform for diagnostic labs. Reception, technicians and owners work in one calm workspace from any phone, tablet or computer, and always know where every sample is. Prefer to keep everything inside your building? LabOS Offline is the same software, installed on one Windows computer in your lab.',
    features: [
      { title: 'Sample Tracker', text: 'Booked, collected, processing, verification, ready, delivered. See every tube at a glance and which ones are late.' },
      { title: 'Reports on WhatsApp', text: 'Verified reports go to patients and doctors in one tap.' },
      { title: 'Money and growth', text: 'Payments, referring doctors, patient leads, analytics and AI business insights.' },
      { title: 'Cloud or offline', text: 'Subscribe to LabOS Cloud, or ask for LabOS Offline to run entirely on your lab network.' },
    ],
    action: { type: 'subscribe', href: 'https://labos.visualter.in' },
    live: { href: 'https://labos.visualter.in', label: 'labos.visualter.in' },
    secondary: { href: '/contact?about=labos', label: 'Ask about LabOS Offline' },
    logo: '/logos/labos.webp',
    logoDark: true,
    shots: s('labos', 3, true),
    accent: '#2f6bff',
  },
  {
    slug: 'nexora',
    name: 'Nexora',
    category: 'software',
    platform: 'Windows',
    tagline: 'Your own private cloud.',
    summary: 'Turn your PC into a personal file and media cloud you can reach from your phone, anywhere, privately.',
    intro:
      'Nexora runs quietly in your tray and turns your computer into a personal NAS. Browse, stream and share your files and media from your phone over your private Tailscale network. Never exposed to the open internet, no subscription, no storage limits.',
    features: [
      { title: 'Browse everything', text: 'Upload, download, rename, move and zip, across every drive.' },
      { title: 'Stream your media', text: 'Photos, video, audio and PDFs open right in the browser.' },
      { title: 'Fast search', text: 'A background index keeps every file instantly searchable.' },
      { title: 'Private network only', text: 'Reachable only from your own devices on Tailscale.' },
    ],
    action: { type: 'buy', price: 299 },
    version: '0.1.0',
    logo: '/logos/nexora.webp',
    logoDark: true,
    shots: [],
    accent: '#2f6bff',
  },
  {
    slug: 'visivault',
    name: 'VisiVault',
    category: 'software',
    platform: 'Windows',
    tagline: 'Your passwords. Only yours.',
    summary: 'A fully offline password manager with AES 256 encryption, secure notes and a liquid glass interface.',
    intro:
      'VisiVault keeps every password and secure note encrypted on your computer and nowhere else. No server, no cloud, no sync to trust. One master password unlocks it, and not even we can reset it.',
    features: [
      { title: 'AES 256 encryption', text: 'Industry standard encryption for every entry and note.' },
      { title: 'Completely offline', text: 'No server, no cloud, no data collection. Ever.' },
      { title: 'Vault and notes', text: 'Passwords and secure notes side by side, searchable in an instant.' },
      { title: 'Liquid glass design', text: 'A calm, Apple inspired interface that is a pleasure to open.' },
    ],
    action: { type: 'buy', price: 499 },
    version: '1.0.0',
    logo: '/logos/visivault.webp',
    shots: [],
    accent: '#5aa7e8',
  },
  {
    slug: 'verstack',
    name: 'Verstack',
    category: 'software',
    platform: 'Windows',
    tagline: 'Every project. Every version. Found.',
    summary: 'Point it at a drive and it finds, recognises and organises every project on your machine, versions and all.',
    intro:
      'Verstack scans your drives and recognises more than 40 kinds of projects, from React and Android to Unity and Rust. It lines up every version of the same project, shows its details and builds, and lets you preview, rename and organise them in one place.',
    features: [
      { title: 'A library of your work', text: 'Grid or list, grouped by category, with tags, notes, favourites and instant search.' },
      { title: 'Versions, grouped', text: 'shop, shop v2 and shop final are recognised as one project, automatically.' },
      { title: 'Apps and installers', text: 'Every APK, AAB and installer your projects have built, with real icons.' },
      { title: 'Live previews', text: 'Preview built sites, screenshots and app icons without opening a single folder.' },
    ],
    action: { type: 'buy', price: 999 },
    version: '1.0.0',
    logo: '/logos/verstack.webp',
    shots: [],
    accent: '#ff4f7b',
  },
  {
    slug: 'airsense',
    name: 'AirSense',
    category: 'hardware',
    platform: 'ESP32 and Web',
    tagline: 'Making air quality easy to understand.',
    summary:
      'An intelligent air monitor that continuously reads the air around you and turns sensor data into simple, colour coded insights.',
    intro:
      'AirSense brings environmental awareness to your fingertips. It continuously monitors the air around you and translates sensor readings into simple, meaningful insights. A glowing cube shows the air quality at a glance, and a connected web dashboard shows live readings and how the air has changed over time.',
    features: [
      {
        title: 'Air quality at a glance',
        text: 'The cube glows green, yellow, orange, red or purple, from Good to Hazardous, so anyone in the room knows instantly.',
      },
      {
        title: 'Live web dashboard',
        text: 'See live sensor information, intuitive colour coded indicators and historical readings to spot changes over time.',
      },
      {
        title: 'Your choice of standard',
        text: 'Switch between India (CPCB), Europe (EEA) and United States (EPA) air quality standards, or set your own custom ranges.',
      },
      {
        title: 'Built for real spaces',
        text: 'A compact 62 mm cube with a XIAO ESP32 S3, TPM 300E air quality sensor and quiet 25 mm fan. Perfect for homes, offices and labs.',
      },
    ],
    action: { type: 'enquire' },
    live: { href: 'https://airsense-teal.vercel.app', label: 'Open the dashboard' },
    logo: '/logos/airsense.webp',
    shots: s('airsense', 2, true),
    accent: '#22c55e',
  },
  {
    slug: 'zynk',
    name: 'ZYNK Deck',
    category: 'hardware',
    platform: 'ESP32 and Windows',
    tagline: 'A deck you can hold. Built from scratch.',
    summary: 'A 3.5 inch touchscreen control deck built on an ESP32, with a Windows app for pages, actions and themes.',
    intro:
      'ZYNK is a hardware stream deck, designed and built end to end. An ESP32 drives a 3.5 inch touchscreen, and a companion app on your PC owns the pages, artwork, themes, actions and plugins, sending only the pixels that change.',
    features: [
      { title: 'Instant touch', text: 'The deck highlights a button the moment you touch it, before the PC even replies.' },
      { title: 'Tap, hold and swipe', text: 'Every gesture can trigger its own action.' },
      { title: 'USB or wireless', text: 'Connect over USB serial or WiFi.' },
      { title: 'Profiles and plugins', text: 'Pages, themes and plugins managed from the Windows app.' },
    ],
    action: { type: 'enquire' },
    logo: '/logos/zynk.webp',
    shots: [],
    accent: '#111111',
  },
];

export const categories: Record<Category, { title: string; headline: string; text: string }> = {
  apps: { title: 'Apps', headline: 'Apps for Android.', text: 'Thoughtful apps for everyday life, each one designed and built by hand.' },
  software: { title: 'Software', headline: 'Software for Windows.', text: 'Desktop tools that run on your own machine, private and fast.' },
  hardware: { title: 'Hardware', headline: 'Hardware, built from scratch.', text: 'Devices designed end to end, from the circuit to the software.' },
};

export const byCategory = (c: Category) =>
  products.filter((p) => p.category === c || p.alsoIn === c);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productHref = (p: Product) => `/${p.category}/${p.slug}`;

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const actionLabel = (a: Action) => {
  switch (a.type) {
    case 'buy':
      return formatPrice(a.price);
    case 'download':
      return 'Free';
    case 'play':
      return 'Free on Google Play';
    case 'soon':
      return 'Coming soon';
    case 'enquire':
      return 'On request';
    case 'subscribe':
      return 'Monthly subscription';
    case 'bundled':
      return `Included with ${a.with}`;
  }
};

/* ---------- Work: CRMs, websites and designs ---------- */

export type WorkKind = 'crm' | 'website' | 'design';

export type Work = {
  slug: string;
  name: string;
  kind: WorkKind;
  client?: string;
  summary: string;
  url?: string;
  urlLabel?: string;
  logo?: string;
  logoDark?: boolean;
  shots: Shot[];
  tags: string[];
};

export const work: Work[] = [
  {
    slug: 'labos',
    name: 'LabOS Cloud',
    kind: 'crm',
    summary: 'A complete operating system for diagnostic labs. Bookings, sample tracking, results, WhatsApp reports, payments and growth analytics.',
    url: 'https://labos.visualter.in',
    urlLabel: 'labos.visualter.in',
    logo: '/logos/labos.webp',
    logoDark: true,
    shots: s('labos', 3, true),
    tags: ['CRM', 'Healthcare', 'SaaS'],
  },
  {
    slug: 'cmanager',
    name: 'CManager',
    kind: 'crm',
    summary: 'A client manager for freelancers and small studios. Clients, employees, projects and payments in one clean dashboard.',
    url: 'https://cmanager.visualter.in',
    urlLabel: 'cmanager.visualter.in',
    logo: '/logos/cmanager.webp',
    shots: s('cmanager', 1, true),
    tags: ['CRM', 'Productivity'],
  },
  {
    slug: 'zarf',
    name: 'Zarf Collectives',
    kind: 'website',
    summary: 'A storefront for handcrafted crochet, from floral bouquets to personalised book covers.',
    url: 'https://zarfcollectives.visualter.in',
    urlLabel: 'zarfcollectives.visualter.in',
    logo: '/logos/zarf.webp',
    shots: s('zarf', 1, true),
    tags: ['Ecommerce', 'Handmade'],
  },
  {
    slug: 'wowhealth',
    name: 'Wow Health Labs',
    kind: 'website',
    summary: 'A diagnostic lab website with a test catalogue, cart and WhatsApp booking, plus native Android and iOS apps.',
    url: 'https://wowhealth.co.in',
    urlLabel: 'wowhealth.co.in',
    logo: '/logos/wowhealth.webp',
    shots: s('wowhealth', 2, true),
    tags: ['Healthcare', 'Booking'],
  },
  {
    slug: 'autochef',
    name: 'Chilly Robotics Kitchen',
    kind: 'website',
    summary: 'The home of AutoChef, robotic kitchens and baristas that serve good food on repeat.',
    url: 'https://theautochef.com',
    urlLabel: 'theautochef.com',
    logo: '/logos/autochef.webp',
    shots: s('autochef', 2, true),
    tags: ['Robotics', 'Corporate'],
  },
  {
    slug: 'aviator',
    name: 'Aviator1903',
    kind: 'website',
    summary: 'Flight simulator experiences and courses that help nervous flyers take back control.',
    url: 'https://aviator1903.com',
    urlLabel: 'aviator1903.com',
    logo: '/logos/aviator.webp',
    shots: s('aviator', 1, true),
    tags: ['Aviation', 'Booking'],
  },
  {
    slug: 'treviyo',
    name: 'Treviyo',
    kind: 'website',
    summary: 'An offline first vacation planner for India, on the web and on Android, sharing one planning engine.',
    logo: '/logos/treviyo.webp',
    shots: [],
    tags: ['Travel', 'Web and Android'],
  },
  {
    slug: 'ittar',
    name: 'IttarwOasis',
    kind: 'website',
    summary: 'A luxury storefront for authentic ittars and alcohol free perfumes.',
    url: 'https://ittarwoasis.com',
    urlLabel: 'ittarwoasis.com',
    logo: '/logos/ittar.webp',
    logoDark: true,
    shots: s('ittar', 1, true),
    tags: ['Ecommerce', 'Luxury'],
  },
  {
    slug: 'autospark',
    name: 'AutoSpark',
    kind: 'website',
    summary: 'A touchscreen kiosk interface for a smart soda dispenser. Choose a flavour, set the intensity, tap to pour.',
    logo: '/logos/autochef.webp',
    shots: s('autospark', 2, true),
    tags: ['Kiosk', 'Robotics'],
  },
  {
    slug: 'rhic',
    name: 'RHIC Oman',
    kind: 'website',
    summary: 'The official site of the Royal Hospital International Congress in Muscat, with programme, registration and abstracts.',
    url: 'https://rhicoman.com',
    urlLabel: 'rhicoman.com',
    logo: '/logos/rhic.webp',
    shots: s('rhic', 1, true),
    tags: ['Healthcare', 'Events'],
  },
  {
    slug: 'marvelmind',
    name: 'MarvelMind Technology',
    kind: 'website',
    summary: 'A corporate website for a software company building cutting edge solutions.',
    url: 'https://marvelmindtechnology.com',
    urlLabel: 'marvelmindtechnology.com',
    logo: '/logos/marvelmind.webp',
    logoDark: true,
    shots: s('marvelmind', 1, true),
    tags: ['Corporate', 'Software'],
  },
  {
    slug: 'visitindia',
    name: 'Visit India Global',
    kind: 'website',
    summary: 'A travel website showcasing journeys across India, from Manali to Rohtang Pass.',
    url: 'https://www.visitindiaglobal.com',
    urlLabel: 'visitindiaglobal.com',
    logo: '/logos/visitindia.webp',
    shots: s('visitindia', 1, true),
    tags: ['Travel', 'Tourism'],
  },
];

export const workKinds: Record<WorkKind, string> = {
  crm: 'CRMs',
  website: 'Websites',
  design: '3D Designs',
};
