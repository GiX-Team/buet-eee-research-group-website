import { defineField, defineType } from "sanity";

export const collaborationLayout = defineType({
  name: "collaborationLayout",
  title: "Collaboration Logo Layout",
  type: "object",
  fields: [
    defineField({
      name: "columns",
      title: "Columns (tablet and desktop)",
      type: "number",
      description: "1 = a vertical list, one logo after another. Use 2–6 for a grid.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1).max(6),
    }),
    defineField({
      name: "mobileColumns",
      title: "Columns (phone)",
      type: "number",
      description:
        "Number of columns on small screens. Use 1 to keep the vertical list on phones.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1).max(3),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "number",
      description:
        "0 = show every logo. Set a number to limit the visible rows (rows × columns logos are shown).",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0).max(20),
    }),
    defineField({
      name: "logoSize",
      title: "Logo Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "small",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
      },
      initialValue: "left",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      columns: "columns",
      rows: "rows",
      size: "logoSize",
    },
    prepare: ({ columns, rows, size }) => ({
      title: `${columns ?? 1} column${columns === 1 ? "" : "s"} · ${
        rows ? `${rows} row${rows === 1 ? "" : "s"}` : "auto rows"
      }`,
      subtitle: `Logo size: ${size ?? "small"}`,
    }),
  },
});

export default collaborationLayout;
