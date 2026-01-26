import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
}

export function SEO({ titleKey = 'seo.title', descriptionKey = 'seo.description' }: SEOProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const baseUrl = 'https://awesomeworks.ai';
  
  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonicalUrl = `${baseUrl}/${currentLang}`;
  const alternateLanguages = ['pl', 'en'];

  // Fallback: directly update document title and lang (in case Helmet doesn't work with React 19)
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = currentLang;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description, currentLang]);

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang tags for language alternatives */}
      {alternateLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}/${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/pl`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : 'en_US'} />
      <meta property="og:site_name" content="Awesome Works AI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Awesome Works AI" />
      <meta name="keywords" content={t('seo.keywords')} />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Awesome Works AI",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "image": `${baseUrl}/og-image.png`,
          "description": description,
          "email": "hello@awesomeworks.ai",
          "sameAs": [],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PL"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@awesomeworks.ai",
            "contactType": "customer service",
            "availableLanguage": ["Polish", "English"]
          }
        })}
      </script>

      {/* Structured Data - WebSite with SearchAction */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Awesome Works AI",
          "url": baseUrl,
          "inLanguage": ["pl", "en"]
        })}
      </script>

      {/* Structured Data - Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Consulting & Automation",
          "provider": {
            "@type": "Organization",
            "name": "Awesome Works AI"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Poland"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Consulting"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Chatbots"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Agents"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Process Automation"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
}
