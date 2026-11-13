'use client';

/**
 * Floating petals — decorative only (aria-hidden, pointer-events none).
 * Deterministic configuration so server and client markup match (no hydration drift).
 * Respects prefers-reduced-motion via the global CSS override.
 */
const PETALS: Array<{
  x: string;
  delay: string;
  duration: string;
  size: number;
  hue: number;
  drift: number;
}> = [
  { x: '4%', delay: '0s', duration: '19s', size: 12, hue: 0, drift: 34 },
  { x: '12%', delay: '3.2s', duration: '16s', size: 9, hue: 1, drift: -22 },
  { x: '20%', delay: '7.1s', duration: '21s', size: 14, hue: 0, drift: 40 },
  { x: '28%', delay: '1.4s', duration: '17.5s', size: 10, hue: 1, drift: -30 },
  { x: '36%', delay: '9.8s', duration: '15s', size: 8, hue: 0, drift: 26 },
  { x: '45%', delay: '5.5s', duration: '20s', size: 13, hue: 1, drift: -18 },
  { x: '53%', delay: '0.9s', duration: '18s', size: 11, hue: 0, drift: 38 },
  { x: '61%', delay: '6.7s', duration: '16.5s', size: 9, hue: 1, drift: -26 },
  { x: '69%', delay: '2.8s', duration: '22s', size: 15, hue: 0, drift: 20 },
  { x: '77%', delay: '8.3s', duration: '15.5s', size: 8, hue: 1, drift: -34 },
  { x: '85%', delay: '4.1s', duration: '19.5s', size: 12, hue: 0, drift: 28 },
  { x: '93%', delay: '10.6s', duration: '17s', size: 10, hue: 1, drift: -24 },
  { x: '33%', delay: '11.9s', duration: '23s', size: 13, hue: 0, drift: 18 },
  { x: '66%', delay: '12.4s', duration: '14.5s', size: 7, hue: 1, drift: -14 },
];

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              '--x': p.x,
              '--delay': p.delay,
              '--duration': p.duration,
              '--drift': `${p.drift}px`,
              width: `${p.size}px`,
              height: `${Math.round(p.size * 1.55)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
