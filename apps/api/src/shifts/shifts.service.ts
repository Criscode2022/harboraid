import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './shift.entity';
import { Signup } from './signup.entity';
import { coverage } from './shift.logic';
@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift) private readonly shifts: Repository<Shift>,
    @InjectRepository(Signup) private readonly signups: Repository<Signup>,
  ) {}
  async list() {
    const rows = await this.shifts.find({ order: { startsAt: 'ASC' } });
    return rows.map((s) => ({ ...s, coverage: coverage(s.capacity, s.signups?.length ?? 0) }));
  }
  create(data: Partial<Shift>) { return this.shifts.save(this.shifts.create(data)); }
  async signup(shiftId: string, volunteerId: string, volunteerName: string) {
    const shift = await this.shifts.findOne({ where: { id: shiftId } });
    if (!shift) throw new NotFoundException();
    if (shift.signups.some((s) => s.volunteerId === volunteerId)) throw new BadRequestException('Already signed up');
    if (coverage(shift.capacity, shift.signups.length).full) throw new BadRequestException('Shift is full');
    await this.signups.save(this.signups.create({ shift, volunteerId, volunteerName }));
    return this.list();
  }
}
