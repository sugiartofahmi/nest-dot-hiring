import { HttpModule } from 'nestjs-http-promise';
import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
