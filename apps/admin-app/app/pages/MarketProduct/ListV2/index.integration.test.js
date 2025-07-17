import '@test/publicUtils/configureWithoutCleanup';
import { screen, within, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  expectSidebarMenuToHaveV2,
  expectTableToHaveColumnNames,
  waitPageToRenderSomething,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getMarketProductsMock } from '@shared/api/marketProduct/index.mock.handler';
import * as api from '@shared/api/marketProduct';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { mockedMarketProducts } from '@shared/api/marketProduct/marketProducts.mock.data';

import PageComponent from '.';

const getMarketProductsPayload = {
  fields: [
    'fullName',
    'domainTypes',
    'barcodes',
    'status',
  ],
  filterOptions: {
    barcodes: true,
    fullName: true,
    sapReferenceCode: true,
  },
  hasTotalCount: true,
  ids: [],
  queryText: '',
  statusList: [
    'INACTIVE',
    'ACTIVE',
  ],
  limit: 10,
  offset: 0,
};

describe('Market Product List Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('For page features', () => {
    afterAll(cleanup);

    it('should render  without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_LIST,
        pageUrl: '/marketProduct/list',
        pageComponent: PageComponent,
      });

      await waitPageToRenderSomething();
    });

    it('should have correct page header', async () => {
      const table = await screen.findByTestId('MARKET_PRODUCT_LIST');
      await within(table).findByText('Products');
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('GetirMarket', ['Market Product', 'Products']);
    });

    it('should show market product list table', async () => {
      const table = await screen.findByTestId('MARKET_PRODUCT_LIST');

      expectTableToHaveColumnNames(table, [
        'Name',
        'Service Targets',
        'Barcodes',
        'Status',
        'Action',
      ]);
    });

    it('should have filter boxes rendered', async () => {
      screen.getByText('Select filter options');
      screen.getByText('Select product status filter options');
      screen.getByText('Search');
      screen.getByText('Search by Ids');
    });
  });

  describe('For page functionality', () => {
    afterAll(cleanup);

    it('should render initial data with default filters', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
      const getMarketProductsMockResponse = getMarketProductsMock();

      mockApiPerTestCase(getMarketProductsMockResponse);

      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_LIST,
        pageUrl: '/marketProduct/list',
        pageComponent: PageComponent,
      });

      await waitPageToRenderSomething();

      expect(getMarketProductsSpy).toHaveBeenCalledWith(getMarketProductsPayload);

      const table = screen.getByTestId('MARKET_PRODUCT_LIST');
      const { products: mockedProducts, totalCount } = getMarketProductsMockResponse.successData;

      screen.getByText(`There are ${totalCount} records.`);

      const [, ...tableRows] = within(table).getAllByRole('row');
      tableRows.forEach((row, i) => {
        const mockedProduct = mockedProducts[i];
        within(row).getByRole('cell', { name: mockedProduct.fullName.en });
        within(row).getByRole('cell', { name: mockedProduct.domainTypes.map(domainType => getirMarketDomainTypes[domainType].en).join(' ') });
        within(row).getByRole('cell', { name: mockedProduct.barcodes.join(' ') });
        within(row).getByRole('cell', { name: marketProductStatuses[mockedProduct.status].en });
      });
    });

    it('should correctly render the second page', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
      const getMarketProductsMockResponse = getMarketProductsMock({ offset: 10 });
      mockApiPerTestCase(getMarketProductsMockResponse);

      const page2Button = screen.getByTitle('Next Page');

      userEvent.click(page2Button);

      expect(getMarketProductsSpy).toHaveBeenCalledWith({
        ...getMarketProductsPayload,
        offset: 10,
      });

      const { products: mockedProducts, totalCount } = getMarketProductsMockResponse.successData;
      const table = screen.getByTestId('MARKET_PRODUCT_LIST');

      await screen.findByText(`There are ${totalCount} records.`);

      const [, ...tableRows] = within(table).getAllByRole('row');
      tableRows.forEach((row, i) => {
        const mockedProduct = mockedProducts[i];
        within(row).getByRole('cell', { name: mockedProduct.fullName.en });
        within(row).getByRole('cell', { name: mockedProduct.domainTypes.map(domainType => getirMarketDomainTypes[domainType].en).join(' ') });
        within(row).getByRole('cell', { name: mockedProduct.barcodes.join(' ') });
        within(row).getByRole('cell', { name: marketProductStatuses[mockedProduct.status].en });
      });
    });

    it('should correctly change filters', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');

      const filterOptionsInput = await screen.findByLabelText('Select filter options');
      userEvent.click(filterOptionsInput);
      const [, option] = screen.queryAllByText('Sap Reference Code');
      userEvent.click(option);
      userEvent.click(filterOptionsInput);

      const table = screen.getByTestId('MARKET_PRODUCT_LIST');

      const getMarketProductsMockResponse = getMarketProductsMock({
        filterOptions: {
          barcodes: true,
          fullName: true,
        },
        offset: 0,
      });
      mockApiPerTestCase(getMarketProductsMockResponse);

      await waitFor(() => {
        expect(getMarketProductsSpy).toHaveBeenCalledWith({
          ...getMarketProductsPayload,
          filterOptions: {
            barcodes: true,
            fullName: true,
          },
        });
      });

      const { products: mockedProducts, totalCount } = getMarketProductsMockResponse.successData;

      screen.getByText(`There are ${totalCount} records.`);

      const [, ...tableRows] = within(table).getAllByRole('row');
      tableRows.forEach((row, i) => {
        const mockedProduct = mockedProducts[i];
        within(row).getByRole('cell', { name: mockedProduct.fullName.en });
        within(row).getByRole('cell', { name: mockedProduct.domainTypes.map(domainType => getirMarketDomainTypes[domainType].en).join(' ') });
        within(row).getByRole('cell', { name: mockedProduct.barcodes.join(' ') });
        within(row).getByRole('cell', { name: marketProductStatuses[mockedProduct.status].en });
      });
    });

    it('should correctly filter over products statuses', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
      const getMarketProductsMockResponse = getMarketProductsMock();
      mockApiPerTestCase(getMarketProductsMockResponse);

      const statusFilterOptionsInput = await screen.findByLabelText('Select product status filter options');
      userEvent.click(statusFilterOptionsInput);
      const [option] = screen.queryAllByText('Archived');
      userEvent.click(option);

      const table = screen.getByTestId('MARKET_PRODUCT_LIST');

      await waitFor(() => {
        expect(getMarketProductsSpy).toHaveBeenCalledWith({
          ...getMarketProductsPayload,
          filterOptions: {
            barcodes: true,
            fullName: true,
          },
          statusList: [
            'INACTIVE',
            'ACTIVE',
            'ARCHIVED',
          ],
        });
      });

      const { products: mockedProducts, totalCount } = getMarketProductsMockResponse.successData;

      screen.getByText(`There are ${totalCount} records.`);

      const [, ...tableRows] = within(table).getAllByRole('row');
      tableRows.forEach((row, i) => {
        const mockedProduct = mockedProducts[i];
        within(row).getByRole('cell', { name: mockedProduct.fullName.en });
        within(row).getByRole('cell', { name: mockedProduct.domainTypes.map(domainType => getirMarketDomainTypes[domainType].en).join(' ') });
        within(row).getByRole('cell', { name: mockedProduct.barcodes.join(' ') });
        within(row).getByRole('cell', { name: marketProductStatuses[mockedProduct.status].en });
      });
    });

    it('should correctly send query and list the result', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');

      const queryText = 'Söke Rye Flour Mix';

      const getMarketProductsMockResponse = getMarketProductsMock({ queryText });
      mockApiPerTestCase(getMarketProductsMockResponse);

      const searchInput = await screen.findByLabelText('Search');
      userEvent.type(searchInput, queryText);

      await waitFor(() => {
        expect(getMarketProductsSpy).toHaveBeenCalledWith({
          ...getMarketProductsPayload,
          queryText,
          filterOptions: {
            barcodes: true,
            fullName: true,
          },
          statusList: [
            'INACTIVE',
            'ACTIVE',
            'ARCHIVED',
          ],
        });
      });

      screen.getByText('Söke Rye Flour Mix (500 g)');
    });

    it('should correctly search for ids and list the result', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');

      const [mockProduct] = mockedMarketProducts;
      const query = mockProduct._id;

      const getMarketProductsMockResponse = getMarketProductsMock({ ids: [query] });

      mockApiPerTestCase(getMarketProductsMockResponse);

      const idsInput = await screen.findByLabelText('Search by Ids');
      userEvent.type(idsInput, `${query}{enter}`);

      const searchInput = await screen.findByLabelText('Search');
      userEvent.click(searchInput);
      userEvent.clear(searchInput);
      expect(searchInput).toHaveValue('');

      await waitFor(() => {
        expect(getMarketProductsSpy).toHaveBeenCalledWith({
          ...getMarketProductsPayload,
          ids: [query],
          filterOptions: {
            barcodes: true,
            fullName: true,
          },
          statusList: [
            'INACTIVE',
            'ACTIVE',
            'ARCHIVED',
          ],
        });
      });

      screen.getByText(mockProduct.fullName.en);
    });

    it('should open the correct page when Detail button is clicked', async () => {
      const origWindowOpen = window.open;
      window.open = jest.fn();

      const [mockProduct] = mockedMarketProducts;
      const detailBtn = screen.getByRole('button', { name: 'Detail' });
      userEvent.click(detailBtn);

      expect(window.open).toHaveBeenCalledWith(`/marketProduct/detail/${mockProduct._id}`, '_blank');

      window.open = origWindowOpen;
    });

    it('should not crash if domainTypes, barcodes, fullName or status is undefined from BE response', async () => {
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
      const [mockProduct] = mockedMarketProducts;

      const [taggedId] = screen.queryAllByTitle(mockProduct._id);
      const tagRemoveButton = within(taggedId).getByLabelText('close');
      userEvent.click(tagRemoveButton);

      const getMarketProductsMockResponse = getMarketProductsMock();

      mockApiPerTestCase({
        ...getMarketProductsMockResponse,
        successData: {
          ...getMarketProductsMockResponse.successData,
          products: getMarketProductsMockResponse.successData.products.map(({ _id }) => ({ _id })),
        },
      });

      await waitFor(() => {
        expect(getMarketProductsSpy).toHaveBeenCalledWith({
          ...getMarketProductsPayload,
          ids: [],
          filterOptions: {
            barcodes: true,
            fullName: true,
          },
          statusList: [
            'INACTIVE',
            'ACTIVE',
            'ARCHIVED',
          ],
        });
      });
    });
  });
});
