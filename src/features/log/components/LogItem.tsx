import { Button } from "@/shared/components/Button";
import { formatNumberToMoney } from "@/shared/utils/numbers";
import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import TrashIcon from "@/assets/images/icon-delete.svg";
import { getRelativeTimeStringValueBetweenDates } from "@/shared/lib/dates";

interface Props {
  sendCurrency: string;
  sendValue: number;
  receiveCurrency: string;
  receiveValue: number;
  date: Date;
}

export function LogItem({
  sendCurrency,
  sendValue,
  receiveCurrency,
  receiveValue,
  date,
}: Props) {
  return (
    <div className="rounded-10 flex items-center justify-between gap-x-2.5 border border-neutral-500 bg-neutral-600 p-3 md:gap-x-4 md:p-4">
      <div className="flex flex-col gap-y-1 md:flex-1 md:flex-row md:gap-x-4">
        <p className="text-preset-4 text-neutral-200 md:min-w-16">
          {getRelativeTimeStringValueBetweenDates(date, new Date())}
        </p>
        <div className="flex items-center gap-x-2 md:flex-1">
          <p className="text-preset-4 text-neutral-50">{sendCurrency}</p>
          <img src={ArrowRightIcon} alt="Arrow right icon" />
          <p className="text-preset-4 text-neutral-50">{receiveCurrency}</p>
        </div>
      </div>

      <div className="flex items-center gap-x-2.5 md:gap-x-4">
        <div className="flex flex-col items-end gap-x-5 gap-y-0.5 md:flex-row">
          <p className="text-preset-3 text-neutral-100">
            {formatNumberToMoney(sendValue)}
          </p>
          <p className="text-preset-3 text-lime-500">
            {formatNumberToMoney(receiveValue)}
          </p>
        </div>
        <Button
          isActive={false}
          icon={<img src={TrashIcon} alt="Trash icon" />}
        />
      </div>
    </div>
  );
}
