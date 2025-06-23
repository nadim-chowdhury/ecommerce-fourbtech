import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdateVendorInput,
  CreateVendorInput,
  DeleteVendorInput,
} from '../common/dto/user.dto';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  async updateVendor(userId: string, input: UpdateVendorInput) {
    // Find the vendor by userId
    const vendor = await this.prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }
    // Update vendor profile
    return this.prisma.vendor.update({
      where: { userId },
      data: input,
    });
  }

  async createVendor(userId: string, input: CreateVendorInput) {
    // Check if vendor already exists for user
    const existing = await this.prisma.vendor.findUnique({ where: { userId } });
    if (existing) {
      throw new ForbiddenException('Vendor already exists for this user');
    }
    return this.prisma.vendor.create({
      data: {
        name: input.name,
        userId,
      },
    });
  }

  async deleteVendor(userId: string) {
    // Check if vendor exists
    const vendor = await this.prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }
    // Optionally: check for products, payouts, etc. before deleting
    return this.prisma.vendor.delete({ where: { userId } });
  }

  async getVendorByUserId(userId: string) {
    // Returns the full vendor object, including vendor name
    return this.prisma.vendor.findUnique({ where: { userId } });
  }
}
