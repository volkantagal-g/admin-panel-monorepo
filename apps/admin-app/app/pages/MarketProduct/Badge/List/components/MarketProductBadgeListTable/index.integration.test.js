import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, render, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { getBadgesSelector } from '@app/pages/MarketProduct/Badge/List/redux/selectors';
import { mockedBadgeList } from '@shared/api/marketProduct/index.mock.data';
import { tableColumns, exportProductsToExcel } from './config';
import Excel from '@shared/utils/excel';

import MarketProductBadgeListTable from '.';

describe('Market Product/Badge/List Table', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <MarketProductBadgeListTable /> });
  });

  it('should render table with data correctly', async () => {
    const marketProductSpy = jest.spyOn(getBadgesSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedBadgeList);
    await renderComponent({ ui: <MarketProductBadgeListTable /> });
  });

  const productData = {
    _id: '123',
    product: {
      picURL: { en: 'image-url' },
      name: { en: 'Product Name' },
      description: { en: 'Product Description' },
      status: 'active',
    },
  };

  it('renders image correctly', () => {
    render(tableColumns[0].render(productData.product.picURL, productData));
    const image = screen.getByAltText('marketProductImage-123');
    expect(image).toHaveAttribute('src', 'image-url');
  });

  it('renders name correctly', () => {
    render(tableColumns[1].render(productData.product.name));
    const name = screen.getByText('Product Name');
    expect(name).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(tableColumns[2].render(productData.product.description));
    const description = screen.getByText('Product Description');
    expect(description).toBeInTheDocument();
  });
});

describe('exportProductsToExcel', () => {
  it('exports products to excel correctly', () => {
    const productIds = ['5f462f3912009117d823901c'];
    const badgeId = 'badge-id';
    const exportSpy = jest.spyOn(Excel.prototype, 'export').mockImplementation(() => {});
    exportProductsToExcel(productIds, badgeId);
    expect(exportSpy).toHaveBeenCalled();
    exportSpy.mockRestore();
  });
});
