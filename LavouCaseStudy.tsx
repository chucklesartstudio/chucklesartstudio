import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function RevealGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const LAVOU_COLORS = [
  { name: "Espresso Black", hex: "#1A1A1A", role: "Main typography, logo text" },
  { name: "Dark Chocolate", hex: "#6B3E2E", role: "Secondary text, accents" },
  { name: "Caramel Gold", hex: "#D8A15B", role: "Highlights, dividers" },
  { name: "Warm Custard", hex: "#E8C9A0", role: "Background fills, patterns" },
  { name: "Parchment", hex: "#F5F3F0", role: "Main background" },
];

const LOGO_CONCEPTS = [
  { num: "01", desc: "Minimal line-art mark" },
  { num: "02", desc: "Script-driven warmth" },
  { num: "03", desc: "Heritage stamp format" },
  { num: "04", desc: "Illustrated wordmark" },
  { num: "05", desc: "Geometric abstraction" },
  { num: "06", desc: "Integrated illustration" },
];

const SCOPE_ITEMS = [
  {
    num: "01",
    title: "Logo System",
    detail: "Primary wordmark, logo variants across 4 background colours, usage guidelines, and spacing rules.",
  },
  {
    num: "02",
    title: "Brand Guidelines",
    detail: "Colour palette (6 values), typography system, illustration direction, packaging mockups, and do/don't rules.",
  },
  {
    num: "03",
    title: "Main Menu",
    detail: "3-page print-ready menu spanning 6 product categories with full illustration and layout design.",
  },
  {
    num: "04",
    title: "Seasonal Menus",
    detail: "Mother's Day and Summer special menus — brand-coherent but emotionally distinct for each occasion.",
  },
];

