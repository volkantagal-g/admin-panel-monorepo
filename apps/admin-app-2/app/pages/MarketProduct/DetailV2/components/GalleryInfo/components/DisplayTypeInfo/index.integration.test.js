import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DisplayTypeInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';

describe('Market Product/Detail/DisplayTypeInfo', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <DisplayTypeInfo /> });
  });

  it('should render correct form components', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <DisplayTypeInfo /> });
    expect(screen.getByText('Display Type')).toBeInTheDocument();
  });
});
