// This file defines the data structure for a user in our MongoDB database.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    required: true,
    enum: ['doctor', 'patient', 'student', 'researcher'],
  })
  role!: string;

  @Prop({ default: false })
  verified!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
