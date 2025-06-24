import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartInput, UpdateCartItemInput } from '../common/dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
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

    if (!cart) {
      // Create a new cart if it doesn't exist
      return this.prisma.cart.create({
        data: {
          userId,
          items: {},
        },
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

    return cart;
  }

  async addToCart(userId: string, input: AddToCartInput) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // Check if product exists and has enough stock
    const product = await this.prisma.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < input.quantity) {
      throw new Error('Not enough stock');
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: input.productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity if item exists
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + input.quantity,
        },
        include: {
          product: true,
        },
      });
    }

    // Create new cart item
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: input.productId,
        quantity: input.quantity,
      },
      include: {
        product: true,
      },
    });
  }

  async updateCartItem(userId: string, input: UpdateCartItemInput) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = cart.items.find((item) => item.id === input.cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (input.quantity <= 0) {
      return this.prisma.cartItem.delete({
        where: { id: input.cartItemId },
      });
    }

    // Check stock
    const product = await this.prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < input.quantity) {
      throw new Error('Not enough stock');
    }

    return this.prisma.cartItem.update({
      where: { id: input.cartItemId },
      data: {
        quantity: input.quantity,
      },
      include: {
        product: true,
      },
    });
  }

  async removeFromCart(userId: string, cartItemId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
