// The AN mark (Abdullah Nasser). Letters follow the text colour, the bar follows the theme's primary colour,
// so the mark adapts to dark/light mode and every colour scheme.
type BrandMarkProps = {
  className?: string;
  title?: string;
};

const LETTERS =
  'M63.71 157.24 L96 36 L124 36 L93.86 149.17 Z M55.48 188.15 L85.63 180.08 L75 220 L47 220 Z M96 36 L124 36 L150.13 134.11 L123.99 141.1 Z M158.7 166.29 L173 220 L145 220 L144.65 218.68 Z M157.26 160.9 L158.7 166.29 L144.65 218.68 L131.12 167.9 Z M169.24 128.99 L194 36 L222 36 L199.39 120.92 Z M169.24 128.99 L199.39 120.92 L173 220 L145 220 Z';
const BAR = 'M39 168 L163 134.8 L157.1 156.8 L33.1 190 Z';

export default function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      viewBox="24 24 208 208"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={LETTERS} fill="var(--foreground)" />
      <path d={BAR} fill="var(--primary)" />
    </svg>
  );
}
