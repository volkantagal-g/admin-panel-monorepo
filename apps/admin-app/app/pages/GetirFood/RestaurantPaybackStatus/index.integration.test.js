import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/food/restaurantPaybackStatus';

describe('In Food Restaurant Payback Status Page:', () => {
  describe('For Page Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_FOOD_RESTAURANT_PAYBACK_STATUS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should render restaurant select on single restaurant selection', async () => {
      const [actionTypeSelect] = screen.getAllByRole('combobox');
      userEvent.click(actionTypeSelect);
      const singleRestaurantOption = await screen.findByText('Single Restaurant');
      userEvent.click(singleRestaurantOption);

      const [, restaurantSelect] = screen.getAllByRole('combobox');
      expect(restaurantSelect).toBeInTheDocument();
      await screen.findAllByText('Restaurant');
    });

    it('should render pause/resume select on all restaurants selection', async () => {
      const [actionTypeSelect] = screen.getAllByRole('combobox');
      userEvent.click(actionTypeSelect);
      const allRestaurantsOption = await screen.findByText('All Restaurants');
      userEvent.click(allRestaurantsOption);

      const [, pauseResumeSelect] = screen.getAllByRole('combobox');
      expect(pauseResumeSelect).toBeInTheDocument();
      await screen.findByText('Pause/Resume');
    });

    it('should render pause/resume select on partial restaurants selection', async () => {
      const [actionTypeSelect] = screen.getAllByRole('combobox');
      userEvent.click(actionTypeSelect);
      const partialRestaurantsOption = await screen.findByText('Export Restaurants');
      userEvent.click(partialRestaurantsOption);

      const [, pauseResumeSelect] = screen.getAllByRole('combobox');
      expect(pauseResumeSelect).toBeInTheDocument();
      await screen.findByText('Pause/Resume');
    });
  });
});
