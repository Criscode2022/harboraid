import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() name!: string;
  @Column({ default: 'staple' }) category!: string;
  @Column({ type: 'int', default: 0 }) quantity!: number;
  @Column({ type: 'int', default: 10 }) reorderPoint!: number;
  @Column({ default: 'units' }) unit!: string;
  @UpdateDateColumn() updatedAt!: Date;
}
