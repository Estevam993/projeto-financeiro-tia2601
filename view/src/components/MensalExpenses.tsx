import CreateExpenseDialog from "@/components/CreateExpenseDialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import Button from "@/components/Button.tsx";
import DataTable from "@/components/DataTable.tsx";
import {columnsDespesas} from "@/helpers/configExpensesTable.tsx";
import ExpenseForecast from "@/components/ExpenseForecast.tsx";
import type {MensalExpensesPropsTypes} from "@/types/MensalExpensesPropsTypes.ts";


export default function MensalExpenses({
                                         handleCreateExpense,
                                         setLimit,
                                         limit,
                                         fetchMensalities,
                                         mensalities,
                                         predicties
                                       }: MensalExpensesPropsTypes) {
  return (
    <div className={"w-full flex flex-col gap-4"}>
      <div className={"w-full flex items-center justify-center flex-col gap-4 px-4"}>
        <CreateExpenseDialog handleSubmit={handleCreateExpense}/>
        <div className={"flex gap-4 w-full"}>
          <Input
            placeholder={"Limite"}
            className={"p-2 "}
            type={"number"}
            onChange={(e) => setLimit(Number(e.target.value))}
            value={limit}
          />
          <Button text={"Consultar"} onClick={() => fetchMensalities()}/>
        </div>
        <div className={"w-full flex flex-col gap-4"}>
          <div className={"text-2xl font-semibold"}>
            Despesas do Mês atual
          </div>
          <div className={"max-h-[250px] overflow-auto"}>
            <DataTable data={mensalities} columns={columnsDespesas}/>
          </div>
          <ExpenseForecast despesa={predicties} limite={limit}/>
        </div>
      </div>
    </div>
  )
}