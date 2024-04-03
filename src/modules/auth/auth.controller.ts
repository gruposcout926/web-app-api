import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserRequest } from 'src/core/contracts';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async signIn(@Body() userRequest: SignInUserRequest) {
        return await this.authService.signIn(userRequest);
    }
}
