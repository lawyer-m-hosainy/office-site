import { useState } from 'react';

interface Props {
  className?: string;
  /** Inverts the mark for use on the dark primary background. */
  onDark?: boolean;
}

/**
 * State-driven fallback: an onError handler alone is unreliable because the
 * prerendered markup can fail to load the logo before React attaches listeners.
 */
export default function BrandLogo({ className = 'h-12 w-auto', onDark = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`${className} inline-flex items-center font-bold ${onDark ? 'text-background' : 'text-primary'}`}
      >
        مكتب الحسيني
      </span>
    );
  }

  return (
    <img
      src="/brand/logo.svg"
      alt="شعار مكتب محمد السيد الحسيني للمحاماة"
      width={300}
      height={60}
      className={`${className}${onDark ? ' brightness-0 invert' : ''}`}
      onError={() => setFailed(true)}
    />
  );
}
