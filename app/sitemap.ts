import { MetadataRoute } from 'next';

// SEO: Single canonical origin for sitemap URLs
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.contentformatter.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
