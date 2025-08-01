import { mockedBagConstraintDetail } from '@shared/api/bag/index.mock.data';
import { getInitialValues } from './formHelpers';

describe('Feedback Modal form helpers', () => {
  describe('#getInitialValues', () => {
    it('should get initial values', () => {
      const initialValues = getInitialValues(mockedBagConstraintDetail);
      expect(initialValues).toHaveProperty('firstGroupItems');
    });
  });
});
