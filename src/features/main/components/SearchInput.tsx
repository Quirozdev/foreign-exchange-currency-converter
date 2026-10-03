import SearchIcon from "@/assets/images/icon-search.svg";

interface Props extends React.ComponentPropsWithRef<"input"> {}

export function SearchInput({ ...props }: Props) {
  return (
    <div className="rounded-6 flex items-center gap-x-2.5 p-3 outline outline-neutral-200 has-focus:outline-lime-500">
      <img src={SearchIcon} alt="Search icon" />
      <input
        type="search"
        className="text-preset-5 appearance-none border-none text-neutral-50 outline-none placeholder:text-neutral-200 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
        {...props}
      />
    </div>
  );
}
