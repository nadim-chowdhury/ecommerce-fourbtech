import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  vendorId?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsEnum(['CUSTOMER', 'SELLER', 'ADMIN'])
  role: string;
}

@InputType()
export class UpdateVendorInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
  // Add more fields as needed (e.g., description, logo)
}
