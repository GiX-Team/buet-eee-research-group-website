import type { SanityImage } from "../../sanity/types";

/**
 * View model shared by CMS-backed and demo collaboration logos.
 * Demo entries use `logoSrc`; CMS entries use `logo`.
 */
export type CollaborationDisplayItem = {
  id: string;
  name: string;
  websiteUrl?: string;
  /** Defaults to true so existing logos keep opening in a new tab. */
  openInNewTab?: boolean;
  logo?: SanityImage;
  logoSrc?: string;
};

/**
 * Normalises a CMS website address into a safe external link.
 *
 * Accepts bare domains ("example.com") as well as full URLs, and rejects
 * anything that is not http(s) so a typo cannot create a broken or unsafe
 * link. Returns undefined when no usable address is available.
 */
export function normalizeWebsiteUrl(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  const candidate = trimmed.startsWith("//")
    ? `https:${trimmed}`
    : /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }
    if (!url.hostname) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

/**
 * Placeholder collaborations shown until logos are selected in Sanity.
 * These are fictional marks created for layout preview purposes only.
 */
export const DEMO_COLLABORATIONS: CollaborationDisplayItem[] = [
  {
    id: "demo-nexa",
    name: "Nexa Semiconductor",
    logoSrc: "/images/collaborators/nexa-semiconductor.png",
  },
  {
    id: "demo-orbit",
    name: "Orbit RF Labs",
    logoSrc: "/images/collaborators/orbit-rf-labs.png",
  },
  {
    id: "demo-crystalworks",
    name: "CrystalWorks",
    logoSrc: "/images/collaborators/crystalworks.png",
  },
  {
    id: "demo-voltedge",
    name: "VoltEdge",
    logoSrc: "/images/collaborators/voltedge.png",
  },
  {
    id: "demo-hikari",
    name: "Hikari Devices",
    logoSrc: "/images/collaborators/hikari-devices.png",
  },
  {
    id: "demo-foundry-q",
    name: "Foundry Q",
    logoSrc: "/images/collaborators/foundry-q.png",
  },
];
