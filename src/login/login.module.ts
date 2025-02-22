import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEntity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
