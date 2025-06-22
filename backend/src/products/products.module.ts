import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';

@Module({
  providers: [
    ProductsResolver,
    ProductsService,
    PrismaService,
    VendorResolver,
    VendorService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
