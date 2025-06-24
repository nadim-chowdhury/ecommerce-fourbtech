import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [WishlistService, WishlistResolver, PrismaService],
})
export class WishlistModule {}
