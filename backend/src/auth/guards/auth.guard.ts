import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.usersService.findById(request.user.id);
    // if (user.superuser === true) {
      console.log('canActivate')
      return true;
    // }

    const apiPrefix = process.env.API_PREFIX;
    let uri;
    if (!apiPrefix) {
      uri = request.method + ` ` + request.route.path.split('?')[0];
    } else {
      const urn = request.route.path.replace(new RegExp(`^/?${apiPrefix}`), '').split('?')[0];
      uri = request.method + ` ` + urn;
    }

    // const action = await this.actionService.findByUri({ uri: uri });
    // if (action.length) {
    //   return await this.actionService.checkPermission({ action_id: action[0].id, user_id: user.id });
    // }
    return false
  }
}
