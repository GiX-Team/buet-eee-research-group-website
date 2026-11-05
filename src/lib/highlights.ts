import type { PortableTextBlock } from "@portabletext/types";

import type { ActivitySummary, SanityImage } from "../../sanity/types";

/**
 * Placeholder entries for the Highlights page.
 *
 * These are intentionally local so the page can be previewed before the
 * Highlights content type is added to Sanity. Replace this module with a
 * CMS-backed fetcher when the content model is ready.
 */
function paragraph(text: string, key: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${key}-text`,
        text,
        marks: [],
      },
    ],
  };
}

/**
 * Builds an image reference for a file in `public/images/highlights`.
 *
 * Static files have no Sanity asset `_ref`, so the image component renders
 * `asset.url` directly while keeping the same frame, sizing, and aspect-ratio
 * behavior as CMS images on the News page.
 */
function localImage(
  fileName: string,
  width: number,
  height: number,
  alt: string,
): SanityImage {
  return {
    asset: {
      _id: `highlight-image-${fileName}`,
      url: `/images/highlights/${fileName}`,
      metadata: {
        dimensions: {
          width,
          height,
          aspectRatio: width / height,
        },
      },
    },
    alt,
  };
}

export const STATIC_HIGHLIGHTS: ActivitySummary[] = [
  {
    _id: "highlight-sample-conference",
    title: "GaN power device research presented at a leading device conference",
    slug: "gan-power-device-research-presented",
    date: "2026-10-14",
    category: "publication",
    description: [
      paragraph(
        "Group members shared recent results on wide-bandgap power devices with the international device research community.",
        "highlight-conference-body",
      ),
    ],
    image: localImage(
      "gan-power-device.png",
      1000,
      1000,
      "Cross-section and layer schematic of a self-aligned GaN transistor.",
    ),
    displayOrder: 0,
    isPublished: true,
  },
  {
    _id: "highlight-sample-award",
    title: "Best student paper award for wide-bandgap device modeling",
    slug: "best-student-paper-award",
    date: "2026-08-21",
    category: "award",
    description: [
      paragraph(
        "A doctoral researcher received a best student paper award for modeling work on wide-bandgap semiconductor devices.",
        "highlight-award-body",
      ),
    ],
    image: localImage(
      "device-modeling-award.png",
      1000,
      1000,
      "Measured and simulated output characteristics of a GaN device.",
    ),
    displayOrder: 1,
    isPublished: true,
  },
  {
    _id: "highlight-sample-collaboration",
    title: "New collaboration launched on GaN RF reliability",
    slug: "new-collaboration-gan-rf-reliability",
    date: "2026-05-09",
    category: "collaboration",
    description: [
      paragraph(
        "The group began a new collaboration focused on the reliability and performance of GaN RF devices.",
        "highlight-collaboration-body",
      ),
    ],
    image: localImage(
      "gan-rf-collaboration.png",
      1000,
      1000,
      "GaN-based logic devices and their circuit symbols.",
    ),
    displayOrder: 2,
    isPublished: true,
  },
  {
    _id: "highlight-sample-workshop",
    title: "Group hosts workshop on semiconductor device physics",
    slug: "semiconductor-device-physics-workshop",
    date: "2026-02-18",
    category: "event",
    description: [
      paragraph(
        "Students and researchers gathered for a workshop on device physics, characterization, and simulation.",
        "highlight-workshop-body",
      ),
    ],
    image: localImage(
      "device-physics-workshop.jpg",
      1000,
      750,
      "A group member presenting wide-bandgap device research at a conference.",
    ),
    displayOrder: 3,
    isPublished: true,
  },
  {
    _id: "highlight-sample-publications",
    title: "Two journal papers published on GaN HEMT reliability",
    slug: "gan-hemt-reliability-publications",
    date: "2025-11-27",
    category: "publication",
    description: [
      paragraph(
        "Two new journal articles report the group's latest findings on the reliability of GaN HEMTs.",
        "highlight-publications-body",
      ),
    ],
    image: localImage(
      "gan-hemt-publications.png",
      1000,
      1000,
      "Layer stack of a GaN device fabricated by the group.",
    ),
    displayOrder: 4,
    isPublished: true,
  },
  {
    _id: "highlight-sample-new-researchers",
    title: "New graduate researchers join the group",
    slug: "new-graduate-researchers-join",
    date: "2025-09-03",
    category: "news",
    description: [
      paragraph(
        "The group welcomed a new cohort of graduate researchers working across device fabrication, modeling, and circuits.",
        "highlight-new-researchers-body",
      ),
    ],
    image: localImage("new-researchers.jpg", 1000, 330, "The NC Group research team."),
    displayOrder: 5,
    isPublished: true,
  },
];
