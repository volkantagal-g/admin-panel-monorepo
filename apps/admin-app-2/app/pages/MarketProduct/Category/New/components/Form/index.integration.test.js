import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { COUNTRY_CODE, COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST, DOMAIN_TYPE } from '@app/pages/MarketProduct/constants';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';

import MarketProductCategoryNewForm from '@app/pages/MarketProduct/Category/New/components/Form/index';

const mockedCountry = { code: { alpha2: mockedCountries[0].code.alpha2 } };

jest.mock(
  '@shared/redux/selectors/countrySelection',
  () => ({
    ...jest.requireActual('@shared/redux/selectors/countrySelection'),
    getSelectedCountryV2: () => mockedCountry,
  }),
);

describe('Market Product/Category/Detail/Form', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render component without error', async () => {
    await renderComponent({ ui: <MarketProductCategoryNewForm /> });
  });

  it('should render correct form components', async () => {
    await renderComponent({ ui: <MarketProductCategoryNewForm /> });

    await screen.findByLabelText('Category Targets');
  });

  describe('Domain type country based restrictions', () => {
    const allCountryCodes = [...Object.values(COUNTRY_CODE)];
    const countryWhitelistOfGorillas = COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST[DOMAIN_TYPE.GORILLAS];
    const [gorillasAllowedCountryCode] = allCountryCodes.filter(countryCode => countryWhitelistOfGorillas.includes(countryCode));
    const [gorillasRestrictedCountryCode] = allCountryCodes.filter(countryCode => !countryWhitelistOfGorillas.includes(countryCode));
    const gorillasDomainName = getirMarketDomainTypes[DOMAIN_TYPE.GORILLAS].en;

    it('should render country based restricted Gorillas domain within their country whitelist', async () => {
      mockedCountry.code.alpha2 = gorillasAllowedCountryCode;
      await renderComponent({ ui: <MarketProductCategoryNewForm /> });

      const categoryTargetsInput = await screen.findByLabelText('Category Targets');
      userEvent.click(categoryTargetsInput);
      await screen.findByText(gorillasDomainName);
    });

    it('should not render country based restricted Gorillas domain outside their country whitelist', async () => {
      mockedCountry.code.alpha2 = gorillasRestrictedCountryCode;

      await renderComponent({ ui: <MarketProductCategoryNewForm /> });

      const categoryTargetsInput = await screen.findByLabelText('Category Targets');
      userEvent.click(categoryTargetsInput);

      const gorillasDomainOption = screen.queryByText(gorillasDomainName);
      expect(gorillasDomainOption).not.toBeInTheDocument();
    });
  });
});
