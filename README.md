# 🎓 Suresh Hanje — Online Kannada Tutor & Tuition Platform

Official web platform for **Suresh Hanje**, master Kannada educator with 15+ years of experience providing personalized online Kannada tuition for CBSE, ICSE, State Board, 1st & 2nd PUC, non-Kannadigas spoken Kannada, and Karnataka competitive exams (KAS, FDA, SDA).

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **next-intl** for complete bilingual localization (English & Kannada).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v20.x` or later (LTS recommended)
- **npm**: `v10.x` or later (or `pnpm` / `yarn`)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sureshhanje/sureshhanje-main-website.git
   cd sureshhanje-main-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Mobile / LAN Testing:**
   To test on mobile devices connected to the same Wi-Fi network:
   ```bash
   npm run dev:mobile
   ```
   *(This prints your local IP address and serves Next.js on port 3000).*

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local dev server bound securely to `localhost:3000` |
| `npm run dev:mobile` | Shows local network IP and starts server bound to `0.0.0.0` for phone testing |
| `npm run build` | Compiles an optimized production build using Turbopack |
| `npm run start` | Launches production server on port 3000 |
| `npm run lint` | Runs ESLint 9 checks across all TypeScript and React files |
| `npm audit` | Verifies security of all dependency packages |

---

## 🏗️ Project Architecture

```text
kannada-tutor/
├── messages/                     # Bilingual translation catalogs
│   ├── en.json                   # English strings & copy
│   └── kn.json                   # Kannada strings & copy
├── public/                       # Static public assets
│   ├── images/                   # OpenGraph and social share preview images
│   ├── icon.svg                  # SVG favicon with Kannada glyph
│   ├── favicon.ico               # Multi-resolution favicon
│   └── photo.jpeg                # High-res profile photograph
├── scripts/                      # Utility scripts
│   └── print-network-url.js      # LAN IP detector for mobile testing
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Localized routes (en & kn)
│   │   │   ├── about/            # Teacher bio, experience, timeline
│   │   │   ├── courses/          # Course catalog & board filter
│   │   │   ├── demo/             # Free 30-min demo booking page
│   │   │   ├── faq/              # Interactive FAQ & accordion
│   │   │   ├── games/            # Educational Kannada vocab & grammar games
│   │   │   ├── reviews/          # Verified student testimonials & ratings
│   │   │   ├── layout.tsx        # Locale root layout with Schema.org & fonts
│   │   │   └── page.tsx          # Homepage with Hero, stats, & CTAs
│   │   ├── not-found.tsx         # 404 handler
│   │   ├── robots.ts             # Search engine crawler instructions
│   │   └── sitemap.ts            # Dynamic bilingual XML sitemap generator
│   ├── components/               # Reusable React components
│   │   ├── animations/           # Framer Motion entrance effects
│   │   ├── layout/               # Navbar, MobileNav, Footer, FloatingWidgets
│   │   ├── shared/               # GlassCard, SectionHeader, AnimatedCounter
│   │   └── theme-provider.tsx    # Light / Dark mode management
│   ├── data/                     # Structured application data
│   │   ├── courses.ts            # Course listings by syllabus
│   │   ├── faqs.ts               # Frequently asked questions list
│   │   └── reviews.ts            # Verified parent & student reviews
│   ├── i18n/                     # Internationalization configuration
│   │   ├── routing.ts            # Supported locales & routing strategy
│   │   └── request.ts            # Server-side message loader & Asia/Kolkata timezone
│   ├── lib/                      # Utilities & constants
│   │   ├── constants.ts          # Contact details, links, metadata config
│   │   └── utils.ts              # Class merging (cn) & safeJsonLd sanitizer
│   └── middleware.ts             # Locale routing middleware
├── next.config.ts                # Next.js config with comprehensive Security Headers
├── package.json                  # Dependencies & scripts
└── vercel.json                   # Vercel deployment specifications
```

---

## 🔒 Security & Hardening Features

This repository implements enterprise-grade web application security:

1. **Zero Known Vulnerabilities**: Regularly audited with `npm audit` (`next@^16.4.3+`, patched against RCE and DoS CVEs).
2. **HTTP Defensive Headers**: Configured in [`next.config.ts`](next.config.ts):
   - **`X-Frame-Options: SAMEORIGIN`**: Eliminates Clickjacking vulnerabilities.
   - **`X-Content-Type-Options: nosniff`**: Prevents MIME-confusion attacks.
   - **`Referrer-Policy: strict-origin-when-cross-origin`**: Stops query parameter leakage to external links.
   - **`Permissions-Policy`**: Restricts browser camera, mic, and geolocation sensors.
   - **`Strict-Transport-Security` (HSTS)**: Forces encrypted HTTPS connections.
   - **`Content-Security-Policy` (CSP)**: Whitelists approved script, style, frame, and font sources.
   - **`poweredByHeader: false`**: Hides server technology fingerprint.
3. **XSS-Resistant Schema.org Serialization**: Custom `safeJsonLd()` utility escapes HTML closing tags (`\u003c/script\u003e`) within structured data.
4. **Third-Party Iframe Sandboxing**: Google Form embeds in [`src/app/[locale]/demo/page.tsx`](src/app/%5Blocale%5D/demo/page.tsx) use explicit `sandbox` restrictions and lazy loading.
5. **Input Validation**: Client-side form submissions enforce maximum character constraints and value limits.

---

## 🌐 Localization (English & Kannada)

The website uses `next-intl` with subpath routing:
- **English (Default)**: `https://sureshhanje.com/` (or `/en/...`)
- **Kannada**: `https://sureshhanje.com/kn/...`

