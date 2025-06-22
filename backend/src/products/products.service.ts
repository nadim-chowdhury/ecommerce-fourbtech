import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductInput,
  UpdateProductInput,
  Product,
} from '../common/dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProductInput: CreateProductInput,
    userId: string,
  ): Promise<Product> {
    // Verify user is a seller and owns the vendor
    const user = (await this.prisma.user.findUnique({
      where: { id: userId },
      include: { vendor: true },
    })) as any;

    if (!user || user.role !== 'SELLER') {
      throw new ForbiddenException('Only sellers can create products');
    }

    if (user.vendor?.id !== createProductInput.vendorId) {
      throw new ForbiddenException(
        'You can only create products for your own vendor account',
      );
    }

    const product = (await this.prisma.product.create({
      data: {
        ...createProductInput,
        vendorId: createProductInput.vendorId,
      },
    })) as any;

    return product as Product;
  }

  async findAll(): Promise<Product[]> {
    const products = (await this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })) as any;
    return products as Product[];
  }

  async findByVendor(vendorId: string): Promise<Product[]> {
    const products = (await this.prisma.product.findMany({
      where: {
        vendorId,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    })) as any;
    return products as Product[];
  }

  async findOne(id: string): Promise<Product> {
    const product = (await this.prisma.product.findUnique({
      where: { id },
    })) as any;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product as Product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
    userId: string,
  ): Promise<Product> {
    // Verify user owns the product
    const product = (await this.prisma.product.findUnique({
      where: { id },
      include: { vendor: { include: { user: true } } },
    })) as any;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.vendor.user.id !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }

    const updatedProduct = (await this.prisma.product.update({
      where: { id },
      data: updateProductInput,
    })) as any;

    return updatedProduct as Product;
  }

  async remove(id: string, userId: string): Promise<Product> {
    // Verify user owns the product
    const product = (await this.prisma.product.findUnique({
      where: { id },
      include: { vendor: { include: { user: true } } },
    })) as any;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.vendor.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    const deletedProduct = (await this.prisma.product.delete({
      where: { id },
    })) as any;

    return deletedProduct as Product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = (await this.prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })) as any;
    return products as Product[];
  }
}
