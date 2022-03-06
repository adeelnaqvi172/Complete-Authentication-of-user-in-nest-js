import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUser } from 'src/entities/registerUser.entity';
import { Repository } from 'typeorm';
import { CreateUserReqDto } from 'src/dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { LogindUserReqDto } from 'src/dto/loginUser.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(registerUser)
    private UserRepo: Repository<registerUser>,
    private readonly authService: AuthService,
  ) {}

  private async ecomparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const enceyptedpassword: boolean = await this.authService.comparePassword(
        password,
        hashedPassword,
      );
      return enceyptedpassword;
    } catch (e) {
      throw e;
    }
  }

  async loginUser(data: CreateUserReqDto): Promise<string> {
    try {
      const user = await this.UserRepo.findOne({ email: data?.email });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid: boolean = await this.ecomparePassword(
        data.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      if (user && isPasswordValid) {
        const jwt: string = await this.authService.generateJwt(user);
        return jwt;
      }
    } catch (e) {
      throw e;
    }
  }

  async getUser(userID: string): Promise<LogindUserReqDto> {
    try {
      const user = await this.UserRepo.findOne({ id: userID });
      if (!user) {
        throw new Error('User not found');
      }
      const loginuser: LogindUserReqDto = {
        id: user.id,
        email: user.email,
      };
      return loginuser;
    } catch (e) {
      throw e;
    }
  }
}
