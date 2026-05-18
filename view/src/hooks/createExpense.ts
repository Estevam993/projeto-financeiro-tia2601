import type {FormCreateExpenseType} from "@/types/FormCreateExpenseType.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export default async function createExpense(form: FormCreateExpenseType) {
  const userId = localStorage.getItem('user');

  const response = await fetch(apiUrl + `/despesas/${userId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(form),
    credentials: 'include'
  });

  return response.json();
}