export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency: string = 'USD', symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('es-PA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPhone(phone: string): string {
  // Format for display: +507 6XXX-XXXX or similar
  if (phone.startsWith('+')) return phone;
  return `+${phone}`;
}

export function generateOrderId(): string {
  return `CF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'hace un momento';
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  if (seconds < 2592000) return `hace ${Math.floor(seconds / 86400)}d`;
  return then.toLocaleDateString('es');
}
