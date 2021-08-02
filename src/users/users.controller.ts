import { Controller, 
         Post, 
         Body, 
         Request, 
         UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './create-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('sign-up')
    signUpUser(@Body() createUserBody: CreateUserDto): any {
        return this.usersService.create(createUserBody);
    }

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    async loginUser(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }

}