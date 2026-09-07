import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AidRequest } from './request.entity';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
@Module({ imports: [TypeOrmModule.forFeature([AidRequest])], providers: [RequestsService], controllers: [RequestsController] })
export class RequestsModule {}
