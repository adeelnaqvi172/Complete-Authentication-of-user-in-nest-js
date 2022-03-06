import { Module } from '@nestjs/common';
import { RegisterUserService } from './register-user.service';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { registerUser } from 'src/entities/registerUser.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([registerUser]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1800s' }, // time for JWT token afer 30 minute JWT token will be expired
    }),
  ],
  providers: [RegisterUserService, AuthService],
})
export class RegisterUserModule {}
