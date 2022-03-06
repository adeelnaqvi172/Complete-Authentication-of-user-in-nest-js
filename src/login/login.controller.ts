import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { CreateUserReqDto } from 'src/dto/registerUser.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { LogindUserReqDto } from 'src/dto/loginUser.dto';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async loginUser(@Body() data: CreateUserReqDto): Promise<string> {
    try {
      const loginuser: string = await this.loginService.loginUser(data);
      return loginuser;
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req): Promise<LogindUserReqDto> {
    try {
      const userId: string = req.user;
      const loginuser: LogindUserReqDto = await this.loginService.getUser(
        userId,
      );
      return loginuser;
    } catch (e) {
      throw e;
    }
  }
}
