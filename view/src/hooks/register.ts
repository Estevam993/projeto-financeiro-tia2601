const apiUrl = import.meta.env.VITE_API_URL;

export default async function registerRequest(nome: string, email: string) {
    const response = await fetch(apiUrl+'/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    });

    return response.json();
}