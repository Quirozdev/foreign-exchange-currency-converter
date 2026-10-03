import type { Currency } from "./currencies.types";
import UsFlag from "@/assets/images/flags/us.webp";
import EuFlag from "@/assets/images/flags/eu.webp";
import GbFlag from "@/assets/images/flags/gb.webp";
import AeFlag from "@/assets/images/flags/ae.webp";
import ArFlag from "@/assets/images/flags/ar.webp";
import AuFlag from "@/assets/images/flags/au.webp";
import BdFlag from "@/assets/images/flags/bd.webp";

export const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    icon: UsFlag,
    popular: true,
  },
  {
    code: "EUR",
    name: "Euro",
    icon: EuFlag,
    popular: true,
  },
  {
    code: "GBP",
    name: "British Pound",
    icon: GbFlag,
    popular: true,
  },
  {
    code: "AED",
    name: "UAE Dirham",
    icon: AeFlag,
    popular: false,
  },
  {
    code: "ARS",
    name: "Argentine Peso",
    icon: ArFlag,
    popular: false,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    icon: AuFlag,
    popular: false,
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    icon: BdFlag,
    popular: false,
  },
];