export default function LavouCaseStudy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background pt-24"
      data-testid="page-lavou-case-study"
    >
      {/* ── Back nav ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-0">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-block"
          data-testid="link-back"
        >
          ← Back to Studio
        </Link>
      </div>

      {/* ── Hero Header ── */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Case Study &nbsp;·&nbsp; Brand Design &nbsp;·&nbsp; 2026
          </p>
        </Reveal>
        <Reveal>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif leading-[0.95] tracking-tight mb-12">
            Lavou<br />
            <span className="italic text-muted-foreground">Artisanal</span><br />
            Donuts & Bakes
          </h1>
        </Reveal>
        <RevealGroup className="grid grid-cols-3 md:grid-cols-3 gap-0 border-t border-white/10 pt-8">
          {[
            { label: "Client", value: "Lavou Bakery" },
            { label: "Scope", value: "Brand Identity, Menus" },
            { label: "Year", value: "2026" },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="pr-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-2">{item.label}</span>
              <span className="text-sm tracking-wide">{item.value}</span>
            </motion.div>
          ))}
        </RevealGroup>
      </header>

      {/* ── Divider line ── */}
      <div className="w-full h-px bg-white/8" />

      {/* ── The Brief ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">The Brief</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-[1.15] tracking-tight">
            A bakery that feels like{" "}
            <span className="italic text-muted-foreground">refined indulgence</span>
          </h2>
        </Reveal>
        <div className="space-y-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Challenge</p>
            <p className="text-lg font-serif leading-relaxed text-muted-foreground">
              Create a brand identity for a first-generation artisanal bakery that communicates craft,
              warmth, and premium quality — without leaning on tired bakery clichés.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 mt-10">Approach</p>
            <p className="text-base font-sans leading-relaxed text-muted-foreground">
              Lavou came to us as a new artisanal bakery with a clear personality but no visual language
              to express it. They needed a complete brand identity — one that balanced premium positioning
              with genuine warmth. Minimal but never cold. Elegant but never stuffy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/10">
        <RevealGroup className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { num: "6+", label: "Logo Concepts" },
            { num: "3", label: "Menu Formats" },
            { num: "5", label: "Brand Documents" },
            { num: "100%", label: "Bespoke Design" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="border-r border-white/10 last:border-0 px-8 first:pl-0 last:pr-0 py-4"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <p className="text-5xl md:text-6xl font-serif mb-3" style={{ color: "#D8A15B" }}>{stat.num}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* ── Logo Exploration ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Logo Exploration</p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            Six directions.<br />
            <span className="italic text-muted-foreground">One winner.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-sans leading-relaxed text-muted-foreground">
            We explored a wide range of visual vocabularies — from minimal line-art to script-driven warmth
            to heritage stamp formats — before converging on the direction that captured Lavou's spirit most completely.
          </p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/8">
          {LOGO_CONCEPTS.map((c) => (
            <motion.div
              key={c.num}
              variants={fadeUp}
              className="bg-background group relative overflow-hidden aspect-[4/3] flex flex-col justify-end p-8"
              data-testid={`logo-concept-${c.num}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[8rem] md:text-[10rem] font-serif leading-none select-none transition-opacity duration-500 group-hover:opacity-5"
                  style={{ color: "#D8A15B", opacity: 0.08 }}
                >
                  {c.num}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">{c.num}</p>
                <p className="text-sm font-sans">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* ── Final Logo — light section using Lavou palette ── */}
      <section
        className="py-28 px-6 md:px-12"
        style={{ backgroundColor: "#F5F3F0", color: "#1A1A1A" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "#6B3E2E" }}>
              Final Logo
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8" style={{ color: "#1A1A1A" }}>
              The donut is<br />
              <span className="italic" style={{ color: "#6B3E2E" }}>the letter</span>
            </h2>
            <p className="text-base font-sans leading-relaxed mb-6" style={{ color: "#6B3E2E" }}>
              The chosen mark embeds a richly illustrated chocolate-drizzle donut directly into the
              wordmark as the letter 'o'. The result is a logo that is clever without being gimmicky,
              artisan without being rustic, and premium without being cold.
            </p>
            <p className="text-base font-sans leading-relaxed" style={{ color: "#6B3E2E" }}>
              Set in an elegant serif, the lowercase lettering keeps the brand approachable. The
              illustrated donut adds warmth and product clarity in a single mark.
            </p>
          </Reveal>
          <Reveal>
            <div
              className="aspect-square flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: "#E8C9A0" }}
            >
              <div className="text-center px-8">
                <p
                  className="font-serif leading-none select-none"
                  style={{ fontSize: "clamp(4rem, 12vw, 7rem)", color: "#1A1A1A", letterSpacing: "-0.02em" }}
                >
                  lav
                  <span style={{ color: "#D8A15B" }}>○</span>
                  u
                </p>
                <p
                  className="text-xs uppercase tracking-[0.4em] mt-4"
                  style={{ color: "#6B3E2E" }}
                >
                  Artisanal Donuts & Bakes
                </p>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: "#D8A15B" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Brand Guidelines ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Brand Guidelines</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            A system built for<br />
            <span className="italic text-muted-foreground">warmth and precision</span>
          </h2>
          <p className="mt-6 max-w-lg text-base font-sans leading-relaxed text-muted-foreground">
            The visual language was codified into a comprehensive brand guide covering colour,
            typography, illustration direction, packaging, and usage rules — ensuring Lavou stays
            coherent across every touchpoint.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Colour System */}
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Colour System</p>
            <div className="space-y-0">
              {LAVOU_COLORS.map((color) => (
                <div
                  key={color.hex}
                  className="flex items-center gap-5 py-4 border-b border-white/8 group"
                  data-testid={`color-${color.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div
                    className="w-10 h-10 flex-shrink-0 rounded-full border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-sans font-medium tracking-wide">{color.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{color.hex}</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-right hidden md:block max-w-[140px] leading-snug">
                    {color.role}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Typography System */}
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Typography System</p>
            <div className="space-y-10">
              <div
                className="p-8 border border-white/10"
                style={{ backgroundColor: "#F5F3F0", color: "#1A1A1A" }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#6B3E2E" }}>
                  Primary — Display & Logo
                </p>
                <p className="font-serif text-5xl leading-none mb-3" style={{ color: "#1A1A1A" }}>
                  TAN Aegean
                </p>
                <p className="text-xs font-sans" style={{ color: "#6B3E2E" }}>
                  Headings · Product categories · Display use
                </p>
              </div>
              <div className="p-8 border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Secondary — Utility & Body
                </p>
                <p className="text-4xl leading-none mb-3 tracking-wider" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}>
                  Glacial Indifference
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                  Menu items · Descriptions · Taglines · UI text
                </p>
              </div>
              <Reveal>
                <blockquote className="border-l-2 pl-6" style={{ borderColor: "#D8A15B" }}>
                  <p className="text-sm font-serif italic leading-relaxed text-muted-foreground">
                    "Typography balances expression and restraint — combining a crafted feel with
                    clarity and scalability."
                  </p>
                  <footer className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    — Brand Guidelines
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Menu Design — light section ── */}
      <section style={{ backgroundColor: "#F5F3F0", color: "#1A1A1A" }} className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "#6B3E2E" }}>
              Menu Design
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight" style={{ color: "#1A1A1A" }}>
              Three pages of<br />
              <span className="italic" style={{ color: "#6B3E2E" }}>considered craft</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <Reveal>
              <p className="text-base font-sans leading-relaxed mb-6" style={{ color: "#6B3E2E" }}>
                The main menu spans three pages covering Brioche Donuts, Tea Cakes, Cookies,
                Cheesecakes, Brownies, Savories, and Cakes — with consistent layout logic, caramel
                gold typographic accents, and illustrated food art throughout.
              </p>
              <p className="text-base font-sans leading-relaxed" style={{ color: "#6B3E2E" }}>
                Each page uses the brand's wave-pattern decorative element, illustrated food imagery,
                and clear typographic hierarchy that makes ordering effortless.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Brioche Donuts", "Tea Cakes", "Cookies", "Cheesecakes", "Brownies", "Savories", "Cakes"].map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] uppercase tracking-[0.2em] border px-3 py-1.5"
                    style={{ borderColor: "#D8A15B", color: "#6B3E2E" }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal>
              {/* Menu visual placeholder using brand colors */}
              <div className="space-y-3">
                {[1, 2, 3].map((page) => (
                  <div
                    key={page}
                    className="relative overflow-hidden"
                    style={{ backgroundColor: "#E8C9A0", aspectRatio: page === 1 ? "4/3" : "16/5" }}
                  >
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#6B3E2E" }}>
                          Menu — Page {page}
                        </span>
                        <span className="text-[10px]" style={{ color: "#D8A15B" }}>Lavou</span>
                      </div>
                      <div
                        className="h-px w-full"
                        style={{ backgroundColor: "#D8A15B", opacity: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Seasonal Specials ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Seasonal Specials</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Menus that dress<br />
            <span className="italic text-muted-foreground">for the occasion</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-sans leading-relaxed text-muted-foreground">
            Beyond the core menu, we designed seasonal special menus — each adapting the brand's visual
            language to match the emotional tone of the occasion. Same grid, same typography, entirely new feeling.
          </p>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
          {[
            {
              title: "Mother's Day Special",
              desc: "Soft warmth. The brand's palette shifted toward rose-tinged custard tones — same structure, tender register.",
              accent: "#C4956A",
            },
            {
              title: "Summer Special",
              desc: "Bright indulgence. Higher contrast, lighter ground — the same system breathing in open air.",
              accent: "#D8A15B",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-background group overflow-hidden"
              data-testid={`seasonal-${item.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div
                className="aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#E8C9A0" }}
              >
                <div className="text-center p-8">
                  <p className="font-serif text-2xl mb-2" style={{ color: "#1A1A1A" }}>{item.title}</p>
                  <div className="w-8 h-px mx-auto my-3" style={{ backgroundColor: item.accent }} />
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#6B3E2E" }}>Lavou</p>
                </div>
              </div>
              <div className="p-8 border-t border-white/8">
                <p className="text-sm font-serif font-medium mb-3">{item.title}</p>
                <p className="text-sm font-sans leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* ── Full Scope ── */}
      <section className="border-t border-white/10 py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Full Scope</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Everything Lavou needed<br />
              <span className="italic text-muted-foreground">to launch</span>
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {SCOPE_ITEMS.map((item) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                className="bg-background p-8 group"
                data-testid={`scope-item-${item.num}`}
              >
                <p className="text-4xl font-serif mb-6 transition-colors duration-300" style={{ color: "#D8A15B" }}>
                  {item.num}
                </p>
                <p className="text-sm uppercase tracking-[0.15em] font-sans mb-4">{item.title}</p>
                <p className="text-xs font-sans leading-relaxed text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── The Outcome + Quote ── */}
      <section style={{ backgroundColor: "#1A1A1A" }} className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "#D8A15B" }}>
              The Outcome
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8" style={{ color: "#F5F3F0" }}>
              A brand ready<br />
              <span className="italic" style={{ color: "#D8A15B" }}>to grow</span>
            </h2>
            <p className="text-base font-sans leading-relaxed" style={{ color: "#a89f94" }}>
              Lavou launched with a complete visual identity — one that works equally well on Instagram,
              a printed menu, or a delivery box sticker. The brand system is modular enough to extend
              into seasonal campaigns, new product categories, and physical spaces without losing coherence.
            </p>
          </Reveal>
          <Reveal>
            <div className="border-l-2 pl-10" style={{ borderColor: "#D8A15B" }}>
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8" style={{ color: "#F5F3F0" }}>
                "Minimal but warm. Elegant, not overly decorative. Premium but approachable."
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#D8A15B" }}>
                — Lavou Brand Guidelines
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Studio footer ── */}
      <section className="border-t border-white/10 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Chuckles Art Studio</p>
            <p className="text-xs text-muted-foreground">Brand · Print · Digital · Wall Art</p>
            <p className="text-xs text-muted-foreground mt-1">Est. Navi Mumbai & Patna, India</p>
          </Reveal>
          <Reveal>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Next Project</p>
              <h3 className="text-4xl font-serif hover:text-muted-foreground transition-colors cursor-pointer mb-4">
                Mooi
              </h3>
              <Link
                href="/#contact"
                className="border-b border-foreground pb-1 text-[10px] uppercase tracking-[0.3em] hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                data-testid="link-start-project"
              >
                Start your project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
