import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { InventoryItem } from '../inventory/inventory.entity';
import { AidRequest } from '../requests/request.entity';
import { Shift } from '../shifts/shift.entity';
import { Signup } from '../shifts/signup.entity';

async function run() {
  const ds = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, InventoryItem, AidRequest, Shift, Signup],
    synchronize: true,
    ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false,
  });
  await ds.initialize();
  const hash = await bcrypt.hash('HarborAid!23', 10);
  const users = ds.getRepository(User);
  if (!(await users.findOne({ where: { email: 'maria@harboraid.org' } }))) {
    await users.save([
      { email: 'maria@harboraid.org', name: 'Maria Santos', passwordHash: hash, role: 'admin' },
      { email: 'leo@harboraid.org', name: 'Leo Park', passwordHash: hash, role: 'coordinator' },
      { email: 'ana@harboraid.org', name: 'Ana Ruiz', passwordHash: hash, role: 'volunteer' },
      { email: 'noah@harboraid.org', name: 'Noah Bell', passwordHash: hash, role: 'neighbor' },
    ]);
  }
  const inv = ds.getRepository(InventoryItem);
  if ((await inv.count()) === 0) {
    await inv.save([
      { name: 'Rice 1kg', category: 'staple', quantity: 42, reorderPoint: 20, unit: 'bags' },
      { name: 'Canned beans', category: 'staple', quantity: 8, reorderPoint: 15, unit: 'cans' },
      { name: 'Infant formula', category: 'baby', quantity: 6, reorderPoint: 8, unit: 'tins' },
      { name: 'Diapers M', category: 'baby', quantity: 18, reorderPoint: 10, unit: 'packs' },
      { name: 'Olive oil', category: 'staple', quantity: 11, reorderPoint: 6, unit: 'bottles' },
    ]);
  }
  const reqs = ds.getRepository(AidRequest);
  if ((await reqs.count()) === 0) {
    await reqs.save([
      { household: 'Rivera family (4)', itemsNeeded: 'Rice, oil, diapers', priority: 'urgent', status: 'open' },
      { household: 'Chen household', itemsNeeded: 'Beans and formula', priority: 'normal', status: 'reserved' },
    ]);
  }
  const shifts = ds.getRepository(Shift);
  if ((await shifts.count()) === 0) {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(9, 0, 0, 0);
    const end = new Date(start);
    end.setHours(13, 0, 0, 0);
    await shifts.save({ title: 'Saturday intake desk', startsAt: start, endsAt: end, capacity: 3 });
  }
  console.log('Seed complete');
  await ds.destroy();
}
run().catch((e) => { console.error(e); process.exit(1); });
