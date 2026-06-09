import { motion } from "framer-motion";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
          404
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
          Page not found.
        </h1>
        <p className="font-sans text-sm text-muted-foreground mb-16 max-w-sm mx-auto leading-relaxed">
          This page doesn't exist or has moved.
        </p>
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors border-b border-white/20 hover:border-foreground pb-1"
        >
          ← Back to Studio
        </Link>
      </motion.div>
    </motion.div>
  );
}
