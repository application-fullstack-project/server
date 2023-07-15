import { Repository } from 'typeorm';
import { CustomRepository } from '../utils/custom-repository';
import { Post } from './post.entity';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPolularPosts() {
    const posts = await this.createQueryBuilder('post')
      .leftJoin('post.likes', 'like')
      .select('post.id')
      .addSelect('COUNT(like.id)', 'likeCount')
      .where('like.created_date > :date', {
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      })
      .groupBy('post.id')
      .having('COUNT(like.id) > :count', { count: 5 })
      .getMany();
    return posts;
  }
}
