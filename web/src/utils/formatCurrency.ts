import useCurrency, { symbols } from "../hooks/useCurrency";

function formatCurrency(x: number) {
  const [currency] = useCurrency();
  const symbol = symbols[currency];

  // Temporary hard-coded USD conversion cause I'm too lazy to do it properly right now.
  const idrUsdRate = 0.00007;
  if (currency === 'USD') {
    x *= idrUsdRate;
    x = +x.toFixed(2);
  }

  return `${symbol}${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default formatCurrency;