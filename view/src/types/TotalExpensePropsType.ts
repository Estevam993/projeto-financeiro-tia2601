import type {ExpenseType} from "@/types/ExpenseType.ts";


export type TotalExpensePropsType = {
  values: Record<string, number>;
  total: number;
  expenses: ExpenseType[];
}