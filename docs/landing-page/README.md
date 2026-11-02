# Sika Digital: paid landing page (`/lp/`)

Research, copy strategy, structure and measurement plan for the Google Ads and Meta Ads landing page. The copy lives in `src/config/landing.ts`. The page is `src/app/lp/page.tsx`.

---

## 1. What I learned from the existing site

**Business.** A Melbourne agency that gets Australian home services businesses found and turns that attention into enquiries. It has four service lines: local SEO, Google and Meta ads, websites and landing pages, and GoHighLevel CRM and automation. It's moving to productised packages (Tier 1 local SEO plus basic automation, Tier 2 ads retainer at about $3–5k a month including spend, Tier 3 full package).

**Audience.** Owner-run home services businesses: renovations, roofing, solar, demolition, joinery, building and similar. They win work through enquiries and quotes, the value per customer is high, they're on the tools during the day, and they're wary of agencies.

**Positioning assets already on the site, and defensible:**
- The founder held an electrical licence for 12 years (`siteConfig.founder`). No competitor can copy this.
- The reporting standard on `/results/`: qualified enquiries rather than impressions, accounts in the client's name, and a bad month reported as a bad month.
- 28 approved client logos, most of them home services.
- The offer: a check of the website, Google Business Profile, ad accounts and lead follow-up, yours to keep. Every CTA on the site is now **"Book a Free Call"** (see Round 3).

