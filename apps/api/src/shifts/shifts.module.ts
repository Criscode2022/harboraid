import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './shift.entity';
import { Signup } from './signup.entity';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
@Module({ imports: [TypeOrmModule.forFeature([Shift, Signup])], providers: [ShiftsService], controllers: [ShiftsController] })
export class ShiftsModule {}
