declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export interface MdxFrontmatter {
    title?: string;
    slug?: string;
    date?: string;
    year?: string;
    scope?: string;
    tagline?: string;
    tag?: string;
    preview?: string;
    medium?: string;
    dimensions?: string;
    deliverables?: string[];
    [key: string]: unknown;
  }

  export const frontmatter: MdxFrontmatter;

  const MDXComponent: ComponentType<{
    components?: Record<string, ComponentType>;
  }>;
  export default MDXComponent;
}
