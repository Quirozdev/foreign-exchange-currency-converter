import { useState } from "react";
import { Tabs } from "../../../shared/widgets/Tabs";
import { FavoritesSection } from "./FavoritesSection";
import { HistorySection } from "../../history/sections/HistorySection";
import { LogSection } from "./LogSection";
import { tabs } from "@/shared/model/tabs.constants";
import type { TabValue } from "@/shared/model/tabs.types";
import { CompareSection } from "@/features/compare/sections/CompareSection";

interface Props {
  sendCurrency: string;
  receiveCurrency: string;
}

export function FeaturesSection({ sendCurrency, receiveCurrency }: Props) {
  const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-5">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <>
        {activeTab === "history" && (
          <HistorySection
            sendCurrency={sendCurrency}
            receiveCurrency={receiveCurrency}
          />
        )}
        {activeTab === "compare" && <CompareSection />}
        {activeTab === "favorites" && <FavoritesSection />}
        {activeTab === "log" && <LogSection />}
      </>
    </div>
  );
}
