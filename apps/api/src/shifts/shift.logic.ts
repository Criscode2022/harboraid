export function coverage(capacity: number, taken: number) {
  const remaining = Math.max(capacity - taken, 0);
  return { remaining, full: remaining === 0, ratio: capacity === 0 ? 1 : taken / capacity };
}
