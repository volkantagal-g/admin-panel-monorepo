import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import ConfigFilter from './index';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import { FOOD_CONSTANTS } from '@app/pages/Algorithm/Config/Domain/constants';

describe('Algorithm/Domain/List', () => {
  afterAll(cleanup);

  describe('ConfigFilter', () => {
    it('should render component without error', async () => {
      const spy = jest.spyOn(algorithmDomainConfigListSelector, 'getConstants');
      spy.mockReturnValue(FOOD_CONSTANTS);
      await renderComponent({
        ui: (
          <ConfigFilter />
        ),
      });
      await screen.findByText('ID');
      await screen.findByText('Type');
      await screen.findByText('Alias');
      await screen.findByText('Parent Key');
      await screen.findByText('Parent Alias');

      const searchBoxes = screen.getAllByPlaceholderText('Search');
      expect(searchBoxes).toHaveLength(4);
      userEvent.type(searchBoxes[0], 'global');
    });
  });
});
