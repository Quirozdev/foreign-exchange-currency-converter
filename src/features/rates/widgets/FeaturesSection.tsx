import { useState } from "react";
import { Tabs } from "../../../shared/widgets/Tabs";
import { HistorySection } from "../../history/sections/HistorySection";
import type { Tab, TabValue } from "@/shared/model/tabs.types";
import { CompareSection } from "@/features/compare/sections/CompareSection";
import { FavoritesSection } from "@/features/favorites/sections/FavoritesSection";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { LogSection } from "@/features/conversion-logs/sections/LogSection";
import { useLogs } from "@/features/conversion-logs/hooks/use-logs";

export function FeaturesSection() {
  const { favorites } = useFavorites();
  const { logs } = useLogs();

  const tabs: Tab[] = [
    {
      label: "History",
      value: "history",
    },
    {
      label: "Compare",
      value: "compare",
    },
    {
      label: "Favorites",
      value: "favorites",
      count: favorites.length,
    },
    {
      label: "Log",
      value: "log",
      count: logs.length,
    },
  ];

  const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-5">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <>
        {activeTab === "history" && <HistorySection />}
        {activeTab === "compare" && <CompareSection />}
        {activeTab === "favorites" && <FavoritesSection />}
        {activeTab === "log" && <LogSection />}
      </>
    </div>
  );
}
