import { getInitialValues } from './formHelpers';

describe('Feedback Modal form helpers', () => {
  describe('#getInitialValues', () => {
    it('should get initial values', () => {
      const initialValues = getInitialValues();
      expect(initialValues).toHaveProperty('firstGroupItems');
    });
  });
});
