import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterUserController } from './register-user/register-user.controller';
import { RegisterUserModule } from './register-user/register-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { registerUser } from 'src/entities/registerUser.entity';
import { RegisterUserService } from 'src/register-user/register-user.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/stratigies/jwt.strategy';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { TaskModule } from './task/task.module';
import { Task } from './entities/task.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    RegisterUserModule,

    TypeOrmModule.forFeature([registerUser, Task]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1800s' }, // time for JWT token afer 30 minute JWT token will be expired
    }),

    LoginModule,

    AuthModule,

    TaskModule,
  ],
  controllers: [AppController, RegisterUserController, LoginController],
  providers: [
    AppService,
    RegisterUserService,
    LoginService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AppModule {}
