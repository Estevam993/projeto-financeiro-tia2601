import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis} from "recharts";
import colors from "@/helpers/colors.ts";

interface TypeChartProps {
  values: Record<string, number>
}

export default function TypeChart({values}: TypeChartProps) {

  const chartData = Object.entries(values).map(([category, value]) => ({
    category,
    value,
  }))

  const chartConfig = Object.fromEntries(
    Object.keys(values).map((key, index) => [
      key,
      {
        label: key,
        color: colors[index % colors.length],
      },
    ])
  ) satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-max">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false}/>
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent className={"bg-white text-black"}/>}/>
        <Bar dataKey="value" radius={4}>
          {chartData.map((entry, index) => (
            <Cell
              key={entry.category}
              fill={colors[index % colors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}