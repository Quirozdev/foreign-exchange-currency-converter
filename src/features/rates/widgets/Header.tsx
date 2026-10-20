import { Logo } from "@/shared/components/Logo";
import { useCurrencies } from "../hooks/use-currencies";
import { Skeleton } from "@/shared/components/Skeleton";
import { LiveMarketsTicker } from "./LiveMarketsTicker";

export function Header() {
  const { currencies, isLoadingCurrencies } = useCurrencies();

  return (
    <header>
      <div className="flex items-center justify-between p-4 md:px-6 md:py-5">
        <Logo />
        {isLoadingCurrencies ? (
          <Skeleton className="h-2.5 w-46 md:h-4 md:w-70" />
        ) : (
          <div>
            <p className="text-preset-6 md:text-preset-4 text-neutral-200">
              {currencies?.length ?? 0} CURRENCIES · EOD · ECB DATA
            </p>
          </div>
        )}
      </div>
      <LiveMarketsTicker />
    </header>
  );
}
