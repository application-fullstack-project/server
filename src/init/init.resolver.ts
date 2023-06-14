import { Query, Resolver } from '@nestjs/graphql';
import { InitService } from './init.service';

@Resolver()
export class InitResolver {
  constructor(private readonly initService: InitService) {}

  @Query(() => String, { name: 'hello' })
  hello() {
    return this.initService.hello();
  }
}
