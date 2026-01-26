import { useEffect } from 'react';
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
  const keywords = t('seo.keywords');

  useEffect(() => {
    // Update document title and lang
    document.title = title;
    document.documentElement.lang = currentLang;
    
    // Helper to update or create meta tag
    const updateMeta = (selector: string, content: string, attr = 'content') => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (meta) {
        meta.setAttribute(attr, content);
      } else {
        meta = document.createElement('meta');
        const [attrName, attrValue] = selector.replace(/[\[\]'"]/g, '').split('=');
        if (attrName.startsWith('property')) {
          meta.setAttribute('property', attrValue);
        } else {
          meta.setAttribute('name', attrValue);
        }
        meta.setAttribute(attr, content);
        document.head.appendChild(meta);
      }
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let link = document.querySelector(selector) as HTMLLinkElement | null;
      if (link) {
        link.href = href;
      } else {
        link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (hreflang) link.hreflang = hreflang;
        document.head.appendChild(link);
      }
    };

    // Basic meta tags
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="keywords"]', keywords);
    updateMeta('meta[name="author"]', 'Awesome Works AI');
    updateMeta('meta[name="robots"]', 'index, follow');

    // Canonical URL
    updateLink('canonical', `${baseUrl}/${currentLang}`);

    // Open Graph
    updateMeta('meta[property="og:type"]', 'website');
    updateMeta('meta[property="og:url"]', `${baseUrl}/${currentLang}`);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', `${baseUrl}/og-image.png`);
    updateMeta('meta[property="og:locale"]', currentLang === 'pl' ? 'pl_PL' : 'en_US');
    updateMeta('meta[property="og:site_name"]', 'Awesome Works AI');

    // Twitter
    updateMeta('meta[name="twitter:card"]', 'summary_large_image');
    updateMeta('meta[name="twitter:url"]', `${baseUrl}/${currentLang}`);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', `${baseUrl}/og-image.png`);

    // Structured Data - Organization
    const orgSchema = {
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
    };

    // Structured Data - WebSite
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Awesome Works AI",
      "url": baseUrl,
      "inLanguage": ["pl", "en"]
    };

    // Structured Data - Service
    const serviceSchema = {
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
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Consulting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chatbots" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Agents" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Process Automation" } }
        ]
      }
    };

    // Helper to add/update JSON-LD script
    const updateJsonLd = (id: string, data: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    updateJsonLd('schema-org', orgSchema);
    updateJsonLd('schema-website', websiteSchema);
    updateJsonLd('schema-service', serviceSchema);

  }, [title, description, keywords, currentLang, baseUrl]);

  return null;
}
