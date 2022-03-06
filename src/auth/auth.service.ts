import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 12);
    } catch (e) {
      throw e;
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (e) {
      throw e;
    }
  }

  async generateJwt(user: any): Promise<string> {
    try {
      return await this.jwtService.signAsync({ id: user.id });
    } catch (e) {
      throw e;
    }
  }
}
