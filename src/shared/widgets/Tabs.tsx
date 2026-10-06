import { useState } from "react";
import { Tab } from "../components/Tab";
import { tabs } from "../model/tabs.constants";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div
      role="tablist"
      className="flex items-center gap-x-2 border-b border-neutral-600"
    >
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.value}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.value}
            onSelect={() => setActiveTab(tab.value)}
          />
        );
      })}
    </div>
  );
}
