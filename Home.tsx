import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useContactTracking } from "@/components/Analytics";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listContent } from "@/lib/content";

const HEADLINES = [
  "We make brands look like themselves.",
  "Your brand has a personality problem.",
  "Brand systems for ambitious founders.",
  "Design with memory.",
  "Not built from Pinterest.",
];


const BUDGETS = [
  { id: "under-50k", label: "Under ₹50k" },
  { id: "51k-1.5l", label: "₹51k – ₹1.5L" },
  { id: "above-1.5l", label: "Above ₹1.5L" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

function ContactForm() {
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [website, setWebsite] = useState("");
  const [timeline, setTimeline] = useState("");
  const [extra, setExtra] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-200 disabled:opacity-40";
  const labelClass = "block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2";
  const isLoading = status === "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, phone, brand, website, budget, timeline, message: extra }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 space-y-5"
        data-testid="form-success"
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Received</p>
        <p className="font-serif text-3xl leading-snug">
          Thank you. We'll review your inquiry and be in touch within 48 hours.
        </p>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          If your project is a fit, we'll reach out to schedule a call.
        </p>
      </motion.div>
    );
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit} data-testid="contact-form">
      {/* Row 1 — Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>Name</label>
          <input
            className={fieldClass}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
            data-testid="input-name"
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            className={fieldClass}
            placeholder="+91"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            data-testid="input-phone"
          />
        </div>
      </div>

      {/* Row 2 — Brand + Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>Brand Name</label>
          <input
            className={fieldClass}
            placeholder="What's it called?"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={isLoading}
            data-testid="input-brand"
          />
        </div>
        <div>
          <label className={labelClass}>Website / Instagram</label>
          <input
            className={fieldClass}
            placeholder="@handle or www."
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={isLoading}
            data-testid="input-website"
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className={labelClass}>Budget Range</label>
        <div className="flex flex-col sm:flex-row gap-0 mt-1 border-b border-white/20">
          {BUDGETS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setBudget(opt.id)}
              disabled={isLoading}
              className={`flex-1 py-3 text-xs uppercase tracking-[0.25em] text-left sm:text-center transition-colors duration-200 border-b-2 -mb-px disabled:opacity-40 ${
                budget === opt.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground/70"
              }`}
              data-testid={`budget-${opt.id}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label className={labelClass}>Timeline</label>
        <input
          className={fieldClass}
          placeholder="When do you need this by?"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          disabled={isLoading}
          data-testid="input-timeline"
        />
      </div>

      {/* Anything else */}
      <div>
        <label className={labelClass}>
          Anything else{" "}
          <span className="normal-case tracking-normal text-muted-foreground/50 ml-1">— optional</span>
        </label>
        <Textarea
          className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground min-h-[100px] resize-none text-sm placeholder:text-muted-foreground/40 disabled:opacity-40"
          placeholder="Any context, references, or constraints worth knowing."
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          disabled={isLoading}
          data-testid="textarea-extra"
        />
      </div>

      {/* Submit row */}
      <div className="pt-6 flex items-center justify-between gap-6">
        {/* Error message */}
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-sans text-muted-foreground/70"
              data-testid="form-error"
            >
              Something went wrong. Please try again or email us directly.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isLoading}
          className="font-serif text-2xl italic hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground pb-1 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-submit"
        >
          {isLoading ? "Sending…" : "Submit."}
        </button>
      </div>
    </form>
  );
}


