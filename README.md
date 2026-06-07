# Kannada Tutor Website

This is the official website for Suresh Hanje, a Kannada tutor offering online Kannada classes for school students, PUC, degree, spoken Kannada, and competitive exam preparation.

The site is built with Next.js App Router, Tailwind CSS, and `next-intl` for English and Kannada content.

## What’s Included

- Home page with strong service positioning
- Courses page for school, PUC, degree, and spoken Kannada learners
- Reviews/testimonials section
- Demo booking page with Google Form embed and WhatsApp fallback
- FAQ, contact, about, and resources pages
- Localized English and Kannada content
- SEO metadata, sitemap, robots rules, and structured data

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Important Files

- [src/app/[locale]/layout.tsx](src/app/%5Blocale%5D/layout.tsx) controls metadata, language handling, and structured data.
- [src/app/[locale]/page.tsx](src/app/%5Blocale%5D/page.tsx) is the homepage.
- [src/app/[locale]/demo/page.tsx](src/app/%5Blocale%5D/demo/page.tsx) contains the demo booking experience.
- [src/lib/constants.ts](src/lib/constants.ts) contains site links, description, and stats.
- [messages/en.json](messages/en.json) and [messages/kn.json](messages/kn.json) contain all copy.

## SEO Checklist

Use this checklist after deployment to help Google discover and understand the site.

### Indexing Setup

1. Add the live domain to Google Search Console.
2. Submit the sitemap at `/sitemap.xml`.
3. Verify the robots file allows crawling.
4. Request indexing for the homepage and demo page.

### Keyword Targeting

Focus page copy on these phrases where they naturally fit:

- Best Kannada Tutor
- Online Kannada Teacher
- Kannada Tuition
- Kannada Classes Online
- Spoken Kannada Classes
- Kannada Tutor in Karnataka

### Content Signals

- Keep the homepage title and description aligned with the target keywords.
- Keep the demo page visible and indexable with real text, not only an iframe.
- Add more helpful content over time, such as lessons, FAQs, and student success stories.

### Trust Signals

- Keep your phone number, email, and WhatsApp link visible.
- Add testimonials and student results.
- Use the same business name consistently across the site and social profiles.

### Off-Page SEO

- Link the site from your YouTube channel, Instagram bio, Facebook page, and local business listings.
- Collect backlinks from directories, education listings, and partner pages.
- Share the site URL in WhatsApp groups and community pages where appropriate.

### Technical SEO

- Keep the site on the final custom domain, not a preview URL.
- Make sure every important page has a unique title and description.
- Keep the sitemap updated when new pages are added.
- Run the production build after each SEO change.

## Search Ranking Note

This site is optimized for search, but no developer can promise first position on Google. Ranking depends on competition, content quality, backlinks, freshness, and how well Google indexes the site.

## Deployment

The project is already suitable for Vercel deployment.

Recommended post-deploy steps:

1. Set the final custom domain in Vercel.
2. Resubmit the sitemap in Search Console.
3. Inspect `/demo` and the homepage with Google’s URL Inspection tool.
4. Update social links and business profiles to point to the same domain.

## Contact

- Website: Suresh Hanje - Kannada Tutor
- WhatsApp: configured in [src/lib/constants.ts](src/lib/constants.ts)
- Email: configured in [src/lib/constants.ts](src/lib/constants.ts)

## Notes for Future Changes

- Keep the English and Kannada translations in sync.
- When adding pages, update the sitemap route list.
- If you change the booking flow, keep the demo page fast and mobile-friendly.
