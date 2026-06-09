import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const CATEGORIES = [
  {
    id: "tees",
    label: "Tees",
    index: "01",
    descriptor: "Apparel",
    tagline: "Worn convictions.",
    description:
      "Literary references, philosophical figures, and cultural moments — rendered as wearable objects. Each piece is designed as art first, apparel second.",
    detail: "Cotton · Limited runs · Screen printed",
    href: "https://chuckles.store",
    accent: "#2ABCBF",
  },
  {
    id: "cinema-posters",
    label: "Cinema Posters",
    index: "02",
    descriptor: "Print",
    tagline: "Films that stay with you.",
    description:
      "Art-directed prints for the cinema that shaped how we see. Not merchandise. Considered objects for considered spaces.",
    detail: "A2 / A3 · Archival print · Numbered editions",
    href: "https://chuckles.store",
    accent: "#a89f94",
  },
  {
    id: "original-artwork",
    label: "Original Artwork",
    index: "03",
    descriptor: "Fine Art",
    tagline: "One of one.",
    description:
      "Original works from the studio — drawings, paintings, and mixed-media pieces that exist outside any brief. Occasional. Unrepeatable.",
    detail: "Original · Signed · Certificate of authenticity",
    href: "https://chuckles.store",
    accent: "#F5F3F0",
  },
];

export default function Artifacts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-background min-h-screen"
      data-testid="page-artifacts"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight">Objects</h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hidden md:block">
              chuckles.store
            </p>
          </div>
          <div className="h-px bg-white/10 mb-6" />
          <p className="text-sm font-sans leading-relaxed text-muted-foreground max-w-md">
            Things the studio makes because it has to. Not a shop — an extension of a point of view.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="group bg-background flex flex-col relative overflow-hidden"
              data-testid={`artifact-category-${cat.id}`}
            >
              {/* Image area */}
              <div
                className="aspect-[3/4] relative overflow-hidden flex items-end p-8"
                style={{
                  background: `linear-gradient(160deg, hsl(0 0% ${6 + i * 2}%) 0%, hsl(0 0% ${3 + i}%) 100%)`,
                }}
              >
                {/* Ghost index number */}
                <span
                  className="absolute top-6 right-8 font-serif leading-none select-none transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    fontSize: "clamp(5rem, 14vw, 10rem)",
                    color: cat.accent,
                    opacity: 0.07,
                  }}
                >
                  {cat.index}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${cat.accent}18 0%, transparent 70%)`,
                  }}
                />

                {/* Bottom label in image */}
                <div className="relative z-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.35em] mb-2 transition-colors duration-300"
                    style={{ color: cat.accent }}
                  >
                    {cat.descriptor}
                  </p>
                  <p className="font-serif text-3xl md:text-4xl leading-tight">
                    {cat.label}
                  </p>
                </div>
              </div>

              {/* Text content */}
              <div className="p-8 flex flex-col flex-1 border-t border-white/8">
                <p className="font-serif italic text-lg text-muted-foreground mb-4 leading-snug">
                  {cat.tagline}
                </p>
                <p className="text-sm font-sans leading-relaxed text-muted-foreground flex-1">
                  {cat.description}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
                    {cat.detail}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: cat.accent }}
                  >
                    View ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-artifacts"
          >
            ← Studio
          </Link>
          <a
            href="https://chuckles.store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-store"
          >
            chuckles.store ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}
