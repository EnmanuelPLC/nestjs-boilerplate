// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCampaignsDto } from './create-campaigns.dto';

export class UpdateCampaignsDto extends PartialType(CreateCampaignsDto) {}
