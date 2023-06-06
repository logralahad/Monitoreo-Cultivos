import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CropsRecommendationsService } from './crops_recommendations.service';
import { CreateCropsRecommendationDto } from './dto/create-crops_recommendation.dto';
import { UpdateCropsRecommendationDto } from './dto/update-crops_recommendation.dto';

@Controller('crops-recommendations')
export class CropsRecommendationsController {
  constructor(
    private readonly cropsRecommendationsService: CropsRecommendationsService,
  ) {}

  @Post()
  create(@Body() createCropsRecommendationDto: CreateCropsRecommendationDto) {
    return this.cropsRecommendationsService.create(
      createCropsRecommendationDto,
    );
  }

  @Get()
  findAll() {
    return this.cropsRecommendationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsRecommendationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCropsRecommendationDto: UpdateCropsRecommendationDto,
  ) {
    return this.cropsRecommendationsService.update(
      +id,
      updateCropsRecommendationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsRecommendationsService.remove(+id);
  }
}
