import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './inventory.entity';
import { applyDelta, isLowStock } from './inventory.logic';
@Injectable()
export class InventoryService {
  constructor(@InjectRepository(InventoryItem) private readonly repo: Repository<InventoryItem>) {}
  async list() {
    const items = await this.repo.find({ order: { name: 'ASC' } });
    return items.map((i) => ({ ...i, low: isLowStock(i.quantity, i.reorderPoint) }));
  }
  create(data: Partial<InventoryItem>) { return this.repo.save(this.repo.create(data)); }
  async adjust(id: string, delta: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    item.quantity = applyDelta(item.quantity, delta);
    return this.repo.save(item);
  }
}
