import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserService } from './register-user.service';
import { CreateUserReqDto } from 'src/dto/registerUser.dto';
import { registerUser } from 'src/entities/registerUser.entity';
import * as bcrypt from 'bcrypt';

@Controller('register')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}
  @Post()
  async registerUser(@Body() data: CreateUserReqDto): Promise<registerUser> {
    try {
      const registerduser: registerUser =
        await this.registerUserService.registerUser(data);
      return registerduser;
    } catch (e) {
      throw e;
    }
  }
}
