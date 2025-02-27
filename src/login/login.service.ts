import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEntity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './Dto/logonDto';
import { CreateUserDto } from './Dto/createUserDto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>,
        private jwtService:JwtService
    ){}

    async SignIn(createUserdto:CreateUserDto){
            const user = this.userRepository.create({email:createUserdto.email,password:createUserdto.password,roleId:2})
            await this.userRepository.save(user)
        return {message:'user Sign In Successfully', code:200}
    }

    async validationUser(email:string,password:string){
        const user = await this.userRepository.findOne({where:{email}});
        if(user?.email === email && user?.password === password){
            return {id:user.id,email:user.email,roleId:user.roleId}
        }else{
            throw new UnauthorizedException("Invalid email or password")
        }
    }

    async login(logindto:loginDto){
        const user = await this.validationUser(logindto.email,logindto.password);
        const token = this.jwtService.sign({id:user.id,email:user.email,roleId:user.roleId});
        return {
            accessToken:token, code:200, message:'Login Successfully'
        }
    }

}
