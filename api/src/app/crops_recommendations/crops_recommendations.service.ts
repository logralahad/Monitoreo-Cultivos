import { Injectable } from '@nestjs/common';
import { CreateCropsRecommendationDto } from './dto/create-crops_recommendation.dto';
import { UpdateCropsRecommendationDto } from './dto/update-crops_recommendation.dto';

@Injectable()
export class CropsRecommendationsService {
  create(createCropsRecommendationDto: CreateCropsRecommendationDto) {
    return 'This action adds a new cropsRecommendation';
  }

  findAll() {
    return `This action returns all cropsRecommendations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cropsRecommendation`;
  }

  update(id: number, updateCropsRecommendationDto: UpdateCropsRecommendationDto) {
    return `This action updates a #${id} cropsRecommendation`;
  }

  remove(id: number) {
    return `This action removes a #${id} cropsRecommendation`;
  }
}
