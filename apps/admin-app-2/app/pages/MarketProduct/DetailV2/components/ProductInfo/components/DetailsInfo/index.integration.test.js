import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DetailsInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import * as CountrySelection from '@shared/redux/selectors/countrySelection';
import { ABV_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';

describe('Market Product/Detail/Product Info', () => {
  afterEach(cleanup);

  it('should render component without error', async () => {
    await renderComponent({ ui: <DetailsInfo /> });
  });

  it('should render descriptions correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);

    await renderComponent({ ui: <DetailsInfo /> });

    await screen.findByText('Description');
    await Promise.all(
      Object.values(mockedPieceTypeProduct.marketProduct.description)
        .map(descriptionText => screen.findByText(descriptionText)),
    );
  });

  it('should not render ABV field if country is not in list of ABV enabled countries list', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: 'NONEXISTENT COUNTRY CODE' } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      alcoholByVolume: 5,
    });

    await renderComponent({ ui: <DetailsInfo /> });

    const title = screen.queryByText('ABV% (Alcohol)');
    expect(title).not.toBeInTheDocument();
  });

  it('should render ABV field correctly if country is in list of ABV enabled countries list', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    const mockedAlcoholVolume = 79;

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ABV_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      alcoholByVolume: mockedAlcoholVolume,
    });

    await renderComponent({ ui: <DetailsInfo /> });

    await screen.findByText('ABV% (Alcohol)');
    await screen.findByDisplayValue(mockedAlcoholVolume);
  });
});
