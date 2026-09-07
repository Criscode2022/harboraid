import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AidRequest, RequestStatus } from './request.entity';
import { canTransition, sortBoard } from './request.logic';
@Injectable()
export class RequestsService {
  constructor(@InjectRepository(AidRequest) private readonly repo: Repository<AidRequest>) {}
  async list() { return (await this.repo.find()).sort(sortBoard); }
  create(data: Partial<AidRequest>) { return this.repo.save(this.repo.create(data)); }
  async transition(id: string, status: RequestStatus) {
    const row = await this.repo.findOne({ where: { id } });
    if (!row) throw new NotFoundException();
    if (!canTransition(row.status, status)) throw new BadRequestException(`Cannot move ${row.status} to ${status}`);
    row.status = status;
    return this.repo.save(row);
  }
}
