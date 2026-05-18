import DataTable from "@/components/DataTable.tsx";
import {columnsDespesas} from "@/helpers/configExpensesTable.tsx";
import TypeChart from "@/components/TypesChart.tsx";
import type {TotalExpensePropsType} from "@/types/TotalExpensePropsType.ts";


export default function TotalExpenses({total, expenses, values}: TotalExpensePropsType) {
  return (
    <div className={"w-full flex flex-col items-center gap-4"}>
      <div className={"font-semibold text-xl"}>
        DESPESAS TOTAIS: R$ {Math.ceil(total * 20) / 20}
      </div>
      <div className={"max-h-[430px] w-full overflow-auto"}>
        <DataTable data={expenses} columns={columnsDespesas}/>
      </div>
      <div>
        <TypeChart values={values}/>
      </div>
    </div>
  )
}