import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";

import { allDocs } from ".contentlayer/data";
import type { Doc } from ".contentlayer/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface DocPageProps {
  doc: Doc;
  source: MDXRemoteSerializeResult;
}

const getPagePath = ({ slug }: { slug: string }) => {
  const parsedSlug = Array.isArray(slug) ? slug.join("/") : slug;

  return slug ? parsedSlug : "/";
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const pagePath = getPagePath({
    slug: slug as string,
  });

  const doc = allDocs.find((doc) => doc._raw.flattenedPath === pagePath);

  // @ts-expect-error
  const mdxSource = await serialize((doc?.body as string) || ``);

  return {
    props: {
      doc,
      source: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: allDocs.map((_) => `/${_._raw.flattenedPath}`),
  fallback: false,
});

const DocPage: React.FC<DocPageProps> = ({ doc, source }) => {
  return <pre>{JSON.stringify({ doc, source }, null, 2)}</pre>;
};

export default DocPage;
