import {Button} from "../components"
import {useNavigate} from "react-router-dom";
import login from "../hooks/login.ts";
import {useState} from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        const response = await login(email)
        if (typeof response.user === 'number' && !!response.user)
            navigate('/dashboard')

    }

    return (
        <>
            <div className={"w-full h-screen flex justify-center items-center"}>
                <div className={"border border-gray-200/15 rounded-lg h-96 w-lg flex justify-center items-center flex-col gap-4"}>
                    <input
                        type={"email"}
                        placeholder={"E-mail"}
                        className={"border border-gray-200/15 rounded-lg h-8 p-2"}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className={"flex justify-end items-center gap-4"}>
                        <Button text={"Criar conta"} onClick={() => handleSubmit()} />
                        <Button text={"Criar conta"} onClick={() =>  navigate("/")} />
                    </div>
                </div>
            </div>
        </>
    )
}