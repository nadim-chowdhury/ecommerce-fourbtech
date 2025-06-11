import { Module } from '@nestjs/common';
import { VendorsResolver } from './vendors.resolver';
import { VendorsService } from './vendors.service';

@Module({
  providers: [VendorsResolver, VendorsService]
})
export class VendorsModule {}
