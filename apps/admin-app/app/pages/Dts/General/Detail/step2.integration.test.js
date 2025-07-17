import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getDtsStatusDecisionOptions } from '@shared/api/dts/index.mock.handler';

const dtsId = '62d7eb5bc5f63c12499b25be';
const initialUrl = `/dts/detail/${dtsId}`;

describe('In Dts Detail Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getDtsStatusDecisionOptions);
      mockApiPerTestCase(getWarehouseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('Disciplinary Tracking System Detail')).toBeInTheDocument();
      expect(screen.getByText('Dts Detail')).toBeInTheDocument();
      expect(screen.getByText('Rule Number')).toBeInTheDocument();
      expect(screen.getByText('Rule Description')).toBeInTheDocument();
      expect(screen.getByText('Rule Category')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Activeness')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Employee')).toBeInTheDocument();
      expect(screen.getByText('Reporter')).toBeInTheDocument();
      expect(screen.getByText('Created At')).toBeInTheDocument();
      expect(screen.getByText('Feedback Source')).toBeInTheDocument();
      expect(screen.getByText('Waiting for decision')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should be able to save decision field', async () => {
      const acceptButton = screen.getByRole('radio', { name: 'Accept' });
      userEvent.click(acceptButton);

      expect(acceptButton).toBeChecked();

      const warnButton = screen.getByRole('radio', { name: 'Warn' });
      userEvent.click(warnButton);

      expect(warnButton).toBeChecked();

      const rejectButton = screen.getByRole('radio', { name: 'Reject' });
      userEvent.click(rejectButton);

      expect(rejectButton).toBeChecked();
      expect(acceptButton).not.toBeChecked();
      expect(warnButton).not.toBeChecked();

      const notes = screen.getByPlaceholderText('Notes');

      fireEvent.change(notes, { target: { value: 'test' } });
      await waitFor(() => {
        expect(notes).toHaveValue('test');
      });

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Dts Detail')).toBeInTheDocument();
      });
    });
  });
});
