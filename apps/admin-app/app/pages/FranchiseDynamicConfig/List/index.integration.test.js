import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies,
  waitForItemToBeSelected,
  expectSelectDate,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { mockedConfigEarningsRecords } from '@shared/api/franchiseDynamicConfig/index.mock.data';
import { getLocalDateFormat } from '@shared/utils/localization';

const initialUrl = '/franchiseDynamicConfig/list';

describe('In Franchise Dynamic Config Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'Franchise Dynamic Config List']);
      await waitForLoading();
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Dynamic Config List');
    });
  });
  describe('For page features', () => {
    let table;
    it('should filter and match mock data informations in table', async () => {
      expect(screen.getByText('Date')).toBeInTheDocument();
      const date = screen.getByPlaceholderText('Select date');
      const todayDate = moment().format(getLocalDateFormat());
      expectSelectDate(date, todayDate);

      expect(screen.getByText('country_id')).toBeInTheDocument();
      const countryIdInput = screen.getByPlaceholderText('Country ID');
      expect(countryIdInput).toBeInTheDocument();
      expect(countryIdInput).toBeEnabled();
      fireEvent.change(countryIdInput, { target: { value: '6470c496a5c09e4de2889161' } });
      await waitFor(() => {
        expect(countryIdInput).toHaveValue('6470c496a5c09e4de2889161');
      });

      expect(screen.getByText('order_domain')).toBeInTheDocument();
      const orderDomainInput = screen.getByPlaceholderText('Order Domain');
      expect(orderDomainInput).toBeInTheDocument();
      expect(orderDomainInput).toBeEnabled();
      fireEvent.change(orderDomainInput, { target: { value: 'test order domain' } });
      await waitFor(() => {
        expect(orderDomainInput).toHaveValue('test order domain');
      });

      expect(screen.getByText('warehouse_domain')).toBeInTheDocument();
      const [, warehouseDomainSelect] = await screen.findAllByRole('combobox');
      userEvent.click(warehouseDomainSelect);
      const selectedWarehouseDomain = screen.getByText('Store Conversion');
      userEvent.click(selectedWarehouseDomain);
      await waitForItemToBeSelected('Store Conversion');

      expect(screen.getByText('is_business_change')).toBeInTheDocument();
      const [, , isBusinessChangeSelect] = await screen.findAllByRole('combobox');
      userEvent.click(isBusinessChangeSelect);
      const selectedIsBusinessChange = screen.getByText('False');
      userEvent.click(selectedIsBusinessChange);
      await waitForItemToBeSelected('False');

      const submitButton = screen.getByText('Bring');
      userEvent.click(submitButton);

      await waitForLoading();

      [table] = await waitForAntTableBodies();
      await within(table).findByText(mockedConfigEarningsRecords.data[0].country_id);
      await within(table).findByText(mockedConfigEarningsRecords.data[0].warehouse_domain);
      await within(table).findByText(moment(mockedConfigEarningsRecords.data[0].start_date).format(getLocalDateFormat()));
      await within(table).findByText(moment(mockedConfigEarningsRecords.data[0].end_date).format(getLocalDateFormat()));
      await within(table).findByText(mockedConfigEarningsRecords.data[0].is_business_change === false ? 'No' : 'Yes');
    });

    it.skip('should pagination work', async () => {
      const [, , , limit] = await screen.findAllByRole('combobox');
      userEvent.click(limit);

      const [, , selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });
  });
});
