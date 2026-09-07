import * as bcrypt from 'bcryptjs';
describe('password hashing', () => {
  it('round-trips a demo password', async () => {
    const hash = await bcrypt.hash('HarborAid!23', 8);
    expect(await bcrypt.compare('HarborAid!23', hash)).toBe(true);
    expect(await bcrypt.compare('wrong', hash)).toBe(false);
  });
});
