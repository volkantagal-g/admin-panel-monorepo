export const EXCEL_TEMPLATE_URL = 'https://cdn.getiryemek.com/misc/marketplace_template_external_transaction.xlsx';

export const DEFERRED_PAYMENT_DATE_TYPES = {
  NextPaymentDate: 0,
  NearestPaymentDate: 1,
} as const;

export const DEFERRED_PAYMENT_DATE_OPTIONS = [
  {
    label: {
      tr: 'Erken Tahsilat',
      en: 'Early Payment',
    },
    value: DEFERRED_PAYMENT_DATE_TYPES.NearestPaymentDate,
    infoText: 'Bu ödeme, işletmenin en yakın ödeme gününe çekilir.',
  },
  {
    label: {
      tr: 'Planlı Vade Tarihi',
      en: 'Scheduled Payment Date',
    },
    value: DEFERRED_PAYMENT_DATE_TYPES.NextPaymentDate,
    infoText: 'Bu ödeme, işletmenin bir sonraki ödeme gününe çekilir.',
  },
] as const;
