import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}
  async register(email: string, name: string, password: string, role: UserRole = 'neighbor') {
    if (await this.users.findByEmail(email)) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ email: email.toLowerCase(), name, passwordHash, role });
    return this.issue(user.id, user.email, user.role, user.name);
  }
  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    return this.issue(user.id, user.email, user.role, user.name);
  }
  private issue(sub: string, email: string, role: string, name: string) {
    return { accessToken: this.jwt.sign({ sub, email, role, name }), user: { id: sub, email, role, name } };
  }
}
