import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDto } from './Dto/logonDto';
import { CreateUserDto } from './Dto/createUserDto';

@Controller('auth')
export class LoginController {
    constructor(
        private readonly loginService:LoginService
    ){}

    @Post('/signin')
    async signin(@Body() createUserdto:CreateUserDto){
        return await this.loginService.SignIn(createUserdto)
    }

    @Post('/login')
    async login(@Body() logindto:loginDto){
        return await this.loginService.login(logindto)
    }
}
