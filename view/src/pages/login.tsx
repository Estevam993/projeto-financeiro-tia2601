import {Button} from "../components"
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className={"w-full h-screen flex justify-center items-center"}>
                <div className={"border border-gray-200/15 rounded-lg h-96 w-lg flex justify-center items-center flex-col gap-4"}>
                    <input type={"text"} placeholder={"E-mail"} className={"border border-gray-200/15 rounded-lg h-8 p-2"} />
                    <div className={"flex justify-end items-center gap-4"}>
                        <Button text={"Criar conta"} onClick={() => alert("Entrar")} />
                        <Button text={"Criar conta"} onClick={() =>  navigate("/")} />
                    </div>
                </div>
            </div>
        </>
    )
}