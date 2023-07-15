import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';
import { DatabaseModule } from 'src/db';
import { PostService } from 'src/domain/post';

@Module({
  imports: [DatabaseModule],
  providers: [LoaderService, PostService],
  exports: [LoaderService],
})
export class LoaderModule {}
