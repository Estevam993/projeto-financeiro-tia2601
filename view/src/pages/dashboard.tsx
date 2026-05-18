"use client"
import {useEffect} from "react";
import TotalExpenses from "@/components/TotalExpenses.tsx";
import MensalExpenses from "@/components/MensalExpenses.tsx";
import useDashboard from "@/hooks/useDashboard.tsx";

export default function Dashboard() {
  const {
    expenses,
    values,
    total,
    limit,
    setLimit,
    mensalities,
    predicties,
    fetchExpenses,
    fetchMensalities,
    handleCreateExpense
  } = useDashboard()

  useEffect(() => {
    fetchExpenses()
    fetchMensalities()
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
        <TotalExpenses expenses={expenses} total={total} values={values}/>
        <MensalExpenses
          mensalities={mensalities}
          fetchMensalities={fetchMensalities}
          handleCreateExpense={handleCreateExpense}
          limit={limit}
          setLimit={setLimit}
          predicties={predicties}
        />
      </div>
    </>
  )
}