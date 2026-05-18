import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import Button from "@/components/Button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import type {FormCreateExpenseType} from "@/types/FormCreateExpenseType.ts";


export default function CreateExpenseDialog({handleSubmit}: {
  handleSubmit: (data: FormCreateExpenseType) => Promise<void>
}) {
  const [form, setForm] = useState<FormCreateExpenseType>({
    valor: 0,
    tipo: "",
    descricao: ""
  })


  return (
    <Dialog>
      <DialogTrigger>
        <Button text={"Criar nova despesa"} onClick={() => {
        }}/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova despesa</DialogTitle>
        </DialogHeader>
        <div className={"flex flex-col gap-4"}>
          <Input
            name="valor"
            placeholder={"Valor"}
            className={"p-2"}
            type={"number"}
            value={form.valor}
            onChange={(e) => setForm(prevState => ({
              ...prevState,
              [e.target.name]: e.target.value
            }))}
          />
          <Input
            name="tipo"
            placeholder={"Tipo"}
            className={"p-2 "}
            type={"text"}
            value={form.tipo}
            onChange={(e) => setForm(prevState => ({
              ...prevState,
              [e.target.name]: e.target.value
            }))}
          />
          <Input
            name="descricao"
            placeholder={"Descrição"}
            className={"p-2 "}
            type={"text"}
            value={form.descricao}
            onChange={(e) => setForm(prevState => ({
              ...prevState,
              [e.target.name]: e.target.value
            }))}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button text={"Salvar"} onClick={() => {
              handleSubmit(form)
            }}/>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}