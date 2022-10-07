import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';
import { UsersService } from 'src/users/services/users.services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.CENTRAL_USER_SECRET || 'ezb5L8P7',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findById(payload.sub);
    return {
      id: user.id,
      login: user.login,
    };
  }
}
