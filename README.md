# Dear Diaries Initiative 💙

> **Empowering disadvantaged individuals through dignity, inclusion, and financial literacy.**

A full-stack NGO website built for the **Dear Diaries Initiative** — serving women who cannot afford sanitary pads, disabled individuals who are too often overlooked, and anyone who needs practical financial education to build a better life.

---

## 🌍 Mission

| Programme | Focus |
|---|---|
| 🩸 **Reusable Sanitary Pads** | Keeping girls in school and giving women in Turkana the dignity they deserve |
| ♿ **Disability Support** | Assistive resources and community integration for disabled individuals |
| 📚 **Financial Literacy Hub** | Free budgeting & savings education for everyone, curated by Paul Mwaniki Kimani |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom design system) |
| Database & Auth | Supabase (PostgreSQL + Row Level Security) |
| Payments | Paystack (M-Pesa + Card) |
| Hosting | Vercel |

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Impact Calculator, Mission, Founder bio |
| `/financial-literacy` | Video lessons + article hub |
| `/financial-literacy/[slug]` | Full Markdown article reader |
| `/thank-you` | Paystack payment confirmation + impact summary |
| `/admin` | Protected dashboard — donation stats |
| `/admin/impact` | Edit impact calculator conversion rates |
| `/admin/videos` | Add/remove Financial Hub videos |
| `/admin/notes` | Markdown article editor (draft & publish) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/paul-kimani/Dear-Diaries.git
cd Dear-Diaries

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Supabase and Paystack keys

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file with the following (never commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

---

## 🗄️ Database Schema

The Supabase database includes:
- `donations` — tracks all Paystack transactions with status, amount, email, and reference
- `impact_settings` — configurable conversion rates powering the Impact Calculator
- `financial_notes` — Markdown articles (draft/published) for the Financial Hub
- `video_links` — YouTube video entries for the Financial Hub

---

## 🙏 Built By

**Paul Mwaniki Kimani** — Volunteer & Developer

I'm not the founder — I'm simply someone who did my Service-Based Learning in the Turkana region, witnessed the need firsthand, and came back to build something useful. This site is built from the heart, pro-bono, for a community that gave me more than I could ever give back.

---

## 📄 License

MIT — feel free to adapt for your own community initiative.
