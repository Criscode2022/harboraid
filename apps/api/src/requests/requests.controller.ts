import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RequestStatus } from './request.entity';
class CreateRequestDto {
  @IsString() household!: string;
  @IsString() itemsNeeded!: string;
  @IsOptional() @IsString() priority?: 'low' | 'normal' | 'urgent';
  @IsOptional() @IsString() notes?: string;
}
@Controller('requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestsController {
  constructor(private readonly requests: RequestsService) {}
  @Get() list() { return this.requests.list(); }
  @Post() create(@Body() dto: CreateRequestDto) { return this.requests.create(dto); }
  @Patch(':id') @Roles('admin','coordinator','volunteer') transition(@Param('id') id: string, @Body('status') status: RequestStatus) {
    return this.requests.transition(id, status);
  }
}
