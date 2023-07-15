import { SetMetadata } from '@nestjs/common';

export const CUSTOM_REPOSITORY = 'TYPEORM_CUSTOM_REPOSITORY';

export function CustomRepository(entity): ClassDecorator {
  return SetMetadata(CUSTOM_REPOSITORY, entity);
}
