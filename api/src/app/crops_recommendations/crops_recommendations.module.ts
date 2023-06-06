import { Module } from '@nestjs/common';
import { CropsRecommendationsService } from './crops_recommendations.service';
import { CropsRecommendationsController } from './crops_recommendations.controller';

@Module({
  controllers: [CropsRecommendationsController],
  providers: [CropsRecommendationsService]
})
export class CropsRecommendationsModule {}
