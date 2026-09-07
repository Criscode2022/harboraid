import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type UserRole = 'admin' | 'coordinator' | 'volunteer' | 'neighbor';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) email!: string;
  @Column() name!: string;
  @Column() passwordHash!: string;
  @Column({ type: 'varchar', default: 'neighbor' }) role!: UserRole;
  @CreateDateColumn() createdAt!: Date;
}
