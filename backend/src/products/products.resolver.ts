import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from '../common/dto/product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  createProduct(
    @Args('input') createProductInput: CreateProductInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.productsService.create(createProductInput, userId);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => [Product], { name: 'vendorProducts' })
  @UseGuards(JwtAuthGuard)
  findByVendor(@Args('vendorId') vendorId: string) {
    return this.productsService.findByVendor(vendorId);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Query(() => [Product], { name: 'searchProducts' })
  searchProducts(@Args('query') query: string) {
    return this.productsService.searchProducts(query);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  updateProduct(
    @Args('id') id: string,
    @Args('input') updateProductInput: UpdateProductInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.productsService.update(id, updateProductInput, userId);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  removeProduct(@Args('id') id: string, @Context() context) {
    const userId = context.req.user.userId;
    return this.productsService.remove(id, userId);
  }
}
