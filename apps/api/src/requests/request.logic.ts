const allowed: Record<string, string[]> = { open: ['reserved','cancelled'], reserved: ['fulfilled','open','cancelled'], fulfilled: [], cancelled: [] };
export function canTransition(from: string, to: string) { return allowed[from]?.includes(to) ?? false; }
export function sortBoard(a: { priority: string; createdAt: Date }, b: { priority: string; createdAt: Date }) {
  const p: Record<string, number> = { urgent: 0, normal: 1, low: 2 };
  return (p[a.priority] ?? 9) - (p[b.priority] ?? 9) || a.createdAt.getTime() - b.createdAt.getTime();
}
