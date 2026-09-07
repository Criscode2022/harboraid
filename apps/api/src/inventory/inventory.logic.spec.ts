import { applyDelta, isLowStock } from './inventory.logic';
describe('inventory logic', () => {
  it('flags low stock at the reorder point', () => {
    expect(isLowStock(10, 10)).toBe(true);
    expect(isLowStock(11, 10)).toBe(false);
  });
  it('applies inbound and outbound deltas', () => {
    expect(applyDelta(20, -4)).toBe(16);
    expect(applyDelta(2, 8)).toBe(10);
  });
  it('rejects a negative balance', () => {
    expect(() => applyDelta(2, -3)).toThrow();
  });
});
