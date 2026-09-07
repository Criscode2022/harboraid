import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { ShiftsService } from './shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
class CreateShiftDto {
  @IsString() title!: string;
  @IsDateString() startsAt!: string;
  @IsDateString() endsAt!: string;
  @IsOptional() @IsInt() capacity?: number;
}
@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shifts: ShiftsService) {}
  @Get() list() { return this.shifts.list(); }
  @Post() @Roles('admin','coordinator') create(@Body() dto: CreateShiftDto) {
    return this.shifts.create({ ...dto, startsAt: new Date(dto.startsAt), endsAt: new Date(dto.endsAt) });
  }
  @Post(':id/signup') signup(@Param('id') id: string, @Req() req: { user: { userId: string; name: string } }) {
    return this.shifts.signup(id, req.user.userId, req.user.name);
  }
}
