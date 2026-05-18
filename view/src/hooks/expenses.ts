const apiUrl = import.meta.env.VITE_API_URL;

export default async function getExpenses() {
  const userId = localStorage.getItem('user');

  const expenses = await fetch(apiUrl + `/despesas/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  });

  return expenses.json();
}