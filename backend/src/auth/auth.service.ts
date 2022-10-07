import { EntityData } from '@mikro-orm/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.services';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

  async login(data: EntityData<any>) {
    if (!data.user) {
      return {
        access_token: null,
        refresh_token: null,
        error: data.error,
      };
    }
    const payload = { username: data.user.login, sub: data.user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
      error: data.error,
    };
  }

  async refresh(refreshToken: string) {
    this.checkToken(refreshToken);

    const tokenData: any = this.jwtService.decode(refreshToken);
    const user = await this.userService.findById(tokenData.sub);

    return this.login({ user: user, error: false });
  }

  checkToken(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
