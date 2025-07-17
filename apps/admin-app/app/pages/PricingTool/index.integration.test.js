/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { within, screen } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText, expectSidebarMenuToHaveV2 } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedElasticity = {
  CATEGORY: 'Category',
  SUBCATEGORY: 'Subcategory',
  SELECT_CATEGORY: 'Select Category',
  SELECT_SUBCATEGORY: 'Select SubCategory',
  PRODUCT: 'Product',
  WEEKLY_SALES: 'Weekly Sales',
  WEEKLY_TOTAL_BASKET_VALUE: 'Weekly Total Basket Value',
  MARGIN: 'Weekly Nominal Margin',
  CURRENT: 'Current',
  NEW: 'New',
  WEEKLY_AANDM: 'Weekly A&M',
  UNIT: 'Unit',
  TOTAL: 'Total',
  PRICE_ELASTICITY: 'Price Elasticity',
  PRODUCT_NAME: 'Product Name',
  TOOLTIP: 'If selected, the new price is taken as a new discounted price.This effects Margin and A&M calculations',
};

const url = '/dataPanel/pricing/pricingTool';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHavePlaceHolderText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};
const expectToHaveTitleText = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Pricing Tool', () => {
  it('should render on off page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_PRICING_TOOL,
      pageUrl: url,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should show related menu group', () => {
    expectSidebarMenuToHaveV2('Data Panel', ['Pricing']);
  });

  it('should render select titles', async () => {
    const element = screen.getAllByTestId('select-title');
    expect(expectToHaveTitleText(element, mockedElasticity.CATEGORY)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedElasticity.SUBCATEGORY)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedElasticity.PRODUCT)).toBeTruthy();
    expect(expectToHaveTitleText(element, mockedElasticity.UNIT)).toBeFalsy();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Pricing Tool');
  });

  it('should render select placeholder', async () => {
    const selectComponents = document.querySelectorAll('.ant-select-selection-placeholder');
    expect(expectToHavePlaceHolderText(selectComponents, mockedElasticity.SELECT_CATEGORY)).toBeTruthy();
    expect(expectToHavePlaceHolderText(selectComponents, mockedElasticity.SELECT_SUBCATEGORY)).toBeTruthy();
  });

  it('should render table columns header', async () => {
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.WEEKLY_SALES)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.WEEKLY_TOTAL_BASKET_VALUE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.MARGIN)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.CURRENT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.NEW)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.WEEKLY_AANDM)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.UNIT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.PRODUCT_NAME)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.TOTAL)).toBeTruthy();
  });

  it('should render table columns title', async () => {
    const tableCellContainer = document.querySelectorAll('.ant-table-column-title');
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.PRODUCT_NAME)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.PRICE_ELASTICITY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedElasticity.CURRENT)).toBeTruthy();
  });
});
