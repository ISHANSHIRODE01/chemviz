import { defineField, defineType } from "sanity";

export const element = defineType({
  name: "element",
  title: "Element",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "symbol",
      title: "Symbol",
      type: "string",
    }),
    defineField({
      name: "atomicNumber",
      title: "Atomic Number",
      type: "number",
    }),
    defineField({
      name: "atomicMass",
      title: "Atomic Mass",
      type: "number",
      multipleOf: 0.001,
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(5)
              .max(200)
              .warning("Alt text is required and should be descriptive."),
        },
      ],
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "string",
    }),
    defineType({
      name: "properties",
      title: "Properties",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "value",
              title: "Value",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineType({
      name: "uses",
      title: "Uses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "isotopes",
      title: "Isotopes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "value",
              title: "Value",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineType({
      name: "funFacts",
      title: "Fun Facts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineType({
      name: "quizQuestions",
      title: "Quiz Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
            },
            {
              name: "options",
              title: "Options",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
            },
            {
              name: "correctAnswer",
              title: "Correct Answer",
              type: "number",
            },
          ],
        },
      ],
    }),
  ],
});
