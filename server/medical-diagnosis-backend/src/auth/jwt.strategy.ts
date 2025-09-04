import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; [key: string]: any }) {
    // The payload is the decoded JWT. We can use it to find the user.
    // NOTE: This will still cause an error until we add `findOneById` to UsersService.
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // The user object returned here will be attached to the request object
    return user;
  }
}
