import { ActivitiesIndex } from "@/components/activities/ActivitiesIndex";
import { ActivitiesPageHeader } from "@/components/activities/ActivitiesPageHeader";
import { formatActivityArchiveStat } from "@/lib/activities";
import { getSiteSettings } from "@/lib/cms";
import { STATIC_HIGHLIGHTS } from "@/lib/highlights";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Highlights",
    description:
      "Highlights from NC Group at BUET: awards, publications, collaborations, events, and milestones in semiconductor device research.",
    siteSettings: settings,
    path: "/highlights",
  });
}

export default async function HighlightsPage() {
  const stats = formatActivityArchiveStat(STATIC_HIGHLIGHTS);

  return (
    <div className="-mt-[var(--layout-header-height)] bg-gradient-to-b from-surface-gradient-start from-0% to-surface-base to-[13.613%]">
      <ActivitiesPageHeader
        eyebrow="Highlights"
        stats={stats || undefined}
        heading="Selected moments from the group."
      />
      <ActivitiesIndex
        activities={STATIC_HIGHLIGHTS}
        sectionLabel="Highlights"
        emptyMessage="Highlights from the group will appear here."
        showCategories={false}
      />
    </div>
  );
}
