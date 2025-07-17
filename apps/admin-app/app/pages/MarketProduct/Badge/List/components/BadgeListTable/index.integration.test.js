import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { getBadgesSelector } from '@app/pages/MarketProduct/Badge/List/redux/selectors';
import { mockedBadgeList } from '@shared/api/marketProduct/index.mock.data';
import MarketProductBadgeListTable from '.';

describe('Market Product/Badge/List Table', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <MarketProductBadgeListTable /> });
  });

  it('should render table with data correctly', async () => {
    const marketProductSpy = jest.spyOn(getBadgesSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedBadgeList);
    await renderComponent({ ui: <MarketProductBadgeListTable /> });
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
