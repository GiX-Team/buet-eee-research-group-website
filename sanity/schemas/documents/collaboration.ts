import { defineField, defineType } from "sanity";

export const collaboration = defineType({
  name: "collaboration",
  title: "Collaboration",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company / Organisation Name",
      type: "string",
      validation: (rule) => rule.required().error("Name is required."),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      description:
        "Small logo shown on the homepage. Upload a PNG with a transparent background and a wide or square shape.",
      validation: (rule) =>
        rule.custom((value) => {
          const image = value as { asset?: { _ref?: string } } | undefined;
          const assetRef = image?.asset?._ref;
          if (!assetRef) {
            return "A logo is required.";
          }
          if (!assetRef.endsWith("-png")) {
            return "Upload the logo as a PNG file.";
          }
          return true;
        }),
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      description:
        "The company website. When set, clicking this logo on the homepage opens this address.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;

          try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:"
              ? true
              : "Enter a full website address starting with http:// or https://.";
          } catch {
            return "Enter a valid website address, e.g. https://example.com.";
          }
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      description:
        "When enabled, clicking this logo opens the website in a new tab. Turn off to open it in the current tab.",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Used when this collaboration appears in lists outside the homepage.",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description:
        "Inactive collaborations stay in the CMS but are hidden from the website.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "websiteUrl",
      media: "logo",
    },
  },
});

export default collaboration;
