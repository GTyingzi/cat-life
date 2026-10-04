import { useEffect, useState } from 'react';
import type { Locale } from './content';

function initialLocale(): Locale {
  try { return localStorage.getItem('everyday-cats-language') === 'en' ? 'en' : 'zh-CN'; }
  catch { return 'zh-CN'; }
}

export function useLocale(metadata: Record<Locale, { title: string; description: string }>) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const { title, description } = metadata[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    try { localStorage.setItem('everyday-cats-language', locale); } catch { /* Storage is optional. */ }
  }, [locale, title, description]);
  return [locale, setLocale] as const;
}
