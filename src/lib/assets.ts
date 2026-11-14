/**
 * Prefixes asset paths with the configured base path so the same code
 * works both on a normal Next.js server (no prefix) and on static
 * hosting under a sub-path, e.g. GitHub Pages project sites.
 *
 * `next/image` and Next `<Link>` handle the base path automatically —
 * this helper is for the places that don't: <audio src>, CSS
 * background images and metadata icons.
 */
export const assetBase = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") ?? "";

/** Resolves a public/ asset path (e.g. "/assets/piano.mp3") under the base path. */
export function asset(path: string): string {
  return `${assetBase}${path}`;
}
