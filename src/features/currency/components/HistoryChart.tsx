import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Rate } from "../model/currencies.types";

interface Props {
  ratesHistory: Rate[];
}

export function HistoryChart({ ratesHistory }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300} aspect={5}>
      <AreaChart
        style={{
          width: "100%",
          maxHeight: "70vh",
        }}
        responsive
        data={ratesHistory}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-lime-500)"
              stopOpacity={0.75}
            />
            <stop
              offset="95%"
              stopColor="var(--color-neutral-700)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          style={{
            stroke: "var(--color-neutral-500)",
          }}
        />
        <XAxis dataKey="date" />
        <YAxis width={80} domain={["dataMin", "dataMax"]} />
        {/* <Tooltip /> */}
        <Area
          type="linear"
          dataKey="rate"
          stroke="var(--color-lime-500)"
          strokeWidth={2}
          fillOpacity={0.5}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
