import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { Users } from "./entities/users.entity";
import { UsersService } from "./services/users.services";

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
