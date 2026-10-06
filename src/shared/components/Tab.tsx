import { cn } from "@/shared/lib/cn";

interface Props {
  label: string;
  count?: number;
  isActive: boolean;
  onSelect: () => void;
}

export function Tab({ label, count, isActive, onSelect }: Props) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-x-2 border-b border-transparent px-4 py-2.5",
        isActive && "border-lime-500",
      )}
      onClick={onSelect}
    >
      <span className="text-preset-3 text-neutral-50 uppercase">{label}</span>
      {count && (
        <span className="text-preset-6 grid h-5 w-5 place-items-center rounded-full bg-lime-800 text-lime-500">
          {count}
        </span>
      )}
    </button>
  );
}
