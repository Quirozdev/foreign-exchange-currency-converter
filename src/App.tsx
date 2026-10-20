import { LogsProvider } from "./features/conversion-logs/providers/LogsProvider";
import { FavoritesProvider } from "./features/favorites/providers/FavoritesProvider";
import { MainPage } from "./features/rates/pages/MainPage";
import { CurrenciesProvider } from "./features/rates/providers/CurrenciesProvider";
import { RatesProvider } from "./features/rates/providers/RatesProvider";

function App() {
  return (
    <CurrenciesProvider>
      <RatesProvider>
        <FavoritesProvider>
          <LogsProvider>
            <MainPage />;
          </LogsProvider>
        </FavoritesProvider>
      </RatesProvider>
    </CurrenciesProvider>
  );
}

export default App;
