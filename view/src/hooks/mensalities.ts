const apiUrl = import.meta.env.VITE_API_URL;

export default async function getMensalities({limit}: { limit: number }) {
  const userId = localStorage.getItem('user');

  try {
    const mensalities = await fetch(apiUrl + `/despesas/mensal?limite=${limit}&id=${userId}`, {
      method: 'GET',
      credentials: 'include'
    });

    return mensalities.json();
  } catch (err) {
    console.log(err instanceof Error ? err : (err));
  }

}