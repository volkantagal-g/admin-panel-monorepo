import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import TransactionModal from '.';

describe('Client Detail -> Subscription Table -> TransactionModal ', () => {
  afterAll(cleanup);

  it('should render without an error', async () => {
    await renderComponent({
      ui: (<TransactionModal transactionData={{
        transactionData: [
          '{amount: 3000, creditCardNo: "454671********94", or…}',
        ],
      }}
      />),
    });

    await screen.findByText('Transactions');
  });
});
