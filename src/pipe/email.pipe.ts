import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SingInInputDto, SingUpInputDto } from 'src/domain/auth/dto';

/**
 * 이메일을 소문자로 변환하는 파이프
 */
@Injectable()
export class TransformEmailPipe implements PipeTransform {
  transform(
    value: SingUpInputDto | SingInInputDto,
    metadata: ArgumentMetadata,
  ) {
    value.email = value.email.toLowerCase();
    return value;
  }
}
