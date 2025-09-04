// This file defines the expected data shape for a login request.
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
