import { validationSchema, defaultValues } from './formHelper';

const validate = async data => {
  let error = null;
  try {
    await validationSchema().validate(data, { abortEarly: false });
  }
  catch (e) {
    error = e;
  }
  return error;
};

describe('validationSchema', () => {
  it('should validate a correct object', async () => {
    const validData = {
      name: 'Test Product',
      reference: {},
      weight: 1,
      volume: 1,
      longestEdge: 1,
      duration: 1,
      tags: [1, 2, 3],
    };
    const error = await validate(validData);
    expect(error).toBeNull();
  });

  it('should require necessary fields', async () => {
    const error = await validate(defaultValues);
    expect(error).not.toBeNull();
    expect(error.inner).toHaveLength(6);
    expect(error.inner.some(e => e.path === 'name')).toBe(true);
    expect(error.inner.some(e => e.path === 'reference')).toBe(true);
    expect(error.inner.some(e => e.path === 'weight')).toBe(true);
    expect(error.inner.some(e => e.path === 'volume')).toBe(true);
    expect(error.inner.some(e => e.path === 'longestEdge')).toBe(true);
    expect(error.inner.some(e => e.path === 'duration')).toBe(true);
  });

  it('should allow tags to be optional', async () => {
    const dataWithoutTags = {
      name: 'Test Product',
      reference: {},
      weight: 1,
      volume: 1,
      longestEdge: 1,
      duration: 1,
    };
    const error = await validate(dataWithoutTags);
    expect(error).toBeNull();
  });
});
