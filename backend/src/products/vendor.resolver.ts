import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '../common/dto/product.dto';
import { UpdateVendorInput } from '../common/dto/user.dto';
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
}
