import { generateColumns, getDefaultText, getProductImage, getProductName, getProductPrice } from './config';

describe('FoodProductTable config functions', () => {
  test('#getProductImage function', () => {
    expect(getProductImage('some-url', () => '')).toBeDefined();
    expect(getProductImage('some-url', () => '')).toStrictEqual(
      <img src="some-url" alt="" height="24" />,
    );
  });

  test('#getProductName function', () => {
    expect(getProductName({ en: 'Pizza' })).toBe('Pizza');
    expect(getProductName({ tr: 'Köfte' }, 'tr')).toBe('Köfte');
  });

  test('#getDefaultText function', () => {
    expect(getDefaultText()).toBe('-');
    expect(getDefaultText('TEST')).toBe('TEST');
  });

  test('#getProductPrice function', () => {
    expect(getProductPrice()).toBeNull();
    expect(getProductPrice('25')).toBeNull();
    expect(getProductPrice(null)).toBeNull();
    expect(getProductPrice(25)).toBe('25 ₺');
  });

  it('should generate proper columns', () => {
    const table = generateColumns({ t: () => '' });
    expect(table).toBeDefined();
    expect(table).toHaveLength(6);
    expect(table.map(t => t.render)).toBeDefined();

    expect(table[0].render('some-url')).toStrictEqual(
      <img src="some-url" alt="" height="24" />,
    );
    expect(table[1].render({ en: 'Pizza' })).toBe('Pizza');
    expect(table[2].render()).toBe('-');
    expect(table[3].render()).toBeNull();
    expect(table[4].render()).toBe('-');
    expect(table[5].render(25)).toBe('25 ₺');
  });
});
