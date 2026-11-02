import Script from "next/script";

/**
 * TRACKING TAGS — landing page only.
 *
 * Renders nothing until the IDs are set in Vercel, so the page ships clean and
 * the rest of the site is not touched.
 *
 * ── Pick ONE route, not both ────────────────────────────────────────────────
 *   · NEXT_PUBLIC_GTM_ID set   → only GTM loads. Configure GA4, the Google Ads
 *     conversion and the Meta pixel as tags inside GTM, triggered by the
 *     `generate_lead` dataLayer event (see lib/attribution.ts).
 *   · GTM not set              → gtag.js loads for GA4 and/or Google Ads, and
 *     the Meta pixel loads directly, from their own IDs.
 *
 * Running both would fire every conversion twice.
 *
 * `afterInteractive` for all of them: none of them should compete with the
 * hero video and headline for the first paint.
 */
export function TrackingScripts() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (gtm) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtm)});`}
      </Script>
    );
  }

  const gtagId = ga4 || ads;

  return (
    <>
      {gtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${
              ga4 ? `gtag('config',${JSON.stringify(ga4)});` : ""
            }${
              ads
                ? `gtag('config',${JSON.stringify(ads)},{allow_enhanced_conversions:true});`
                : ""
            }`}
          </Script>
        </>
      ) : null}

      {pixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixel)});fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
