/**
 * URL sanitization helpers to prevent XSS via dangerous URI schemes
 * (e.g. `javascript:`, `data:`, `vbscript:`) when a URL originates from
 * external/untrusted data such as GitHub API responses.
 */

// Schemes that are safe to place in an anchor/link `href`.
const SAFE_ABSOLUTE_SCHEME = /^(https?:|mailto:|tel:)/i

/**
 * Returns the URL only if it uses a safe scheme, otherwise falls back to '#'.
 *
 * Allowed:
 *  - Relative paths ("/foo", "foo", "./foo", "../foo")
 *  - Hash/fragment links ("#section")
 *  - Absolute URLs using http(s), mailto or tel schemes
 *
 * Anything else (javascript:, data:, vbscript:, etc.) is rejected.
 */
export function safeUrl(url: string | null | undefined): string {
  if (!url) return '#'

  const trimmed = url.trim()
  if (trimmed === '') return '#'

  // Relative or fragment links are safe (no scheme).
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return trimmed
  }

  // Reject any control characters that could be used to smuggle a scheme.
  // eslint-disable-next-line no-control-regex
  const cleaned = trimmed.replace(/[\u0000-\u001F\u007F]/g, '')

  if (SAFE_ABSOLUTE_SCHEME.test(cleaned)) {
    return cleaned
  }

  // A bare token with no scheme and no "://" is treated as a relative path.
  if (!/^[a-z][a-z0-9+.-]*:/i.test(cleaned)) {
    return cleaned
  }

  return '#'
}
