import { canTransition, sortBoard } from './request.logic';
describe('request workflow', () => {
  it('allows open to reserved to fulfilled', () => {
    expect(canTransition('open', 'reserved')).toBe(true);
    expect(canTransition('reserved', 'fulfilled')).toBe(true);
    expect(canTransition('fulfilled', 'open')).toBe(false);
  });
  it('sorts urgent first then oldest', () => {
    const a = { priority: 'normal', createdAt: new Date('2026-01-01') };
    const b = { priority: 'urgent', createdAt: new Date('2026-02-01') };
    expect(sortBoard(b, a)).toBeLessThan(0);
  });
});
