import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  tone?: 'sand' | 'blue';
  className?: string;
}

export function Avatar({
  name,
  src,
  tone = 'sand',
  className,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-bold leading-none',
        tone === 'blue' ? 'bg-flag-blue text-white' : 'bg-sand text-ink-soft',
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </span>
  );
}

function getInitials(name: string): string {
  const words = name
    .replace(/[''"“”.]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (
    words[0].charAt(0) + words[words.length - 1].charAt(0)
  ).toUpperCase();
}
