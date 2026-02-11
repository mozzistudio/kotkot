export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  paymentMethods: ('yappy' | 'stripe')[];
  flagEmoji: string;
  insuranceRegulator: string;
}

export const COUNTRIES: Country[] = [
  { code: 'PA', name: 'Panamá', currency: 'USD', currencySymbol: '$', paymentMethods: ['yappy', 'stripe'], flagEmoji: '🇵🇦', insuranceRegulator: 'SSRP' },
  { code: 'CO', name: 'Colombia', currency: 'COP', currencySymbol: '$', paymentMethods: ['stripe'], flagEmoji: '🇨🇴', insuranceRegulator: 'Superintendencia Financiera' },
  { code: 'MX', name: 'México', currency: 'MXN', currencySymbol: '$', paymentMethods: ['stripe'], flagEmoji: '🇲🇽', insuranceRegulator: 'CNSF' },
  { code: 'CL', name: 'Chile', currency: 'CLP', currencySymbol: '$', paymentMethods: ['stripe'], flagEmoji: '🇨🇱', insuranceRegulator: 'CMF' },
  { code: 'PE', name: 'Perú', currency: 'PEN', currencySymbol: 'S/', paymentMethods: ['stripe'], flagEmoji: '🇵🇪', insuranceRegulator: 'SBS' },
  { code: 'EC', name: 'Ecuador', currency: 'USD', currencySymbol: '$', paymentMethods: ['stripe'], flagEmoji: '🇪🇨', insuranceRegulator: 'Supercias' },
  { code: 'CR', name: 'Costa Rica', currency: 'CRC', currencySymbol: '₡', paymentMethods: ['stripe'], flagEmoji: '🇨🇷', insuranceRegulator: 'SUGESE' },
  { code: 'DO', name: 'República Dominicana', currency: 'DOP', currencySymbol: 'RD$', paymentMethods: ['stripe'], flagEmoji: '🇩🇴', insuranceRegulator: 'Superintendencia de Seguros' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', currencySymbol: '$', paymentMethods: ['stripe'], flagEmoji: '🇦🇷', insuranceRegulator: 'SSN' },
  { code: 'BR', name: 'Brasil', currency: 'BRL', currencySymbol: 'R$', paymentMethods: ['stripe'], flagEmoji: '🇧🇷', insuranceRegulator: 'SUSEP' },
];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export function getPaymentMethod(countryCode: string): 'yappy' | 'stripe' {
  return countryCode === 'PA' ? 'yappy' : 'stripe';
}

export function getCurrencySymbol(countryCode: string): string {
  return getCountry(countryCode)?.currencySymbol ?? '$';
}
