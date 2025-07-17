import { getProductPrice, getDefaultText } from './config';

describe('OrderDetail FoodProductTable config functions', () => {
  test('#getProductPrice function', () => {
    expect(getProductPrice()).toBeNull();
    expect(getProductPrice('25')).toBeNull();
    expect(getProductPrice(null)).toBeNull();
    expect(getProductPrice(25)).toBe('25 ₺');
  });

  test('#getDefaultText function', () => {
    expect(getDefaultText()).toBe('-');
    expect(getDefaultText('TEST')).toBe('TEST');
  });
});
