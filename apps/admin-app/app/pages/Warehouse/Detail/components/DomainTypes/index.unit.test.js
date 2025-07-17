import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import { mockProps } from './index.mock.data';

import renderComponent from '@test/publicUtils/renderComponent';
import DomainTypes from '.';

describe('', () => {
  afterEach(cleanup);

  describe('<DomainTypes /> component tests', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <DomainTypes
            {...mockProps}
          />
        ),
      });
      expect(screen.getByTitle('Domain Type')).toBeInTheDocument();
    });

    it('should render domain types correctly', async () => {
      await renderComponent({
        ui: (
          <DomainTypes
            {...mockProps}
          />
        ),
      });
      const getir10Label = screen.getByText('Getir10');
      expect(getir10Label).toBeInTheDocument();

      const getirFoodLabel = screen.getByText('GetirFood');
      expect(getirFoodLabel).toBeInTheDocument();
    });

    it('select should initially be disabled', async () => {
      await renderComponent({
        ui: (
          <DomainTypes
            {...mockProps}
          />
        ),
      });

      const select = screen.getByRole('combobox', { name: 'Domain Type' });
      expect(select).toBeDisabled();
    });
  });
});
