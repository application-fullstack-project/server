import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { InitResolver } from './init.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [InitService, InitResolver],
})
export class InitModule {}
