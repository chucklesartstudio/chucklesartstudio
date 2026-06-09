import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { listContent, type MdxFrontmatter } from "@/lib/content";

// ── Animation helpers ─────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  aspect,
  children,
  factor = 40,
}: {
  aspect: string;
  children: React.ReactNode;
  factor?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-factor, factor]);

  return (
    <div ref={ref} className="relative overflow-hidden w-full" style={{ aspectRatio: aspect }}>
      <motion.div className="absolute inset-[-8%]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// ── Decorative gradient plates — cycle by index ────────────────────────────

const GRADIENTS = [
  "linear-gradient(160deg, #1a1208 0%, #0d0b07 60%, #191510 100%)",
  "linear-gradient(135deg, #0f0e0c 0%, #1c1610 50%, #111009 100%)",
  "linear-gradient(180deg, #13110e 0%, #0a0906 100%)",
  "linear-gradient(150deg, #0c1014 0%, #0a0d10 55%, #0e1216 100%)",
  "linear-gradient(145deg, #100e14 0%, #0c0a10 50%, #14101a 100%)",
];

function gradient(i: number) {
  return GRADIENTS[i % GRADIENTS.length];
}

// ── Roman numeral label ───────────────────────────────────────────────────

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X",
               "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];

function roman(n: number) {
  return ROMAN[n] ?? String(n + 1);
}

// ── Entry metadata strip ──────────────────────────────────────────────────

function EntryMeta({ entry }: { entry: MdxFrontmatter & { slug: string } }) {
  const date = entry.date
    ? new Date(entry.date).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
    : null;
  const parts = [entry.medium, entry.dimensions, date].filter(Boolean);
  if (!parts.length) return null;
  return (
    <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground/50">
      {parts.join(" · ")}
    </p>
  );
}

// ── Layout A — wide image left, text floats right ─────────────────────────

function LayoutA({ entry, index }: { entry: MdxFrontmatter & { slug: string }; index: number }) {
  return (
    <section className="mb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link href={`/practice/${entry.slug}`}>
          <div className="group grid md:grid-cols-[1fr_340px] gap-0 items-start cursor-pointer">
            {/* Image */}
            <Reveal>
              <ParallaxImage aspect="3/2">
                <div className="absolute inset-0" style={{ background: gradient(index) }}>
                  <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.3) 28px, rgba(255,255,255,0.3) 29px)",
                    }}
                  />
                  <div className="absolute bottom-8 left-8">
                    <p
                      className="font-serif leading-none select-none"
                      style={{ fontSize: "clamp(4rem, 14vw, 10rem)", color: "#2ABCBF", opacity: 0.1, letterSpacing: "-0.04em" }}
                    >
                      {roman(index)}
                    </p>
                  </div>
                </div>
              </ParallaxImage>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.15}>
              <div className="md:pt-16 md:pl-14 pt-8 space-y-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Note {roman(index)}
                </p>
                {entry.tagline ? (
                  <p className="font-serif text-lg md:text-xl leading-[1.8] text-foreground/90 group-hover:text-foreground/70 transition-colors duration-300">
                    {entry.tagline}
                  </p>
                ) : (
                  <p className="font-serif text-lg md:text-xl leading-[1.8] text-foreground/90 group-hover:text-foreground/70 transition-colors duration-300">
                    {entry.title}
                  </p>
                )}
                <EntryMeta entry={entry} />
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300">
                  Read ↗
                </p>
              </div>
            </Reveal>
          </div>
        </Link>
      </div>
    </section>
  );
}

// ── Layout B — text left, portrait image right ────────────────────────────

function LayoutB({ entry, index }: { entry: MdxFrontmatter & { slug: string }; index: number }) {
  return (
    <section className="mb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link href={`/practice/${entry.slug}`}>
          <div className="group grid md:grid-cols-[1fr_1fr] gap-16 items-center cursor-pointer">
            {/* Text */}
            <Reveal>
              <div className="space-y-8 md:pr-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Note {roman(index)}
                </p>
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.5] tracking-tight text-foreground/95 group-hover:text-foreground/75 transition-colors duration-300">
                  {entry.tagline ?? entry.title}
                </p>
                <div className="w-8 h-px bg-white/20" />
                <EntryMeta entry={entry} />
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300">
                  Read ↗
                </p>
              </div>
            </Reveal>

            {/* Portrait image */}
            <Reveal delay={0.1}>
              <ParallaxImage aspect="4/5" factor={30}>
                <div className="absolute inset-0" style={{ background: gradient(index) }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p
                      className="font-serif leading-none select-none"
                      style={{
                        fontSize: "clamp(5rem, 18vw, 13rem)",
                        color: "#F5F3F0",
                        opacity: 0.035,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {roman(index)}
                    </p>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: "#2ABCBF", opacity: 0.25 }}
                  />
                </div>
              </ParallaxImage>
            </Reveal>
          </div>
        </Link>
      </div>
    </section>
  );
}

// ── Layout C — full-width image, centred text below ───────────────────────

function LayoutC({ entry, index }: { entry: MdxFrontmatter & { slug: string }; index: number }) {
  return (
    <section className="mb-40">
      <Link href={`/practice/${entry.slug}`}>
        <div className="group cursor-pointer">
          {/* Full-bleed image */}
          <Reveal>
            <div className="w-full mb-14">
              <ParallaxImage aspect="21/9" factor={50}>
                <div className="absolute inset-0" style={{ background: gradient(index) }}>
                  <div className="absolute inset-0 flex items-end justify-end pr-12 pb-10">
                    <p
                      className="font-serif leading-none select-none"
                      style={{
                        fontSize: "clamp(4rem, 12vw, 9rem)",
                        color: "#2ABCBF",
                        opacity: 0.08,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {roman(index)}
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-px h-28" style={{ backgroundColor: "#2ABCBF", opacity: 0.15 }} />
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </Reveal>

          {/* Centred text */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto px-6 md:px-0 text-center space-y-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Note {roman(index)}
              </p>
              <p className="font-serif text-xl md:text-2xl leading-[1.75] text-foreground/90 group-hover:text-foreground/70 transition-colors duration-300">
                {entry.tagline ?? entry.title}
              </p>
              <EntryMeta entry={entry} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300">
                Read ↗
              </p>
            </div>
          </Reveal>
        </div>
      </Link>
    </section>
  );
}

const LAYOUTS = [LayoutA, LayoutB, LayoutC] as const;

// ── Main page ──────────────────────────────────────────────────────────────

export default function Practice() {
  const entries = listContent("practice").sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background min-h-screen"
      data-testid="page-practice"
    >
      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <Reveal>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Practice</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              {entries.length > 0
                ? new Date(entries[0].date ?? "").getFullYear() || "2026"
                : "2026"}
            </p>
          </div>
          <div className="h-px bg-white/10" />
        </Reveal>
      </div>

      {/* ── Empty state ── */}
      {entries.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-40">
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        </div>
      )}

      {/* ── Entries ── */}
      {entries.map((entry, i) => {
        const Layout = LAYOUTS[i % LAYOUTS.length];
        return <Layout key={entry.slug} entry={entry} index={i} />;
      })}

      {/* ── Footer ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <Reveal>
          <div className="h-px bg-white/10 mb-10" />
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-back-practice"
            >
              ← Studio
            </Link>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Chuckles · Navi Mumbai
            </p>
          </div>
        </Reveal>
      </div>
    </motion.div>
  );
}
