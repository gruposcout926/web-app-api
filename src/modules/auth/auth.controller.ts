import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequest } from 'src/core';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async signIn(@Body() userRequest: UserRequest) {
        return await this.authService.signIn(userRequest);
    }
}
