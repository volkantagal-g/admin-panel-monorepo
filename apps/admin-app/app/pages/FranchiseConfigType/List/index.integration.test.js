import '@test/publicUtils/configureWithoutCleanup';
import { screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
  waitForAntTableBodies,
  waitForItemToBeSelected,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { mockedConfigTypeList } from '@shared/api/franchiseDynamicConfig/index.mock.data';
import { getLangKey } from '@shared/i18n';

const initialUrl = '/franchiseConfigType/list';

describe('In Franchise Config Type List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_TYPE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'Franchise Config Type List']);
      await waitForLoading();
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Config Type List');
    });
  });
  describe('For page features', () => {
    let table;
    it('should filter and match mock data informations in table', async () => {
      [table] = await waitForAntTableBodies();

      await within(table).findByText(mockedConfigTypeList.data[0].name);
      await within(table).findByText(mockedConfigTypeList.data[0].description[getLangKey()]);
    });

    it('should pagination work', async () => {
      const [limit] = await screen.findAllByRole('combobox');
      userEvent.click(limit);

      const [, selectedLimitNumber] = screen.getAllByText('25');
      userEvent.click(selectedLimitNumber);

      await waitForItemToBeSelected('25');
    });
  });
});
