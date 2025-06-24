import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import {
  Cart,
  CartItem,
  AddToCartInput,
  UpdateCartItemInput,
} from '../common/dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => Cart)
  @UseGuards(JwtAuthGuard)
  async myCart(@Context() context) {
    const userId = context.req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Mutation(() => CartItem)
  @UseGuards(JwtAuthGuard)
  async addToCart(@Args('input') input: AddToCartInput, @Context() context) {
    const userId = context.req.user.userId;
    return this.cartService.addToCart(userId, input);
  }

  @Mutation(() => CartItem)
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @Args('input') input: UpdateCartItemInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.cartService.updateCartItem(userId, input);
  }

  @Mutation(() => CartItem)
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @Args('cartItemId') cartItemId: string,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.cartService.removeFromCart(userId, cartItemId);
  }
}
