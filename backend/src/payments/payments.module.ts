import { Module } from '@nestjs/common';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';

@Module({
  providers: [PaymentsResolver, PaymentsService]
})
export class PaymentsModule {}
