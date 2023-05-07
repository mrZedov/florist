import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Log } from "./log.entity";
import { LogService } from "./log.services";

@Module({
  imports: [MikroOrmModule.forFeature([Log])],
  exports: [LogService],
  providers: [LogService],
})
export class LogModule {}
