'use client'
import { AnalyticsItem } from '@/types/analytics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const chartConfig = {
  uv: {
    label: 'uv',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface AnalyticsChartProps {
  chartData: AnalyticsItem[]
}

const AnalyticsChart = ({ chartData }: AnalyticsChartProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Analytics for this year</CardTitle>
          <CardDescription>Views per month</CardDescription>
          <CardContent className="px-0">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 5,
                  top: 10,
                  right: 10,
                }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={true}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="uv"
                  type="natural"
                  stroke="var(--color-uv)"
                  strokeWidth={2}
                  dot={{
                    fill: 'var(--color-uv)',
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  )
}

export default AnalyticsChart
