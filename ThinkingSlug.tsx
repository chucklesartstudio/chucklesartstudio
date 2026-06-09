import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { getContent, listContent } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MdxComponents';

function getRelated(currentSlug: string, count = 2) {
  return listContent('thinking')
    .filter((e) => e.slug !== currentSlug)
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    })
    .slice(0, count);
}

export default function ThinkingSlug() {
  const [, params] = useRoute('/thinking/:slug');
  const slug = params?.slug ?? '';
  const mod = getContent('thinking', slug);

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-2xl">Essay not found.</p>
        <Link href="/thinking" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
          ← Thinking
        </Link>
      </div>
    );
  }

  const { default: MdxContent, frontmatter: fm } = mod;
  const related = getRelated(slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <header className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <Link href="/thinking" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block">
          ← Thinking
        </Link>

        <div className="flex items-center gap-6 mb-6">
          {fm.tag && (
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
              {fm.tag}
            </p>
          )}
          {fm.date && (
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
              {new Date(fm.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
            </p>
          )}
        </div>

        <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight mb-8">
          {fm.title}
        </h1>

        {fm.preview && (
          <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            {fm.preview}
          </p>
        )}

        <div className="mt-12 border-t border-white/10" />
      </header>

      {/* Body */}
      <article className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <MdxContent components={mdxComponents} />
      </article>

      {/* Read Next */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 md:px-12 max-w-4xl mx-auto pb-40"
        >
          <div className="border-t border-white/10 pt-16 mb-12">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Read Next
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/8">
            {related.map((essay, i) => (
              <motion.div
                key={essay.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/thinking/${essay.slug}`}>
                  <div className="group bg-background p-8 md:p-10 h-full flex flex-col gap-5 hover:bg-white/[0.025] transition-colors duration-300 cursor-pointer">
                    {essay.tag && (
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {essay.tag}
                      </p>
                    )}

                    <h3 className="font-serif text-2xl md:text-3xl leading-snug tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                      {essay.title}
                    </h3>

                    {essay.preview && (
                      <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
                        {essay.preview}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {essay.date && (
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                          {new Date(essay.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                      <span className="text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 ml-auto">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
