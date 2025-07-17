import '@test/publicUtils/configureWithoutCleanup';

import { act, screen, waitFor, within } from '@testing-library/react';

import { contractTypeList } from '@shared/api/personContractType/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, getAntTableBodies } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

const initialUrl = '/person/contract';

describe('In Person Contract List Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PERSON_CONTRACT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Employee', 'Person Contract']);
    });
  });
  describe('For page features', () => {
    let table;

    it('should have correct page header', () => {
      expectToHavePageHeaderText('Person Contract');
    });

    it('shouldn\'t show new/create button in table', async () => {
      expect(screen.queryByRole('button', { name: 'New' })).not.toBeInTheDocument();
    });
    it('should show new/create button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_PERSON_CONTRACT_CREATE]);
      });
      await screen.findByText('New');
    });

    it('should show contract information in table', async () => {
      await waitFor(() => {
        const tables = getAntTableBodies();
        expect(tables.length).toBeGreaterThan(0);
        [table] = tables;
      });

      await within(table).findByText(contractTypeList[0].name);
    });
    it('shouldn\'t show detail action button in table', async () => {
      expect(within(table).queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
    });
    it('should show detail button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_PERSON_CONTRACT_DETAIL]);
      });
      await within(table).findAllByRole('button', { name: 'Detail' });
    });
  });
});
