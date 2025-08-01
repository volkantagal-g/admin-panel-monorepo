import { applyChangesToInitialValue, prepareRequestBody } from './helpers';

describe('confirmationModal component helpers', () => {
  it('applyChangesToInitialValue update action', () => {
    const cardInstallmentCountsModifiedData = [
      {
        commission: 0.9,
        id: 'PERSONAL-10554-3',
        installment: 3,
        isEnabled: false,
        operation: 'updated',
        posBank: 'Albaraka Turk Katilim Bankasi A.S',
        posIca: '10554',
      }];
    const cardInitialInstallmentCounts = [{
      commission: 0.9,
      id: 'PERSONAL-10554-3',
      installment: 3,
      isEnabled: false,
      posBank: 'Albaraka Turk Katilim Bankasi A.S',
      posIca: '10554',
    }];
    const expectedResult = [{
      commission: 0.9,
      id: 'PERSONAL-10554-3',
      installment: 3,
      isEnabled: false,
      posBank: 'Albaraka Turk Katilim Bankasi A.S',
      posIca: '10554',
    }];
    const result = applyChangesToInitialValue(cardInstallmentCountsModifiedData, cardInitialInstallmentCounts);
    expect(result).toStrictEqual(expectedResult);
  });

  it('prepareRequestBody', () => {
    const cardInstallCountsVersion = 112;
    const cardUserType = 'PERSONAL';
    const installments = [{
      commission: 0.9,
      id: 'PERSONAL-10554-3',
      installment: 3,
      isEnabled: false,
      posBank: 'Albaraka Turk Katilim Bankasi A.S',
      posIca: '10554',
    }];
    const result = prepareRequestBody(cardInstallCountsVersion, cardUserType, installments);
    const expectedResult = {
      version: 112,
      cardUserType: 'PERSONAL',
      installments: [{
        posIca: '10554',
        isEnabled: false,
        installment: 3,
        commission: 0.9,
      }],
    };
    expect(result).toStrictEqual({ ...expectedResult });
  });
});
