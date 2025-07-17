export function setCurrencyToLocalStorage(currencyKey, currency) {
  localStorage.setItem(currencyKey, JSON.stringify(currency));
}

export function getCurrencyFromLocalStorage(currencyKey) {
  const str = localStorage.getItem(currencyKey);
  return JSON.parse(str);
}
