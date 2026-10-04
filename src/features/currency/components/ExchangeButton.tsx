import ExchangeIcon from "@/assets/images/icon-exchange.svg";
import VerticalExchangeIcon from "@/assets/images/icon-exchange-vertical.svg";

export function ExchangeButton() {
  return (
    <button className="rounded-8 w-fit cursor-pointer bg-neutral-600 p-3.5 outline outline-neutral-500 hover:bg-neutral-500 hover:outline-neutral-400 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)]">
      <img
        src={VerticalExchangeIcon}
        alt="Vertical Exchange Icon"
        className="md:hidden"
      />
      <img src={ExchangeIcon} alt="Exchange Icon" className="hidden md:block" />
    </button>
  );
}
