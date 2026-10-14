import { useState } from "react";
import { CheckRateSection } from "./CheckRateSection";
import { FeaturesSection } from "./FeaturesSection";

export function MainSection() {
  const [sendCurrency, setSendCurrency] = useState<string>("USD");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("EUR");

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-y-8 px-4 py-8 md:px-6 md:py-12 xl:px-8">
      <CheckRateSection
        sendCurrency={sendCurrency}
        onSendCurrencyChange={setSendCurrency}
        receiveCurrency={receiveCurrency}
        onReceiveCurrencyChange={setReceiveCurrency}
      />
      <FeaturesSection
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
      />
    </main>
  );
}
