export function convert(amount: number, rate: number, decimalPlaces = 2) {
  return (amount * rate).toFixed(decimalPlaces);
}
