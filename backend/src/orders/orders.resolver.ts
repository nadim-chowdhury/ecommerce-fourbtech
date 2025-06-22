import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  Order,
  CreateOrderInput,
  UpdateOrderStatusInput,
  OrderStats,
} from '../common/dto/order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
    @Context() context,
  ) {
    const customerId = context.req.user.userId;
    return this.ordersService.create(createOrderInput, customerId);
  }

  @Query(() => [Order], { name: 'orders' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll(@Context() context) {
    const user = context.req.user;
    if (user.role === 'ADMIN') {
      return this.ordersService.findAll();
    }
    return this.ordersService.findByCustomer(user.userId);
  }

  @Query(() => [Order], { name: 'vendorOrders' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  findByVendor(@Args('vendorId') vendorId: string) {
    return this.ordersService.findByVendor(vendorId);
  }

  @Query(() => [Order], { name: 'myOrders' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  findMyOrders(@Context() context) {
    const customerId = context.req.user.userId;
    return this.ordersService.findByCustomer(customerId);
  }

  @Query(() => Order, { name: 'order' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER')
  updateOrderStatus(
    @Args('id') id: string,
    @Args('input') updateOrderStatusInput: UpdateOrderStatusInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId;
    return this.ordersService.updateStatus(id, updateOrderStatusInput, userId);
  }

  @Query(() => OrderStats, { name: 'orderStats' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getOrderStats(@Context() context) {
    const userId = context.req.user.userId;
    const role = context.req.user.role;
    return this.ordersService.getOrderStats(userId, role);
  }
}
