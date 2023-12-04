import { Repository } from 'typeorm';
import { CustomRepository } from '../utils/custom-repository';
import { Post } from './post.entity';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPopularPosts() {
    // post를 반환, 24시간 내 like가 5개 이상인 post를 반환, postgres sql
    const posts = await this.createQueryBuilder('post')
      .select('post.id')
      .addSelect('post.title')
      .addSelect('post.content')
      .addSelect('post.image')
      .addSelect('post.createdDate')
      .addSelect('post.updatedData')
      .addSelect('post.userId')
      .addSelect('post.boardId')
      .addSelect('COUNT(like.id)', 'likeCount')
      .leftJoin('post.likes', 'like')
      .where("like.createdAt >= now() - interval '24 hours'")
      .groupBy('post.id')
      .having('COUNT(like.id) >= 5')
      .orderBy('likeCount', 'DESC')
      .getMany();
    return posts;
  }
}
