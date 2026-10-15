import { FavoritePair } from "../components/FavoritePair";

export function FavoritesSection() {
  const dummyPairs = [
    {
      sendCurrency: "USD",
      receiveCurrency: "EUR",
      rate: 0.853,
      changePercentage: 0.16,
    },
    {
      sendCurrency: "GBP",
      receiveCurrency: "USD",
      rate: 1.3575,
      changePercentage: -0.22,
    },
    {
      sendCurrency: "USD",
      receiveCurrency: "JPY",
      rate: 157.91,
      changePercentage: 0.04,
    },
    {
      sendCurrency: "USD",
      receiveCurrency: "BDT",
      rate: 122.92,
      changePercentage: -0.18,
    },
    {
      sendCurrency: "EUR",
      receiveCurrency: "GBP",
      rate: 0.8633,
      changePercentage: 0.11,
    },
    {
      sendCurrency: "AUD",
      receiveCurrency: "NZD",
      rate: 1.2217,
      changePercentage: 0.23,
    },
    {
      sendCurrency: "USD",
      receiveCurrency: "INR",
      rate: 94.91,
      changePercentage: 0.05,
    },
    {
      sendCurrency: "EUR",
      receiveCurrency: "CHF",
      rate: 1.0668,
      changePercentage: -0.15,
    },
    {
      sendCurrency: "GBP",
      receiveCurrency: "JPY",
      rate: 213.21,
      changePercentage: 0.13,
    },
    {
      sendCurrency: "USD",
      receiveCurrency: "TRY",
      rate: 38.642,
      changePercentage: 0.54,
    },
  ];

  return (
    <section className="rounded-16 border border-neutral-600 bg-neutral-700 p-4 md:p-5">
      <div className="flex flex-col gap-y-4 md:gap-y-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <p className="text-preset-3-medium text-neutral-50 uppercase">
            Pinned pairs
          </p>
          <p className="text-preset-5 text-neutral-50 uppercase opacity-70">
            {dummyPairs.length} favorites
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          {dummyPairs.map((dummyPair, index) => {
            return <FavoritePair key={index} {...dummyPair} />;
          })}
        </div>
      </div>
    </section>
  );
}
