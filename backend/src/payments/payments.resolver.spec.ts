import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsResolver } from './payments.resolver';

describe('PaymentsResolver', () => {
  let resolver: PaymentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsResolver],
    }).compile();

    resolver = module.get<PaymentsResolver>(PaymentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
