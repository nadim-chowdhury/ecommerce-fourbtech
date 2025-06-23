import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '../common/dto/product.dto';
import {
  UpdateVendorInput,
  CreateVendorInput,
  DeleteVendorInput,
} from '../common/dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Resolver(() => Vendor)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Mutation(() => Vendor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  async updateVendor(
    @Args('input') input: UpdateVendorInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.vendorService.updateVendor(userId, input);
  }

  @Mutation(() => Vendor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  async createVendor(
    @Args('input') input: CreateVendorInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.vendorService.createVendor(userId, input);
  }

  @Mutation(() => Vendor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  async deleteVendor(@Context() context) {
    const userId = context.req.user.userId;
    return this.vendorService.deleteVendor(userId);
  }

  @Query(() => Vendor, { name: 'vendor' })
  @UseGuards(JwtAuthGuard)
  async vendor(@Context() context) {
    const userId = context.req.user.userId;
    return this.vendorService.getVendorByUserId(userId);
  }
}
