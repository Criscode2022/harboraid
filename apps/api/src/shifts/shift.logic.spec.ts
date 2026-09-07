import { coverage } from './shift.logic';
describe('shift coverage', () => {
  it('reports remaining seats', () => {
    expect(coverage(4, 1)).toEqual({ remaining: 3, full: false, ratio: 0.25 });
    expect(coverage(2, 2).full).toBe(true);
  });
});
