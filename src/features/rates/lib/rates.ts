export function calculateChangePercentageBetweenRates(
  firstRate: number,
  secondRate: number,
) {
  return ((firstRate - secondRate) / Math.abs(firstRate)) * 100;
}
