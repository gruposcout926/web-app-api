import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserRequest } from 'src/core/contracts';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomErrorFilter } from 'src/core/filters';

@UseFilters(CustomErrorFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Crea un usuario si no existe' })
    @Post('signup')
    async signIn(@Body() userRequest: SignInUserRequest) {
        return await this.authService.signIn(userRequest);
    }
}
