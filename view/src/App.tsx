import {Button} from './components'
import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import register from './hooks/register.ts'

export default function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    const response = await register(name, email)
    if (typeof response.id === 'number' && !!response.id)
      navigate('/login')

  }

  return (
    <>
      <div className={"w-full h-screen flex justify-center items-center"}>
        <div className={"border border-gray-200/15 rounded-lg h-96 w-lg flex justify-center items-center flex-col gap-4"}>
          <input
              type={"text"}
              placeholder={"Nome"}
              className={"border border-gray-200/15 rounded-lg h-8 p-2"}
              onChange={(e) => setName(e.target.value)}
              value={name}
          />
          <input
              type={"email"}
              placeholder={"E-mail"}
              className={"border border-gray-200/15 rounded-lg h-8 p-2"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
          />
          <div className={"flex justify-end items-center gap-4"}>
            <Button text={"Criar conta"} onClick={() => handleSubmit()} />
            <Button text={"Já tenho conta"} onClick={() => navigate('/login')} />
        </div>
      </div>
    </div>
  </>
  )
}


