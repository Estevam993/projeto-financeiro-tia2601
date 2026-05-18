import {useState} from "react";
import type {ExpenseType} from "@/types/ExpenseType.ts";
import getExpenses from "@/hooks/expenses.ts";
import getMensalities from "@/hooks/mensalities.ts";
import type {FormCreateExpenseType} from "@/types/FormCreateExpenseType.ts";
import createExpense from "@/hooks/createExpense.ts";
import {toast} from "sonner";

export default function useDashboard() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([])
  const [values, setValues] = useState<Record<string, number>>({})
  const [total, setTotal] = useState<number>(0)
  const [limit, setLimit] = useState<number>(
    Number(localStorage.getItem("limit")) || 2000
  )

  const [mensalities, setMensalities] = useState<ExpenseType[]>(JSON.parse(localStorage.getItem('mensalities') ?? "[]") ?? [])
  const [predicties, setPredicties] = useState(JSON.parse(localStorage.getItem('predicties') ?? "{}") ?? {})


  async function fetchExpenses() {
    try {
      const response = await getExpenses()

      setExpenses(response.despesa.despesas)
      setValues(response.despesa.valores)
      setTotal(response.despesa.total)
    } catch (error) {
      console.log(error instanceof Error ? error.message : error)
    }
  }

  async function fetchMensalities() {
    localStorage.setItem("limit", String(limit))

    const response = await getMensalities({limit})

    setMensalities(response.dados)
    setPredicties(response.despesa)

    localStorage.setItem("mensalities", JSON.stringify(response.dados))
    localStorage.setItem("predicties", JSON.stringify(response.despesa))
  }

  async function handleCreateExpense(form: FormCreateExpenseType) {
    const response = await createExpense(form)


    if (typeof response.user === 'number' && !!response.user) {
      fetchExpenses()
      fetchMensalities()

      toast.success("Despesa salva!")
    } else {
      toast.error(response.message)
    }
  }

  return {
    expenses,
    setExpenses,
    values,
    setValues,
    total,
    setTotal,
    limit,
    setLimit,
    mensalities,
    setMensalities,
    predicties,
    setPredicties,
    fetchExpenses,
    fetchMensalities,
    handleCreateExpense
  }
}