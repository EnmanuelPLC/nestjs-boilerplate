// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAdDto } from './create-ad.dto';

export class UpdateAdDto extends PartialType(CreateAdDto) {}
