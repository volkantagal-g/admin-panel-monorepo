import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText,
} from '@test/publicUtils/assertions';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import Filter from './components/Filter';
import DataTable from './components/DataTable';

const initialUrl = '/localsReturns/list';

describe('In Return Page:', () => {
  describe('For List', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_LOCALS_RETURN_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Returns');
    });

    it('filter component', async () => {
      const { addUserPermissions } = await renderComponent({ ui: <Filter /> });
      addUserPermissions([permKey.PAGE_GETIR_LOCALS_RETURN_LIST]);
      const filter = screen.getByTestId('returns-list-filter');

      expect(filter).toBeInTheDocument();
    });

    it('datatable component', async () => {
      const { addUserPermissions } = await renderComponent({ ui: <DataTable /> });
      addUserPermissions([permKey.PAGE_GETIR_LOCALS_RETURN_LIST]);
      const table = screen.getByText('Courier Id');

      expect(table).toBeInTheDocument();
    });
  });
});
