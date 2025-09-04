import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<(Omit<User, 'password'> & { _id: string }) | null> {
    const user: UserDocument | null =
      await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // exclude password from returned object
      // include _id explicitly for TypeScript
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user.toObject() as User & { _id: string };
      const result: Omit<User, 'password'> & { _id: string } = rest;
      return result;
    }
    return null;
  }

  login(user: {
    _id: string;
    email: string;
    role: string;
    name: string;
    verified: boolean;
  }) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'> & { _id: string }> {
    const user = await this.usersService.create(createUserDto);
    const userDoc = user as UserDocument;

    // exclude password from returned object
    // include _id explicitly for TypeScript
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userDoc.toObject() as User & {
      _id: string;
    };
    return result;
  }
}
