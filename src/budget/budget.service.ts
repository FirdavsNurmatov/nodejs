import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

export interface IBudget {
  id: number;
  name: string;
  amount: number;
}

@Injectable()
export class BudgetService {
  budgetInfo: IBudget[] = [];

  create(createBudgetDto: CreateBudgetDto): IBudget {
    const id = this.budgetInfo.length + 1;
    const newTransaction = { ...createBudgetDto, id };
    this.budgetInfo.push(newTransaction);
    return newTransaction;
  }

  findAll(): IBudget[] {
    return this.budgetInfo;
  }

  findOne(id: number) {
    const data = this.budgetInfo.find((budgetData) => budgetData.id === id);
    const result = data ? data : 'not found';
    return result;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const currentTransaction = this.budgetInfo.findIndex(
      (budgetData) => budgetData.id === id,
    );
    const result =
      currentTransaction < 0
        ? 'not found'
        : this.budgetInfo.splice(currentTransaction, 1, {
            ...this.budgetInfo[currentTransaction],
            ...updateBudgetDto,
          });
    return result;
  }

  remove(id: number) {
    const currentTransaction = this.budgetInfo.findIndex(
      (budgetData) => budgetData.id === id,
    );
    const result =
      currentTransaction < 0
        ? 'not found'
        : this.budgetInfo.splice(currentTransaction, 1);
    return result;
  }
}
