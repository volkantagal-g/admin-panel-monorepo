import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, screen, within } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import { COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST, COUNTRY_CODE } from '@app/pages/MarketProduct/constants';

import MarketInfo from './index';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getMarketProductCategoriesMock } from '@shared/api/marketProductCategory/index.mock.handler';

describe('Market Product/Detail/MarketInfo', () => {
  afterEach(cleanup);
  afterAll(jest.clearAllMocks);

  it('should render component without error', async () => {
    mockApiPerTestCase(getMarketProductCategoriesMock);

    await renderComponent({ ui: <MarketInfo /> });
  });

  it('should render correct form components', async () => {
    mockApiPerTestCase(getMarketProductCategoriesMock);

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <MarketInfo /> });
    expect(screen.getByText('Product Targets')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub Category')).toBeInTheDocument();
    expect(screen.getByText('Keywords')).toBeInTheDocument();
    expect(screen.getByText('Boosted Keywords')).toBeInTheDocument();
    expect(screen.getByText('Product Source')).toBeInTheDocument();
  });

  const allCountryCodes = [...Object.values(COUNTRY_CODE)];
  const [restrictedDomainType] = [...Object.keys(COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST)];
  const countryWhitelistOfDomainType = COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST[restrictedDomainType];
  const [allowedCountryCode] = allCountryCodes.filter(countryCode => countryWhitelistOfDomainType.includes(countryCode));
  const [restrictedCountryCode] = allCountryCodes.filter(countryCode => !countryWhitelistOfDomainType.includes(countryCode));

  it('should render country based restricted domains within their country whitelist', async () => {
    mockApiPerTestCase(getMarketProductCategoriesMock);

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      countryCode: allowedCountryCode,
    });

    await renderComponent({ ui: <MarketInfo /> });

    const domain = getirMarketDomainTypes[restrictedDomainType].en;

    const editButton = await screen.findByTestId('edit-button');
    userEvent.click(editButton);

    const productTargets = await screen.findByTestId('product-targets');
    const combobox = await within(productTargets).findByRole('combobox');

    fireEvent.mouseDown(combobox);

    await within(productTargets).findByText(domain);
    await within(productTargets).findByText('GetirMore');
    await within(productTargets).findByText('GetirWater');
  });

  it('should not render country based restricted domains outside their country whitelist', async () => {
    mockApiPerTestCase(getMarketProductCategoriesMock);

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      countryCode: restrictedCountryCode,
    });

    await renderComponent({ ui: <MarketInfo /> });

    const domain = getirMarketDomainTypes[restrictedDomainType].en;

    const editButton = await screen.findByTestId('edit-button');
    userEvent.click(editButton);

    const productTargets = await screen.findByTestId('product-targets');
    const combobox = await within(productTargets).findByRole('combobox');

    fireEvent.mouseDown(combobox);

    const restrictedDoamin = within(productTargets).queryByText(domain);
    expect(restrictedDoamin).not.toBeInTheDocument();
  });

  it('should cancel without error', async () => {
    mockApiPerTestCase(getMarketProductCategoriesMock);
    await renderComponent({ ui: <MarketInfo /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
