import { currenciesMetadata } from "../model/currencies.constants";
import NoFlagIcon from "@/assets/images/flags/no-flag.webp";

export function getCurrencyFlagSrc(
  currencyCode: string,
  fallbackSrc: string = NoFlagIcon,
) {
  return currenciesMetadata[currencyCode]?.icon || fallbackSrc;
}
