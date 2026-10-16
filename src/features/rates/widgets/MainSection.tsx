import { FavoritesProvider } from "@/features/favorites/providers/FavoritesProvider";
import { CurrenciesProvider } from "../providers/CurrenciesProvider";
import { RatesProvider } from "../providers/RatesProvider";
import { CheckRateSection } from "./CheckRateSection";
import { FeaturesSection } from "./FeaturesSection";

export function MainSection() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-y-8 px-4 py-8 md:px-6 md:py-12 xl:px-8">
      <RatesProvider>
        <CurrenciesProvider>
          <FavoritesProvider>
            <CheckRateSection />
            <FeaturesSection />
          </FavoritesProvider>
        </CurrenciesProvider>
      </RatesProvider>
    </main>
  );
}
