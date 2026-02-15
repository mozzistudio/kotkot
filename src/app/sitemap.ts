/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml for B2B marketing pages
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kotkot.ai';
  const routes: MetadataRoute.Sitemap = [];

  // Homepage
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Product pages
  const productPages = [
    '/producto',
    '/producto/agente-whatsapp',
    '/producto/crm',
    '/producto/dashboard',
    '/producto/cobros',
    '/producto/integraciones',
  ];
  productPages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Solutions pages
  const solutionsPages = [
    '/soluciones',
    '/soluciones/automatizar-cotizaciones',
    '/soluciones/vender-por-whatsapp',
    '/soluciones/gestionar-clientes',
    '/soluciones/cobrar-automaticamente',
    '/soluciones/escalar-sin-equipo',
    '/soluciones/multi-producto',
  ];
  solutionsPages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Integration pages
  const integrationPages = [
    '/integraciones',
    '/integraciones/assa',
    '/integraciones/mapfre',
    '/integraciones/sura',
    '/integraciones/bac',
    '/integraciones/banco-general',
    '/integraciones/whatsapp',
    '/integraciones/yappy',
    '/integraciones/stripe',
  ];
  integrationPages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Resources pages
  const resourcePages = [
    '/recursos',
    '/recursos/guias',
    '/recursos/glosario',
    '/recursos/webinars',
    '/recursos/calculadora-roi',
  ];
  resourcePages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Other pages
  const otherPages = [
    '/precios',
    '/casos-de-exito',
    '/comparativas',
    '/nosotros',
    '/contacto',
    '/demo',
    '/blog',
    '/app',
    '/ayuda',
    '/funcionalidades',
    '/como-funciona',
    '/estado',
    '/api-docs',
  ];
  otherPages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Legal pages
  const legalPages = [
    '/politica-privacidad',
    '/terminos',
  ];
  legalPages.forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  return routes;
}
