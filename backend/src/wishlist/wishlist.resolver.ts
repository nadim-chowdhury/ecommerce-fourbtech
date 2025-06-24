import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import {
  Wishlist,
  AddToWishlistInput,
  RemoveFromWishlistInput,
} from '../common/dto/wishlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';

@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(private wishlistService: WishlistService) {}

  @Query(() => Wishlist)
  @UseGuards(JwtAuthGuard)
  myWishlist(@CurrentUser() user: { userId: string }) {
    return this.wishlistService.getWishlist(user.userId);
  }

  @Mutation(() => Wishlist)
  @UseGuards(JwtAuthGuard)
  addToWishlist(
    @CurrentUser() user: { userId: string },
    @Args('input') input: AddToWishlistInput,
  ) {
    return this.wishlistService.addToWishlist(user.userId, input);
  }

  @Mutation(() => Wishlist)
  @UseGuards(JwtAuthGuard)
  removeFromWishlist(
    @CurrentUser() user: { userId: string },
    @Args('input') input: RemoveFromWishlistInput,
  ) {
    return this.wishlistService.removeFromWishlist(
      user.userId,
      input.wishlistItemId,
    );
  }
}
