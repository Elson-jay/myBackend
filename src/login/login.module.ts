import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEntity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: 'defaultSecret',
        signOptions: { expiresIn: '1h' },
      })],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
