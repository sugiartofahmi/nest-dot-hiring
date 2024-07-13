import { Module } from '@nestjs/common';
import { MeModule } from './modules/me/me.module';
import { DrizzleModule } from './infrastructure/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    DrizzleModule,
    MeModule,
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
