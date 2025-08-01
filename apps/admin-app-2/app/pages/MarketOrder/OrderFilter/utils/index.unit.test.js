import { removeEmptyOrNullValues } from '.';

describe('#removeEmptyOrNullValues', () => {
  it('should remove empty or null values from the object', () => {
    const payload = removeEmptyOrNullValues({
      limit: 10,
      offset: 0,
      referenceId: null,
      integrationType: null,
    });
    expect(payload).toEqual({
      limit: 10,
      offset: 0,
    });
  });

  it('should return initial value if the payload is not an object', () => {
    const payload = removeEmptyOrNullValues(['test']);
    expect(payload).toEqual(['test']);
  });
});
