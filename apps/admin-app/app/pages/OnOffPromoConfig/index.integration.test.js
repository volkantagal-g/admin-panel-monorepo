// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedOnOff = {
  COUNTRY: 'Country',
  CITY: 'City',
  CITY_NAME: 'City Name',
  WAREHOUSE_NAME: 'Warehouse Name',
  WAREHOUSE: 'Warehouse',
  CONFIG: 'Config',
};

const url = '/dataPanel/onOffPromoConfig';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHavePlaceHolderText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('On Off Promo Config', () => {
  it('should render on off page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ON_OFF_PROMO_CONFIG,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, mockedOnOff.CITY)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedOnOff.WAREHOUSE)).toBeTruthy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('On Off Promo Config');
  });

  it('should render select placeholder', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const selectComponents = document.querySelectorAll('.ant-select-selection-placeholder');
    expect(expectToHavePlaceHolderText(selectComponents, mockedOnOff.CITY_NAME)).toBeTruthy();
    expect(expectToHavePlaceHolderText(selectComponents, mockedOnOff.WAREHOUSE_NAME)).toBeTruthy();
  });

  it('should render table columns header', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedOnOff.COUNTRY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedOnOff.CITY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedOnOff.WAREHOUSE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedOnOff.CONFIG)).toBeTruthy();
  });
});
