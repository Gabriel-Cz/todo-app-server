import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ 
        required: [true, 'The email is necessary'], 
        unique: [true, 'This email is already registered, try with another one.'] 
    })
    email: string;

    @Prop({ 
        required: [true, 'The password is necessary'] 
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);