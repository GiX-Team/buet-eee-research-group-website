"use client";

import { useMemo, useState } from "react";

import { ActivityEntry } from "@/components/activities/ActivityEntry";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import {
  filterActivitiesByCategory,
  getActivityCategoryFilters,
  shouldShowActivityFilters,
  sortActivities,
  type ActivityCategoryFilter,
} from "@/lib/activities";
import { cn } from "@/lib/utils";
import type { ActivitySummary } from "../../../sanity/types";

type ActivitiesIndexProps = {
  activities: ActivitySummary[];
  /** Accessible name for the list section. Defaults to the News wording. */
  sectionLabel?: string;
  /** Text shown when the archive has no entries at all. */
  emptyMessage?: string;
  /**
   * Shows the category filter tabs and the category label on each entry.
   * Set to false for pages whose entries are not grouped by category.
   */
  showCategories?: boolean;
};

export function ActivitiesIndex({
  activities,
  sectionLabel = "News and activities",
  emptyMessage = "Updates from the group will appear here.",
  showCategories = true,
}: ActivitiesIndexProps) {
  const [category, setCategory] = useState<ActivityCategoryFilter>("all");

  const ordered = useMemo(() => sortActivities(activities), [activities]);
  const filters = useMemo(() => getActivityCategoryFilters(ordered), [ordered]);
  const showFilters = useMemo(
    () => showCategories && shouldShowActivityFilters(ordered),
    [ordered, showCategories],
  );
  const activeCategory = filters.some((filter) => filter.value === category)
    ? category
    : "all";

  const visible = useMemo(
    () => filterActivitiesByCategory(ordered, activeCategory),
    [ordered, activeCategory],
  );

  const withFigureColumn = visible.some((activity) => Boolean(activity.image?.asset));
  const firstEntryId = visible[0]?._id;

  return (
    <>
      {showFilters ? (
        <Reveal immediate variant="fadeUpSubtle">
          <div className="border-t border-border-default bg-surface-subtle py-4">
            <Container as="div">
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filter activities by category"
              >
                {filters.map((filter) => {
                  const isActive = activeCategory === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setCategory(filter.value)}
                      className={cn(
                        "type-overline px-3.5 py-1.5 transition-colors duration-300",
                        isActive
                          ? "bg-text-primary text-text-inverse"
                          : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </Container>
          </div>
        </Reveal>
      ) : null}

      <section
        aria-label={sectionLabel}
        className="bg-surface-base page-content-padding"
      >
        <Container as="div">
          {visible.length > 0 ? (
            <Stagger key={activeCategory} immediate stagger={0.06}>
              {visible.map((activity) => (
                <StaggerItem key={activity._id}>
                  <ActivityEntry
                    activity={activity}
                    withFigureColumn={withFigureColumn}
                    showCategory={showCategories}
                    priority={activity._id === firstEntryId}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Reveal variant="fadeUpSubtle">
              <p className="text-body-sm text-text-secondary">
                {ordered.length === 0
                  ? emptyMessage
                  : "No entries in this category yet."}
              </p>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}

export default ActivitiesIndex;
