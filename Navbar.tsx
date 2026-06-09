import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type NavItem =
  | { label: string; type: "scroll"; id: string }
  | { label: string; type: "route"; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Work",      type: "scroll", id: "work"    },
  { label: "Practice",  type: "route",  href: "/practice"  },
  { label: "Thinking",  type: "route",  href: "/thinking"  },
  { label: "Artifacts", type: "route",  href: "/artifacts" },
  { label: "About",     type: "scroll", id: "about"   },
  { label: "Contact",   type: "scroll", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [location, setLocation]   = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll only when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  function handleScrollItem(id: string) {
    setMenuOpen(false);
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => scrollToSection(id), 380);
    } else {
      scrollToSection(id);
    }
  }

  function renderItem(item: NavItem, mobile = false) {
    const base = mobile
      ? "block w-full text-left font-serif text-3xl py-4 border-b border-white/8 hover:text-muted-foreground transition-colors"
      : "hover:text-muted-foreground transition-colors text-sm tracking-widest uppercase";

    if (item.type === "route") {
      return (
        <Link
          key={item.label}
          href={item.href}
          className={base}
          data-testid={`nav-${item.label.toLowerCase()}`}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <button
        key={item.label}
        onClick={() => handleScrollItem(item.id)}
        className={base}
        data-testid={`nav-${item.label.toLowerCase()}`}
      >
        {item.label}
      </button>
    );
  }

  return (
    <>
      {/* ── Top bar ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleScrollItem("hero")}
            className="font-serif text-xl md:text-2xl tracking-wide transition-colors"
            style={{ color: "rgba(148, 215, 220, 0.92)" }}
            data-testid="nav-logo"
          >
            CHUCKLES
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => renderItem(item, false))}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 shrink-0"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-testid="nav-hamburger"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-foreground w-6 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="block h-px bg-foreground w-4"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-foreground w-6 origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Drawer backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 md:hidden"
            onClick={() => setMenuOpen(false)}
            data-testid="drawer-backdrop"
          />
        )}
      </AnimatePresence>

      {/* ── Right-side drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-xs bg-background border-l border-white/8 flex flex-col pt-24 px-8 pb-10 md:hidden"
            data-testid="mobile-drawer"
          >
            {/* Nav items */}
            <nav className="flex flex-col flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderItem(item, true)}
                </motion.div>
              ))}
            </nav>

            {/* Studio info at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 pt-6 border-t border-white/8"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Chuckles · Navi Mumbai & Patna
              </p>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
