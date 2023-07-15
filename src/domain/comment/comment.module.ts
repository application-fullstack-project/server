import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { DatabaseModule } from 'src/db';

@Module({
  imports: [DatabaseModule],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
