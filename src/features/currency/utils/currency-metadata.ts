import { currenciesMetadata } from "../model/currencies.constants";
import NoFlagIcon from "@/assets/images/flags/no-flag.webp";

export function getCurrencyMetadataWithDefaults(
  currencyCode: string,
  defaultValue = {
    icon: NoFlagIcon,
    popular: false,
  },
) {
  return currenciesMetadata[currencyCode] || defaultValue;
}
