import { Test, TestingModule } from '@nestjs/testing';
import { PolicyController } from './policy.controller';

describe('Policy Controller', () => {
  let controller: PolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyController],
    }).compile();

    controller = module.get<PolicyController>(PolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
