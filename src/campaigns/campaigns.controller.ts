import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignsDto } from './dto/create-campaigns.dto';
import { UpdateCampaignsDto } from './dto/update-campaigns.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Campaigns } from './domain/campaigns';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCampaignsDto } from './dto/find-all-campaigns.dto';

@ApiTags('Campaigns')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'campaigns',
  version: '1',
})
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Campaigns,
  })
  create(@Body() createCampaignsDto: CreateCampaignsDto) {
    return this.campaignsService.create(createCampaignsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Campaigns),
  })
  async findAll(
    @Query() query: FindAllCampaignsDto,
  ): Promise<InfinityPaginationResponseDto<Campaigns>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.campaignsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Campaigns,
  })
  findById(@Param('id') id: string) {
    return this.campaignsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Campaigns,
  })
  update(
    @Param('id') id: string,
    @Body() updateCampaignsDto: UpdateCampaignsDto,
  ) {
    return this.campaignsService.update(id, updateCampaignsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
