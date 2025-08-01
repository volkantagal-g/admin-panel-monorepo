import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '@app/pages/MarketIntelligenceProducts';

export const mockedProducts = {
  COMPETITOR: 'Competitor',
  DATE: 'Date',
  PREDICTION: 'Prediction',
  CATEGORY: 'Category',
  SUBCATEGORY: 'Subcategory',
  BRAND: 'Brand',
  PRODUCT: 'Product',
};

const url = '/dataPanel/marketIntelligence/marketIntelligenceProducts';

const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Products #RenderPage', () => {
  it('should render on off page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_INTELLIGENCE_PRODUCTS,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, mockedProducts.COMPETITOR)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.DATE)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.PREDICTION)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.CATEGORY)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.SUBCATEGORY)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.BRAND)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedProducts.PRODUCT)).toBeTruthy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Market Intelligence Products');
  });
});