### How to update translations
1. Edit copy in [`messages/en.json`](messages/en.json) for English.
2. Edit matching keys in [`messages/kn.json`](messages/kn.json) for Kannada.
3. Keep both JSON files synchronized with identical key hierarchies.

---

## 🔍 SEO & Webmaster Guide

### 1. Verification & Search Console
1. Add the domain `https://sureshhanje.com` to [Google Search Console](https://search.google.com/search-console).
2. Submit the sitemap index:
   ```text
   https://sureshhanje.com/sitemap.xml
   ```
3. Test crawling access via `https://sureshhanje.com/robots.txt`.

### 2. Social Sharing & OpenGraph Previews
- OpenGraph image preview is located at:
  ```text
  https://sureshhanje.com/images/og-image.jpg
  ```
- Validate metadata cards with:
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Structured Data Testing
Validate rich snippets with [Google Rich Results Test](https://search.google.com/test/rich-results) for:
- `EducationalOrganization`
- `FAQPage`
- `Review` & `AggregateRating`

---

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. Push your changes to the `main` branch on GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository into your **Vercel Dashboard**.
3. Vercel automatically detects Next.js settings from `vercel.json` and runs:
   ```bash
   npm run build
   ```
4. Assign your custom production domain (`sureshhanje.com`) under **Settings → Domains**.

### Self-Hosting (Node.js / VPS / Docker)

1. Build the production application:
   ```bash
   npm run build
   ```
2. Start the standalone server:
   ```bash
   npm run start
   ```
3. Use a reverse proxy like **Nginx** or **Caddy** with SSL/TLS (Let's Encrypt) forwarding traffic to port `3000`.

---

## 📞 Tutor Contact Configuration

All site-wide contact links are centrally managed in [`src/lib/constants.ts`](src/lib/constants.ts):

```typescript
export const siteConfig = {
  name: 'Suresh Hanje - Kannada Tutor',
  url: 'https://sureshhanje.com',
  links: {
    whatsapp: 'https://wa.me/919686068162',
    email: 'mailto:sureshhanje96@gmail.com',
    phone: 'tel:+919686068162',
  },
  stats: {
    experience: 15,
    students: 500,
    classes: 1000,
    rating: 5.0,
  },
};
```

---

## 📄 License
Private repository © Suresh Hanje. All rights reserved.
