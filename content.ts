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

export interface ContentModule {
  default: ComponentType<{ components?: Record<string, ComponentType> }>;
  frontmatter: MdxFrontmatter;
}

// Auto-discover all MDX files by content type.
// Adding a new file to these folders makes it immediately available.
const projectModules = import.meta.glob<ContentModule>(
  '../../content/projects/*.mdx',
  { eager: true }
);

const practiceModules = import.meta.glob<ContentModule>(
  '../../content/practice/*.mdx',
  { eager: true }
);

const thinkingModules = import.meta.glob<ContentModule>(
  '../../content/thinking/*.mdx',
  { eager: true }
);

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
}

function buildRegistry(modules: Record<string, ContentModule>) {
  const registry: Record<string, ContentModule> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const slug = slugFromPath(path);
    registry[slug] = mod;
  }
  return registry;
}

const projects  = buildRegistry(projectModules);
const practice  = buildRegistry(practiceModules);
const thinking  = buildRegistry(thinkingModules);

export type ContentType = 'projects' | 'practice' | 'thinking';

export function getContent(type: ContentType, slug: string): ContentModule | null {
  const registry = { projects, practice, thinking }[type];
  return registry[slug] ?? null;
}

export function listContent(type: ContentType): Array<MdxFrontmatter & { slug: string }> {
  const registry = { projects, practice, thinking }[type];
  return Object.entries(registry).map(([slug, mod]) => ({
    slug,
    ...mod.frontmatter,
  }));
}
