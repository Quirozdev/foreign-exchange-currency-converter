import { useState } from "react";
import { Tabs } from "../../../shared/widgets/Tabs";
import { HistorySection } from "../../history/sections/HistorySection";
import { LogSection } from "./LogSection";
import type { Tab, TabValue } from "@/shared/model/tabs.types";
import { CompareSection } from "@/features/compare/sections/CompareSection";
import { FavoritesSection } from "@/features/favorites/sections/FavoritesSection";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";

export function FeaturesSection() {
  const { favorites } = useFavorites();

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
      count: 0,
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
