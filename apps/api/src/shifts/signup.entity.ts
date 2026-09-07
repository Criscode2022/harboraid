import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shift } from './shift.entity';
@Entity('shift_signups')
export class Signup {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() volunteerId!: string;
  @Column() volunteerName!: string;
  @ManyToOne(() => Shift, (s) => s.signups, { onDelete: 'CASCADE' }) shift!: Shift;
}
