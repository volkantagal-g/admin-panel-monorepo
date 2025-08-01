import '@test/publicUtils/configureWithoutCleanup';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { getMarketProductCategoryByIdSelector } from '@app/pages/MarketProduct/Category/Detail/redux/selectors';
import { COUNTRY_CODE, COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST, DOMAIN_TYPE } from '@app/pages/MarketProduct/constants';
import { mockedMarketProductCategory } from '@shared/api/marketProductCategory/index.mock.data';

import MarketProductCategoryDetailForm from '@app/pages/MarketProduct/Category/Detail/components/Form/index';

describe('Market Product/Category/Detail/Form', () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render component without error', async () => {
    await renderComponent({ ui: <MarketProductCategoryDetailForm /> });
  });

  it('should render correct form components', async () => {
    await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

    await screen.findByLabelText('Category Targets');
  });

  describe('Domain type country based restrictions', () => {
    const allCountryCodes = [...Object.values(COUNTRY_CODE)];
    const countryWhitelistOfGorillas = COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST[DOMAIN_TYPE.GORILLAS];
    const [gorillasAllowedCountryCode] = allCountryCodes.filter(countryCode => countryWhitelistOfGorillas.includes(countryCode));
    const [gorillasRestrictedCountryCode] = allCountryCodes.filter(countryCode => !countryWhitelistOfGorillas.includes(countryCode));
    const gorillasDomainName = getirMarketDomainTypes[DOMAIN_TYPE.GORILLAS].en;

    it('should render country based restricted Gorillas domain within their country whitelist', async () => {
      const marketProductCategorySpy = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      marketProductCategorySpy.mockReturnValue({
        ...mockedMarketProductCategory,
        countryCode: gorillasAllowedCountryCode,
      });

      await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

      const [editButton] = screen.queryAllByText('Edit');
      userEvent.click(editButton);

      const categoryTargetsInput = await screen.findByLabelText('Category Targets');
      userEvent.click(categoryTargetsInput);
      await screen.findByText(gorillasDomainName);
    });

    it('should not render country based restricted Gorillas domain outside their country whitelist', async () => {
      const marketProductCategorySpy = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      marketProductCategorySpy.mockReturnValue({
        ...mockedMarketProductCategory,
        countryCode: gorillasRestrictedCountryCode,
      });

      await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

      const [editButton] = screen.queryAllByText('Edit');
      userEvent.click(editButton);

      const categoryTargetsInput = await screen.findByLabelText('Category Targets');
      userEvent.click(categoryTargetsInput);

      const gorillasDomainOption = screen.queryByText(gorillasDomainName);
      expect(gorillasDomainOption).not.toBeInTheDocument();
    });

    it('should render show unit price toggle as checked if `showUnitPrice` is true', async () => {
      const marketProductCategorySpy = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      marketProductCategorySpy.mockReturnValue({
        ...mockedMarketProductCategory,
        showUnitPrice: true,
      });

      await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

      const showUnitPriceInput = await screen.findByLabelText('Show unit price');
      expect(showUnitPriceInput).toBeChecked();
    });

    it('should render show unit price toggle as unchecked if `showUnitPrice` is true', async () => {
      const marketProductCategorySpy = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      marketProductCategorySpy.mockReturnValue({
        ...mockedMarketProductCategory,
        showUnitPrice: false,
      });

      await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

      const showUnitPriceInput = await screen.findByLabelText('Show unit price');
      expect(showUnitPriceInput).not.toBeChecked();
    });

    it('should hide show unit price toggle if category is a subcategory', async () => {
      const marketProductCategorySpy = jest.spyOn(getMarketProductCategoryByIdSelector, 'getData');
      marketProductCategorySpy.mockReturnValue({
        ...mockedMarketProductCategory,
        isSubCategory: true,
        showUnitPrice: true, // whatever comes from BE about this value, we ignore it in this case
      });

      await renderComponent({ ui: <MarketProductCategoryDetailForm /> });

      const showUnitPriceInput = screen.queryByLabelText('Show unit price');
      expect(showUnitPriceInput).not.toBeInTheDocument();
    });
  });
});
