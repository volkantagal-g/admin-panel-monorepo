/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '@app/pages/MarketIntelligencePriceRecommendation';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

export const mockedPriceIndex = {
  PRODUCT_NAME: 'Product Name',
  SEGMENTATIONS: 'Segmentation',
  ACTIVE_RULE: 'ActiveRule',
  MATCHES: 'Match',
  MARGIN: 'Margin',
  CURRENT: 'Current',
  RECOMMENDED: 'Recommended',
  NEW: 'New',
  PRODUCTS: 'Product',
  UPDATED_COUNT: 'Update Count',
  GETIR_PRICE_INDEX: 'Getir Price Inde',
  MATCHED: 'Match',
  UNMATCHED: 'Unmatch',
  TOTAL: 'Totl',

  EXCEL_EXPORT: 'Excel Export',
  BUNDLE_CHECK: 'Bundle Check',
  INDEX: 'Index',
  INDEX_TYPE: 'Index Type',
  COMPETITORS: 'Competitors',
  BASE_COMPETITOR: 'Base Competitor',
};

const url = '/dataPanel/marketIntelligence/priceRecommendation';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Price Recommendation #RenderPage', () => {
  it('should render price index page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_INTELLIGENCE_PRICE_RECOMMENDATION,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, mockedPriceIndex.EXCEL_EXPORT)).toBeFalsy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.BUNDLE_CHECK)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.INDEX)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.INDEX_TYPE)).toBeFalsy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.COMPETITORS)).toBeFalsy();
    expect(expectToHaveTitleText(element, mockedPriceIndex.BASE_COMPETITOR)).toBeFalsy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Market Intelligence Price Recommendation');
  });

  it('should render table columns header', async () => {
    const tableCellContainer = document.querySelectorAll('.ant-table-column-title');

    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.PRODUCT_NAME)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.SEGMENTATIONS)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.ACTIVE_RULE)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.MATCHES)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.MARGIN)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.CURRENT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.RECOMMENDED)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.NEW)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.PRODUCTS)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.UPDATED_COUNT)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.GETIR_PRICE_INDEX)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.MATCHED)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.UNMATCHED)).toBeFalsy();
    expect(tableCellInDocument(tableCellContainer, mockedPriceIndex.TOTAL)).toBeFalsy();
  });
});
