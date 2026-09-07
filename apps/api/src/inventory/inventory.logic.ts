export function isLowStock(quantity: number, reorderPoint: number) {
  return quantity <= reorderPoint;
}
export function applyDelta(quantity: number, delta: number) {
  const next = quantity + delta;
  if (next < 0) throw new Error('Quantity cannot be negative');
  return next;
}
