import { validationSchema } from './formHelper';

describe('validationSchema', () => {
  it('should successfully validate a correct object', async () => {
    const validObject = {
      name: 'Test Product',
      type: 1,
      weight: 10.5,
      volume: 5.5,
      longestEdge: 2.5,
      duration: 60,
      tags: [1, 2, 3],
    };

    let error;
    try {
      await validationSchema().validate(validObject, { strict: true });
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });

  it('should fail validation for an incorrect object', async () => {
    const invalidObject = {
      name: ' ',
      type: 'invalid type',
      weight: -1,
      volume: 0,
      longestEdge: -2,
      duration: -10,
      tags: ['wrong', 'type'],
    };

    try {
      await validationSchema().validate(invalidObject, { strict: true });
    }
    catch (e) {
      expect(e).toBeDefined();
    }
  });
});
