import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CardsModule } from "./cards/cards.module";
import { ExaminationModule } from "./exam/examination.module";
import { LogModule } from "./log/log.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    CardsModule,
    ExaminationModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
