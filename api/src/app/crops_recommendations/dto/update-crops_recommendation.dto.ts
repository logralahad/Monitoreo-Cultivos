import { PartialType } from '@nestjs/swagger';
import { CreateCropsRecommendationDto } from './create-crops_recommendation.dto';

export class UpdateCropsRecommendationDto extends PartialType(
  CreateCropsRecommendationDto,
) {}
