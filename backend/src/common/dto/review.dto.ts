import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

@ObjectType()
export class Review {
  @Field()
  id: string;

  @Field()
  productId: string;

  @Field()
  userId: string;

  @Field()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateReviewInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}
