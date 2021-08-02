import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from "./users.schema";
import { CreateUserDto } from "./create-user.dto";
import * as bcrypt from 'bcrypt';

const saltRounds: number = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>
    ) {}

    async create(createUser: CreateUserDto): Promise<User> {
        try {
            const { email, password } = createUser;
            const userDB = await this.userModel.findOne({email: email});
            createUser.password = bcrypt.hashSync(password, saltRounds);
            if (userDB === null) {
                try {
                    const createdUser = new this.userModel(createUser);
                    return createdUser.save();
                } catch (error) {
                    throw new InternalServerErrorException(error);
                }
            } else throw new InternalServerErrorException('The email is already registered, try with another one.');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const findedUser = await this.userModel.findOne({email: email});
            if (findedUser) {
                const comparedPassword: boolean = bcrypt.compareSync(password, findedUser.password);
                if (comparedPassword === false) throw new InternalServerErrorException('The password is incorrect, try again.');
                else return findedUser;
            } else throw new InternalServerErrorException("The email is not registered yet, try sign up first.");
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(email: string): Promise<any> {
        try {
            return this.userModel.findOne({email: email}).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}