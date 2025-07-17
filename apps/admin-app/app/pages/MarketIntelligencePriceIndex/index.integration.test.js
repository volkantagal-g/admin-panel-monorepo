/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '@app/pages/MarketIntelligencePriceIndex';

export const mockedPriceIndex = {
  COMPETITORS: 'Competitors',
  BASE_COMPETITOR: 'Base Competitor',
  CATEGORY_EXCLUDE: 'Category Exclude',
  DOMAIN_TYPE: 'Domain Type',
  INDEX_LEVEL: 'Index Level',
  INDEX_TYPE: 'Index Type',
  SUBCATEGORY_EXLUDE: 'Subcategory Exclude',

  SELECT_SUBCATEGORY: 'Select Subcategory',
  SELECT_CATEGORY: 'Select Category',

  CATEGORIES: 'Categories',
  PRODUCTS: 'Products',
  MATCHES: 'Matches',
};

const url = '/dataPanel/marketIntelligence/marketIntelligencePriceIndex';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHavePlaceHolderText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Price Index #RenderPage', () => {
  it('should render price index page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_INTELLIGENCE_PRICE_INDEX,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, mockedPriceIndex.BASE_COMPETITOR)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.COMPETITORS)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.CATEGORY_EXCLUDE)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.DOMAIN_TYPE)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.INDEX_TYPE)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.INDEX_LEVEL)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.SUBCATEGORY_EXLUDE)).toBeTruthy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Market Intelligence Price Index');
  });

  it('should render select placeholder', async () => {
    const selectComponents = document.querySelectorAll('.ant-select-selection-placeholder');
    expect(expectToHavePlaceHolderText(selectComponents, mockedPriceIndex.SELECT_CATEGORY)).toBeTruthy();
    expect(expectToHavePlaceHolderText(selectComponents, mockedPriceIndex.SELECT_SUBCATEGORY)).toBeTruthy();
  });

  it('should render table columns header', async () => {
    const tableCellContainer = document.querySelectorAll('.ant-table-column-title');

    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.CATEGORIES)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.PRODUCTS)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.MATCHES)).toBeTruthy();
  });
});
