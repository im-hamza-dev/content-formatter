import { MetadataRoute } from 'next';

// SEO: Crawlers need clear allow/disallow and sitemap reference
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://contentformatter.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
