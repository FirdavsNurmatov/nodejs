import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
    service.create({ name: 'Firdavs', amount: 500 });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });

  // create
  it('should be create new transaction', () => {
    const budget = { name: 'Firdavs', amount: 200 };
    const mockResult = { id: 2, ...budget };

    const result = service.create(budget);

    expect(result).toEqual(mockResult);
  });

  // findAll
  it('should be return all transactions', () => {
    const mockResult = [{ id: 1, name: 'Firdavs', amount: 500 }];

    expect(service.findAll()).toEqual(mockResult);
  });

  // findOne
  it('should be return one transaction', () => {
    const mockResult = { id: 1, name: 'Firdavs', amount: 500 };

    expect(service.findOne(1)).toEqual(mockResult);
  });

  // update
  it('should be update transaction', () => {
    const shouldUpdate = { amount: 1000 };
    const mockResult = [{ id: 1, name: 'Firdavs', amount: 500 }];

    expect(service.update(1, shouldUpdate)).toEqual(mockResult);
  });

  // delete
  it('it should remove one transaction', () => {
    expect(service.remove(1)).toEqual([
      { id: 1, name: 'Firdavs', amount: 500 },
    ]);
  });
});
