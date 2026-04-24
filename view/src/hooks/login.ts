const apiUrl = import.meta.env.VITE_API_URL;

export default async function loginRequest(email:string){
    const response = await fetch(apiUrl+'/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    return response.json();
}