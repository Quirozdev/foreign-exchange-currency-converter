import { Marquee } from "@/shared/components/Marquee";

export function LiveMarkets() {
  return (
    <div className="flex">
      <div className="flex shrink-0 items-center justify-center gap-x-2 bg-lime-500 px-2 py-3 md:px-4">
        <div className="h-[6px] w-[6px] rounded-full bg-neutral-900"></div>
        <p className="text-preset-6 md:text-preset-5-medium text-neutral-900 uppercase">
          Live Markets
        </p>
      </div>
      <div className="min-w-0 flex-1 bg-neutral-700">
        <Marquee>
          <div className="flex items-center">
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                USD/JPY
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                157.91
              </p>
              <p className="text-preset-6 md:text-preset-5 text-green-500">
                ▲ +0.04%
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                GBP/USD
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                1.3575
              </p>
              <p className="text-preset-6 md:text-preset-5 text-red-500">
                ▼ −0.22%
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                USD/CHF
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                0.9098
              </p>
              <p className="text-preset-6 md:text-preset-5 text-green-500">
                ▲ +0.13%
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                EUR/GBP
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                0.8633
              </p>
              <p className="text-preset-6 md:text-preset-5 text-green-500">
                ▲ +0.11%
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                AUD/USD
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                0.7208
              </p>
              <p className="text-preset-6 md:text-preset-5 text-green-500">
                ▲ +0.08%
              </p>
            </div>
            <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
              <p className="text-preset-6 md:text-preset-5 text-neutral-200">
                USD/CAD
              </p>
              <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
                1.3815
              </p>
              <p className="text-preset-6 md:text-preset-5 text-green-500">
                ▲ +0.04%
              </p>
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
}
