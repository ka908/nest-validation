import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';
@Injectable()
export class UserCustomPipe implements PipeTransform {
  private readonly schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(1).max(100).required(),
  });

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        error.details.map((err) => err.message).join(', '),
      );
    }
    return value; // Return validated value
  }
}
