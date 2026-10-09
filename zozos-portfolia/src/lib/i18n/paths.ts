import type { Locale } from "./types";

export function localizedPath(locale: Locale, path: string) {
  const unprefixed = path.replace(/^\/mn(?=\/|#|$)/, "") || "/";
  return locale === "mn"
    ? `/mn${unprefixed.replace(/^\/(?=#|\?|$)/, "")}`
    : unprefixed;
}
