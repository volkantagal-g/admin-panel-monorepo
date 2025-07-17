import { tableColumns } from './config';

describe('ivrActionList Test Suite', () => {
  it('should render call table columns', () => {
    const t = jest.fn().mockImplementation(v => v);
    const columns = tableColumns(t);
    expect(columns).toHaveLength(4);
    expect(t).toHaveBeenCalledTimes(4);

    const paymentInfo = { paymentParameters: { cardNo: '1234567890', cardBank: 1, posBank: 1 } };

    const cardNo = columns[0];
    expect(cardNo.title).toBe('artisanOrderPage:CARD.NO');
    expect(cardNo.render(paymentInfo)).toBe('1234567890');

    const cardBank = columns[1];
    expect(cardBank.title).toBe('artisanOrderPage:CARD.BANK');
    expect(cardBank.render(paymentInfo)).toBe('Akbank');

    const cardPos = columns[2];
    expect(cardPos.title).toBe('artisanOrderPage:CARD.POS_BANK');
    expect(cardPos.render(paymentInfo)).toBe('Akbank');

    const transId = columns[3];
    expect(transId.title).toBe('artisanOrderPage:CARD.TRANSACTION_ID');
  });
});
