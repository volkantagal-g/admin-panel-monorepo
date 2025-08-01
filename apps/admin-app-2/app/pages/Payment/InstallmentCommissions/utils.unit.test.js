import { getPosBankOptions } from './utils';

describe('getPosBankOptions', () => {
  it('should return pos bank formatted options', () => {
    const data = [
      {
        posBank: 'Turkiye Garanti Bankasi A.S.',
        posIca: '2030',
      },
    ];
    const valueLabel = 'posIca';

    const expectedResult = [
      {
        label: 'Turkiye Garanti Bankasi A.S.',
        value: '2030',
      },
    ];

    const result = getPosBankOptions(data, valueLabel);
    expect(result).toStrictEqual(expectedResult);
  });
});
