import { Module } from '@nestjs/common';
import { MeModule } from './modules/me/me.module';
import { DrizzleModule } from './infrastructure/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DrizzleModule, MeModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
