import { useState } from "react";
import { Tabs } from "../../../shared/widgets/Tabs";
import { CompareSection } from "./CompareSection";
import { FavoritesSection } from "./FavoritesSection";
import { HistorySection } from "./HistorySection";
import { LogSection } from "./LogSection";
import { tabs } from "@/shared/model/tabs.constants";

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-5">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <>
        {activeTab === "history" && <HistorySection />}
        {activeTab === "compare" && <CompareSection />}
        {activeTab === "favorites" && <FavoritesSection />}
        {activeTab === "log" && <LogSection />}
      </>
    </div>
  );
}
