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
import { formatIsoStringToLongDateString } from "@/shared/lib/dates";

interface Props {
  ratesHistory: Rate[];
}

export function HistoryChart({ ratesHistory }: Props) {
  const transformedData = ratesHistory.map(({ date, rate }) => {
    return {
      date: formatIsoStringToLongDateString(date),
      rate: rate.toFixed(4),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300} aspect={5}>
      <AreaChart
        style={{
          width: "100%",
          maxHeight: "70vh",
        }}
        responsive
        data={transformedData}
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
        <XAxis dataKey="date" tickLine={false} minTickGap={40} />
        <YAxis width={75} domain={["dataMin", "dataMax"]} tickLine={false} />
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
