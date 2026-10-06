import { useRef, useState } from "react";
import { Tab } from "../components/Tab";
import { tabs } from "../model/tabs.constants";
import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { useKeyDown } from "../hooks/use-key-down";
import { useClickOutside } from "../hooks/use-click-outside";
import { cn } from "../lib/cn";
import type { TabValue } from "../model/tabs.types";

interface Props {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export function Tabs({ activeTab, onTabChange }: Props) {
  const [isMobileTabsOpen, setIsMobileTabsOpen] = useState(false);

  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const activeTabLabel = tabs.find((tab) => tab.value === activeTab)!.label;

  useKeyDown({
    key: "Escape",
    onKeyDown: () => {
      setIsMobileTabsOpen(false);
    },
  });

  useClickOutside({
    ref: mobileContainerRef,
    onClickOutside: () => {
      setIsMobileTabsOpen(false);
    },
  });

  return (
    <>
      <div
        role="tablist"
        className="hidden items-center gap-x-2 border-b border-neutral-600 md:flex"
      >
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.value}
              label={tab.label}
              count={tab.count}
              isActive={activeTab === tab.value}
              onSelect={() => onTabChange(tab.value)}
            />
          );
        })}
      </div>
      <div ref={mobileContainerRef} className="relative md:hidden">
        <button
          className="rounded-8 flex w-full cursor-pointer items-center justify-between border border-neutral-400 bg-neutral-700 px-3 py-2.5 hover:border-neutral-400 hover:bg-neutral-400 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)]"
          onClick={() => setIsMobileTabsOpen((prev) => !prev)}
        >
          <span className="text-preset-3 text-neutral-50 uppercase">
            {activeTabLabel}
          </span>
          <img
            src={ChevronDownIcon}
            alt="Chevron down"
            className={cn(isMobileTabsOpen && "rotate-180")}
          />
        </button>
        {isMobileTabsOpen && (
          <div className="rounded-10 absolute mt-2 flex w-full flex-col border border-neutral-600 bg-neutral-700 p-2">
            {tabs.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  count={tab.count}
                  isActive={activeTab === tab.value}
                  onSelect={() => {
                    onTabChange(tab.value);
                    setIsMobileTabsOpen(false);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
