import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MdxComponents';

export default function WorkSlug() {
  const [, params] = useRoute('/work/:slug');
  const slug = params?.slug ?? '';
  const mod = getContent('projects', slug);

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-2xl">Project not found.</p>
        <Link href="/" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Work
        </Link>
      </div>
    );
  }

  const { default: MdxContent, frontmatter: fm } = mod;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <header className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <Link href="/" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block">
          ← Work
        </Link>

        {fm.scope && (
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
            {fm.scope}
          </p>
        )}

        <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight mb-6">
          {fm.title}
        </h1>

        {fm.tagline && (
          <p className="font-serif text-xl md:text-2xl text-muted-foreground italic">
            {fm.tagline}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-3">
          {fm.year && (
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">Year</p>
              <p className="text-sm font-sans">{fm.year}</p>
            </div>
          )}
          {fm.scope && (
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">Scope</p>
              <p className="text-sm font-sans">{fm.scope}</p>
            </div>
          )}
          {Array.isArray(fm.deliverables) && fm.deliverables.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">Deliverables</p>
              <p className="text-sm font-sans">{fm.deliverables.join(', ')}</p>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <article className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <MdxContent components={mdxComponents} />
      </article>
    </motion.div>
  );
}
