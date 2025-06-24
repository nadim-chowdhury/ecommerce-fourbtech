import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Product } from './product.dto';

@ObjectType()
export class WishlistItem {
  @Field()
  id: string;

  @Field(() => Product)
  product: Product;

  @Field()
  productId: string;

  @Field()
  wishlistId: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Wishlist {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => [WishlistItem])
  items: WishlistItem[];
}

@InputType()
export class AddToWishlistInput {
  @Field()
  @IsString()
  productId: string;
}

@InputType()
export class RemoveFromWishlistInput {
  @Field()
  @IsString()
  wishlistItemId: string;
}
