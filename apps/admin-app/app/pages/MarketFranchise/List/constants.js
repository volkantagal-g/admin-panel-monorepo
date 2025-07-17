import { ENVIRONMENT } from '@shared/config';

export const GETIR_FINANCE_ROLE_IDS_DEV = [
  '6768f116573aa58b661b3343', // Delivery Alliance - GFinance
];

export const GETIR_FINANCE_ROLE_IDS_PROD = [
  '67288d226aab44555b1f730e', // GetirFinance Operations
  '6728940296156c3b1111fc2e', // GetirFinance Safety
];

export const IS_PROD_ENV = ENVIRONMENT.ENV === 'production';
