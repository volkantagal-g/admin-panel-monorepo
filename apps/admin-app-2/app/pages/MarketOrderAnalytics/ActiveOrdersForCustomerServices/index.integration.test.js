import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import globalTranslations from '@shared/translations/en/global.json';
import { ROUTE } from '@app/routes';
import { getActiveOrdersForCustomerServicesMock } from '@shared/api/marketOrderAnalytics/index.mock.data';
import {
  expectRemoveSelectedItemAndWaitForToBeRemoved,
  getAntTableExtendedPaginationComponents,
  expectSelectItemAndWaitForToBeSelected,
  expectTableToHaveColumnNames,
  waitForAntTableHeaderTables,
  expectSidebarMenuToHaveV2,
  waitPageToRenderSomething,
  waitForItemToBeSelected,
  getAntTableRowByRowKey,
  waitForAntTableBodies,
} from '@test/publicUtils/assertions';
import PageComponent from './index';
import { TEST_ID } from './constants';

const initialUrl = '/marketOrderAnalytics/activeOrdersForCustomerServices';

describe('In Active Orders For Customer Services Page:', () => {
  afterAll(cleanup);
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct document title', async () => {
      await waitFor(() => {
        expect(document.title).toContain('Active Orders - Customer Services');
      });
    });

    it('should appear in the relevant menu group', () => {
      expectSidebarMenuToHaveV2('GetirMarket', ['Order', 'CS Active Orders']);
    });
  });

  let domainTypeSelectWrapper;
  let citySelectWrapper;
  let warehouseSelectWrapper;
  let courierSelectWrapper;
  let filterButton;
  let ordersTable;
  describe('<Filters /> Component', () => {
    it('should render filter items with default values', async () => {
      domainTypeSelectWrapper = await screen.findByLabelText('Domain Type');
      await waitForItemToBeSelected('Getir10');
      citySelectWrapper = await screen.findByLabelText('City');
      warehouseSelectWrapper = await screen.findByLabelText('Warehouse');
      courierSelectWrapper = await screen.findByLabelText('Courier Name');
      filterButton = await screen.findByRole('button', { name: 'Apply' });
    });

    it('should be change filter items', async () => {
      await expectSelectItemAndWaitForToBeSelected(domainTypeSelectWrapper, 'GetirMore');
      await expectSelectItemAndWaitForToBeSelected(citySelectWrapper, 'Istanbul');
      await expectSelectItemAndWaitForToBeSelected(warehouseSelectWrapper, 'DOKUNMA', /ZincirlikuyuBüyük/i);
      await expectSelectItemAndWaitForToBeSelected(courierSelectWrapper, 'Test Courier', /Test Courier 1/i);
    });

    it('should be clear filter select items', async () => {
      await expectRemoveSelectedItemAndWaitForToBeRemoved(citySelectWrapper);
      await expectRemoveSelectedItemAndWaitForToBeRemoved(warehouseSelectWrapper);
      await expectRemoveSelectedItemAndWaitForToBeRemoved(courierSelectWrapper);
    });
  });

  describe('<Table /> Component', () => {
    const firstOrderMock = getActiveOrdersForCustomerServicesMock.orders[0];
    const thirdOrderMock = getActiveOrdersForCustomerServicesMock.orders[2];

    describe('Table Header', () => {
      it('should render header row of table', async () => {
        ordersTable = screen.getByTestId(TEST_ID.TABLE.ORDERS);
        expect(ordersTable).toBeInTheDocument();

        const [header] = await waitForAntTableHeaderTables(ordersTable);

        expectTableToHaveColumnNames(header, ['#', 'Warehouse', 'Courier', 'Client', 'Status', 'Action']);
      });
    });

    describe('Table Body', () => {
      it('should render rows with correct data', async () => {
        const [body] = await waitForAntTableBodies(ordersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });
        const firstOrderRow = getAntTableRowByRowKey(body, { key: firstOrderMock._id });
        const firstOrderRowCells = within(firstOrderRow).getAllByRole('cell');
        expect(firstOrderRowCells[0]).toHaveTextContent('1');
        expect(firstOrderRowCells[2]).toHaveTextContent(firstOrderMock.warehouse.warehouse.name);
        expect(firstOrderRowCells[3]).toHaveTextContent(firstOrderMock.courier.courier.name);
        expect(firstOrderRowCells[4]).toHaveTextContent(firstOrderMock.client.client.name);
        expect(firstOrderRowCells[5]).toHaveTextContent(globalTranslations.MARKET_ORDER_STATUSES_SHORT.WAITING_FOR_PICKER);

        const thirdOrderRow = getAntTableRowByRowKey(body, { key: thirdOrderMock._id });
        const thirdOrderRowCells = within(thirdOrderRow).getAllByRole('cell');
        expect(thirdOrderRowCells[0]).toHaveTextContent('3');
        expect(thirdOrderRowCells[2]).toHaveTextContent(thirdOrderMock.warehouse.warehouse.name);
        // if courier not assigned, it should be dash
        expect(thirdOrderRowCells[3]).toHaveTextContent('-');
        expect(thirdOrderRowCells[4]).toHaveTextContent(thirdOrderMock.client.client.name);
        expect(thirdOrderRowCells[5]).toHaveTextContent(globalTranslations.MARKET_ORDER_STATUSES_SHORT.PREPARING);
      });

      it('shouldn\'t render detail button if user doesn\'t have order detail page permission', async () => {
        const { removeUserPermissions } = renderResult;
        act(() => {
          removeUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
        });

        const [body] = await waitForAntTableBodies(ordersTable);
        const firstOrderRow = getAntTableRowByRowKey(body, { key: firstOrderMock._id });
        const detailButton = within(firstOrderRow).queryByRole('button', { name: 'Detail' });
        expect(detailButton).not.toBeInTheDocument();
      });

      it('should make request with correct parameters', async () => {
        await expectSelectItemAndWaitForToBeSelected(warehouseSelectWrapper, 'DOKUNMA', /ZincirlikuyuBüyük/i);
        await expectSelectItemAndWaitForToBeSelected(courierSelectWrapper, 'Test Courier', /Test Courier 1/i);

        userEvent.click(filterButton);
        const [body] = await waitForAntTableBodies(ordersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });

        const warehouseCells = within(body).getAllByRole('cell', { name: /ZincirlikuyuBüyük/i });
        expect(warehouseCells).toHaveLength(getActiveOrdersForCustomerServicesMock.orders.length);

        const courierCells = within(body).getAllByRole('cell', { name: /Test Courier 1/i });
        expect(courierCells).toHaveLength(getActiveOrdersForCustomerServicesMock.orders.length);
      });

      it('should render detail button if user have order detail page permission', async () => {
        const { addUserPermissions } = renderResult;
        act(() => {
          addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
        });
        userEvent.click(filterButton);

        const [body] = await waitForAntTableBodies(ordersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });

        const firstOrderRow = getAntTableRowByRowKey(body, { key: firstOrderMock._id });
        const detailButtonLink = within(firstOrderRow).getByRole('link', { name: 'Detail' });
        expect(detailButtonLink).toBeInTheDocument();
        const orderDetailLink = `${ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', firstOrderMock._id)}?domainType=${firstOrderMock.domainType}`;
        expect(detailButtonLink).toHaveAttribute('href', orderDetailLink);
        expect(detailButtonLink).toHaveAttribute('target', '_blank');
      });
    });

    describe('Table Footer', () => {
      it('should have correct initial values', async () => {
        const [body] = await waitForAntTableBodies(ordersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });

        const paginationItems = getAntTableExtendedPaginationComponents(ordersTable);
        const rowPerPage = 10;
        await waitForItemToBeSelected(rowPerPage, paginationItems.limitContainer);
        expect(paginationItems.pagerInput).toHaveValue('1');
        expect(paginationItems.maxPage).toBe(Math.ceil(getActiveOrdersForCustomerServicesMock.count / rowPerPage).toString());
      });

      it('should be able to change the current page', async () => {
        const [body] = await waitForAntTableBodies(ordersTable);
        const paginationItems = getAntTableExtendedPaginationComponents(ordersTable);

        userEvent.click(paginationItems.nextButton);
        expect(paginationItems.pagerInput).toHaveValue('2');
        await waitFor(() => expect(body).not.toHaveTextContent('No Data'));
      });
    });
  });
});
