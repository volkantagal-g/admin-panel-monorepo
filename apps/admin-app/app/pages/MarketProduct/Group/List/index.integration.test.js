import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderComponent from '@test/publicUtils/renderComponent';
import { expectItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getMarketProductGroupsMock } from '@shared/api/marketProductGroup/index.mock.handler';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import * as api from '@shared/api/marketProductGroup';

import MarketProductGroupListPage from '.';
import { ROUTE } from '@app/routes';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

describe('Market Product/Product Groups/List/Filters', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render page without error', async () => {
    const marketProductGroupListPageUrl = ROUTE.MARKET_PRODUCT_GROUP_LIST.path;
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_PRODUCT_GROUP_LIST,
      pageUrl: marketProductGroupListPageUrl,
      pageComponent: MarketProductGroupListPage,
    });
    await waitPageToRenderSomething();
  });

  it('should render without error', async () => {
    await renderComponent({ ui: <MarketProductGroupListPage /> });
  });

  it('should render default filters and make a request with default filters', async () => {
    mockApiPerTestCase(getMarketProductGroupsMock);
    const getMarketProductsSpy = jest.spyOn(api, 'getMarketProductGroups');

    await renderComponent({ ui: <MarketProductGroupListPage /> });

    await expectItemToBeSelected(/Group Name/);
    await expectItemToBeSelected(/User Id/);
    await expectItemToBeSelected(/Active/);
    await expectItemToBeSelected(/Placement/);
    await expectItemToBeSelected(/AB Test Value ID/);
    await expectItemToBeSelected(/AB Test Variable Name/);

    await screen.findByText(/Discounted PRODUCTS/);

    const table = screen.getByTestId('MARKET_PRODUCT_GROUPS_LIST');

    const { productGroupings: mockedProductGroups } = getMarketProductGroupsMock.successData;

    const [...tableRows] = within(table).getAllByRole('row');
    tableRows.forEach((row, i) => {
      const mockedProductGroup = mockedProductGroups[i];

      within(row).getByRole('cell', { name: mockedProductGroup.name.en });
      within(row).getByRole('cell', { name: mockedProductGroup.activeness ? 'Active' : 'Inactive' });
      within(row).getByRole('cell', { name: mockedProductGroup.domainTypes.map(domainType => getirMarketDomainTypes[domainType].en).join(' ') });
      within(row).getByRole('cell', { name: mockedProductGroup.order.toString() });
      within(row).getByRole('cell', { name: mockedProductGroup.productCount });
      within(row).getByRole('cell', { name: mockedProductGroup.userId });
    });

    expect(getMarketProductsSpy).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      filterOptions: {
        name: true,
        userId: true,
        active: true,
        placement: true,
        abTestValueId: true,
        abTestVariableName: true,
      },
      queryText: '',
    });
  });

  it('should make search requests debounced', async () => {
    jest.useFakeTimers();

    mockApiPerTestCase(getMarketProductGroupsMock);
    const getMarketProductsSpy = jest.spyOn(api, 'getMarketProductGroups');

    await renderComponent({ ui: <MarketProductGroupListPage /> });

    await waitFor(() => {
      expect(getMarketProductsSpy).toHaveBeenCalledTimes(1);
    });

    const searchBox = screen.getByLabelText('Search');
    userEvent.type(searchBox, 'test');
    expect(getMarketProductsSpy).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(getMarketProductsSpy).toHaveBeenCalledTimes(2);

    userEvent.type(searchBox, ' two');
    userEvent.type(searchBox, ' three');
    userEvent.type(searchBox, ' four');

    expect(getMarketProductsSpy).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getMarketProductsSpy).toHaveBeenCalledTimes(3);
    expect(getMarketProductsSpy).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      filterOptions: {
        name: true,
        userId: true,
        active: true,
        placement: true,
        abTestValueId: true,
        abTestVariableName: true,
      },
      queryText: 'test two three four',
    });

    jest.useRealTimers();
  });
});
