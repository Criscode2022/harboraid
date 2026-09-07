import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Signup } from './signup.entity';
@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() title!: string;
  @Column({ type: 'timestamptz' }) startsAt!: Date;
  @Column({ type: 'timestamptz' }) endsAt!: Date;
  @Column({ type: 'int', default: 2 }) capacity!: number;
  @OneToMany(() => Signup, (s) => s.shift, { eager: true }) signups!: Signup[];
}
