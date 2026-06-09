import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MdxComponents';

export default function PracticeSlug() {
  const [, params] = useRoute('/practice/:slug');
  const slug = params?.slug ?? '';
  const mod = getContent('practice', slug);

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-2xl">Entry not found.</p>
        <Link href="/practice" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
          ← Practice
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
        <Link href="/practice" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block">
          ← Practice
        </Link>

        {fm.date && (
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
            {new Date(fm.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
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

        {/* Medium / dimensions */}
        {(fm.medium || fm.dimensions) && (
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-3">
            {fm.medium && (
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">Medium</p>
                <p className="text-sm font-sans">{fm.medium}</p>
              </div>
            )}
            {fm.dimensions && (
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">Dimensions</p>
                <p className="text-sm font-sans">{fm.dimensions}</p>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Body */}
      <article className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <MdxContent components={mdxComponents} />
      </article>
    </motion.div>
  );
}
