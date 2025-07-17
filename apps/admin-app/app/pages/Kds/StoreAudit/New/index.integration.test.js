import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';

const initialUrl = '/kds/storeAudit/new';

describe('In New Store Audit Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_STORE_AUDIT_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New Store Audit')).toBeInTheDocument();
      expect(screen.getByText('New Store Audit Form')).toBeInTheDocument();
      expect(screen.getByText('Auditor')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Franchise')).toBeInTheDocument();
      expect(screen.getByText('Audit Type')).toBeInTheDocument();
    });
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);
      const errorMessages = await screen.findAllByText(/(Invalid\.|Required\.)/);

      expect(errorMessages).toHaveLength(4);
    });
    it('should be able to save everyfield', async () => {
      const [
        auditor,
        warehouse,
        franchise,
        auditType,
      ] = screen.getAllByRole('combobox');

      userEvent.click(auditor);
      const auditorName = await screen.findByText('Real Cenk Batman');
      userEvent.click(auditorName);
      await waitForItemToBeSelected('Real Cenk Batman');

      userEvent.click(warehouse);
      const whName = await screen.findByText('Gaziemir');
      userEvent.click(whName);
      await waitForItemToBeSelected('Gaziemir');

      await waitForLoading();

      expect(franchise).toBeDisabled();
      expect(screen.getByText(/Merve Ayçiçek/i)).toBeInTheDocument();

      userEvent.click(auditType);
      const auditTypeName = await screen.findByText('Long Audit_edited');
      userEvent.click(auditTypeName);
      await waitForItemToBeSelected('Long Audit_edited');

      const roundNumberInput = screen.getByPlaceholderText('Round Number');
      fireEvent.change(roundNumberInput, { target: { value: 1903 } });
      await waitFor(() => {
        expect(roundNumberInput).toHaveValue('1903');
      });

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_STORE_AUDIT_LIST]);
      });

      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('New Store Audit')).not.toBeInTheDocument();
      });
    });
  });
});
