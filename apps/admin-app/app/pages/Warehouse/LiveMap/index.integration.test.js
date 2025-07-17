import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  expectAntTableHeaderHaveSorter,
  expectSelectItemAndWaitForToBeSelected,
  expectTableToHaveColumnNames,
  getAntTableHeaderTables,
  getAntTableRowByRowKey,
  waitForAntTableBodies,
  waitForAntTableHeaderTables,
  waitPageToRenderSomething,
} from '@test/publicUtils/assertions';
import { getInitialCouriersForLiveMapMock } from '@shared/api/courier/index.mock.data';
import { getWarehouseInfoForWarehouseBasedLiveMapMockData } from '@shared/api/warehouse/index.mock.data';
import PageComponent from './index';
import { TEST_ID } from './constants';

const warehouseId = '5db9759777a0c71180d7694c';
const initialUrl = `/warehouse/liveMap/${warehouseId}`;

const getClassOfElement = elem => {
  return elem?.getAttribute('class');
};

describe('In Warehouse Based Live Map Page:', () => {
  afterAll(cleanup);

  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_WAREHOUSE_LIVE_MAP,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct document title', async () => {
      await waitFor(() => {
        expect(document.title).toContain(`${getWarehouseInfoForWarehouseBasedLiveMapMockData.name} - Warehouse Based Live Map`);
      });
    });
  });

  describe('Top right panel features', () => {
    let collapseButton;
    let selectPolygonTypeComponent;
    let couriersTable;
    let courierCountsTable;
    let couriersFilterButtons;
    let pickersTable;
    let eventPanelContainer;
    let eventPanelTable;

    describe('<Filters /> Component', () => {
      it('should render filters', async () => {
        selectPolygonTypeComponent = screen.getByTestId(TEST_ID.FILTERS.SELECT_POLYGON_TYPE);

        expect(selectPolygonTypeComponent).toBeInTheDocument();
      });

      it('should change filters', async () => {
        const input = await within(selectPolygonTypeComponent).findByRole('combobox');
        await expectSelectItemAndWaitForToBeSelected(input, 'Extended Region');
      });
    });

    describe('<CourierTable /> Component', () => {
      it('should render header of couriers table', async () => {
        couriersTable = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.COURIERS_TABLE.COURIERS);
        expect(couriersTable).toBeInTheDocument();

        const [header] = await waitForAntTableHeaderTables(couriersTable);

        expectTableToHaveColumnNames(header, ['Courier', 'Status']);
        expectAntTableHeaderHaveSorter(header, { headerText: /Status/i, defaultSortDirection: 'up' });
      });

      it('should render rows of couriers table', async () => {
        const [body] = await waitForAntTableBodies(couriersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });
        const firstCourierRow = getAntTableRowByRowKey(body, { key: getInitialCouriersForLiveMapMock[0]._id });
        const firstCourierRowCells = within(firstCourierRow).getAllByRole('cell');
        expect(firstCourierRowCells[0]).toHaveTextContent(getInitialCouriersForLiveMapMock[0].name);
        expect(firstCourierRowCells[0].childNodes[0]).toHaveStyle('cursor: pointer');
        expect(firstCourierRowCells[1]).toHaveTextContent('Reached');

        const thirdCourierRow = getAntTableRowByRowKey(body, { key: getInitialCouriersForLiveMapMock[3]._id });
        const thirdCourierRowCells = within(thirdCourierRow).getAllByRole('cell');
        expect(thirdCourierRowCells[0]).toHaveTextContent(getInitialCouriersForLiveMapMock[3].name);
        expect(thirdCourierRowCells[1]).toHaveTextContent('Busy');
        expect(thirdCourierRowCells[1].childNodes[0]).toHaveClass('ant-tag-has-color');
      });

      it('shouldn\'t be render header of counts table', async () => {
        courierCountsTable = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.COURIERS_TABLE.COUNTS);
        const [header] = getAntTableHeaderTables(courierCountsTable);
        expect(header).toBeFalsy();
      });

      it('should render counts table row', async () => {
        courierCountsTable = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.COURIERS_TABLE.COUNTS);
        const body = within(courierCountsTable).getByRole('table');
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });
        const tableRows = within(body).getAllByRole('row');
        expect(tableRows.length).toBe(1);
        const tableRowCells = within(tableRows[0]).getAllByRole('cell');

        expect(tableRowCells[0]).toHaveTextContent('9');
        expect(getClassOfElement(tableRowCells[0].childNodes[0])).toContain('totalCourier');

        expect(tableRowCells[1]).toHaveTextContent('1');
        expect(getClassOfElement(tableRowCells[1].childNodes[0])).toContain('freeCourier');

        expect(tableRowCells[2]).toHaveTextContent('5');
        expect(getClassOfElement(tableRowCells[2].childNodes[0])).toContain('onDutyCourier');

        expect(tableRowCells[3]).toHaveTextContent('1');
        expect(getClassOfElement(tableRowCells[3].childNodes[0])).toContain('returningCourier');

        expect(tableRowCells[4]).toHaveTextContent('2');
        expect(getClassOfElement(tableRowCells[4].childNodes[0])).toContain('busyCourier');

        expect(tableRowCells[5]).toHaveTextContent('86');
        expect(getClassOfElement(tableRowCells[5].childNodes[0])).toContain('utilization');
      });
    });

    describe('<PickersTable /> Component', () => {
      it('should render header of table', async () => {
        pickersTable = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.PICKER_TABLE);
        expect(pickersTable).toBeInTheDocument();

        const [header] = await waitForAntTableHeaderTables(pickersTable);
        expectTableToHaveColumnNames(header, ['Picker']);
      });

      it('should render rows of table', async () => {
        const [body] = await waitForAntTableBodies(pickersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });
        const loggedInPicker = getWarehouseInfoForWarehouseBasedLiveMapMockData.pickers[0];
        const loggedInPickerRow = getAntTableRowByRowKey(body, { key: loggedInPicker._id });
        const loggedInPickerRowCells = within(loggedInPickerRow).getAllByRole('cell');
        expect(loggedInPickerRowCells[0]).toHaveTextContent(loggedInPicker.name);

        // loggedOut couriers should not be shown in table
        const loggedOutPicker = getWarehouseInfoForWarehouseBasedLiveMapMockData.pickers[2];
        const loggedOutPickerRow = getAntTableRowByRowKey(body, { key: loggedOutPicker._id });
        expect(loggedOutPickerRow).toBeFalsy();
      });

      it('shouldn\'t render detail button if user doesn\'t have permission', async () => {
        const [body] = await waitForAntTableBodies(pickersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });

        const picker = getWarehouseInfoForWarehouseBasedLiveMapMockData.pickers[0];
        const pickerRow = getAntTableRowByRowKey(body, { key: picker._id });
        await waitFor(() => {
          expect(within(pickerRow).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
        });
      });

      it('should render detail button if user have permission', async () => {
        const { addUserPermissions, removeUserPermissions } = renderResult;
        act(() => {
          addUserPermissions([permKey.PAGE_PICKER_DETAIL]);
        });

        pickersTable = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.PICKER_TABLE);
        const [body] = await waitForAntTableBodies(pickersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });

        const picker = getWarehouseInfoForWarehouseBasedLiveMapMockData.pickers[0];
        const pickerRow = getAntTableRowByRowKey(body, { key: picker._id });
        const detailButton = within(pickerRow).getByRole('button', { name: 'Detail' });
        expect(detailButton).toBeInTheDocument();

        act(() => {
          removeUserPermissions([permKey.PAGE_PICKER_DETAIL]);
        });
      });
    });

    describe('<EventPanel /> Component', () => {
      it('should render rows of table', async () => {
        const [body] = await waitForAntTableBodies(couriersTable);
        await waitFor(() => {
          expect(body).not.toHaveTextContent('No Data');
        });
        const firstCourierRow = getAntTableRowByRowKey(body, { key: getInitialCouriersForLiveMapMock[0]._id });
        const firstCourierRowCells = within(firstCourierRow).getAllByRole('cell');
        userEvent.click(firstCourierRowCells[0].childNodes[0]);

        await waitFor(() => {
          eventPanelContainer = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.EVENT_PANEL);
          expect(eventPanelContainer).toBeInTheDocument();
        });
      });

      it('shouldn\'t render detail button if user doesn\'t have permission', async () => {
        await waitFor(() => {
          expect(within(eventPanelContainer).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
        });
      });

      it('shouldn\'t render order button if user doesn\'t have permission', async () => {
        await waitFor(() => {
          expect(within(eventPanelContainer).queryByRole('button', { name: 'Order' })).not.toBeInTheDocument();
        });
      });

      it('should render detail button if user have permission', async () => {
        const { addUserPermissions, removeUserPermissions } = renderResult;
        act(() => {
          addUserPermissions([permKey.PAGE_COURIER_DETAIL]);
        });

        const detailButton = within(eventPanelContainer).getByRole('button', { name: 'Detail' });
        expect(detailButton).toBeInTheDocument();

        act(() => {
          removeUserPermissions([permKey.PAGE_COURIER_DETAIL]);
        });
      });

      it('should render order button if user have permission', async () => {
        const { addUserPermissions, removeUserPermissions } = renderResult;
        act(() => {
          addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
        });

        const detailButton = within(eventPanelContainer).getByRole('button', { name: 'Order' });
        expect(detailButton).toBeInTheDocument();

        act(() => {
          removeUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL]);
        });
      });

      it('should render table', async () => {
        eventPanelTable = within(eventPanelContainer).getByTestId(TEST_ID.TOP_RIGHT_PANEL.EVENT_PANEL_TABLE);
        expect(eventPanelTable).toBeInTheDocument();
      });

      it('should close panel', async () => {
        const closeButton = within(eventPanelContainer).queryByRole('button', { name: /close/i });
        userEvent.click(closeButton);
        await waitFor(() => {
          expect(eventPanelContainer).not.toBeInTheDocument();
        });
      });
    });

    describe('<CourierFilterButtons /> Component', () => {
      it('should render tables', async () => {
        couriersFilterButtons = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.COURIER_FILTER_BUTTONS_WRAPPER);
        const buttons = within(couriersFilterButtons).getAllByRole('button');

        expect(buttons.length).toBeGreaterThanOrEqual(1);
      });

      it('should click show busy buttons', async () => {
        const showBusyCourier = within(couriersFilterButtons).getByRole('button', { name: /show busy couriers/i });
        expect(showBusyCourier).toBeInTheDocument();
        expect(showBusyCourier).toHaveClass('ant-btn-sm w-100');

        userEvent.click(showBusyCourier);
        expect(showBusyCourier).toHaveClass('ant-btn-success');

        userEvent.click(showBusyCourier);
        expect(showBusyCourier).not.toHaveClass('ant-btn-success');
      });
    });

    describe('<Collapse /> Component', () => {
      it('should collapse top right panel', async () => {
        collapseButton = screen.getByTestId(TEST_ID.TOP_RIGHT_PANEL.COLLAPSE_BUTTON);
        expect(collapseButton).toHaveAccessibleName(/right/i);
        expect(selectPolygonTypeComponent).toBeInTheDocument();
        expect(couriersTable).toBeInTheDocument();
        expect(courierCountsTable).toBeInTheDocument();
        expect(couriersFilterButtons).toBeInTheDocument();
        expect(pickersTable).toBeInTheDocument();

        userEvent.click(collapseButton);
        expect(collapseButton).toHaveAccessibleName(/left/i);
        expect(selectPolygonTypeComponent).not.toBeInTheDocument();
        expect(couriersTable).not.toBeInTheDocument();
        expect(courierCountsTable).not.toBeInTheDocument();
        expect(couriersFilterButtons).not.toBeInTheDocument();
        expect(pickersTable).not.toBeInTheDocument();
      });
    });
  });
});
