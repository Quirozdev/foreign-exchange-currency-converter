import { Logo } from "@/shared/components/Logo";
import { LiveMarkets } from "./LiveMarkets";

export function Header() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 md:px-6 md:py-5">
        <Logo />
        <div>
          <p className="text-preset-6 md:text-preset-4 text-neutral-200">
            55 CURRENCIES · EOD · ECB DATA
          </p>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
}
