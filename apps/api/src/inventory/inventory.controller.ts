import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
class CreateItemDto {
  @IsString() name!: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsInt() quantity?: number;
  @IsOptional() @IsInt() reorderPoint?: number;
  @IsOptional() @IsString() unit?: string;
}
class AdjustDto { @IsInt() delta!: number; }
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}
  @Get() list() { return this.inventory.list(); }
  @Post() @Roles('admin', 'coordinator') create(@Body() dto: CreateItemDto) { return this.inventory.create(dto); }
  @Patch(':id') @Roles('admin', 'coordinator', 'volunteer') adjust(@Param('id') id: string, @Body() dto: AdjustDto) {
    return this.inventory.adjust(id, dto.delta);
  }
}
