'use client';

/**
 * Restrained cinematic celebration — shown ONLY in the Yes ending.
 * A few soft petals and warm pearl lights rising slowly. No confetti.
 * Decorative only; reduced-motion CSS makes it still and invisible.
 */
const PARTICLES: Array<{
  kind: 'petal' | 'light';
  x: string;
  delay: string;
  duration: string;
  size: number;
  sway: string;
  opacity: number;
}> = [
  { kind: 'petal', x: '6%', delay: '0s', duration: '13s', size: 11, sway: '30px', opacity: 0.55 },
  { kind: 'light', x: '14%', delay: '2.4s', duration: '11s', size: 9, sway: '-18px', opacity: 0.8 },
  { kind: 'petal', x: '22%', delay: '5.1s', duration: '14s', size: 13, sway: '22px', opacity: 0.5 },
  { kind: 'light', x: '31%', delay: '0.8s', duration: '12s', size: 7, sway: '26px', opacity: 0.7 },
  { kind: 'petal', x: '40%', delay: '7.2s', duration: '12.5s', size: 9, sway: '-32px', opacity: 0.6 },
  { kind: 'light', x: '49%', delay: '3.7s', duration: '10.5s', size: 10, sway: '-12px', opacity: 0.85 },
  { kind: 'petal', x: '58%', delay: '1.6s', duration: '15s', size: 12, sway: '34px', opacity: 0.45 },
  { kind: 'light', x: '66%', delay: '6.4s', duration: '11.5s', size: 6, sway: '20px', opacity: 0.75 },
  { kind: 'petal', x: '74%', delay: '8.9s', duration: '13.5s', size: 10, sway: '-26px', opacity: 0.55 },
  { kind: 'light', x: '82%', delay: '1.2s', duration: '12s', size: 9, sway: '-22px', opacity: 0.8 },
  { kind: 'petal', x: '90%', delay: '4.6s', duration: '14.5s', size: 14, sway: '18px', opacity: 0.5 },
  { kind: 'light', x: '96%', delay: '7.8s', duration: '10s', size: 8, sway: '14px', opacity: 0.7 },
];

export function Celebration() {
  return (
    <div className="celebration" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={p.kind === 'petal' ? 'petal rise' : 'pearl-light rise'}
          style={
            {
              '--x': p.x,
              '--delay': p.delay,
              '--duration': p.duration,
              '--sway': p.sway,
              width: `${p.size}px`,
              height: p.kind === 'petal' ? `${Math.round(p.size * 1.55)}px` : `${p.size}px`,
              opacity: p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
