import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrderInput,
  UpdateOrderStatusInput,
  Order,
} from '../common/dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createOrderInput: CreateOrderInput,
    customerId: string,
  ): Promise<Order> {
    // Validate products and calculate total
    let total = 0;
    const orderItems: Array<{
      productId: string;
      quantity: number;
      price: number;
    }> = [];

    for (const item of createOrderInput.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }

      if (!product.isActive) {
        throw new BadRequestException(
          `Product ${product.name} is not available`,
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}`,
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        customerId,
        total,
        status: 'PENDING',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    });

    // Update product stock
    for (const item of createOrderInput.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCustomer(customerId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByVendor(vendorId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              vendorId,
            },
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
    userId: string,
  ): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
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

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if user is authorized to update this order
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Only the customer or the vendor can update the order
    const isCustomer = order.customerId === userId;
    const isVendor =
      user.role === 'SELLER' &&
      order.items.some((item) => item.product.vendor.userId === userId);

    if (!isCustomer && !isVendor) {
      throw new ForbiddenException(
        'You are not authorized to update this order',
      );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: updateOrderStatusInput.status,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    });

    return updatedOrder;
  }

  async getOrderStats(userId: string, role: string) {
    if (role === 'CUSTOMER') {
      const orders = await this.findByCustomer(userId);
      return {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'PENDING').length,
        shipped: orders.filter((o) => o.status === 'SHIPPED').length,
        delivered: orders.filter((o) => o.status === 'DELIVERED').length,
        cancelled: orders.filter((o) => o.status === 'CANCELLED').length,
      };
    } else if (role === 'SELLER') {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { vendor: true },
      });

      if (!user?.vendor) {
        return { total: 0, pending: 0, shipped: 0, delivered: 0, cancelled: 0 };
      }

      const orders = await this.findByVendor(user.vendor.id);
      return {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'PENDING').length,
        shipped: orders.filter((o) => o.status === 'SHIPPED').length,
        delivered: orders.filter((o) => o.status === 'DELIVERED').length,
        cancelled: orders.filter((o) => o.status === 'CANCELLED').length,
      };
    }

    return { total: 0, pending: 0, shipped: 0, delivered: 0, cancelled: 0 };
  }
}
