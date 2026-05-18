import type {ColumnDef} from "@tanstack/react-table";
import type {ExpenseType} from "@/types/ExpenseType.ts";


const columnsDespesas: ColumnDef<ExpenseType>[] = [
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
      // @ts-expect-error erro de unknow
      const dataFormatada = cell.getValue('date').split('-').reverse().join('/')

      return (
        <div className="">
          {dataFormatada}
          </div>
      )
    }
  }
]

export {columnsDespesas}