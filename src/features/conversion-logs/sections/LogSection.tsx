import { Button } from "@/shared/components/Button";
import { LogItem } from "../components/LogItem";
import { LogSectionEmpty } from "../components/LogSectionEmpty";
import { useLogs } from "../hooks/use-logs";

export function LogSection() {
  const { logs, clearLogs } = useLogs();

  if (logs.length === 0) {
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
            {logs.length} Logged
          </p>
          <Button
            isActive={false}
            onClick={clearLogs}
            text="Clear All"
            className="text-neutral-200 uppercase outline-neutral-400"
          />
        </div>
      </div>
      <div className="flex max-h-162.5 scrollbar-thin scrollbar-thumb-neutral-200 flex-col gap-y-3 overflow-y-auto p-1">
        {logs.map((data) => {
          return <LogItem key={data.id} {...data} />;
        })}
      </div>
    </section>
  );
}
