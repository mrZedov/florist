import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UsersModule, AuthModule, CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
