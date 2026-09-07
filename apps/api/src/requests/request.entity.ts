import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type RequestStatus = 'open' | 'reserved' | 'fulfilled' | 'cancelled';
export type RequestPriority = 'low' | 'normal' | 'urgent';
@Entity('aid_requests')
export class AidRequest {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() household!: string;
  @Column({ type: 'text' }) itemsNeeded!: string;
  @Column({ type: 'varchar', default: 'normal' }) priority!: RequestPriority;
  @Column({ type: 'varchar', default: 'open' }) status!: RequestStatus;
  @Column({ nullable: true }) notes?: string;
  @CreateDateColumn() createdAt!: Date;
}
