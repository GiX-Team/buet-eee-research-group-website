import Image from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  DEMO_COLLABORATIONS,
  normalizeWebsiteUrl,
  type CollaborationDisplayItem,
} from "@/lib/collaborations";
import { cn } from "@/lib/utils";
import type { Collaboration, CollaborationLayout } from "../../../sanity/types";

const LOGO_SIZE_CLASSES = {
  small: "h-7 sm:h-8",
  medium: "h-10 sm:h-12",
  large: "h-14 sm:h-16",
} as const;

const LOGO_MAX_WIDTH_CLASSES = {
  small: "max-w-[8.5rem]",
  medium: "max-w-[12rem]",
  large: "max-w-[16rem]",
} as const;

function clampInteger(
  value: number | undefined,
  min: number,
  max: number,
  fallback: number,
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

type CollaborationLogoProps = {
  item: CollaborationDisplayItem;
  size: keyof typeof LOGO_SIZE_CLASSES;
};

function CollaborationLogo({ item, size }: CollaborationLogoProps) {
  const logo = item.logo ? (
    <SanityImage
      image={item.logo}
      alt={item.name}
      width={320}
      fit="max"
      className="h-full w-auto max-w-full object-contain"
    />
  ) : item.logoSrc ? (
    <Image
      src={item.logoSrc}
      alt={item.name}
      width={240}
      height={64}
      // Demo files are replaced in place during design work. Bypassing the
      // image optimizer means a same-name replacement is picked up on reload
      // instead of being masked by Next's optimized-image cache.
      unoptimized
      className="h-full w-auto max-w-full object-contain"
    />
  ) : null;

  if (!logo) return null;

  const websiteUrl = normalizeWebsiteUrl(item.websiteUrl);
  const openInNewTab = item.openInNewTab !== false;

  const content = (
    <span
      className={cn(
        "flex items-center",
        LOGO_SIZE_CLASSES[size],
        LOGO_MAX_WIDTH_CLASSES[size],
      )}
    >
      {logo}
    </span>
  );

  if (!websiteUrl) return content;

  return (
    <a
      href={websiteUrl}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={`${item.name} website${openInNewTab ? " (opens in a new tab)" : ""}`}
      className="inline-flex transition-opacity duration-300 hover:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
    >
      {content}
    </a>
  );
}

type CollaborationsSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  collaborations?: Collaboration[];
  layout?: CollaborationLayout;
};

export function CollaborationsSection({
  eyebrow = "06 / COLLABORATIONS",
  heading,
  description,
  collaborations,
  layout,
}: CollaborationsSectionProps) {
  // Sanity returns null for empty fields, so defaults must handle null too.
  const cmsCollaborations = collaborations ?? [];
  const resolvedHeading = heading ?? "Collaborations";
  const hasCmsEntries = cmsCollaborations.length > 0;

  const items: CollaborationDisplayItem[] = hasCmsEntries
    ? cmsCollaborations
        .filter((item) => item.isActive !== false && Boolean(item.logo?.asset))
        .map((item) => ({
          id: item._id,
          name: item.name,
          websiteUrl: item.websiteUrl,
          openInNewTab: item.openInNewTab,
          logo: item.logo,
        }))
    : DEMO_COLLABORATIONS;

  if (items.length === 0) return null;

  const columns = clampInteger(layout?.columns, 1, 6, 1);
  const mobileColumns = clampInteger(layout?.mobileColumns, 1, 3, 1);
  const rows = clampInteger(layout?.rows, 0, 20, 0);
  const size = layout?.logoSize ?? "small";
  const alignment = layout?.alignment === "center" ? "center" : "left";

  const visibleItems = rows > 0 ? items.slice(0, columns * rows) : items;

  const gridStyle = {
    "--collaboration-columns": columns,
    "--collaboration-mobile-columns": mobileColumns,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="collaborations-heading"
      className="section-padding-y bg-surface-base"
    >
      <Container as="div" className="space-y-10">
        <Stagger className="space-y-10">
          <StaggerItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </StaggerItem>
          {resolvedHeading ? (
            <StaggerItem>
              <h2
                id="collaborations-heading"
                className="text-section-title text-text-primary"
              >
                {resolvedHeading}
              </h2>
            </StaggerItem>
          ) : null}
          {description ? (
            <StaggerItem>
              <p className="max-w-[520px] text-body-md text-text-secondary">
                {description}
              </p>
            </StaggerItem>
          ) : null}
        </Stagger>

        <div
          className={cn(
            "collaboration-grid gap-x-8 gap-y-6",
            alignment === "center" ? "justify-items-center" : "justify-items-start",
          )}
          style={gridStyle}
        >
          {visibleItems.map((item) => (
            <div key={item.id} className="flex items-center">
              <CollaborationLogo item={item} size={size} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CollaborationsSection;
