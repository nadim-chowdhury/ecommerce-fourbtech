import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateVendorInput } from '../common/dto/user.dto';

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
}
