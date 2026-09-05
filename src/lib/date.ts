const MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

/**
 * Formats an ISO date as Arabic "12 أكتوبر 2023".
 * Deterministic on purpose: Intl output can differ between Node and the browser,
 * which would break hydration of the prerendered HTML.
 */
export function formatArabicDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
