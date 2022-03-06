import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUser } from 'src/entities/registerUser.entity';
import { Repository } from 'typeorm';
import { CreateUserReqDto } from 'src/dto/registerUser.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RegisterUserService {
  constructor(
    @InjectRepository(registerUser)
    private UserRepo: Repository<registerUser>,
    private readonly authService: AuthService,
  ) {}
  private async encryptPassword(password: string): Promise<string> {
    try {
      const enceyptedpassword = await this.authService.hashPassword(password);
      return enceyptedpassword;
    } catch (e) {
      throw e;
    }
  }
  async registerUser(data: CreateUserReqDto): Promise<registerUser> {
    try {
      data.password = await this.encryptPassword(data.password);
      const entitydata = Object.assign(new registerUser(), data);
      const user: registerUser = await this.UserRepo.save(entitydata);
      return user;
    } catch (e) {
      throw e;
    }
  }
}
