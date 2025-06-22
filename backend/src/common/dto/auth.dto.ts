import { IsEmail, IsString, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from './user.dto';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
}

@InputType()
export class CreateVendorInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  userId: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
