export const multiLangTitles = (symbol, amount) => ({
  tr: `Size özel ${symbol}${amount} indirim!`,
  en: `${symbol}${amount} discount for you!`,
  fr: `${symbol}${amount} réduction pour vous!`,
  de: `${symbol}${amount} Rabatt für dich!`,
  nl: `${symbol}${amount} korting voor jou!`,
  it: `${amount}${symbol} di sconto per te!`,
  es: `${amount}${symbol} de descuento para ti!`,
  pt: `${amount}${symbol} de desconto para ti!`,
});

export const pushNotificationData = (symbol, amount) => [
  {
    lang: 'tr',
    body: `Sana özel ${symbol}${amount} indirim!`,
  },
  {
    lang: 'en',
    body: `${symbol}${amount} discount for you!`,
  },
];
