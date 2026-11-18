/**
 * Resolves an internal route or asset path with Astro's configured BASE_URL.
 * Supports root deployments ('/') and subdirectory deployments (e.g. '/TedCraft/').
 * Zero-emoji compliant.
 *
 * @param path - Internal path (e.g. '/', '/works', '/about', '/rss.xml')
 * @returns Fully qualified path respecting import.meta.env.BASE_URL
 */
export function resolvePath(path: string = '/'): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
