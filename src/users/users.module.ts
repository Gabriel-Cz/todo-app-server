import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "./users.schema";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: "users" }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '12h' },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService]
})

export class UsersModule {}
