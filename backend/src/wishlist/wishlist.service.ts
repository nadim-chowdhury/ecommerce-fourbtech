import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToWishlistInput } from '../common/dto/wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                vendor: true,
              },
            },
          },
        },
      },
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  vendor: true,
                },
              },
            },
          },
        },
      });
    }

    return wishlist;
  }

  async addToWishlist(userId: string, input: AddToWishlistInput) {
    const { productId } = input;
    const wishlist = await this.getWishlist(userId);

    const existingItem = await this.prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    if (existingItem) {
      return wishlist; // Or throw an error, depending on desired behavior
    }

    await this.prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, wishlistItemId: string) {
    const wishlist = await this.getWishlist(userId);

    const itemToRemove = await this.prisma.wishlistItem.findFirst({
      where: {
        id: wishlistItemId,
        wishlistId: wishlist.id,
      },
    });

    if (!itemToRemove) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.prisma.wishlistItem.delete({
      where: { id: wishlistItemId },
    });

    return this.getWishlist(userId);
  }
}
