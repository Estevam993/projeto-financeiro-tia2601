import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import type {ExpensePredictType} from "@/types/ExpensePredictType.ts";

export default function ExpenseForecast({despesa, limite}: { despesa: ExpensePredictType, limite: number }) {

  const percentual =
    (despesa.previsao_linear / limite) * 100

  const color =
    percentual <= 25
      ? "green"
      : percentual <= 50
        ? "blue"
        : percentual <= 75
          ? "yellow"
          : percentual <= 90
            ? "orange"
            : "red"

  return (
    <Card className="w-full bg-transparent text-white">
      <CardHeader>
        <CardTitle>Despesas do mês</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Info
            label="Média diária"
            value={despesa.media_diaria ?? 0}
          />

          <Info
            label="Previsão final"
            value={despesa.previsao_final ?? 0}
          />

          <Info
            label="Previsão linear"
            value={despesa.previsao_linear ?? 0}
          />

          <Info
            label="Modelo IA"
            value={despesa.previsao_modelo ?? 0}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uso previsto</span>
            <span>{percentual.toFixed(1)}%</span>
          </div>

          <Progress color={color} value={percentual ?? 0}/>
        </div>

        <Badge
          variant={
            despesa.vai_estourar
              ? "destructive"
              : "secondary"
          }
        >
          {despesa.vai_estourar
            ? "Vai estourar o orçamento"
            : "Dentro do orçamento"}
        </Badge>
      </CardContent>
    </Card>
  )
}

function Info({
                label,
                value
              }: {
  label: string
  value: number
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="text-xl font-bold">
        R$ {value.toFixed(2)}
      </p>
    </div>
  )
}