"use client"
import getExpenses from '@/hooks/expenses.ts'
import {useEffect, useState} from "react";
import DataTable from "@/components/DataTable.tsx";
import Button from "@/components/Button";
import TypeChart from "@/components/TypesChart.tsx";
import {columnsDespesas, type Despesa} from "@/helpers/configExpensesTable.tsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Despesa[]>([])
  const [values, setValues] = useState<Record<string, number>>({})
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await getExpenses()

        setExpenses(response.despesa.despesas)
        setValues(response.despesa.valores)
        setTotal(response.despesa.total)
      } catch (error) {
        console.log(error instanceof Error ? error.message : error)
      }
    }

    fetchExpenses()
  }, [])

  if (!expenses.length)
    return (
      <>
        <div className="text-white">
          ESPERA
        </div>
      </>
    )


  return (
    <>
      <div className="text-white p-4 grid grid-cols-2 gap-4">
        <div className={"w-full flex flex-col items-center gap-4"}>
          <div className={"max-h-[430px] w-full overflow-auto"}>
            <DataTable data={expenses} columns={columnsDespesas}/>
          </div>
          <div>
            <div className={"mb-4 font-semibold text-xl"}>
              TOTAIS POR TIPO
            </div>
            <TypeChart values={values}/>
          </div>
        </div>
        <div className={"w-full flex flex-col gap-4"}>
          <div className={"w-full flex items-center justify-center"}>
            <Button text={"Anotar nova despesa"} onClick={() => {
            }}/>
          </div>
        </div>
      </div>
    </>
  )
}