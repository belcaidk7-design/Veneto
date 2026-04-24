export interface Testimonial {
  id: string;
  i18nKey: string; // testimonials.<key>
}

export const TESTIMONIALS: Testimonial[] = [
  { id: 'architect', i18nKey: 'architect' },
  { id: 'homeowner', i18nKey: 'homeowner' },
  { id: 'developer', i18nKey: 'developer' },
];
