import { getRefundOptions } from './components/actionsMenu/modals/shopRefundModal/formHelper';
import { refundOptions } from './components/actionsMenu/modals/shopRefundModal/refundOptions';

describe('Order Detail Page Utils test', () => {
  it('should create refund options', async () => {
    const options = getRefundOptions();

    expect(options.length).toEqual(Object.keys(refundOptions).length);
  });
});
