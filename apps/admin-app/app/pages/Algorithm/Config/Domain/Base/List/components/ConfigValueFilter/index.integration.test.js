import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import ConfigValueFilter from './index';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import { mockedDomainSettingsData } from '@shared/api/algorithm/config/index.mock.data';

describe('Algorithm/Domain/List', () => {
  afterAll(cleanup);
  describe('ConfigValueFilter', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ConfigValueFilter />
        ),
      });
      const valueFilterCollapseButton = await screen.findByText('Value Filter');
      userEvent.click(valueFilterCollapseButton);
      const addFilterButton = await screen.findByText('Add Filter');
      userEvent.click(addFilterButton);

      const searchButton = await screen.findByText('Search');
      const configKeyField = screen.getByPlaceholderText('Config Key');
      const configValueField = screen.getByPlaceholderText('Config Value');
      userEvent.type(configKeyField, 'DELIVERY_DURATION_THRESHOLD_BY_WAREHOUSES');
      userEvent.type(configValueField, 'someValue');
      userEvent.click(searchButton);
      cleanup();
    });

    it('should render mocked component without error', async () => {
      const spy = jest.spyOn(algorithmDomainConfigListSelector, 'getDomainSettingsData');
      spy.mockReturnValue(mockedDomainSettingsData);
      await renderComponent({
        ui: (
          <ConfigValueFilter />
        ),
      });
      const valueFilterCollapseButton = await screen.findByText('Value Filter');
      userEvent.click(valueFilterCollapseButton);
      const addFilterButton = await screen.findByText('Add Filter');
      userEvent.click(addFilterButton);
      const containsAnyValueCheckbox = screen.getByLabelText('Contains Any Value');
      const notEqualCheckbox = screen.getByLabelText('Not Equal');
      userEvent.click(containsAnyValueCheckbox);
      userEvent.click(notEqualCheckbox);
      userEvent.click(containsAnyValueCheckbox);
      userEvent.click(notEqualCheckbox);

      const searchButton = await screen.findByText('Search');
      const configKeyField = screen.getByTestId('algo-config-domain-key-select');
      const configValueField = screen.getByPlaceholderText('Config Value');
      userEvent.type(configKeyField, 'DELIVERY_DURATION_THRESHOLD_BY_WAREHOUSES');
      userEvent.type(configValueField, 'someValue');
      userEvent.click(searchButton);
      cleanup();
    });
  });
});