**Proof gaps (Open Question #3 on the site).** There are no case studies, testimonials, published review count or client numbers. The page is built so none of these are needed, and so each one slots in when it's ready.

**Design system.** Next 16 App Router, Tailwind 4 tokens in `globals.css`, GSAP and Lenis motion, Archivo / Archivo Black / JetBrains Mono, ink, lime and blue. The approved hero (typed headline, torn lime strip, video with poster fallback) is reused as is.

**Messaging problems on the homepage, for a paid visitor:**
- The hero has no button. A paid visitor gets no next step on the first screen.
- The hero says what Sika does but not who it's for. A roofer can't tell this is for roofers.
- The service line ("Websites · SEO · Paid Ads · AI Search") lists features rather than outcomes.
- There's no proof or objection handling between the hero and the CTA.
- The navigation offers about 40 exits.

---

## 2. Competitor research

### ⚠️ Read this first: a limitation of this research

This cloud session's network policy blocked direct page fetches to every agency domain I tried (tradiedigital.co, hookagency.com, scorpion.co, klientboost.com, disruptiveadvertising.com, directiveconsulting.com). The findings below come from **search engine results and their summaries, not verbatim reads of the live pages.** I haven't recorded exact headlines, form field counts or section orders I couldn't see, and every figure quoted is attributed to its source.

To get a full teardown, allow those domains in the environment's network settings and re-run. The strategy below doesn't depend on anything I couldn't verify.

### Pages researched

| Agency | URL(s) | What surfaced | Offer | How it handles objections |
|---|---|---|---|---|
| KlientBoost (US, PPC) | klientboost.com, klientboost.com/marketing-plan/ | Leads with a free "marketing plan" given a stated dollar value; a large case study count | A named deliverable, not "contact us" | Volume of case studies; G2 rating |
| Disruptive Advertising (US, PPC) | disruptiveadvertising.com | A free audit focused on wasted ad spend; "no long-term contracts"; a conditional 90-day guarantee for "qualifying brands" | Audit, "whether or not" you hire them | No lock-in; guarantee |
| Scorpion (US, home services) | scorpion.co/home-services/ | Full stack (web, SEO, ads, LSA, intake technology); ties spend to revenue; an AI intake and booking assistant | Not captured | Reportedly states a 12-month term for some services |
| Hook Agency (US, roofing/contractors) | hookagency.com/roofing-marketing/website-design/ | Pages per trade ("Roofing Website Design … We Know Roofing Websites") | Intro call (unverified) | Trade specialisation |
| Online Marketing Gurus (AU) | onlinemarketinggurus.com.au/ppc-melbourne/ | A free strategy given a dollar value; a plain-English no-lock-in line; a budget expectation on the contact page | Strategy session | No lock-in; budget stated upfront |
| Rocket Agency (AU) | rocketagency.com.au | Awards and Google Premier Partner badge as the main trust signals | Not captured | Authority badges |
| Directive (US, B2B) | directiveconsulting.com/outcomes/paid-media/ | Named-client case figures; Jobs-to-be-Done framing | Not captured | Case numbers. B2B language, a poor fit for trades |

### Why the strong ones work (reverse engineered)

1. **The CTA is a thing you get, not a meeting you sit through.** "Free plan" and "free audit" turn a sales call into a deliverable. Sika's version is the free marketing check. The page makes it concrete: a five-point list of what gets checked, and the line "yours to keep".
2. **They speak one trade's language.** Hook's per-trade pages work because a roofer sees "roofing" and stops scanning for whether this applies to them. Sika's equivalent is `?trade=` message match (see §5) rather than 15 separate pages.
3. **They name the objection before the prospect does.** Lock-in, cost and who does the work are what buyers wonder about. The pages that convert say them out loud.
4. **Proof sits next to the claim.** Logos straight after the hero; reviews beside the differentiators.
5. **They own what happens after the click.** Scorpion's intake technology is the strongest home services angle in the set. Sika's GoHighLevel work (missed-call text back, instant reply) is the same argument and is rarer among AU agencies. It gets its own service row and its own pain point.

### Weak approaches to avoid

- **Dollar values on a free offer that don't match across pages** (OMG reportedly shows three different figures). Sika states no dollar value.
- **Award and "top 3%" claims as the main proof.** Trades don't care, and they read as filler.
- **Long minimum terms disclosed with no reason given.**
- **B2B jargon** ("pipeline", "customer generation", "growth partner").
- **"Free" as the whole hook.** On its own it fills the CRM with browsers. On `/lp/` "free" describes the check, but it isn't the headline, and the budget question plus the "not for you" list do the filtering.

### CRO principles used (sourced; check the figures in the originals before quoting them)

- **Message match and landing page experience.** Google Ads Help: landing page experience is a Quality Score component; the page should follow through on the ad's offer, with key information near the top and a fast mobile load. support.google.com/google-ads/answer/6238826
- **Forms.** Nielsen Norman Group: labels above fields, no placeholder text used as a label, mark required fields, keep forms short. nngroup.com/articles/web-form-design/ , nngroup.com/articles/form-design-placeholders/
- **Field count.** Baymard (checkout research, applied here by analogy): long forms intimidate. baymard.com/blog/checkout-flow-average-form-fields
- **Benchmarks.** Unbounce's Conversion Benchmark Report publishes median conversion rates by industry. Use it as a sanity check, not a target. unbounce.com/conversion-benchmark-report/
- **Speed.** Think with Google, "Milliseconds Make Millions": load time affects bounce on mobile.

---

### Round 2: copy revision (after John's review)

John's feedback: the first draft wasn't convincing enough. Second round of research, again from search results (direct page reads are still blocked in this environment):

**What competing home services and trade agencies lead with**
- *Outcome plus niche:* "Get More Leads & Book More Jobs" ([roofcontractormarketing.com](https://www.roofcontractormarketing.com/)), "We help Aussie tradies get more jobs" ([thetradiemarketingagency.com.au](https://thetradiemarketingagency.com.au/)).
- *Risk reversal:* no lock-in ([spruik.co](https://spruik.co/industries/tradies/), [theroofingmarketer.com](https://theroofingmarketer.com/)), 90-day results guarantee ([tradeads.com.au](https://tradeads.com.au/tradie-marketing)), and guaranteed leads hedged with "results will vary" ([start.bestroofermarketing.com](https://start.bestroofermarketing.com/)).
- *Ownership and exclusivity:* "run in your own ad account" ([minyona.com](https://minyona.com/)), "your setup is yours to keep" ([tradieaf.com.au](https://www.tradieaf.com.au/google-ads-agency-cairns/)), "never resell a lead" ([contractors.homeappointments.com](https://contractors.homeappointments.com/)), "when you're the only contractor a homeowner reaches, you compete less on price" ([99calls.com](https://99calls.com/Home-Improvement-Leads.htm)).
- *Unverified volume claims* ("10+ leads per week", "20–50+ leads per month", "#1 tradie agency"). Common, uncheckable, and exactly what a sceptical owner discounts.

**Voice of customer (how owners talk about the problem)**
- Shared-lead marketplaces: the same job sold to several tradies, a "race to the bottom on pricing", paying for leads that go to someone else ([20minutemarketing.com.au](https://www.20minutemarketing.com.au/blog/hipages-reviews), [webblend.au](https://webblend.au/blog/tradie-marketing-reddit/), [backontools.com.au](https://www.backontools.com.au/best-hipages-alternative-tradies-australia)). These are vendor blogs with a commercial interest, but the complaint is consistent.
- Missed calls on the tools, and leads going cold ([clearscale.com.au](https://clearscale.com.au/blog/how-to-get-more-leads-as-a-tradie), [sellevate.com.au](https://sellevate.com.au/marketing-for-tradies/)).
- Agencies that report clicks and impressions rather than booked jobs ([seoagencyfortradies.au](https://seoagencyfortradies.au/services/marketing-for-tradies/), [tradiewebguys.com.au](https://www.tradiewebguys.com.au/how-to-choose-marketing-agency-for-trade-business/)).

**Copywriting method:** Voice of Customer before voice of brand, and a specific result rather than a vague benefit (Joanna Wiebe / Copyhackers approach, via secondary summaries).

**What changed in the copy and why**
1. **Problem section opens on the owner's feeling, not our diagnosis:** "Flat out one month. Dead quiet the next." Feast or famine is the universal complaint and needs no proof.
2. **Leads with the shared-lead pain** ("You're quoting against four others"). It's the cost most owners already pay and resent, and the one Sika's model solves outright. It isn't named, so no competitor names appear on the page.
3. **The solution is framed as ownership** (headline later simplified in Round 3 to "More enquiries that come straight to you."). Every enquiry comes from the client's own listing, ads and site. This is true of every package, so it's a claim Sika can stand behind, unlike guarantees or lead counts.
4. **Services rewritten as scenes:** "Never lose a job to voicemail", "Ads that bring in real jobs".
5. **New FAQs:** "How is this different from lead sites?" and "What if you don't find much?" (risk reversal without an unconfirmed guarantee).
6. **Removed an unconfirmed claim:** the "reply within one business day" promise is gone, replaced with "Takes about a minute. Yours to keep, whether or not you hire us."
7. **Deliberately not copied:** guarantees, "#1", lead-volume numbers, "no lock-in". Each one wins clicks and loses trust if it can't be backed. If Sika is month-to-month, or can define a guarantee it will honour, those are the next two upgrades.

### Round 3: plain-language pass (after John's second review)

John's feedback: "Get my lead audit" doesn't make sense to an Australian home services owner, and the hero's supporting line was confusing. Both were agency language. Rule for this pass: **every word has to be one a builder or roofer would say themselves.**

| Was | Now | Why |
|---|---|---|
| Button: "Get my lead audit", then "Get more jobs" | **"Book a Free Call"** (site-wide, replacing "Find my missing leads" too) | John: the CTA has to be simple. It says exactly what happens next, with no clever wording. |
| Hero line: "Enquiries from your own Google, ads and website, sent to you only. Not shared with four other quotes." | **"Marketing for Australian builders, roofers, renovators, solar installers and home service businesses."** | One job only: tell the visitor in two seconds that this page is for them. The shared-leads argument lives in the problem section, where there's room to make it. |
| "Your own source of enquiries. Not rented, not shared." | **"More enquiries that come straight to you."** | "Rented" was abstract. |
| "Pay for jobs, not clicks" | **"Ads that bring in real jobs"** | The old line implied pay-per-job pricing, which Sika doesn't offer. |
| "Google Ads & Meta Ads", "Meta ads" | **"Facebook / Instagram ads"** | Owners say Facebook, not Meta. |
| "GoHighLevel CRM & automation", "pipeline", "CRM setup" | **"Lead follow-up & automation"**, "every enquiry tracked, from first call to quote", "follow-up system" | Tool names and CRM terms mean nothing to the buyer. |
| "Negative keyword lists" | **"Blocking searches that waste your money"** | Says what it does. |
| "Turn visitors into quote requests" | **"A website that gets the phone ringing"** | The owner's outcome. |
| Form: "Start here" / "See exactly where your next jobs are going." | **"Free marketing check" / "Find out why the phone isn't ringing more."** | Names what they get and the question in their head. |
| FAQ: "What do I get from the audit?" | **"What do I get from the free marketing check?"** | No "audit". |

---

## 3. Copy strategy

**Target reader.** The owner of a home services business, on a phone, between jobs, who clicked an ad for "roofing marketing" or "Google Ads for builders". Sceptical of agencies. Thinks in jobs and quotes, not leads and CPCs.

**Job to be done.** "Keep the diary full of the work I actually want, without me chasing it."

**Unique value proposition.** One team that runs the whole path from search to quote (ranking, ads, website and lead follow-up) for home services businesses, run by someone who held a trade licence for 12 years.

**Primary conversion.** One action: the free marketing check form, button copy **"Book a Free Call"**, used site-wide. It says exactly what happens next. Every button on the page goes to the form, including the shared header and Process buttons.

**Frameworks used, and where:**
- **PAS** in the problem section: "Flat out one month. Dead quiet the next.", then four causes (shared leads, invisible on Google, wasted ads, missed calls), then "None of that is a shortage of work. It's a gap in how the work finds you, and that can be fixed."
- **Jobs-to-be-Done and outcome-first** in the services section: the outcome is the heading ("Be on the map when they search", "Never lose a job to voicemail") and the service name is the label.
- **AIDA** as the overall page arc: hero → problem → solution and differentiators → process and FAQ → form.
- **Voice of customer:** language owners use ("on the tools", "up a ladder", "call back at six", "jobs you don't do"). Replace it with real phrases from sales calls once Fathom transcripts are mined (recommended next step).

**What was left out on purpose:** guarantees, "no lock-in", dollar-valued offers, client counts, review counts and response-time promises. None are confirmed yet.

---

## 4. Page structure, and why this order

| # | Section | Job |
|---|---|---|
| 1 | Hero (approved, unchanged) + one button + one line | Attention and an immediate next step. The added line says who it's for: "Marketing for Australian builders, roofers, renovators, solar installers and home service businesses." |
| 2 | Home services logo band | Proof before the pitch. Filtered to home services clients only (see `landingLogos`). |
| 3 | The problem (PAS) | Makes the reader feel the cost of doing nothing. Trade-aware via `?trade=`. |
| 4 | What we build | The four services as outcomes, answering the four problems point for point. First mid-page CTA. |
| 5 | Why Sika | Five differentiators, all checkable. The founder credential leads. Google reviews badge. |
| 6 | Testimonials | Renders only when `testimonials[]` has real, approved quotes. |
| 7 | Process (approved homepage section) | Removes fear of the unknown right before the ask. |
| 8 | Fit / not a fit | Qualifies. Costs a few enquiries from people who were never going to be clients. |
| 9 | FAQ | What you get, lead sites, what if nothing's found, trade fit, cost, budget, timeline, contract, who does the work. Mid-page CTA beside it. |
| 10 | Form (blue band): "Book a free call" | The single conversion, with what gets checked and what happens next beside it. |

Plus: the header loses its navigation on `/lp/` (the CTA stays), and a mobile sticky CTA bar appears after the hero and hides while the form is on screen.

### Hero recommendations (NOT applied, for your decision)

The approved hero copy is unchanged. For paid traffic I'd test these, in order of expected impact:
1. **The CTA under the headline appears at 1.6s.** It's the only change applied, and it's additive. Test 0s against 1.6s, since the typing animation delays the first action.
2. **Headline variant for search traffic:** "More enquiries for your [trade] business." with "Get found. Get clicks. Get customers." moved to the eyebrow. Stronger message match; weaker brand recall.
3. **Swap the service line** "Websites · SEO · Paid Ads · AI Search" for outcomes ("Get found · Get the right clicks · Catch every lead") on `/lp/` only.

---

## 5. Implementation

**Route:** `/lp/` (noindex, nofollow, not in the sitemap).

**Branch:** `feature/sika-landing-page`. Also pushed to the session branch `claude/intelligent-bohr-dxjzaf`; both hold the same commit.

**New files**
- `src/app/lp/page.tsx`: the page
- `src/config/landing.ts`: all copy, trades, form options, logos, FAQ
- `src/components/landing/LeadForm.tsx`: qualifying form with honeypot and email fallback
- `src/components/landing/LandingBehaviour.tsx`: UTM capture, CTA-to-form scroll, `?trade=` message match
- `src/components/landing/StickyCta.tsx`: mobile sticky CTA
- `src/components/landing/LandingLogos.tsx`: home services logo band, reusing the TrustedBy parts
- `src/components/landing/TrackingScripts.tsx`: GTM, or GA4 + Google Ads + Meta pixel, from env vars
- `src/lib/attribution.ts`: first and last touch attribution, conversion events
- `src/app/api/lead/route.ts`: validates, forwards to GHL, optional Meta CAPI

**Changes to shared files (minimal, verified)**
- `Hero.tsx`: optional `children` slot rendered under the service line. The homepage passes nothing.
- `Header.tsx`: on `/lp/` only, hides the nav and burger.
- Homepage HTML was diffed before and after the build (build hashes normalised) and is **identical**.

**Message match.** Add `?trade=` to each ad's final URL: `roofing`, `solar`, `renovations`, `demolition`, `joinery`, `building`, `builders`, `bathrooms`, `kitchens`, `electrical`, `plumbing`, `hvac`, `flooring`, `blinds`, `landscaping`. Swaps the trade into the problem section and pre-selects it in the form. Example: `/lp/?trade=roofing&utm_source=google&utm_medium=cpc&utm_campaign={campaignid}`

**Lead flow.** Form → `POST /api/lead/` → zod validation → `GHL_WEBHOOK_URL`, carrying name split into first and last, phone, email, business, website, trade, monthly budget, tags (`lp-lead`, `trade:…`, `budget:…`), UTMs, gclid / gbraid / wbraid / fbclid, landing page, referrer, and first-touch copies (`first_*`). If the webhook isn't set, the API returns 503 and the form opens a pre-filled email, so a lead is never lost.

**Conversion events (dataLayer):** `cta_click` (with `cta_location`), `form_start`, `generate_lead` (only after the server accepts the lead; includes `lead_event_id` for Meta dedupe and enhanced conversion data).

### Environment variables to set in Vercel

| Variable | Needed for |
|---|---|
| `GHL_WEBHOOK_URL` | **Required before any traffic.** GHL inbound webhook trigger |
| `NEXT_PUBLIC_GTM_ID` | Recommended. If set, configure GA4, Ads and Meta tags inside GTM on `generate_lead` |
| `NEXT_PUBLIC_GA4_ID` | GA4 direct (only if not using GTM) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Google Ads conversion (only if not using GTM) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta pixel, and CAPI |
| `META_CAPI_ACCESS_TOKEN` | Server-side Meta Lead event, deduplicated with the pixel |
| `META_CAPI_TEST_EVENT_CODE` | Optional, for testing in Events Manager |

### Content to confirm before traffic (marked CONFIRM in `landing.ts`)

1. The logo list is all home services clients.
2. FAQ "How much does it cost?": set packages, ad spend separate, fixed price in writing.
3. FAQ "How much should I spend on ads?": the $3,000–$5,000 a month figure.
4. FAQ "Am I locked into a long contract?": the real minimum term. If it's month-to-month, say so; that's a stronger line.
5. FAQ "Who actually does the work?": wording around the offshore team and Melbourne management.
6. "A set scope, in writing" / "No hourly billing".
8. `siteConfig.googleReviews.count` and `url`, so the badge shows a number and links out.

**Missing proof that would lift conversion most, in order:** 2–3 short testimonials from home services clients (name, business, trade); one case study with a before/after enquiry figure traceable to the client's account; a photo of John for the "Why Sika" founder card.

---

## 6. Measurement and A/B tests

**Measure**
- Lead conversion rate (`generate_lead` / sessions), by campaign, trade and device
- **Qualified** lead rate: tag in GHL whether each lead fits (trade, budget band, service area). Feed qualified leads back to Google Ads as an offline conversion, so bidding optimises for quality rather than volume.
- Cost per qualified lead, and cost per booked call
- Form start → submit rate (`form_start` vs `generate_lead`)
- CTA clicks by location (which section drives the scroll to the form)
- Scroll depth and session recordings: install Microsoft Clarity via GTM
- Speed-to-lead in GHL (enquiry → first human contact)

**Test backlog (one variable at a time, in this order)**
1. Hero CTA timing: 0s against 1.6s.
2. Hero headline: approved brand line against "More enquiries for your [trade] business." (search campaigns only).
3. Form: 7 fields against 4 (name, mobile, trade, budget), with email and business collected on the call. Judge on **qualified** leads, not raw volume.
4. CTA wording: keep "Book a Free Call" as the control. Only test a variant if the form start rate is low.
5. Budget question: keep or remove. Removing will lift volume; check whether it drops the qualified rate.
6. Problem section above or below the services section.
7. Adding a 15-minute call booking (GHL calendar) as an alternative on the success screen.

Give each test at least two full weeks and enough conversions per variant to call it. Don't stop a test early on a good day.