export default function Home() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const contactRef = useRef<HTMLElement>(null);

  const essays = listContent("thinking")
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    })
    .slice(0, 4);
  useContactTracking(contactRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background"
    >
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24">
        <div className="max-w-4xl">
          <div className="h-40 md:h-48 mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-serif tracking-tight absolute"
              >
                {HEADLINES[headlineIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-sans tracking-wide leading-relaxed"
          >
            Chuckles builds brand identities, visual systems, and cultural objects for founders who want distinctiveness, not templates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button
              onClick={() => scrollTo("work")}
              className="border-b border-foreground pb-1 w-fit uppercase tracking-widest text-sm hover:text-muted-foreground hover:border-muted-foreground transition-colors"
              data-testid="link-view-work"
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-sm w-fit"
              data-testid="link-start-project"
            >
              Start a Project
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16">Featured Work</h2>

        <div className="flex flex-col gap-32">
          <Link href="/work/lavou">
            <motion.div
              className="group cursor-pointer block"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-testid="card-project-lavou"
            >
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted mb-8 relative">
                <img src="/images/lavou-hero.png" alt="Lavou Bakery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-6">
                <div>
                  <h3 className="text-4xl font-serif mb-2">Lavou Artisanal Bakery</h3>
                  <p className="text-muted-foreground font-serif italic text-xl">Brand Identity, Menus</p>
                </div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground mt-4 md:mt-0 text-right">
                  Identity · Menus · 2026
                </div>
              </div>
            </motion.div>
          </Link>

          <motion.div
            className="group cursor-pointer"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            data-testid="card-project-mooi"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted mb-8 relative">
              <img src="/images/mooi-brand.png" alt="Mooi" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-6">
              <div>
                <h3 className="text-4xl font-serif mb-2">Mooi</h3>
                <p className="text-muted-foreground font-serif italic text-xl">Skincare for the intellectual</p>
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground mt-4 md:mt-0 text-right">
                Brand System · Art Direction
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Studio POV */}
      <section id="pov" className="py-32 px-6 md:px-12 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16">Thinking</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0 divide-y divide-white/10 md:divide-y-0">
            {essays.map((essay, i) => (
              <Link
                key={essay.slug}
                href={`/thinking/${essay.slug}`}
                className="group text-left border-t border-white/20 pt-6 pb-10 md:pr-8 hover:opacity-80 transition-opacity block"
                data-testid={`essay-card-${i + 1}`}
              >
                <div className="text-xs text-muted-foreground mb-3 uppercase tracking-widest flex justify-between items-center">
                  <span>Essay {String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">↗</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif group-hover:text-muted-foreground transition-colors leading-snug mb-4">
                  {essay.title}
                </h3>
                {essay.preview && (
                  <p className="text-xs font-sans leading-relaxed text-muted-foreground line-clamp-3 hidden md:block">
                    {essay.preview}
                  </p>
                )}
                {essay.tag && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-4">{essay.tag}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Objects */}
      <section id="objects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16">Artifacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group cursor-pointer" data-testid="artifact-tee">
            <div className="aspect-square bg-muted mb-6 overflow-hidden">
              <img src="/images/object-tee.png" alt="Literary Tee" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <h3 className="text-xl font-serif mb-1">The Melancholy Tee</h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Apparel</p>
          </div>
          <div className="group cursor-pointer" data-testid="artifact-poster">
            <div className="aspect-square bg-muted mb-6 overflow-hidden flex items-center justify-center text-muted-foreground text-sm tracking-widest uppercase">
              [ Coming Soon ]
            </div>
            <h3 className="text-xl font-serif mb-1">Cinema Print 01</h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Poster</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-40 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="sr-only">About Chuckles</h2>
        <p className="text-2xl md:text-4xl font-serif leading-[1.6] md:leading-[1.6]">
          Chuckles began as an art-led experiment around literature, cinema, philosophy, and visual culture.
          Over time, it evolved into a studio building brand systems for founders who want work with memory,
          personality, and emotional texture. We believe most brands today are visually interchangeable because
          they're built from trends instead of conviction.{" "}
          <br /><br />
          <span className="italic text-muted-foreground">Chuckles exists to build identities that feel authored.</span>
        </p>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="py-32 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 md:px-12">

          {/* ── Part 1: Project Inquiry ── */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 mb-32">

            {/* Left — heading + copy */}
            <div className="md:pt-2">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-6">
                Project Inquiry
              </p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight mb-8">
                Tell us what you're trying to build.
              </h2>
              <div className="space-y-4 text-sm font-sans leading-relaxed text-muted-foreground">
                <p>
                  We take on a small number of projects each quarter —
                  enough to give each one the attention it deserves.
                </p>
                <p>
                  Fill in the form and tell us about your brand. What it
                  is, what it needs, what you've tried before.
                  No brief is too early or too rough.
                </p>
                <p>
                  The more specific you are, the better we can assess fit.
                </p>
              </div>

              {/* Response time note */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Response time
                </p>
                <p className="text-sm font-sans text-muted-foreground/70 leading-relaxed">
                  We review every inquiry within 48 hours.
                  If the project is a fit, we'll reach out to schedule
                  an introductory call.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-8 mb-32">
            <div className="flex-1 h-px bg-white/10" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 shrink-0">
              Or
            </p>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ── Part 2: Book a Call ── */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">

            {/* Left — copy */}
            <div className="md:pt-2">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-6">
                Book a Call
              </p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight mb-8">
                Prefer to talk first?
              </h2>
              <div className="space-y-4 text-sm font-sans leading-relaxed text-muted-foreground">
                <p>
                  Book a 30-minute introductory call directly in
                  the calendar. No agenda required — just bring
                  your project.
                </p>
                <p>
                  We'll discuss what you're building, what stage
                  you're at, and whether we're the right fit
                  to work together.
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Duration
                </p>
                <p className="text-sm font-sans text-muted-foreground/70">
                  30 minutes · Video call
                </p>
              </div>
            </div>

            {/* Right — Cal.com embed */}
            <div className="relative">
              <div className="overflow-hidden border border-white/8" style={{ borderRadius: 0 }}>
                <iframe
                  src="https://cal.com/chuckles-art-studio?embed=true&theme=dark&layout=month_view"
                  style={{
                    width: "100%",
                    height: "700px",
                    border: "none",
                    display: "block",
                    background: "transparent",
                  }}
                  loading="lazy"
                  title="Book an introductory call with Chuckles Studio"
                />
              </div>
              {/* Overlay label at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
            </div>
          </div>

        </div>
      </section>

      <footer className="py-12 text-center text-xs uppercase tracking-widest text-muted-foreground border-t border-white/5">
        &copy; {new Date().getFullYear()} Chuckles Studio. All rights reserved.
      </footer>

    </motion.div>
  );
}
