import type { NavItem } from "../../sanity/types";

const HIGHLIGHTS_NAV_ITEM: NavItem = {
  label: "Highlights",
  href: "/highlights",
};

function normalizeHref(href: string): string {
  return href.replace(/\/+$/, "") || "/";
}

/**
 * Ensures the Highlights link appears directly after News.
 *
 * Navigation is normally controlled by Sanity. This keeps the new page
 * reachable until the same item is added in the CMS; if a Highlights item
 * already exists it is left untouched, so it is safe to add there later.
 */
export function withHighlightsNavItem(items: NavItem[]): NavItem[] {
  if (items.length === 0) return items;

  if (items.some((item) => normalizeHref(item.href) === "/highlights")) {
    return items;
  }

  const newsIndex = items.findIndex(
    (item) =>
      normalizeHref(item.href) === "/activities" ||
      item.label.trim().toLowerCase() === "news",
  );
  const contactIndex = items.findIndex(
    (item) => normalizeHref(item.href) === "/contact",
  );
  const insertAt =
    newsIndex >= 0 ? newsIndex + 1 : contactIndex >= 0 ? contactIndex : items.length;

  const next = [...items];
  next.splice(insertAt, 0, HIGHLIGHTS_NAV_ITEM);
  return next;
}

/** Whether a main-nav href matches the current route (including nested pages). */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (!href || href.startsWith("http")) return false;

  const [pathWithoutHash] = pathname.split("#");
  const [hrefWithoutHash] = href.split("#");

  const normalizedPath = pathWithoutHash.replace(/\/+$/, "") || "/";
  const normalizedHref = hrefWithoutHash.replace(/\/+$/, "") || "/";

  if (normalizedHref === "/") {
    return normalizedPath === "/";
  }

  return (
    normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`)
  );
}
