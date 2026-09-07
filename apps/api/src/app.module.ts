import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';
import { RequestsModule } from './requests/requests.module';
import { ShiftsModule } from './shifts/shifts.module';
import { HealthController } from './health.controller';
import { User } from './users/user.entity';
import { InventoryItem } from './inventory/inventory.entity';
import { AidRequest } from './requests/request.entity';
import { Shift } from './shifts/shift.entity';
import { Signup } from './shifts/signup.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, InventoryItem, AidRequest, Shift, Signup],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false,
    }),
    AuthModule, UsersModule, InventoryModule, RequestsModule, ShiftsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
