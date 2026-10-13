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
import {
  extractDateComponentsFromIsoStringDateWithoutTime,
  formatIsoStringToLongDateString,
} from "@/shared/lib/dates";
import { HistoryChartTooltip } from "./HistoryChartTooltip";

interface Props {
  ratesHistory: Rate[];
  sendCurrency: string;
  receiveCurrency: string;
}

export function HistoryChart({
  ratesHistory,
  sendCurrency,
  receiveCurrency,
}: Props) {
  const isDifferenceMoreThanAYear =
    ratesHistory.length > 0 &&
    extractDateComponentsFromIsoStringDateWithoutTime(ratesHistory[0].date)
      .year !==
      extractDateComponentsFromIsoStringDateWithoutTime(
        ratesHistory[ratesHistory.length - 1].date,
      ).year;

  const transformedData = ratesHistory.map(({ date, rate }) => {
    return {
      date: formatIsoStringToLongDateString(date, isDifferenceMoreThanAYear),
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
        <Tooltip
          content={(tooltipContentProps) => (
            <HistoryChartTooltip
              {...tooltipContentProps}
              sendCurrency={sendCurrency}
              receiveCurrency={receiveCurrency}
            />
          )}
        />
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
