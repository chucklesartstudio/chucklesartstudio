import { motion } from "framer-motion";
import { Link } from "wouter";
import { listContent } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

function formatDate(raw: string): string {
  return new Date(raw).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
  });
}

function padNum(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Thinking() {
  const essays = listContent("thinking").sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  const featured = essays[0];
  const rest = essays.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-background min-h-screen"
      data-testid="page-thinking"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-32">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight">Thinking</h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hidden md:block">
              {essays.length} {essays.length === 1 ? "Essay" : "Essays"}
            </p>
          </div>
          <div className="h-px bg-white/10 mb-6" />
          <p className="text-sm font-sans leading-relaxed text-muted-foreground max-w-md">
            Notes on design, culture, and conviction. On the objects, systems,
            and decisions that shaped how we see.
          </p>
        </motion.div>

        {/* ── Empty state ── */}
        {essays.length === 0 && (
          <p className="text-sm text-muted-foreground">No essays yet.</p>
        )}

        {/* ── Featured article ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Featured
            </p>
            <Link href={`/thinking/${featured.slug}`}>
              <div className="group cursor-pointer">
                <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-16 items-start pb-16 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      {featured.tag && (
                        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 border border-white/10 px-2.5 py-1">
                          {featured.tag}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6 group-hover:text-muted-foreground transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.preview && (
                      <p className="font-sans text-base leading-relaxed text-muted-foreground max-w-2xl mb-8">
                        {featured.preview}
                      </p>
                    )}
                    <div className="flex items-center gap-6">
                      {featured.date && (
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
                          {formatDate(featured.date)}
                        </span>
                      )}
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300 ml-auto">
                        Read ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Article list ── */}
        {rest.length > 0 && (
          <ol className="divide-y divide-white/8">
            {rest.map((essay, i) => (
              <motion.li
                key={essay.slug}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Link href={`/thinking/${essay.slug}`}>
                  <div
                    className="w-full text-left group py-8 md:py-10 grid md:grid-cols-[56px_1fr_160px] gap-4 md:gap-8 items-start hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                    data-testid={`essay-row-${padNum(i + 2)}`}
                  >
                    {/* Index number */}
                    <span className="font-serif text-sm text-muted-foreground/30 pt-1 hidden md:block">
                      {padNum(i + 2)}
                    </span>

                    {/* Main */}
                    <div className="min-w-0">
                      {essay.tag && (
                        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-3 inline-block">
                          {essay.tag}
                        </span>
                      )}
                      <h2 className="font-serif text-xl md:text-2xl leading-snug tracking-tight mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                        {essay.title}
                      </h2>
                      {essay.preview && (
                        <p className="text-sm font-sans leading-relaxed text-muted-foreground/70 line-clamp-2">
                          {essay.preview}
                        </p>
                      )}
                    </div>

                    {/* Meta — right column */}
                    <div className="md:text-right space-y-2 pt-0.5 flex md:flex-col flex-row gap-4 md:gap-0">
                      {essay.date && (
                        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/40">
                          {formatDate(essay.date)}
                        </p>
                      )}
                      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/25 group-hover:text-muted-foreground/60 transition-colors md:mt-auto hidden md:block">
                        Read ↗
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ol>
        )}

        {/* ── Footer ── */}
        <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-thinking"
          >
            ← Studio
          </Link>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Chuckles · Navi Mumbai
          </p>
        </div>
      </div>
    </motion.div>
  );
}
