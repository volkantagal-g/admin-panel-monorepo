/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { expectToHavePageHeaderText, waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '@app/pages/MarketAutoGrowthOperations';
import { MOCK_VALUES } from '@app/pages/MarketAutoGrowthOperations/mock.data';

const url = '/dataPanel/marketAutoGrowthOperations';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Auto Growth #RenderPage', () => {
  it('should render auto growth page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, MOCK_VALUES.DOMAIN_TYPE)).toBeTruthy();
    expect(expectToHaveTitleText(element, MOCK_VALUES.WAREHOUSE_TYPE)).toBeTruthy();
    expect(expectToHaveTitleText(element, MOCK_VALUES.PROMO_TYPE)).toBeTruthy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText(MOCK_VALUES.TITLE);
  });

  it('should show related menu group', () => {
    expectSidebarMenuToHaveV2('Data Panel', [MOCK_VALUES.SIDEBAR]);
  });

  it('should render table columns header', async () => {
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.SET)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.AGG1)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.AGG2)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.AGG3)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.AGG4)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.AGG5)).toBeTruthy();

    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.CSV_EXPORT)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.TARGET)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, MOCK_VALUES.LIMIT)).toBeFalsy();
  });

  it('Should have proper columns for Promo Set', () => {
    const table = screen.getByTestId('auto_growth_promo_set');
    expectTableToHaveColumnNames(table, [MOCK_VALUES.SET, MOCK_VALUES.AGG1, MOCK_VALUES.AGG2, MOCK_VALUES.AGG3, MOCK_VALUES.AGG4, MOCK_VALUES.AGG5]);
  });
});
