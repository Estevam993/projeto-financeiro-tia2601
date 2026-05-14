import type {ColumnDef} from "@tanstack/react-table";

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

export {columnsDespesas, type Despesa}