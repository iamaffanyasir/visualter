type Props = { src: string; alt: string; dark?: boolean; size?: number; className?: string };

export function AppIcon({ src, alt, dark, size, className = '' }: Props) {
  return (
    <span
      className={`icon ${dark ? 'icon--dark' : ''} ${className}`}
      style={size ? ({ ['--s' as string]: `${size}px` } as React.CSSProperties) : undefined}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </span>
  );
}
