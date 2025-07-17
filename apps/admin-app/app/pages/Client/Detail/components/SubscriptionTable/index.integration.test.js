import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SubscriptionTable from '.';

describe('Client Detail -> Subscription Table', () => {
  afterAll(cleanup);

  it('should render without an error', async () => {
    await renderComponent({ ui: (<SubscriptionTable />) });

    await screen.findByText('Subscription');
  });

  it('should contain core elements', async () => {
    await screen.findByText('Type');
    await screen.findByText('Status');
    await screen.findByText('Next Renewal Price');
    await screen.findByText('Start Date');
    await screen.findByText('End Date');
    await screen.findByText('Next Renew Date');
  });
});
