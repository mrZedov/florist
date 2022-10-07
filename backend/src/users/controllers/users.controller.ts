import { Controller, Post, Body, UsePipes, Req } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      },
    }),
  )
  async create(@Body() data: any, @Req() req: any) {
    return await this.usersService.create(data, req.user);
  }
}
