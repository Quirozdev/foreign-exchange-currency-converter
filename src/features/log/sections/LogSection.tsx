import { Button } from "@/shared/components/Button";
import { LogItem } from "../components/LogItem";
import { LogSectionEmpty } from "../components/LogSectionEmpty";

export function LogSection() {
  const dummyData = [
    {
      sendCurrency: "USD",
      sendValue: 1000,
      receiveCurrency: "EUR",
      receiveValue: 853.02,
      date: new Date(2026, 9, 16, 6, 0, 0),
    },
    {
      sendCurrency: "EUR",
      sendValue: 500,
      receiveCurrency: "JPY",
      receiveValue: 92490,
      date: new Date(2026, 9, 16, 15, 32, 0),
    },
    {
      sendCurrency: "GBP",
      sendValue: 250,
      receiveCurrency: "USD",
      receiveValue: 339.38,
      date: new Date(2026, 9, 15, 11, 0, 0),
    },
    {
      sendCurrency: "USD",
      sendValue: 1500,
      receiveCurrency: "GBP",
      receiveValue: 1104.95,
      date: new Date(2026, 9, 15, 1, 20, 0),
    },
  ];

  if (dummyData.length === 0) {
    return <LogSectionEmpty />;
  }

  return (
    <section className="rounded-16 flex flex-col gap-y-5 border border-neutral-600 bg-neutral-700 px-4 py-5 md:px-5">
      <div className="flex flex-col justify-between gap-x-4 gap-y-2.5 md:flex-row md:items-center">
        <p className="text-preset-3-medium text-neutral-50 uppercase">
          Conversion Log
        </p>
        <div className="flex items-center justify-between gap-x-4">
          <p className="text-preset-5 text-neutral-50 uppercase opacity-70">
            {dummyData.length} Logged
          </p>
          <Button
            isActive={false}
            text="Clear All"
            className="text-neutral-200 uppercase outline-neutral-400"
          />
        </div>
      </div>
      <div className="flex max-h-162.5 scrollbar-thin scrollbar-thumb-neutral-200 flex-col gap-y-3 overflow-y-auto p-1">
        {dummyData.map((data) => {
          return (
            <LogItem
              key={`${data.date}-${data.sendCurrency}-${data.receiveCurrency}`}
              {...data}
            />
          );
        })}
      </div>
    </section>
  );
}
