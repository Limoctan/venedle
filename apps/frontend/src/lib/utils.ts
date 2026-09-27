import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatter = new Intl.DateTimeFormat('es-VE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
