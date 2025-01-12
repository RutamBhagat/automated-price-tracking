import { isWebUri } from "valid-url";

/**
 * Validates if the given string is a valid URL
 * Uses valid-url package which implements RFC 3986 compliant validation
 *
 * @param url - The URL string to validate
 * @returns boolean - True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return !!isWebUri(url);
  } catch {
    return false;
  }
}