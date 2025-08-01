import { calculatePrecisedAmount, checkPaymentMethodExistInPaymentProvider } from './utils';

describe('checkPaymentMethodExistInPaymentProvider', () => {
  it('should return true if payment method exists in payment provider', () => {
    const paymentMethods = [
      {
        name: 'Credit Card',
        key: 'cc',
      },
      {
        name: 'PayPal',
        key: 'paypal',
      },
    ];

    const paymentMethodName = 'Credit Card';
    const paymentMethodKey = '';

    const result = checkPaymentMethodExistInPaymentProvider(paymentMethods, paymentMethodName, paymentMethodKey);

    expect(result).toBe(true);
  });

  it('should return false if payment method does not exist in payment provider', () => {
    const paymentMethods = [
      {
        name: 'Credit Card',
        key: 'cc',
      },
      {
        name: 'PayPal',
        key: 'paypal',
      },
    ];

    const paymentMethodName = 'Apple Pay';
    const paymentMethodKey = '';

    const result = checkPaymentMethodExistInPaymentProvider(paymentMethods, paymentMethodName, paymentMethodKey);

    expect(result).toBe(false);
  });
});

describe('calculatePrecisedAmount', () => {
  it('should return the precised amount', () => {
    const amount = 100;
    const expectedPrecisedAmount = 1.00;

    const result = calculatePrecisedAmount(amount);

    expect(result).toBe(expectedPrecisedAmount);
  });

  it('should return the precised amount with decimal places', () => {
    const amount = 2500;
    const expectedPrecisedAmount = 25.00;

    const result = calculatePrecisedAmount(amount);

    expect(result).toBe(expectedPrecisedAmount);
  });
});
