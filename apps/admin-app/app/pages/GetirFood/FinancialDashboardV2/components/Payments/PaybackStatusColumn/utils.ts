export enum PaymentStatus {
NotPaid = 100,
Waiting = 200,
Paid = 300,
PaymentError = 400,
}

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.NotPaid]: '#97670F',
  [PaymentStatus.Waiting]: '#97670F',
  [PaymentStatus.Paid]: '#05751F',
  [PaymentStatus.PaymentError]: '#97670F',
};

export const PAYMENT_STATUS_BG_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.NotPaid]: '#FEF7E8',
  [PaymentStatus.Waiting]: '#FEF7E8',
  [PaymentStatus.Paid]: '#EBF6ED',
  [PaymentStatus.PaymentError]: '#FEF7E8',
};
