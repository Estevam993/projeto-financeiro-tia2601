import type {FormCreateExpenseType} from "@/types/FormCreateExpenseType.ts";
import type {Dispatch, SetStateAction} from "react";
import type {ExpenseType} from "@/types/ExpenseType.ts";
import type {ExpensePredictType} from "@/types/ExpensePredictType.ts";

export type MensalExpensesPropsTypes = {
  handleCreateExpense: (data: FormCreateExpenseType) => Promise<void>;
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
  fetchMensalities: () => Promise<void>;
  mensalities: ExpenseType[];
  predicties: ExpensePredictType;
}