import { Module } from '@nestjs/common';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [ReviewsResolver, ReviewsService]
})
export class ReviewsModule {}
