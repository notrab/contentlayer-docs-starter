import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/*.mdx",
  fields: {
    title: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: ({ _id }) => _id.replace(".mdx", ""),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "docs",
  documentTypes: [Doc],
});

export default contentLayerConfig;
