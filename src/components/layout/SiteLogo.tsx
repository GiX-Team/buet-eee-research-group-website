import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Link as LinkField } from "../../../sanity/types";

const LOGO_SRC = "/images/nc-group-logo.svg";
const INSTITUTION_LOGO_SRC = "/images/buet-logo.png";

/** Intrinsic dimensions of the NC Group wordmark SVG. */
const LOGO_WIDTH = 830;
const LOGO_HEIGHT = 305;

/** Used when the CMS has no institution link yet. */
const DEFAULT_INSTITUTION_HREF = "https://www.buet.ac.bd/";
const DEFAULT_INSTITUTION_LABEL = "Bangladesh University of Engineering and Technology";

const logoLinkClassName =
  "inline-flex items-center transition-opacity duration-300 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary";

type SiteLogoProps = {
  siteName?: string;
  className?: string;
  href?: string;
  /** CMS link for the institution logo. Falls back to the BUET website. */
  partnerLink?: LinkField | null;
  size?: "header" | "footer";
};

const GROUP_LOGO_HEIGHT = {
  header: "h-[34px] sm:h-[40px] lg:h-[38px]",
  footer: "h-[34px] sm:h-[40px] lg:h-[36px]",
} as const;

const INSTITUTION_LOGO_HEIGHT = {
  header: "h-[30px] sm:h-[36px] lg:h-[40px]",
  footer: "h-[30px] sm:h-[36px]",
} as const;

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function SiteLogo({
  siteName = "NC Group",
  className,
  href = "/",
  partnerLink,
  size = "header",
}: SiteLogoProps) {
  const partnerHref = partnerLink?.href?.trim() || DEFAULT_INSTITUTION_HREF;
  const partnerLabel = partnerLink?.label?.trim() || DEFAULT_INSTITUTION_LABEL;
  const partnerOpenInNewTab = partnerLink?.openInNewTab ?? true;
  const partnerIsExternal = isExternalHref(partnerHref);
  const partnerRel = partnerOpenInNewTab ? "noopener noreferrer" : undefined;
  const partnerTarget = partnerOpenInNewTab ? "_blank" : undefined;
  const partnerAriaLabel = `${partnerLabel} website${
    partnerOpenInNewTab ? " (opens in a new tab)" : ""
  }`;

  const partnerImage = (
    <Image
      src={INSTITUTION_LOGO_SRC}
      alt={partnerLabel}
      width={1024}
      height={1024}
      className={cn(
        "w-auto max-w-[min(24vw,4.75rem)] shrink-0 object-contain sm:max-w-[5.5rem] lg:max-w-none",
        INSTITUTION_LOGO_HEIGHT[size],
      )}
      sizes="(max-width: 640px) 76px, 160px"
    />
  );

  return (
    <div
      className={cn(
        "inline-flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(logoLinkClassName, "min-w-0 max-w-full")}
        aria-label={`${siteName} home`}
      >
        <Image
          src={LOGO_SRC}
          alt={`${siteName} logo`}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority={size === "header"}
          unoptimized
          className={cn(
            "w-auto max-w-[min(58vw,12.5rem)] shrink-0 object-contain sm:max-w-none",
            GROUP_LOGO_HEIGHT[size],
          )}
        />
      </Link>

      <span
        aria-hidden
        className={cn(
          "w-px shrink-0 bg-border-strong",
          size === "header" ? "h-5 sm:h-6 lg:h-7" : "h-5 sm:h-6",
        )}
      />

      {partnerIsExternal || partnerOpenInNewTab ? (
        <a
          href={partnerHref}
          target={partnerTarget}
          rel={partnerRel}
          aria-label={partnerAriaLabel}
          className={logoLinkClassName}
        >
          {partnerImage}
        </a>
      ) : (
        <Link
          href={partnerHref}
          aria-label={partnerAriaLabel}
          className={logoLinkClassName}
        >
          {partnerImage}
        </Link>
      )}
    </div>
  );
}

export default SiteLogo;
