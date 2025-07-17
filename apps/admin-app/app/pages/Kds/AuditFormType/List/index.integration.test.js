import '@test/publicUtils/configureWithoutCleanup';
import { screen, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';

import PageComponent from '.';
import { mockedAuditFormTypeList } from '@shared/api/kds/auditFormType/index.mock.data';

const initialUrl = '/kds/auditFormType/list';

describe('In Audit Form Type List Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_KDS_AUDIT_FORM_TYPE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Store Audit', 'Audit Form Type List']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Audit Form Type List');
      expect(screen.getByText('Name')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    let auditTable;
    it('should match mock data informations in audit form type table', async () => {
      [auditTable] = await waitForAntTableBodies();

      await within(auditTable).findByText(mockedAuditFormTypeList.name.en);
    });
  });
});
