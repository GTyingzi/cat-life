export const mediaUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export function safeLink(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}
