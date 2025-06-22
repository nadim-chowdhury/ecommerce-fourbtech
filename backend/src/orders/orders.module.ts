import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OrdersResolver, OrdersService, PrismaService],
  exports: [OrdersService],
})
export class OrdersModule {}
