/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml for all SEO pages
 */

import { MetadataRoute } from 'next';
import {
  getAllInsuranceProducts,
  getInsuranceCompaniesByCountry,
  generateInsuranceCrossPages,
  generateInsuranceComparisons,
} from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kotkot.ai';
  const routes: MetadataRoute.Sitemap = [];

  // Static pages
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  routes.push({
    url: `${baseUrl}/seguros`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  routes.push({
    url: `${baseUrl}/seguros/aseguradoras`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // Insurance product pages (10 pages)
  const products = getAllInsuranceProducts();
  products.forEach((product) => {
    routes.push({
      url: `${baseUrl}/seguros/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Insurance company pages (10 pages)
  const companies = getInsuranceCompaniesByCountry('panama');
  companies.forEach((company) => {
    routes.push({
      url: `${baseUrl}/seguros/aseguradoras/${company.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Insurance cross pages (~90 pages)
  const crossPages = generateInsuranceCrossPages('panama');
  crossPages.forEach((cross) => {
    routes.push({
      url: `${baseUrl}/seguros/${cross.productSlug}/${cross.companySlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Insurance comparison pages (~45 pages)
  const comparisons = generateInsuranceComparisons('panama');
  comparisons.forEach((comparison) => {
    routes.push({
      url: `${baseUrl}/seguros/comparar/${comparison.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return routes;
}
