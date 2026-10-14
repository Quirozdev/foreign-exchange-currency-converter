import SearchIcon from "@/assets/images/icon-search.svg";
import { useRef } from "react";

type Props = React.ComponentPropsWithRef<"input">;

export function SearchInput({ ...props }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="rounded-6 flex items-center gap-x-2.5 p-3 outline outline-neutral-200 has-focus:outline-lime-500">
      <img
        src={SearchIcon}
        alt="Search icon"
        onClick={() => inputRef.current?.focus()}
      />
      <input
        ref={inputRef}
        type="search"
        className="text-preset-5 flex-1 appearance-none border-none text-neutral-50 outline-none placeholder:text-neutral-200 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
        {...props}
      />
    </div>
  );
}
