import { type ComponentType, type ReactNode, Children, isValidElement } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children?: ReactNode;
  [key: string]: unknown;
}

interface ImgProps {
  src?: string;
  alt?: string;
  title?: string;
}

function EditorialImage({ src, alt, title }: ImgProps) {
  const caption = title || alt;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="my-16 -mx-6 md:-mx-0"
    >
      <div className="w-full overflow-hidden bg-white/[0.03]" style={{ aspectRatio: '16/9' }}>
        <img
          src={src}
          alt={alt ?? ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && caption !== alt && (
        <figcaption className="mt-4 text-xs tracking-[0.18em] uppercase text-muted-foreground/60 text-center">
          {caption}
        </figcaption>
      )}
      {alt && !title && (
        <figcaption className="mt-4 text-xs font-sans text-muted-foreground/50 text-center leading-relaxed max-w-sm mx-auto">
          {alt}
        </figcaption>
      )}
    </motion.figure>
  );
}

export const mdxComponents: Record<string, ComponentType<Props>> = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl md:text-6xl leading-tight tracking-tight mt-16 mb-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl md:text-3xl leading-snug tracking-tight mt-14 mb-6 border-t border-white/10 pt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl leading-snug mt-10 mb-4">
      {children}
    </h3>
  ),
  p: ({ children }) => {
    // MDX wraps standalone images in <p>. If any child is a custom component
    // (block-level), render without the <p> to avoid invalid HTML.
    const hasBlock = Children.toArray(children).some(
      child => isValidElement(child) && typeof child.type !== 'string'
    );
    if (hasBlock) return <>{children}</>;
    return (
      <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
        {children}
      </p>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-white/20 pl-6 my-10 italic font-serif text-lg text-muted-foreground">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="font-sans text-base text-muted-foreground space-y-2 mb-6 ml-0 list-none">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 before:content-['—'] before:text-muted-foreground/40 before:shrink-0 before:mt-0.5">
      <span>{children}</span>
    </li>
  ),
  hr: () => (
    <hr className="border-0 border-t border-white/10 my-14" />
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-white/5 px-1.5 py-0.5 rounded text-muted-foreground">
      {children}
    </code>
  ),
  img: ({ src, alt, title }: Props) => (
    <EditorialImage src={src as string} alt={alt as string} title={title as string} />
  ),
};
