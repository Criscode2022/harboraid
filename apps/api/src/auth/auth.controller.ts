import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
class RegisterDto {
  @IsEmail() email!: string;
  @IsString() name!: string;
  @IsString() @MinLength(8) password!: string;
  @IsOptional() @IsString() role?: 'admin' | 'coordinator' | 'volunteer' | 'neighbor';
}
class LoginDto { @IsEmail() email!: string; @IsString() password!: string; }
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto.email, dto.name, dto.password, dto.role ?? 'neighbor'); }
  @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto.email, dto.password); }
  @Get('me') @UseGuards(JwtAuthGuard) me(@Req() req: { user: unknown }) { return req.user; }
}
