import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsEnum, Min } from 'class-validator';

@ObjectType()
export class OrderItem {
  @Field()
  id: string;

  @Field()
  orderId: string;

  @Field()
  productId: string;

  @Field()
  quantity: number;

  @Field()
  price: number;
}

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field()
  customerId: string;

  @Field()
  total: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [OrderItem])
  items: OrderItem[];
}

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@InputType()
export class CreateOrderItemInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsNumber()
  @Min(1)
  quantity: number;
}

enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@InputType()
export class UpdateOrderStatusInput {
  @Field()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

@ObjectType()
export class OrderStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  shipped: number;

  @Field(() => Int)
  delivered: number;

  @Field(() => Int)
  cancelled: number;
}
