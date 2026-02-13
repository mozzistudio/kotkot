/**
 * Schema Markup Component
 * Renders JSON-LD structured data for SEO
 */

import React from 'react';

interface SchemaMarkupProps {
  schema: object | object[];
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem),
          }}
        />
      ))}
    </>
  );
}

export default SchemaMarkup;
