"use client"
import getExpenses from '@/hooks/expenses.ts'
import {useEffect, useState} from "react";
import DataTable from "@/components/DataTable.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import Button from "@/components/Button";

type Despesa = {
  date: string,
  descricao: string,
  id: number,
  tipo: string,
  user_id: number,
  valor: number,
}

const columnsDespesas: ColumnDef<Despesa>[] = [
  {
    accessorKey: "descricao",
    header: () => (
      <div className="text-white text-center font-bold">
        Descrição
      </div>
    ),
  },
  {
    accessorKey: "tipo",
    header: () => (
      <div className="text-white text-center font-bold">
        Tipo
      </div>
    ),
  },
  {
    accessorKey: "valor",
    header: () => (
      <div className="text-white text-center font-bold">
        Valor
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="text-white text-center font-bold">
        Data
      </div>
    ),
    cell: ({cell}) => {
      const dataFormatada = cell.getValue('date').split('-').reverse().join('/')

      return (
        <div className="">
          {dataFormatada}
        </div>
      )
    }
  }
]

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Despesa[]>([])

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await getExpenses()

        setExpenses(response.despesa.despesas)
      } catch (error) {
        console.log(error instanceof Error ? error.message : error)
      }
    }

    fetchExpenses()
  }, [])

  if (!expenses.length) {
    return (
      <>
        <div className="text-white">
          ESPERA
        </div>
      </>
    )
  }

  return (
    <>
      <div className="text-white p-4 flex flex-row gap-4">
        <div className={"w-[32rem]"}>
          <DataTable data={expenses} columns={columnsDespesas}/>
        </div>
        <div>
          <Button text={"Criar nova despesa"}/>
        </div>

      </div>
    </>
  )
}