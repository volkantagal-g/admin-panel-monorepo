import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

import { ROUTE } from '@app/routes';
import {
  // expectRemoveSelectedItemAndWaitForToBeRemoved,
  // expectAntTableHeaderHaveSorter,
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHaveV2,
  expectTableToHaveColumnNames,
  getAntTableRowByRowKey,
  waitForAntTableBodies,
  waitForAntTableHeaderTables,
  waitForItemToBeSelected,
  waitPageToRenderSomething,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import { getActiveOrdersForOperationMock } from '@shared/api/marketOrderAnalytics/index.mock.data';

import { TEST_ID } from './constants';
import PageComponent from '.';
import { numberFormatWithTwoDecimal } from '@shared/utils/localization';

const pageUrl = '/marketOrderAnalytics/activeOrdersForOperation';

describe('Market Order Analytics Active Orders for Operation', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For app level features', () => {
    it('should render the page without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION,
        pageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION_COMPONENT_VIEW_N11,
          permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION_COMPONENT_VIEW_REST_OF_GETIR]);
      });
    });

    it('should have the correct document title', async () => {
      await waitFor(() => {
        expect(document.title).toContain('Active Orders - Operation');
      });
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('GetirMarket', ['Order', 'Operation Active Orders']);
    });
  });

  describe('<StatsCard /> Component', () => {
    it('should render active order and courier stats data', async () => {
      // getActiveOrdersForOperationMock.order data is 669
      const activeOrderData = screen.getByText(/active order:/i);
      await waitFor(() => {
        // within(activeOrderData).getByText(/669/i);
        expect(activeOrderData).toHaveTextContent('669');
      });

      const courierAssignedData = screen.getByText(/courier assigned/i);
      within(courierAssignedData).getByText(/25/i);
      // getActiveOrderCourierStatsByFilters.courierAssignedOrderCount data is 25
      // courierAssignedPercentageData is calculated as 25 / 669 * 100 = 3.73
      const courierAssignedPercentageData = await screen.findByText(/\(4%\)/i);
      expect(courierAssignedPercentageData).toBeInTheDocument();
      const courierUnassignedData = screen.getByText(/courier unassigned:/i);
      within(courierUnassignedData).getByText(/20/i);
      const averageVolume = screen.getByText(/avg volume:/i);
      within(averageVolume).getByText(/48,106\.56 cm/i);
      const averageWeight = screen.getByText(/avg weight:/i);
      within(averageWeight).getByText(/33\.64 kg/i);
    });
  });

  describe('<Filter /> Component', () => {
    let selectDomainTypeComponent;
    let selectCityComponent;
    let selectFieldManagerComponent;
    let selectWarehouseComponent;
    let courierSelectWrapper;
    let selectOrderStatusComponent;
    let inputOrderStatusMoreThanComponent;
    let filterButton;

    it('should render filters without an error', async () => {
      selectDomainTypeComponent = await screen.findByLabelText('Domain Type');
      await waitForItemToBeSelected('Getir10');
      selectCityComponent = await screen.findByLabelText('City');
      selectFieldManagerComponent = await screen.findByLabelText('Field Manager');
      courierSelectWrapper = await screen.findByLabelText('Courier Name');
      selectWarehouseComponent = await screen.findByLabelText('Warehouse');
      selectOrderStatusComponent = await screen.findByLabelText('Status');
      inputOrderStatusMoreThanComponent = await screen.findByLabelText('Duration');
      filterButton = await screen.findByRole('button', { name: 'Apply' });
    });

    it('should change selectDomainType component', async () => {
      await expectSelectItemAndWaitForToBeSelected(selectDomainTypeComponent, 'GetirMore', /GetirMore/i);
    });

    it('should change selectCity component', async () => {
      await expectSelectItemAndWaitForToBeSelected(selectCityComponent, 'Istanbul');
    });

    it('should change selectWarehouse component', async () => {
      await expectSelectItemAndWaitForToBeSelected(selectWarehouseComponent, 'DOKUNMA', /DOKUNMA/i);
    });

    it('should change selectFieldManager component', async () => {
      await expectSelectItemAndWaitForToBeSelected(selectFieldManagerComponent, 'Berk Ozturk');
    });

    it('should change courierName component', async () => {
      await expectSelectItemAndWaitForToBeSelected(courierSelectWrapper, 'Super Secret Name');
    });

    it('If more than one status is chosen, the duration component should not be deactivated', async () => {
      expect(selectOrderStatusComponent.disabled).toEqual(false);
      // Test is updated according to this logic -> e2e/pages/MarketOrderAnalytics/ActiveOrdersForOperation/e2e.spec.ts
      expect(inputOrderStatusMoreThanComponent.disabled).toEqual(true);

      // await expectSelectItemAndWaitForToBeSelected(selectOrderStatusComponent, 'Verifying');
      // await expectSelectItemAndWaitForToBeSelected(selectOrderStatusComponent, 'On Way');

      // expect(inputOrderStatusMoreThanComponent.disabled).toEqual(false);
    });

    it('should click filter button', async () => {
      userEvent.click(filterButton);
    });
  });

  describe('<OrderTable /> Component', () => {
    let orderTableComponent;
    let orderWithKeyRow;

    it('should render table without an error', async () => {
      orderTableComponent = screen.getByTestId(TEST_ID.TABLE.ORDER_TABLE);

      expect(orderTableComponent).toBeInTheDocument();
    });

    it('should render table header', async () => {
      const [header] = await waitForAntTableHeaderTables(orderTableComponent);

      expectTableToHaveColumnNames(header, [
        '#', 'Q', 'Schd', 'Warehouse', 'Date', 'Client', 'Courier',
        'Picker', 'L.Act.', 'Sum', 'Status', 'Action',
        'Weight(kg)', 'Volume(cm)', 'Vehicle',
      ]);
    });

    const orderIndex = 1;
    it('should render rows of the order table', async () => {
      const [body] = await waitForAntTableBodies(orderTableComponent);
      await waitFor(() => {
        expect(body).not.toHaveTextContent('No Data');
      });

      const checkoutDate = getActiveOrdersForOperationMock.orders[orderIndex].checkout.date;

      const totalTimeDiff = moment().diff(checkoutDate);
      const totalTimeDiffStr = parseInt(moment.duration(totalTimeDiff).asMinutes(), 10);

      await waitFor(() => {
        // wait for first row to be rendered
        orderWithKeyRow = getAntTableRowByRowKey(body, { key: getActiveOrdersForOperationMock.orders[orderIndex]._id });
        expect(orderWithKeyRow).toBeTruthy();
      });

      const firstOrderRowCells = within(orderWithKeyRow).getAllByRole('cell');
      const firstOrderRowCellsItems = [
        orderIndex + 1, 'Uninv.', '', 'MithatpaşaBüyük', 'Organic', '15.11.2022 00:44',
        'Gokhan C.', '-', '-', totalTimeDiffStr, totalTimeDiffStr,
        'W.For Picker', 1.92, numberFormatWithTwoDecimal.format(2910),
        'Van'];

      firstOrderRowCellsItems.forEach((item, index) => {
        expect(firstOrderRowCells[index]).toHaveTextContent(item);
      });
    });

    it('shouldn\'t render detail button if user doesn\'t have order detail page permission', async () => {
      act(() => {
        renderResult.removeUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
      });
      const detailButton = within(orderWithKeyRow).queryByRole('button', { name: 'Detail' });
      expect(detailButton).not.toBeInTheDocument();
    });

    it('contain detail button with sufficient permissions', async () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
      });

      const detailButtonLink = within(orderWithKeyRow).getByRole('link', { name: 'Detail' });
      expect(detailButtonLink).toBeInTheDocument();
      const { domainType, _id: orderId } = getActiveOrdersForOperationMock.orders[orderIndex];
      const orderDetailLink = `${ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId)}?domainType=${domainType}`;
      expect(detailButtonLink).toHaveAttribute('href', orderDetailLink);
      expect(detailButtonLink).toHaveAttribute('target', '_blank');
    });
  });
});
