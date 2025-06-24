import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Product } from './product.dto';
import { IsString, IsInt } from 'class-validator';

@ObjectType()
export class CartItem {
  @Field()
  id: string;

  @Field()
  cartId: string;

  @Field()
  productId: string;

  @Field(() => Product)
  product: Product;

  @Field()
  quantity: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Cart {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class AddToCartInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsInt()
  quantity: number;
}

@InputType()
export class UpdateCartItemInput {
  @Field()
  cartItemId: string;

  @Field()
  quantity: number;
}
