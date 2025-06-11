import { Test, TestingModule } from '@nestjs/testing';
import { VendorsResolver } from './vendors.resolver';

describe('VendorsResolver', () => {
  let resolver: VendorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorsResolver],
    }).compile();

    resolver = module.get<VendorsResolver>(VendorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
