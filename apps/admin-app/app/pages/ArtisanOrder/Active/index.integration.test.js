import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForItemToBeSelected } from '@test/publicUtils/assertions';

import { artisanActiveOrderStatusesWithQueue, lastActivityDiff } from './constants';
import { mockedArtisanTypes, mockedCities } from '@shared/api/artisan/index.mock.data';
import PageComponent from '.';
import { filterOption } from './components/DataTable/utils';

const orderStatusNames = artisanActiveOrderStatusesWithQueue.map(status => status.en);
const artisanTypeNames = mockedArtisanTypes.map(artisanType => artisanType.name);
const cityNames = mockedCities.map(city => city.name.en);
const lastActivityNames = lastActivityDiff.map(activity => activity.name);

const mockedOption = { props: { children: { props: { children: 'Adana' } } } };

const initialUrl = '/artisanOrder/active';

describe('In Artisan Active Orders Page:', () => {
  describe('For Page Details', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_ARTISAN_ORDER_ACTIVE,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct page header', () => {
      expectToHavePageHeaderText('GetirLocals Active Order');
    });
  });

  describe('For Filters', () => {
    it('should be able to select status filters', async () => {
      const statusSelect = screen.getByText('Select Order Status');

      await waitFor(() => {
        expect(statusSelect).toBeEnabled();
      });
      userEvent.click(statusSelect);

      // eslint-disable-next-line no-restricted-syntax
      for (const status of orderStatusNames) {
        const statusOption = screen.getAllByText(status);
        userEvent.click(statusOption.at(-1));
        // eslint-disable-next-line no-await-in-loop
        await waitForItemToBeSelected(status);
      }
    });

    it('should be able to select artisan type filters', async () => {
      const artisanTypeSelect = screen.getByText('Select Merchant Type');

      await waitFor(() => {
        expect(artisanTypeSelect).toBeEnabled();
      });
      userEvent.click(artisanTypeSelect);

      // eslint-disable-next-line no-restricted-syntax
      for (const artisanType of artisanTypeNames) {
        const artisanTypeOption = screen.getAllByText(artisanType);
        userEvent.click(artisanTypeOption.at(-1));
        // eslint-disable-next-line no-await-in-loop
        await waitForItemToBeSelected(artisanType);
      }
    });

    it('should be able to select city filters', async () => {
      const citySelect = screen.getByText('Select City');

      await waitFor(() => {
        expect(citySelect).toBeEnabled();
      });
      userEvent.click(citySelect);

      // eslint-disable-next-line no-restricted-syntax
      for (const city of cityNames) {
        const statusOption = screen.getAllByText(city);
        userEvent.click(statusOption.at(-1));
        // eslint-disable-next-line no-await-in-loop
        await waitForItemToBeSelected(city);
      }
    });

    it('should be able to select last activiy gap filters', async () => {
      const lastActivitySelect = screen.getByText('Select Last Activity Gap');

      await waitFor(() => {
        expect(lastActivitySelect).toBeEnabled();
      });
      userEvent.click(lastActivitySelect);

      // eslint-disable-next-line no-restricted-syntax
      for (const activity of lastActivityNames) {
        const statusOption = screen.getAllByText(activity);
        userEvent.click(statusOption.at(-1));
        // eslint-disable-next-line no-await-in-loop
        await waitForItemToBeSelected(activity);
      }
    });

    it('should be able to search promo code', async () => {
      const promoCodeSearch = screen.getAllByTestId('promoCodeSearchFilter')[0];
      expect(promoCodeSearch).toBeInTheDocument();
      userEvent.click(promoCodeSearch);
      userEvent.type(promoCodeSearch, 'Test PromoCode');
      await waitFor(() => {
        expect(promoCodeSearch).toHaveValue('Test PromoCode');
      });
    });

    it('#filterOption should return true text', async () => {
      expect(filterOption('Adana', mockedOption)).toBeTruthy();
    });
  });
});
