import { Field, ObjectType, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  IsUrl,
} from 'class-validator';
import { Vendor } from './user.dto';
import { Review } from './review.dto';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  salePrice?: number;

  @Field(() => String, { nullable: true })
  imageUrl?: string | null;

  @Field()
  vendorId: string;

  @Field(() => Vendor)
  vendor: Vendor;

  @Field()
  stock: number;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  storage?: string;

  @Field({ nullable: true })
  ram?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  ram2?: string;

  @Field({ nullable: true })
  color2?: string;

  @Field({ nullable: true })
  condition?: string;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  seoTitle?: string;

  @Field({ nullable: true })
  seoDescription?: string;

  @Field({ nullable: true })
  enableNegotiation?: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  features?: string;

  @Field(() => [Review], { nullable: true })
  reviews: Review[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  @Min(0)
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Field()
  @IsString()
  vendorId: string;

  @Field()
  @IsNumber()
  @Min(0)
  stock: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  storage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ram?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ram2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  condition?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  enableNegotiation?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  features?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  storage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ram?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ram2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  condition?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  enableNegotiation?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  features?: string;
}
